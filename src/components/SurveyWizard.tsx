import React, { useState } from 'react';
import { ClassItem, StudentProfile, SurveyResponse, TalentCategoryKey } from '../types';

interface SurveyWizardProps {
  classes?: ClassItem[];
  student: StudentProfile;
  onSubmit: (responsePayload: Omit<SurveyResponse, 'id'>) => Promise<void>;
  onExit: () => void;
  onLogoutStudent: () => void;
  isSubmitting: boolean;
}

export const INTEREST_OPTIONS = [
  'Akademik',
  'Olahraga',
  'Seni musik',
  'Seni tari',
  'Seni rupa/desain',
  'Public speaking',
  'Menulis/literasi',
  'Bahasa',
  'Teknologi/digital',
  'Organisasi/kepemimpinan',
  'Kewirausahaan',
  'Keagamaan',
  'Lingkungan',
  'Fotografi/videografi',
  'E-sport',
  'Lainnya'
];

export const ABILITY_OPTIONS = [
  'Berbicara di depan umum',
  'Memimpin',
  'Bekerja sama dalam tim',
  'Menulis',
  'Menggambar/desain',
  'Bernyanyi/musik',
  'Olahraga',
  'Menggunakan teknologi',
  'Mengedit foto/video',
  'Mengatur acara',
  'Memecahkan masalah',
  'Menghafal/memahami materi',
  'Lainnya'
];

