import React, { useState, useMemo } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
import { ClassItem, SurveyResponse } from '../types';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface AdminDashboardProps {
  responses: SurveyResponse[];
  classes: ClassItem[];
  onAddClass: (name: string) => Promise<void>;
  onDeleteClass: (id: string) => Promise<void>;
  onLogoutAdmin: () => void;
  isSavingClass?: boolean;
}

const INTEREST_PALETTE = [
  '#2563eb', '#3b82f6', '#06b6d4', '#0d9488', '#10b981',
  '#84cc16', '#eab308', '#f97316', '#ef4444', '#ec4899',
  '#d946ef', '#8b5cf6', '#6366f1', '#475569', '#64748b', '#0284c7'
];

const ABILITY_PALETTE = [
  '#4f46e5', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e', '#f97316', '#eab308', '#10b981',
  '#14b8a6', '#06b6d4', '#0284c7'
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  responses,
  classes,
  onAddClass,
  onDeleteClass,
  onLogoutAdmin,
  isSavingClass = false
}) => {
  const [activeTab, setActiveTab] = useState<'rekap' | 'kelola_kelas'>('rekap');
  const [classFilter, setClassFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResponseDetail, setSelectedResponseDetail] = useState<SurveyResponse | null>(null);

  // Form states for creating new class
  const [newClassName, setNewClassName] = useState('');
  const [classFormError, setClassFormError] = useState('');
  const [classFormSuccess, setClassFormSuccess] = useState('');

  // Filtered responses by selected class and search
  const filteredResponses = useMemo(() => {
    return responses.filter((r) => {
      const matchClass = !classFilter || r.studentClass === classFilter;
      const query = searchQuery.toLowerCase();
      const matchSearch =
        !searchQuery ||
        r.studentName.toLowerCase().includes(query) ||
        r.studentClass.toLowerCase().includes(query) ||
        (r.studentEmail && r.studentEmail.toLowerCase().includes(query)) ||
        (r.selectedInterests && r.selectedInterests.some((i) => i.toLowerCase().includes(query))) ||
        (r.selectedAbilities && r.selectedAbilities.some((a) => a.toLowerCase().includes(query)));
      return matchClass && matchSearch;
    });
  }, [responses, classFilter, searchQuery]);

  // Aggregate data for Chart 1: Minat Siswa (Soal No. 4)
  const interestChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredResponses.forEach((r) => {
      if (r.selectedInterests && Array.isArray(r.selectedInterests)) {
        r.selectedInterests.forEach((interest) => {
          const key = interest.startsWith('Lainnya:') ? 'Lainnya (Spesifik)' : interest;
          counts[key] = (counts[key] || 0) + 1;
        });
      }
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    return {
      labels,
      datasets: [
        {
          label: 'Jumlah Pemilih',
          data,
          backgroundColor: labels.map((_, i) => INTEREST_PALETTE[i % INTEREST_PALETTE.length]),
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    };
  }, [filteredResponses]);

  // Aggregate data for Chart 2: Potensi & Kemampuan (Soal No. 6)
  const abilityChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredResponses.forEach((r) => {
      if (r.selectedAbilities && Array.isArray(r.selectedAbilities)) {
        r.selectedAbilities.forEach((ability) => {
          const key = ability.startsWith('Lainnya:') ? 'Lainnya (Spesifik)' : ability;
          counts[key] = (counts[key] || 0) + 1;
        });
      }
    });

    const labels = Object.keys(counts);
    const data = Object.values(counts);

    return {
      labels,
      datasets: [
        {
          label: 'Jumlah Pemilih',
          data,
          backgroundColor: labels.map((_, i) => ABILITY_PALETTE[i % ABILITY_PALETTE.length]),
          borderColor: '#ffffff',
          borderWidth: 2,
          hoverOffset: 6
        }
      ]
    };
  }, [filteredResponses]);

  // Summary statistics
  const totalStudents = filteredResponses.length;
  const totalClassesCount = classes.length;

  const topInterest = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredResponses.forEach((r) => {
      r.selectedInterests?.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
      });
    });
    let top = '-';
    let max = 0;
    for (const [k, v] of Object.entries(counts)) {
      if (v > max) {
        max = v;
        top = k;
      }
    }
    return { name: top, count: max };
  }, [filteredResponses]);

  const topAbility = useMemo(() => {
    const counts: Record<string, number> = {};
    filteredResponses.forEach((r) => {
      r.selectedAbilities?.forEach((item) => {
        counts[item] = (counts[item] || 0) + 1;
      });
    });
    let top = '-';
    let max = 0;
    for (const [k, v] of Object.entries(counts)) {
      if (v > max) {
        max = v;
        top = k;
      }
    }
    return { name: top, count: max };
  }, [filteredResponses]);

  // Handler for Adding Class
  const handleAddClassSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setClassFormError('');
    setClassFormSuccess('');

    const trimmed = newClassName.trim();
    if (!trimmed) {
      setClassFormError('Harap masukkan nama kelas (contoh: "X MIPA 1" atau "XI RPL 1")');
      return;
    }

    if (classes.some((c) => c.name.toLowerCase() === trimmed.toLowerCase())) {
      setClassFormError(`Kelas "${trimmed}" sudah ada di daftar.`);
      return;
    }

    try {
      await onAddClass(trimmed);
      setClassFormSuccess(`Kelas "${trimmed}" berhasil ditambahkan ke Firestore!`);
      setNewClassName('');
    } catch (err: any) {
      setClassFormError(err.message || 'Gagal menambahkan kelas.');
    }
  };

  const handleDeleteClassClick = async (clsItem: ClassItem) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus kelas "${clsItem.name}" dari Firestore?`)) {
      try {
        await onDeleteClass(clsItem.id);
      } catch (err: any) {
        alert('Gagal menghapus kelas: ' + (err.message || 'Error'));
      }
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredResponses.length === 0) {
      alert('Tidak ada data survei untuk diekspor.');
      return;
    }

    const headers = [
      'No',
      'Nama Siswa',
      'Kelas',
      'Email Siswa',
      'Bidang Minat (Soal 4)',
      'Bidang Ingin Dikembangkan (Soal 5)',
      'Kemampuan Dikuasai (Soal 6)',
      'Hal Baru Ingin Dicoba (Soal 7)',
      'Waktu Pengisian'
    ];

    const rows = filteredResponses.map((r, idx) => [
      idx + 1,
      `"${(r.studentName || '').replace(/"/g, '""')}"`,
      `"${(r.studentClass || '').replace(/"/g, '""')}"`,
      `"${(r.studentEmail || '').replace(/"/g, '""')}"`,
      `"${(r.selectedInterests ? r.selectedInterests.join(', ') : '').replace(/"/g, '""')}"`,
      `"${(r.topInterestToDevelop || '').replace(/"/g, '""')}"`,
      `"${(r.selectedAbilities ? r.selectedAbilities.join(', ') : '').replace(/"/g, '""')}"`,
      `"${(r.untriedOpportunityWish || '').replace(/"/g, '""')}"`,
      `"${(r.submittedAt || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const fileName = `rekap_survei_prestara_${classFilter || 'semua_kelas'}_${Date.now()}.csv`;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* 1. HEADER DASHBOARD ADMIN RINGKAS & TOMBOL KELUAR */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">
            Dashboard Admin
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Kelola data pemetaan & daftar kelas
          </p>
        </div>

        {/* Tombol Keluar Ringkas Berlatar Merah Muda Lembut */}
        <button
          type="button"
          onClick={onLogoutAdmin}
          className="py-1.5 px-3.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
          title="Keluar dari Dashboard Admin"
        >
          <i className="fa-solid fa-right-from-bracket text-xs"></i>
          <span>Keluar</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. SEGMENTED CONTROL TAB (MODERN & BERSIH) */}
      {/* ========================================================================= */}
      <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1 border border-slate-200/80 max-w-md mx-auto w-full mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('rekap')}
          className={`py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex-1 flex items-center justify-center gap-2 cursor-pointer select-none active:scale-98 ${
            activeTab === 'rekap'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 font-medium'
          }`}
        >
          <i className="fa-solid fa-chart-pie text-xs"></i>
          <span className="truncate">Analisis & Rekap Data</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('kelola_kelas')}
          className={`py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex-1 flex items-center justify-center gap-2 cursor-pointer select-none active:scale-98 ${
            activeTab === 'kelola_kelas'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-700 font-medium'
          }`}
        >
          <i className="fa-solid fa-school text-xs"></i>
          <span className="truncate">Kelola Kelas ({totalClassesCount})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: REKAP & DIAGRAM LINGKARAN PEMETAAN MINAT DAN POTENSI */}
      {/* ========================================================================= */}
      {activeTab === 'rekap' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* STATISTIK RINGKAS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Responden</span>
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-users"></i>
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">{totalStudents}</div>
              <p className="text-[11px] text-slate-400 mt-1">Siswa telah mengisi survei</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Kelas</span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-layer-group"></i>
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900 mt-2">{totalClassesCount}</div>
              <p className="text-[11px] text-slate-400 mt-1">Kelas terdaftar di Firestore</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Minat Terpopuler</span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-fire"></i>
                </div>
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-2 truncate" title={topInterest.name}>
                {topInterest.name}
              </div>
              <p className="text-[11px] text-amber-600 font-semibold mt-1">
                {topInterest.count > 0 ? `${topInterest.count} pemilih` : 'Belum ada data'}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Kemampuan Dominan</span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-award"></i>
                </div>
              </div>
              <div className="text-base font-extrabold text-slate-900 mt-2 truncate" title={topAbility.name}>
                {topAbility.name}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold mt-1">
                {topAbility.count > 0 ? `${topAbility.count} pemilih` : 'Belum ada data'}
              </p>
            </div>
          </div>

          {/* FILTER BAR BERDASARKAN KELAS & PENCARIAN */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
              {/* Filter Dropdown Kelas */}
              <div className="relative min-w-[200px]">
                <select
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  className="w-full pl-3.5 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none cursor-pointer"
                >
                  <option value="">Semua Kelas ({responses.length} siswa)</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.name}>
                      Kelas: {cls.name}
                    </option>
                  ))}
                </select>
                <span className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </span>
              </div>

              {/* Input Pencarian Siswa */}
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama siswa, email, minat, kemampuan..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder:text-slate-400"
                />
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-magnifying-glass text-xs"></i>
                </span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 text-xs"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Tombol Export Excel / CSV */}
            <button
              type="button"
              onClick={handleExportCSV}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0"
              title="Unduh data survei ke file CSV / Excel"
            >
              <i className="fa-solid fa-file-excel"></i>
              <span>Export ke Excel/CSV</span>
            </button>
          </div>

          {/* ===================================================================== */}
          {/* DUA DIAGRAM LINGKARAN: PEMETAAN MINAT & PEMETAAN POTENSI (CHART.JS) */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* DIAGRAM 1: PEMETAAN MINAT SISWA */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs">
                      <i className="fa-solid fa-compass"></i>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Diagram Pemetaan Minat Siswa
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                    Soal No. 4
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Distribusi akumulasi bidang minat yang dipilih siswa ({classFilter || 'Semua Kelas'}).
                </p>
              </div>

              <div className="relative h-64 sm:h-72 flex items-center justify-center my-2">
                {interestChartData.labels.length > 0 ? (
                  <Doughnut
                    data={interestChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            boxWidth: 12,
                            font: { size: 10, weight: 'bold' },
                            padding: 8
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => ` ${context.label}: ${context.raw} siswa`
                          }
                        }
                      }
                    }}
                  />
                ) : (
                  <div className="text-center text-slate-400 py-12">
                    <i className="fa-solid fa-chart-pie text-4xl mb-2 opacity-30"></i>
                    <p className="text-xs">Belum ada data minat pada filter ini.</p>
                  </div>
                )}
              </div>
            </div>

            {/* DIAGRAM 2: PEMETAAN POTENSI & KEMAMPUAN SISWA */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs">
                      <i className="fa-solid fa-award"></i>
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Diagram Pemetaan Potensi Siswa
                    </h3>
                  </div>
                  <span className="text-[11px] font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                    Soal No. 6
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Distribusi akumulasi keahlian/kemampuan yang paling dikuasai siswa ({classFilter || 'Semua Kelas'}).
                </p>
              </div>

              <div className="relative h-64 sm:h-72 flex items-center justify-center my-2">
                {abilityChartData.labels.length > 0 ? (
                  <Pie
                    data={abilityChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            boxWidth: 12,
                            font: { size: 10, weight: 'bold' },
                            padding: 8
                          }
                        },
                        tooltip: {
                          callbacks: {
                            label: (context) => ` ${context.label}: ${context.raw} siswa`
                          }
                        }
                      }
                    }}
                  />
                ) : (
                  <div className="text-center text-slate-400 py-12">
                    <i className="fa-solid fa-chart-pie text-4xl mb-2 opacity-30"></i>
                    <p className="text-xs">Belum ada data potensi pada filter ini.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* TABEL DATA HASIL SURVEI LENGKAP */}
          {/* ===================================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">
                  Tabel Hasil Survei Siswa ({filteredResponses.length} Data)
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Klik pada baris siswa untuk melihat rincian jawaban lengkap 3 bagian.
                </p>
              </div>
            </div>

            {filteredResponses.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <i className="fa-solid fa-inbox text-4xl mb-2 opacity-30"></i>
                <p className="text-sm font-semibold text-slate-600">Tidak ada data survei yang cocok.</p>
                <p className="text-xs text-slate-400 mt-1">Coba sesuaikan filter kelas atau kata kunci pencarian.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-slate-50 text-[11px] font-extrabold text-slate-500 uppercase border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3.5">No</th>
                      <th className="px-4 py-3.5">Nama Siswa</th>
                      <th className="px-4 py-3.5">Kelas</th>
                      <th className="px-4 py-3.5">Email Akun</th>
                      <th className="px-4 py-3.5">Minat Terpilih (No. 4)</th>
                      <th className="px-4 py-3.5">Fokus Pengembangan (No. 5)</th>
                      <th className="px-4 py-3.5">Kemampuan Dikuasai (No. 6)</th>
                      <th className="px-4 py-3.5">Waktu Submit</th>
                      <th className="px-4 py-3.5 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredResponses.map((res, index) => (
                      <tr
                        key={res.id || index}
                        onClick={() => setSelectedResponseDetail(res)}
                        className="hover:bg-blue-50/50 transition-colors cursor-pointer group"
                      >
                        <td className="px-4 py-3.5 font-bold text-slate-400">{index + 1}</td>
                        <td className="px-4 py-3.5">
                          <div className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {res.studentName}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-extrabold text-[11px]">
                            {res.studentClass}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 text-slate-500 truncate max-w-[150px]">
                          {res.studentEmail || '-'}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {res.selectedInterests && res.selectedInterests.length > 0 ? (
                              res.selectedInterests.slice(0, 2).map((int, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-[10px] font-bold truncate"
                                >
                                  {int}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                            {res.selectedInterests && res.selectedInterests.length > 2 && (
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                                +{res.selectedInterests.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-700 font-medium truncate max-w-[150px]">
                          {res.topInterestToDevelop || '-'}
                        </td>
                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1 max-w-[200px]">
                            {res.selectedAbilities && res.selectedAbilities.length > 0 ? (
                              res.selectedAbilities.slice(0, 2).map((ab, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 bg-purple-50 text-purple-700 rounded text-[10px] font-bold truncate"
                                >
                                  {ab}
                                </span>
                              ))
                            ) : (
                              <span className="text-slate-400">-</span>
                            )}
                            {res.selectedAbilities && res.selectedAbilities.length > 2 && (
                              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">
                                +{res.selectedAbilities.length - 2}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-slate-400 text-[11px] whitespace-nowrap">
                          {res.submittedAt || '-'}
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedResponseDetail(res);
                            }}
                            className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                            title="Lihat Detail Jawaban"
                          >
                            <i className="fa-solid fa-eye text-xs"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: KELOLA DAFTAR KELAS (FIRESTORE 'classes') */}
      {/* ========================================================================= */}
      {activeTab === 'kelola_kelas' && (
        <div className="space-y-6 animate-in fade-in duration-200 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                Database Sekolah
              </span>
              <h2 className="text-xl font-extrabold text-slate-800 mt-1">
                Kelola Daftar Kelas / Angkatan
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Daftar kelas di bawah ini akan otomatis muncul pada form pilihan kelas siswa secara real-time.
              </p>
            </div>

            {/* Form Input Kelas Baru */}
            <form onSubmit={handleAddClassSubmit} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                Tambah Nama Kelas Baru <span className="text-rose-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="Contoh: X MIPA 1, XI RPL 2, XII IPS 3"
                  className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={isSavingClass}
                  className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSavingClass ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-plus"></i>
                      <span>Tambah Kelas</span>
                    </>
                  )}
                </button>
              </div>

              {classFormError && (
                <p className="text-xs font-bold text-rose-600">{classFormError}</p>
              )}
              {classFormSuccess && (
                <p className="text-xs font-bold text-emerald-600">{classFormSuccess}</p>
              )}
            </form>

            {/* List Badge Kelas Aktif */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Daftar Kelas Aktif ({classes.length} Kelas)
              </h4>

              {classes.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-400 text-xs">
                  Belum ada kelas yang terdaftar. Tambahkan kelas pertama di atas.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {classes.map((cls) => (
                    <div
                      key={cls.id}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center gap-2 shadow-2xs group hover:bg-rose-50 hover:border-rose-200 transition-colors"
                    >
                      <span>{cls.name}</span>
                      <button
                        type="button"
                        onClick={() => handleDeleteClassClick(cls)}
                        className="text-slate-400 hover:text-rose-600 cursor-pointer transition-colors"
                        title={`Hapus kelas ${cls.name}`}
                      >
                        <i className="fa-solid fa-xmark text-xs"></i>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL RINCIAN JAWABAN SISWA */}
      {/* ========================================================================= */}
      {selectedResponseDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md">
                  Rincian Jawaban Siswa
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {selectedResponseDetail.studentName}
                </h3>
                <p className="text-xs text-slate-500">
                  Kelas: <span className="font-bold text-slate-700">{selectedResponseDetail.studentClass}</span> • Email: <span className="font-bold text-slate-700">{selectedResponseDetail.studentEmail || '-'}</span>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResponseDetail(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Bagian B: Minat */}
            <div className="space-y-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
              <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-wider">
                Bagian B: Minat Siswa
              </h4>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700">4. Bidang Minat Terpilih:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedResponseDetail.selectedInterests?.map((int, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-600 text-white font-bold text-[11px]">
                      {int}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-xs pt-1">
                <span className="font-bold text-slate-700">5. Bidang yang Paling Ingin Dikembangkan:</span>
                <p className="mt-1 p-2.5 bg-white rounded-xl border border-blue-100 text-slate-800 font-medium">
                  {selectedResponseDetail.topInterestToDevelop || '-'}
                </p>
              </div>
            </div>

            {/* Bagian C: Potensi */}
            <div className="space-y-3 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
              <h4 className="text-xs font-extrabold text-purple-900 uppercase tracking-wider">
                Bagian C: Potensi dan Kemampuan
              </h4>
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700">6. Kemampuan yang Paling Dikuasai:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedResponseDetail.selectedAbilities?.map((ab, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-purple-600 text-white font-bold text-[11px]">
                      {ab}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-xs pt-1">
                <span className="font-bold text-slate-700">7. Hal yang Ingin Dicoba tapi Belum Berkesempatan:</span>
                <p className="mt-1 p-2.5 bg-white rounded-xl border border-purple-100 text-slate-800 font-medium whitespace-pre-wrap">
                  {selectedResponseDetail.untriedOpportunityWish || '-'}
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedResponseDetail(null)}
                className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer"
              >
                Tutup Rincian
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
