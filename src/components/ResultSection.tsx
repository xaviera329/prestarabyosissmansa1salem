import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SurveyResponse } from '../types';

interface ResultSectionProps {
  response: SurveyResponse;
  onRetake: () => void;
  onOpenCompetitionModal?: (comp: any) => void;
}

export const ResultSection: React.FC<ResultSectionProps> = ({
  response,
  onRetake
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti effect triggered');
    }
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto py-2">
      
      {/* ========================================================================= */}
      {/* 1. KARTU UCAPAN TERIMA KASIH & INFORMASI FITUR MENDATANG */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 text-white shadow-2xl bg-gradient-to-br from-[#0b54cb] via-[#106de8] to-[#009de9] border border-blue-400/30">
        <div className="absolute -right-8 -bottom-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl sm:text-5xl shadow-inner border border-white/30 shrink-0">
            <i className="fa-solid fa-circle-check text-emerald-300"></i>
          </div>

          <div className="flex-1 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-extrabold uppercase tracking-wider border border-white/25">
              <span>🚀 Fitur Rekomendasi Lomba Segera Hadir</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white">
              Terima Kasih Telah Mengisi Survei!
            </h2>

            <p className="text-white/95 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
              Data minat dan potensi kamu telah berhasil tersimpan di database sekolah. Informasi terkait rekomendasi lomba dan pembinaan minat bakat akan diumumkan melalui fitur terbaru mendatang!
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-cyan-100 justify-center md:justify-start">
              <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                👤 {response.studentName}
              </span>
              <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                🏫 Kelas: {response.studentClass}
              </span>
              <span className="bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                🕒 {response.submittedAt}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. CARD RINCIAN JAWABAN SISWA (BAGIAN B & C) */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* CARD MINAT SISWA */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md shadow-blue-950/5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-compass"></i>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Minat Siswa (Bagian B)
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-600 block mb-1.5">
                  Bidang yang Paling Diminati:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {response.selectedInterests && response.selectedInterests.length > 0 ? (
                    response.selectedInterests.map((interest, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold"
                      >
                        {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">Tidak ada minat yang dipilih</span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600 block mb-1">
                  Bidang yang Paling Ingin Dikembangkan:
                </span>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-semibold">
                  {response.topInterestToDevelop || '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium">
              *Tercatat resmi di Bimbingan Konseling & OSIS
            </span>
          </div>
        </div>

        {/* CARD POTENSI & KEMAMPUAN */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-md shadow-blue-950/5 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                <i className="fa-solid fa-award"></i>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                Potensi & Kemampuan (Bagian C)
              </h3>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-bold text-slate-600 block mb-1.5">
                  Kemampuan yang Paling Dikuasai:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {response.selectedAbilities && response.selectedAbilities.length > 0 ? (
                    response.selectedAbilities.map((ability, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold"
                      >
                        {ability}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">Tidak ada kemampuan yang dipilih</span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-600 block mb-1">
                  Hal yang Ingin Dicoba tapi Belum Berkesempatan:
                </span>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-semibold whitespace-pre-wrap">
                  {response.untriedOpportunityWish || '-'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-[11px] text-slate-400 font-medium">
              *Sebagai bahan evaluasi program pembinaan bakat
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SECTION PROGRAM KERJA UNGGULAN OSIS SMAN 1 SALEM */}
      {/* ========================================================================= */}
      <div className="space-y-5 pt-2">
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-150 mb-1.5">
            <i className="fa-solid fa-bullhorn"></i>
            <span>Informasi Program Siswa</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <span>📌 Program Kerja Unggulan OSIS</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Mengenal berbagai program unggulan OSIS SMAN 1 Salem untuk mendukung prestasi, lingkungan, dan literasi siswa.
          </p>
        </div>

        {/* Grid 6 Kartu Program Kerja (Clean, Modern, Responsif Mobile 1-Kolom / Desktop 2-Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          
          {/* PROGRAM 1: PRESTARA */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-300 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg border border-amber-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-trophy"></i>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-black uppercase tracking-wider border border-amber-200">
                  Prestasi & Kompetisi
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base group-hover:text-blue-600 transition-colors">
                  1. PRESTARA (Prestasi dan Arah)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Pusat informasi secara digital tentang kompetisi di bidang akademik maupun non-akademik yang diawali dengan survei minat dan potensi.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
              <i className="fa-solid fa-chart-line text-xs"></i>
              <span>Terintegrasi dengan Hasil Survei BakatKu</span>
            </div>
          </div>

          {/* PROGRAM 2: Green Action */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg border border-emerald-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-seedling"></i>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-black uppercase tracking-wider border border-emerald-200">
                  Lingkungan & 3R
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base group-hover:text-emerald-600 transition-colors">
                  2. Green Action
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Edukasi Lingkungan melalui media Poster/konten di media sosial dengan rangkaian aksi nyata:
                </p>
                <ul className="mt-2 space-y-1 text-[11px] text-slate-600 list-disc pl-4">
                  <li>Penilaian kebersihan kelas setiap satu minggu sekali (diumumkan kelas terbersih & terkotor setiap hari Senin). Reward Trophy bergilir setiap 1 bulan sekali bagi <strong>"Kelas Terbersih"</strong>.</li>
                  <li>Pengumuman angkatan ter-disiplin dan tidak ter-disiplin saat Upacara Hari Senin.</li>
                  <li>Perlombaan Peringatan Hari Bumi berbasis <strong>3R (Reuse, Reduce, Recycle)</strong>.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-700">
              <i className="fa-solid fa-award text-xs"></i>
              <span>Trophy Bergilir & Disiplin Upacara</span>
            </div>
          </div>

          {/* PROGRAM 3: LITERAL */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-cyan-300 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center text-lg border border-cyan-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-book-open-reader"></i>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 text-[10px] font-black uppercase tracking-wider border border-cyan-200">
                  Literasi Digital
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base group-hover:text-cyan-600 transition-colors">
                  3. LITERAL (Literasi Digital)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Literasi melalui aplikasi website dengan membaca buku elektronik serta meresensi hasil bacaan, dilengkapi reward menarik di setiap akhir semester.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-cyan-700">
              <i className="fa-solid fa-gift text-xs"></i>
              <span>E-Book Reading & Reward Akhir Semester</span>
            </div>
          </div>

          {/* PROGRAM 4: BICARA */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-purple-300 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg border border-purple-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-microphone-lines"></i>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 text-[10px] font-black uppercase tracking-wider border border-purple-200">
                  Podcast & Media
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base group-hover:text-purple-600 transition-colors">
                  4. BICARA (Bincang Inspiratif Cakrawala Remaja)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Podcast Clips inspiratif digital melalui media sosial yang dikemas dengan berbagai tema inspiratif, kisah sukses siswa, dan wawasan kekinian.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-purple-700">
              <i className="fa-brands fa-instagram text-xs"></i>
              <span>Podcast Clips di Media Sosial OSIS</span>
            </div>
          </div>

          {/* PROGRAM 5: Refleksi Tahunan */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg border border-sky-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-comments"></i>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 text-[10px] font-black uppercase tracking-wider border border-sky-200">
                  Aspirasi & Evaluasi
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                  5. Refleksi Tahunan
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Wadah pemberi saran, kritik, dan masukan bagi kepengurusan OSIS sebagai bahan evaluasi demi kemajuan seluruh kegiatan kesiswaan.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-sky-700">
              <i className="fa-solid fa-heart-circle-check text-xs"></i>
              <span>Kotak Aspirasi & Evaluasi Terbuka</span>
            </div>
          </div>

          {/* PROGRAM 6: History of The Leader */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-300 transition-all space-y-3 flex flex-col justify-between group">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg border border-amber-200 shadow-2xs group-hover:scale-105 transition-transform">
                  <i className="fa-solid fa-crown"></i>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-[10px] font-black uppercase tracking-wider border border-amber-200">
                  Galeri & Arsip
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base group-hover:text-amber-600 transition-colors">
                  6. History of The Leader
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                  Galeri & arsip foto Ketua OSIS SMAN 1 Salem dari tahun 1998 hingga 2026 sebagai bentuk apresiasi dedikasi kepemimpinan sekolah.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-amber-700">
              <i className="fa-solid fa-timeline text-xs"></i>
              <span>Arsip Kepemimpinan 1998 — 2026</span>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. ACTION BUTTONS */}
      {/* ========================================================================= */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4 pb-8">
        <button
          type="button"
          onClick={onRetake}
          className="py-3.5 px-8 bg-slate-900 hover:bg-blue-600 text-white font-extrabold rounded-2xl shadow-md text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
        >
          <i className="fa-solid fa-rotate-left"></i>
          <span>Kembali ke Beranda</span>
        </button>
      </div>

    </div>
  );
};
