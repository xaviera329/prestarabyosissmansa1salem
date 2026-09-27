import React, { useState, useRef, useEffect } from 'react';
import { StudentProfile } from '../types';

interface NavbarProps {
  currentStudent: StudentProfile | null;
  isAdmin: boolean;
  onNavigate: (page: 'landing' | 'survey' | 'result' | 'admin') => void;
  onOpenAdminLogin: () => void;
  onOpenFAQ: () => void;
  onLogoutAdmin: () => void;
  onLogoutStudent: () => void;
  isRealFirebase?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStudent,
  isAdmin,
  onNavigate,
  onOpenAdminLogin,
  onOpenFAQ,
  onLogoutAdmin,
  onLogoutStudent
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo "P PRESTARA" */}
        <div
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            P
          </div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 text-lg sm:text-xl tracking-tight">
              PRESTARA
            </span>
            <span className="hidden xs:inline-block text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-150">
              SURVEI & LOMBA
            </span>
          </div>
        </div>

        {/* Right Action Items */}
        <div className="flex items-center gap-2.5">
          {/* Tombol Panduan Cepat (Desktop) */}
          <button
            type="button"
            onClick={onOpenFAQ}
            className="hidden sm:inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 shadow-2xs transition-all cursor-pointer"
          >
            <i className="fa-regular fa-circle-question text-blue-600 text-xs"></i>
            <span>Panduan Formulir</span>
          </button>

          {/* Student Profile Pill */}
          {currentStudent && currentStudent.name && (
            <div className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-800 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 shadow-2xs transition-colors">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-[11px] shrink-0 shadow-xs">
                {currentStudent.name.charAt(0).toUpperCase()}
              </div>
              <span className="max-w-[100px] sm:max-w-[140px] truncate">{currentStudent.name}</span>
              <button
                type="button"
                onClick={onLogoutStudent}
                title="Ganti Akun"
                className="text-slate-400 hover:text-rose-600 ml-0.5 cursor-pointer"
              >
                <i className="fa-solid fa-right-from-bracket text-[11px]"></i>
              </button>
            </div>
          )}

          {/* Admin Badge */}
          {isAdmin && (
            <div className="flex items-center gap-1.5 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-bold border border-purple-200 shadow-2xs">
              <i className="fa-solid fa-shield-halved text-purple-600 text-xs"></i>
              <span>Admin</span>
            </div>
          )}

          {/* Menu Titik Tiga (⋮) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
              title="Menu Opsi"
              aria-label="Menu Opsi"
            >
              <i className="fa-solid fa-ellipsis-vertical text-sm"></i>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-1.5 border-b border-slate-100">
                  <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Menu Pilihan
                  </p>
                </div>

                {/* Opsi 1: Login Administrator */}
                {!isAdmin ? (
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenAdminLogin();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 transition-colors font-bold cursor-pointer"
                  >
                    <i className="fa-solid fa-user-shield text-blue-600 text-xs w-4"></i>
                    <span>Login Administrator</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onNavigate('admin');
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-purple-50 hover:text-purple-700 flex items-center gap-2.5 transition-colors font-bold cursor-pointer"
                  >
                    <i className="fa-solid fa-chart-pie text-purple-600 text-xs w-4"></i>
                    <span>Dashboard Admin</span>
                  </button>
                )}

                {/* Opsi 2: Panduan Pengisian Formulir */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    onOpenFAQ();
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-700 flex items-center gap-2.5 transition-colors font-bold cursor-pointer"
                >
                  <i className="fa-regular fa-circle-question text-blue-600 text-xs w-4"></i>
                  <span>Panduan Pengisian Formulir</span>
                </button>

                {isAdmin && (
                  <>
                    <div className="my-1 border-t border-slate-100"></div>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        onLogoutAdmin();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-bold cursor-pointer"
                    >
                      <i className="fa-solid fa-right-from-bracket text-xs w-4"></i>
                      <span>Keluar Admin</span>
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
