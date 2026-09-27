import React, { useState, useEffect, useRef } from 'react';
import { ClassItem, StudentProfile } from '../types';

interface LandingHeroProps {
  currentStudent: StudentProfile | null;
  classes?: ClassItem[];
  onGoogleSignIn: () => Promise<void>;
  onStartSurvey: (name: string, studentClass: string) => void;
  isLoadingAuth: boolean;
  onOpenAdminLogin: () => void;
  onOpenFAQ: () => void;
  onOpenFirebaseConfig?: () => void;
  onOpenExportModal?: () => void;
  onLogoutStudent?: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  currentStudent,
  classes = [],
  onGoogleSignIn,
  onStartSurvey,
  isLoadingAuth,
  onOpenAdminLogin,
  onOpenFAQ,
  onLogoutStudent
}) => {
  const [name, setName] = useState(currentStudent?.name || '');
  const [studentClass, setStudentClass] = useState(currentStudent?.studentClass || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Sync name & class whenever currentStudent changes
  useEffect(() => {
    if (currentStudent) {
      if (currentStudent.name) setName(currentStudent.name);
      if (currentStudent.studentClass) setStudentClass(currentStudent.studentClass);
    } else {
      setName('');
      setStudentClass('');
    }
  }, [currentStudent]);

  // Close dropdown menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGoogleClick = async () => {
    setErrorMessage('');
    try {
      await onGoogleSignIn();
    } catch (e: any) {
      setErrorMessage(e?.message || 'Login dengan Google gagal. Silakan coba lagi.');
    }
  };

  const handleStartSurveyClick = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = name.trim() || currentStudent?.name?.trim() || '';
    if (!finalName) {
      setErrorMessage('Harap lengkapi nama siswa terlebih dahulu.');
      return;
    }
    if (!studentClass.trim()) {
      setErrorMessage('Harap pilih Kelas / Angkatan kamu.');
      return;
    }
    setErrorMessage('');
    onStartSurvey(finalName, studentClass.trim());
  };

  const isGoogleLoggedIn = Boolean(currentStudent && (currentStudent.email || currentStudent.name));

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] bg-gradient-to-b from-[#0b54cb] via-[#106de8] to-[#009de9] text-white flex flex-col justify-between p-4 sm:p-8 lg:p-10 overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* 3D FLOATING CREATIVE ICONS & AMBIENT GLOW (POSISI DI PERIMETER TEPI) */}
      {/* ========================================================================= */}
      {/* Glowing orbs */}
      <div className="absolute top-12 left-1/4 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Floating 3D Creative Icons */}
      {/* Lightbulb (Kiri Atas) */}
      <div className="absolute top-28 left-4 sm:left-10 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400/20 backdrop-blur-md border border-amber-300/40 flex items-center justify-center text-amber-300 text-2xl sm:text-3xl shadow-lg animate-bounce duration-1000 pointer-events-none">
        <i className="fa-solid fa-lightbulb"></i>
      </div>

      {/* Planet / Orbit (Kiri Tengah - Sedikit digeser ke atas agar tidak menimpa teks) */}
      <div className="absolute top-36 sm:top-40 left-8 sm:left-14 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400/20 backdrop-blur-md border border-cyan-200/40 flex items-center justify-center text-cyan-200 text-xl shadow-md pointer-events-none">
        <i className="fa-solid fa-globe"></i>
      </div>

      {/* Rocket (Kiri Bawah) */}
      <div className="absolute bottom-32 left-4 sm:left-16 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-rose-400 text-2xl sm:text-3xl shadow-xl transform -rotate-12 pointer-events-none">
        <i className="fa-solid fa-rocket"></i>
      </div>

      {/* Paper Airplane (Kanan Atas) */}
      <div className="absolute top-24 right-6 sm:right-16 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-300/20 backdrop-blur-md border border-amber-200/40 flex items-center justify-center text-amber-300 text-2xl shadow-lg transform rotate-12 pointer-events-none">
        <i className="fa-solid fa-paper-plane"></i>
      </div>

      {/* Flask Lab (Kanan Tengah) */}
      <div className="absolute top-48 right-10 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-emerald-400/20 backdrop-blur-md border border-emerald-200/40 flex items-center justify-center text-emerald-300 text-xl shadow-md pointer-events-none">
        <i className="fa-solid fa-flask"></i>
      </div>

      {/* Pencil & Palette (Kanan Bawah) */}
      <div className="absolute bottom-28 right-4 sm:right-16 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400/20 backdrop-blur-md border border-amber-300/40 flex items-center justify-center text-amber-300 text-2xl shadow-xl transform rotate-6 pointer-events-none">
        <i className="fa-solid fa-pencil"></i>
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP BAR: LOGO & MENU NAVIGASI (CLEAN 'P PRESTARA') */}
      {/* ========================================================================= */}
      <header className="relative z-20 max-w-5xl mx-auto w-full flex items-center justify-between">
        {/* Brand Logo "P PRESTARA" */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-500 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-blue-900/40 border border-white/30">
            P
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-white drop-shadow-sm">
            PRESTARA
          </span>
        </div>

        {/* Action Buttons: FAQ & More Menu */}
        <div className="flex items-center gap-2">
          {/* Tombol Bantuan / FAQ */}
          <button
            type="button"
            onClick={onOpenFAQ}
            className="py-2 px-3.5 rounded-full bg-white/20 hover:bg-white/30 text-white font-bold text-xs border border-white/30 backdrop-blur-md shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <i className="fa-regular fa-circle-question text-cyan-200 text-xs"></i>
            <span className="hidden sm:inline">Bantuan</span>
            <span className="sm:hidden">FAQ</span>
          </button>

          {/* Menu Titik Tiga (⋮) */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-xs font-bold border border-white/30 backdrop-blur-md shadow-xs transition-all cursor-pointer active:scale-95"
              title="Menu Opsi"
              aria-label="Menu Titik Tiga"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>

            {/* Dropdown Menu */}
            {moreMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 text-slate-800 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                {/* Opsi 1: Login Administrator */}
                <button
                  type="button"
                  onClick={() => {
                    setMoreMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-blue-50 text-xs font-bold text-slate-700 hover:text-blue-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-user-shield text-blue-600 text-xs w-4"></i>
                  <span>Login Administrator</span>
                </button>

                {/* Opsi 2: Panduan Pengisian Formulir */}
                <button
                  type="button"
                  onClick={() => {
                    setMoreMenuOpen(false);
                    onOpenFAQ();
                  }}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-blue-50 text-xs font-bold text-slate-700 hover:text-blue-700 flex items-center gap-2.5 transition-colors cursor-pointer"
                >
                  <i className="fa-regular fa-circle-question text-blue-600 text-xs w-4"></i>
                  <span>Panduan Pengisian Formulir</span>
                </button>

                {isGoogleLoggedIn && onLogoutStudent && (
                  <>
                    <div className="my-1 border-t border-slate-100"></div>
                    <button
                      type="button"
                      onClick={() => {
                        setMoreMenuOpen(false);
                        onLogoutStudent();
                      }}
                      className="w-full text-left px-3.5 py-2.5 rounded-xl hover:bg-rose-50 text-xs font-bold text-rose-600 flex items-center gap-2.5 transition-colors cursor-pointer"
                    >
                      <i className="fa-solid fa-right-from-bracket text-rose-500 text-xs w-4"></i>
                      <span>Ganti Akun / Keluar</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN CENTER CONTENT: JUDUL, DESKRIPSI & GOOGLE SIGN-IN / KELAS */}
      {/* ========================================================================= */}
      <main className="relative z-20 max-w-2xl mx-auto text-center my-auto py-6 sm:py-10 flex flex-col items-center w-full px-2">
        
        {/* Judul Utama */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight drop-shadow-md">
          Survei Minat dan Potensi
        </h1>

        {/* Subjudul / Deskripsi */}
        <p className="text-white/95 text-xs sm:text-sm md:text-base max-w-lg mx-auto text-center mt-3 mb-6 font-medium leading-relaxed drop-shadow-xs">
          Isi survei untuk mencari minat dan potensimu dan temukan kompetisi yang sesuai denganmu
        </p>

        {/* Error notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-500/90 backdrop-blur-md text-white border border-rose-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <i className="fa-solid fa-circle-exclamation text-sm"></i>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. TOMBOL GOOGLE AUTH UTAMA / KARTU PILIH KELAS */}
        {/* ========================================================================= */}
        {!isGoogleLoggedIn ? (
          <div className="w-full max-w-md space-y-3.5">
            {/* Tombol Putih Bersih Google Login Prominen */}
            <button
              type="button"
              onClick={handleGoogleClick}
              disabled={isLoadingAuth}
              className="w-full h-14 sm:h-15 px-6 bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base sm:text-lg rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-955/30 flex items-center justify-center gap-3.5 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              {/* Google G Multi-Color SVG Icon */}
              <div className="w-6 h-6 shrink-0 flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24">
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
              <span>
                {isLoadingAuth ? 'Menghubungkan...' : 'Masuk dengan Google'}
              </span>
            </button>

            {/* Captions Ringkas */}
            <div className="space-y-1.5 pt-1 text-center">
              <p className="text-white/90 text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5">
                <i className="fa-solid fa-graduation-cap text-cyan-200"></i>
                <span>Gunakan akun Google sekolah untuk memulai.</span>
              </p>
              <p className="text-white/80 text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1.5">
                <i className="fa-solid fa-shield-halved text-amber-300"></i>
                <span>Data survei tersimpan aman di database admin.</span>
              </p>
            </div>
          </div>
        ) : (
          /* KONDISI 2: SUDAH LOGIN GOOGLE (PILIH KELAS & MULAI SURVEI) */
          <div className="w-full max-w-md bg-white text-slate-800 p-5 sm:p-6 rounded-3xl shadow-2xl border border-white/80 text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3 overflow-hidden">
                {currentStudent?.photoURL ? (
                  <img
                    src={currentStudent.photoURL}
                    alt={currentStudent.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-400 shrink-0 shadow-2xs"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm shrink-0">
                    {currentStudent?.name ? currentStudent.name.charAt(0).toUpperCase() : 'S'}
                  </div>
                )}
                <div className="overflow-hidden">
                  <div className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                    {currentStudent?.name || 'Siswa'}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {currentStudent?.email || 'Google User'}
                  </div>
                </div>
              </div>

              {onLogoutStudent && (
                <button
                  type="button"
                  onClick={onLogoutStudent}
                  className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                >
                  Ganti Akun
                </button>
              )}
            </div>

            <form onSubmit={handleStartSurveyClick} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nama Lengkap Siswa <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrorMessage('');
                  }}
                  placeholder="Nama Lengkap Siswa"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Pilih Kelas / Angkatan <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={studentClass}
                    onChange={(e) => {
                      setStudentClass(e.target.value);
                      setErrorMessage('');
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white text-slate-800 appearance-none cursor-pointer"
                  >
                    {classes.length === 0 ? (
                      <option value="" disabled>
                        -- Belum ada kelas (Hubungi Admin) --
                      </option>
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
                  <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 hover:opacity-95 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 mt-2"
              >
                <span>Mulai Isi Survei</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. BOTTOM FOOTER COPYRIGHT & CREDITS OSIS */}
      {/* ========================================================================= */}
      <footer className="relative z-20 max-w-5xl mx-auto w-full text-center py-3 border-t border-white/15 space-y-0.5">
        <p className="text-[11px] text-white/80 font-medium">
          © {new Date().getFullYear()} <strong>PRESTARA</strong> — Survei Minat dan Potensi Siswa
        </p>
        <p className="text-[10.5px] text-cyan-200/90 font-medium tracking-wide">
          By @osissman1salem
        </p>
      </footer>
    </div>
  );
};