export const SurveyWizard: React.FC<SurveyWizardProps> = ({
  classes = [],
  student,
  onSubmit,
  onExit,
  onLogoutStudent,
  isSubmitting
}) => {
  // Step state: 1 = Identitas Siswa, 2 = Minat Siswa, 3 = Potensi & Kemampuan
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Section A: Identitas Siswa
  const [studentName, setStudentName] = useState(student.name || '');
  const [studentClass, setStudentClass] = useState(student.studentClass || (classes[0]?.name || ''));

  // Section B: Minat Siswa (Soal 4 & 5)
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [otherInterestText, setOtherInterestText] = useState('');
  const [topInterestToDevelop, setTopInterestToDevelop] = useState('');

  // Section C: Potensi & Kemampuan (Soal 6 & 7)
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
  const [otherAbilityText, setOtherAbilityText] = useState('');
  const [untriedOpportunityWish, setUntriedOpportunityWish] = useState('');

  const [validationError, setValidationError] = useState('');

  // Checkbox toggle handler for Interests
  const handleToggleInterest = (option: string) => {
    setValidationError('');
    setSelectedInterests((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  // Checkbox toggle handler for Abilities
  const handleToggleAbility = (option: string) => {
    setValidationError('');
    setSelectedAbilities((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  // Step advancement handler
  const handleNextStep = () => {
    setValidationError('');

    if (currentStep === 1) {
      if (!studentName.trim()) {
        setValidationError('Harap isi Nama Lengkap Siswa.');
        return;
      }
      if (!studentClass.trim()) {
        setValidationError('Harap pilih Kelas / Angkatan kamu.');
        return;
      }
      setCurrentStep(2);
      window.scrollTo({ top: 60, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (selectedInterests.length === 0) {
        setValidationError('Harap pilih minimal satu bidang minat pada pertanyaan No. 4.');
        return;
      }
      if (selectedInterests.includes('Lainnya') && !otherInterestText.trim()) {
        setValidationError('Harap sebutkan bidang minat lainnya yang kamu maksud.');
        return;
      }
      if (!topInterestToDevelop.trim()) {
        setValidationError('Harap isi bidang yang paling ingin kamu kembangkan pada pertanyaan No. 5.');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 60, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setValidationError('');
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 60, behavior: 'smooth' });
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    if (selectedAbilities.length === 0) {
      setValidationError('Harap pilih minimal satu kemampuan yang paling kamu kuasai pada pertanyaan No. 6.');
      return;
    }
    if (selectedAbilities.includes('Lainnya') && !otherAbilityText.trim()) {
      setValidationError('Harap sebutkan kemampuan lainnya yang kamu maksud.');
      return;
    }
    if (!untriedOpportunityWish.trim()) {
      setValidationError('Harap isi hal yang selama ini ingin kamu coba pada pertanyaan No. 7.');
      return;
    }

    // Build final interests list
    const finalInterests = selectedInterests.map((item) =>
      item === 'Lainnya' ? `Lainnya: ${otherInterestText.trim()}` : item
    );

    // Build final abilities list
    const finalAbilities = selectedAbilities.map((item) =>
      item === 'Lainnya' ? `Lainnya: ${otherAbilityText.trim()}` : item
    );

    // Calculate score mapping for recommendations
    const categoryScores: Record<TalentCategoryKey, number> = {
      sains: 0,
      teknologi: 0,
      seni: 0,
      olahraga: 0,
      bahasa: 0,
      bisnis: 0
    };

    finalInterests.forEach((int) => {
      const lower = int.toLowerCase();
      if (lower.includes('akademik') || lower.includes('sains') || lower.includes('lingkungan')) categoryScores.sains += 3;
      if (lower.includes('teknologi') || lower.includes('digital') || lower.includes('e-sport') || lower.includes('fotografi')) categoryScores.teknologi += 3;
      if (lower.includes('seni') || lower.includes('musik') || lower.includes('tari') || lower.includes('desain')) categoryScores.seni += 3;
      if (lower.includes('olahraga')) categoryScores.olahraga += 3;
      if (lower.includes('public speaking') || lower.includes('menulis') || lower.includes('bahasa') || lower.includes('literasi')) categoryScores.bahasa += 3;
      if (lower.includes('organisasi') || lower.includes('kepemimpinan') || lower.includes('kewirausahaan') || lower.includes('bisnis')) categoryScores.bisnis += 3;
    });

    finalAbilities.forEach((ab) => {
      const lower = ab.toLowerCase();
      if (lower.includes('memecahkan masalah') || lower.includes('menghafal')) categoryScores.sains += 2;
      if (lower.includes('menggunakan teknologi') || lower.includes('mengedit')) categoryScores.teknologi += 2;
      if (lower.includes('menggambar') || lower.includes('bernyanyi')) categoryScores.seni += 2;
      if (lower.includes('olahraga')) categoryScores.olahraga += 2;
      if (lower.includes('berbicara di depan umum') || lower.includes('menulis')) categoryScores.bahasa += 2;
      if (lower.includes('memimpin') || lower.includes('bekerja sama') || lower.includes('mengatur acara')) categoryScores.bisnis += 2;
    });

    let dominant: TalentCategoryKey = 'teknologi';
    let maxScore = -1;
    (Object.keys(categoryScores) as TalentCategoryKey[]).forEach((key) => {
      if (categoryScores[key] > maxScore) {
        maxScore = categoryScores[key];
        dominant = key;
      }
    });

    const payload: Omit<SurveyResponse, 'id'> = {
      studentName: studentName.trim(),
      studentClass: studentClass.trim(),
      studentEmail: student.email || '',
      photoURL: student.photoURL || '',
      selectedInterests: finalInterests,
      topInterestToDevelop: topInterestToDevelop.trim(),
      selectedAbilities: finalAbilities,
      untriedOpportunityWish: untriedOpportunityWish.trim(),
      dominantCategory: dominant,
      categoryScores: categoryScores,
      submittedAt: new Date().toLocaleString('id-ID', {
        dateStyle: 'full',
        timeStyle: 'short'
      }),
      timestamp: Date.now()
    };

    await onSubmit(payload);
  };

  const stepPercentage = currentStep === 1 ? 33 : currentStep === 2 ? 66 : 100;
  const avatarInitial = (studentName || student.name || 'Z').charAt(0).toUpperCase();

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2 animate-in fade-in duration-300">
      
      {/* ========================================================================= */}
      {/* 1. USER PROFILE CARD (SESUAI MOCKUP PDF PAGE 3) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-md shadow-blue-950/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Avatar & User Details */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              {student.photoURL ? (
                <img
                  src={student.photoURL}
                  alt={student.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-pink-400 shadow-md"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-rose-400 text-white font-black text-2xl flex items-center justify-center shadow-md shadow-pink-500/20">
                  {avatarInitial}
                </div>
              )}
              {/* Google Badge Overlay */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12s.45 3.84 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-black text-slate-900 text-lg sm:text-xl leading-none">
                  {studentName || student.name || 'Zea Sheila'}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200 inline-flex items-center gap-1 shadow-2xs">
                  <i className="fa-solid fa-circle-check text-[9px] text-emerald-600"></i> Google Auth
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <i className="fa-regular fa-envelope text-blue-500"></i>
                <span className="text-slate-700 font-bold">{student.email || 'zeasheira24@gmail.com'}</span>
              </p>

              <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 pt-0.5">
                <i className="fa-solid fa-graduation-cap text-blue-500"></i>
                <span>Kelas: <strong className="text-slate-800 font-bold">{studentClass || 'Belum dipilih'}</strong></span>
              </div>
            </div>
          </div>

          {/* Ganti Akun Button (Sesuai Mockup PDF Page 3) */}
          <button
            type="button"
            onClick={onLogoutStudent}
            className="w-full sm:w-auto py-2.5 px-4 rounded-2xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-600 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 shadow-2xs"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Ganti Akun</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. PROGRESS STEPPER CARD (SESUAI MOCKUP PDF PAGE 3 & 4) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-md shadow-blue-950/5 space-y-4">
        
        {/* Header Stepper: Nama Bagian & Persentase */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold border border-blue-150">
              <i className="fa-solid fa-chart-line"></i>
            </div>
            <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
              {currentStep === 1 && 'Bagian A: Identitas Siswa'}
              {currentStep === 2 && 'Bagian B: Minat Siswa'}
              {currentStep === 3 && 'Bagian C: Potensi & Kemampuan'}
            </h4>
          </div>

          <span className="text-xs sm:text-sm font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-150">
            Langkah {currentStep} dari 3 ({stepPercentage}%)
          </span>
        </div>

        {/* Turquoise to Blue Progress Bar (Sesuai PDF Page 3) */}
        <div className="w-full bg-slate-150 rounded-full h-3 overflow-hidden bg-slate-100">
          <div
            className="bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${stepPercentage}%` }}
          ></div>
        </div>

        {/* Stepper Tabs (1. Identitas Siswa | 2. Minat Siswa | 3. Potensi & Kemampuan) */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs font-bold">
          
          {/* Step 1 */}
          <div className={`flex items-center gap-2 ${currentStep === 1 ? 'text-blue-600 font-black' : currentStep > 1 ? 'text-emerald-600' : 'text-slate-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${currentStep === 1 ? 'bg-blue-600 text-white shadow-xs' : currentStep > 1 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
              {currentStep > 1 ? <i className="fa-solid fa-check text-[10px]"></i> : '1'}
            </div>
            <span className="hidden sm:inline">1. Identitas Siswa</span>
            <span className="sm:hidden">Identitas</span>
          </div>

          {/* Step 2 */}
          <div className={`flex items-center gap-2 ${currentStep === 2 ? 'text-blue-600 font-black' : currentStep > 2 ? 'text-emerald-600' : 'text-slate-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${currentStep === 2 ? 'bg-blue-600 text-white shadow-xs' : currentStep > 2 ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'}`}>
              {currentStep > 2 ? <i className="fa-solid fa-check text-[10px]"></i> : '2'}
            </div>
            <span className="hidden sm:inline">2. Minat Siswa</span>
            <span className="sm:hidden">Minat</span>
          </div>

          {/* Step 3 */}
          <div className={`flex items-center gap-2 ${currentStep === 3 ? 'text-blue-600 font-black' : 'text-slate-400'}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shrink-0 ${currentStep === 3 ? 'bg-blue-600 text-white shadow-xs' : 'bg-slate-200 text-slate-500'}`}>
              3
            </div>
            <span className="hidden sm:inline">3. Potensi & Kemampuan</span>
            <span className="sm:hidden">Potensi</span>
          </div>
        </div>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800 flex items-center gap-2.5 animate-in fade-in">
          <i className="fa-solid fa-circle-exclamation text-rose-600 shrink-0 text-base"></i>
          <span>{validationError}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. STEP FORM CONTAINERS (SESUAI MOCKUP PDF PAGE 4, 5, 6) */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-9 border border-slate-200/80 shadow-xl shadow-blue-950/5 space-y-6">
        
        {/* ----------------------------------------------------------------------- */}
        {/* STEP 1: BAGIAN A - IDENTITAS SISWA (PAGE 4) */}
        {/* ----------------------------------------------------------------------- */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-150">
                BAGIAN A
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                Identitas Siswa
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Pastikan data identitas di bawah ini sudah sesuai dengan data sekolahmu.
              </p>
            </div>

            {/* Field 1: Email Akun Google (Readonly with Terverifikasi Badge) */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                1. Email Akun Google <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={student.email || 'zeasheira24@gmail.com'}
                  disabled
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 cursor-not-allowed"
                />
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-emerald-600 text-xs font-extrabold gap-1.5">
                  <i className="fa-solid fa-lock text-[11px]"></i> Terverifikasi
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Otomatis terisi dari Google Login sekolah.
              </p>
            </div>

            {/* Field 2: Nama Lengkap */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                2. Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => {
                  setStudentName(e.target.value);
                  setValidationError('');
                }}
                placeholder="Contoh: Zea Sheira"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs"
              />
            </div>

            {/* Field 3: Kelas / Angkatan */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                3. Kelas / Angkatan <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={studentClass}
                  onChange={(e) => {
                    setStudentClass(e.target.value);
                    setValidationError('');
                  }}
                  className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800 appearance-none cursor-pointer shadow-2xs"
                >
                  {classes.length === 0 ? (
                    <option value="XI">XI (Default)</option>
                  ) : (
                    <>
                      <option value="">-- Pilih Kelas / Angkatan --</option>
                      {classes.map((cls) => (
                        <option key={cls.id} value={cls.name}>
                          {cls.name}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <span className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                  <i className="fa-solid fa-chevron-down text-xs"></i>
                </span>
              </div>
            </div>

            {/* Tombol Lanjut ke Bagian B (Sesuai PDF Page 4) */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:opacity-95 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Lanjut ke Bagian B (Minat)</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STEP 2: BAGIAN B - MINAT SISWA (PAGE 5) */}
        {/* ----------------------------------------------------------------------- */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-150">
                BAGIAN B
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                Minat Siswa
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Pilih bidang-bidang yang paling menarik minat dan passion kamu.
              </p>
            </div>

            {/* Soal 4: Checkbox Bidang Minat (Sesuai PDF Page 5) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                  4. Bidang apa yang paling kamu minati? <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-150">
                  Boleh pilih &gt; 1
                </span>
              </div>

              {/* Grid List Checkboxes (Sesuai Mockup PDF Page 5) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTEREST_OPTIONS.map((option) => {
                  const isChecked = selectedInterests.includes(option);
                  return (
                    <div
                      key={option}
                      onClick={() => handleToggleInterest(option)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50/90 text-blue-950 font-black shadow-xs ring-2 ring-blue-200/60'
                          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-700 font-bold'
                      }`}
                    >
                      {/* Custom Checkbox Box (Sesuai PDF Page 5) */}
                      <div
                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <i className="fa-solid fa-check text-[10px]"></i>}
                      </div>
                      <span className="text-xs sm:text-sm">{option}</span>
                    </div>
                  );
                })}
              </div>

              {/* Text input jika 'Lainnya' dipilih */}
              {selectedInterests.includes('Lainnya') && (
                <div className="pt-2 animate-in fade-in duration-150">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sebutkan bidang minat lainnya: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={otherInterestText}
                    onChange={(e) => {
                      setOtherInterestText(e.target.value);
                      setValidationError('');
                    }}
                    placeholder="Contoh: Robotika, Desain Game 3D, Panahan, dll."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800"
                  />
                </div>
              )}
            </div>

            {/* Soal 5: Bidang yang Paling Ingin Dikembangkan */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                5. Dari bidang yang kamu pilih, bidang mana yang paling ingin kamu kembangkan? <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={topInterestToDevelop}
                onChange={(e) => {
                  setTopInterestToDevelop(e.target.value);
                  setValidationError('');
                }}
                placeholder="Contoh: Pemrograman Digital, Pidato Bahasa Inggris, Seni Lukis Digital, dll."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs"
              />
            </div>

            {/* Navigation Buttons (Sesuai PDF Page 5) */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-3 px-5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-xs"></i>
                <span>Kembali</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="py-3.5 px-7 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:opacity-95 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-blue-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Lanjut ke Bagian C (Potensi & Kemampuan)</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        )}

        {/* ----------------------------------------------------------------------- */}
        {/* STEP 3: BAGIAN C - POTENSI & KEMAMPUAN (PAGE 6) */}
        {/* ----------------------------------------------------------------------- */}
        {currentStep === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-150">
                BAGIAN C
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                Potensi & Kemampuan
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                Jawab pertanyaan berikut untuk membantu kami memahami potensi dan kemampuanmu dengan lebih baik.
              </p>
            </div>

            {/* Soal 6: Kemampuan yang paling dikuasai (Sesuai PDF Page 6) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                  6. Menurut kamu, apa kemampuan yang paling kamu kuasai? <span className="text-rose-500">*</span>
                </label>
                <span className="text-[11px] text-blue-600 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-150">
                  Boleh pilih &gt; 1
                </span>
              </div>

              {/* Grid 2-Kolom Pilihan Kemampuan (Sesuai Mockup PDF Page 6) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ABILITY_OPTIONS.map((option) => {
                  const isChecked = selectedAbilities.includes(option);
                  return (
                    <div
                      key={option}
                      onClick={() => handleToggleAbility(option)}
                      className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 select-none ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50/90 text-blue-950 font-black shadow-xs ring-2 ring-blue-200/60'
                          : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50 text-slate-700 font-bold'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'border-blue-600 bg-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <i className="fa-solid fa-check text-[10px]"></i>}
                      </div>
                      <span className="text-xs sm:text-sm">{option}</span>
                    </div>
                  );
                })}
              </div>

              {/* Text input jika 'Lainnya' dipilih */}
              {selectedAbilities.includes('Lainnya') && (
                <div className="pt-2 animate-in fade-in duration-150">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sebutkan kemampuan lainnya: <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={otherAbilityText}
                    onChange={(e) => {
                      setOtherAbilityText(e.target.value);
                      setValidationError('');
                    }}
                    placeholder="Contoh: Bermain alat musik biola, Analisis data, dll."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800"
                  />
                </div>
              )}
            </div>

            {/* Soal 7: Hal yang ingin dicoba tapi belum memiliki kesempatan */}
            <div className="space-y-1.5 pt-3 border-t border-slate-100">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-800">
                7. Apa hal yang selama ini ingin kamu coba tetapi belum memiliki kesempatan? <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={untriedOpportunityWish}
                onChange={(e) => {
                  setUntriedOpportunityWish(e.target.value);
                  setValidationError('');
                }}
                placeholder="Ceritakan pengalaman, lomba, proyek tim, atau keahlian baru yang sangat ingin kamu coba..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-xs sm:text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 placeholder:text-slate-400 shadow-2xs"
              />
            </div>

            {/* Navigation & Submit Buttons (Sesuai Mockup PDF Page 6) */}
            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-3 px-5 rounded-2xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-left text-xs"></i>
                <span>Kembali</span>
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3.5 px-8 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:opacity-95 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl shadow-blue-500/30 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    <span>Menyimpan ke Firestore...</span>
                  </>
                ) : (
                  <>
                    <span>Simpan & Lihat Hasil</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
