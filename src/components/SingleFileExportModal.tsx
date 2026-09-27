import React, { useState } from 'react';
import { generateSingleFileHtml } from '../services/singleFileGenerator';
import { FirebaseAppConfig } from '../types';

interface SingleFileExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: FirebaseAppConfig;
}

export const SingleFileExportModal: React.FC<SingleFileExportModalProps> = ({
  isOpen,
  onClose,
  currentConfig
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlContent = generateSingleFileHtml(
    currentConfig.apiKey || 'AIzaSyCJSXOlblHemDBYIVBe0mCIj70p9tBerMk',
    currentConfig.projectId || 'reflected-framing-8ghtt',
    currentConfig.firestoreDatabaseId || 'ai-studio-talentpathai-715bce6b-4b85-4216-bcb4-ea348927e29f'
  );

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'survei-minat-bakat-lomba.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-base font-bold">
              <i className="fa-solid fa-code"></i>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-base">
                Kode 1 File Lengkap (Standalone HTML)
              </h3>
              <p className="text-[11px] text-slate-400">
                HTML + Tailwind CSS CDN + FontAwesome CDN + Firebase Modular SDK
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Info */}
        <div className="mb-3 p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl text-xs text-indigo-900 flex items-center justify-between gap-3">
          <span>
            File mandiri ini dapat langsung Anda buka di browser (klik 2x), diupload ke GitHub Pages,
            atau dihosting di Firebase Hosting tanpa setup build tool apapun!
          </span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopy}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <i className={copied ? 'fa-solid fa-check' : 'fa-solid fa-copy'}></i>
              <span>{copied ? 'Tersalin!' : 'Salin Semua'}</span>
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <i className="fa-solid fa-download"></i>
              <span>Unduh .HTML</span>
            </button>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="flex-1 min-h-[300px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 p-4 font-mono text-[11px] text-slate-200">
          <textarea
            readOnly
            value={htmlContent}
            className="w-full h-full bg-transparent resize-none focus:outline-none font-mono text-[11px] text-emerald-400 selection:bg-indigo-500"
          ></textarea>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
