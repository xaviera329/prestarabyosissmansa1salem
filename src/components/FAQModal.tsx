import React from 'react';

interface FAQModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FAQModal: React.FC<FAQModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Apa itu platform PRESTARA?',
      a: 'PRESTARA adalah aplikasi web interaktif untuk memetakan minat dan potensi terpendam siswa sekolah (Sains, Teknologi, Seni, Olahraga, Bahasa, atau Bisnis) lalu memberikan kurasi rekomendasi lomba eksternal tingkat daerah, nasional, dan internasional yang relevan.'
    },
    {
      q: 'Apakah saya wajib login dengan akun Google?',
      a: 'Login dengan akun Google memudahkan pencatatan nama dan verifikasi otomatis akun siswa. Namun kamu juga dapat mengisi langsung nama dan kelas jika ingin mencoba secara mandiri.'
    },
    {
      q: 'Berapa jumlah soal yang harus dikerjakan?',
      a: 'Survei terdiri dari 6 pertanyaan berbasis skenario nyata di kehidupan sekolah. Hanya membutuhkan waktu sekitar 2-3 menit untuk menyelesaikannya.'
    },
    {
      q: 'Bagaimana hasil minat dan bakat dihitung?',
      a: 'Setiap pilihan jawaban terhubung ke kategori talenta tertentu. Sistem secara otomatis menghitung kecenderungan jawaban paling dominan dan menampilkan rincian persentase setiap bidang minat.'
    },
    {
      q: 'Apakah lomba yang direkomendasikan resmi?',
      a: 'Ya, seluruh rekomendasi lomba eksternal berasal dari lembaga resmi dan prestisius seperti Kemendikbudristek (Puspresnas & BPTI), BRIN, Kemenag, perguruan tinggi negeri (UI, ITB), serta organisasi nasional terpercaya.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-lg font-bold">
              <i className="fa-solid fa-circle-question"></i>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">Bantuan & Tanya Jawab (FAQ)</h3>
              <p className="text-xs text-slate-500">Panduan lengkap mengenai survei minat & rekomendasi lomba</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-base"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          {faqs.map((f, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <h4 className="font-extrabold text-slate-800 text-sm mb-1.5 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] shrink-0 font-bold">
                  {i + 1}
                </span>
                <span>{f.q}</span>
              </h4>
              <p className="text-slate-600 leading-relaxed pl-7">{f.a}</p>
            </div>
          ))}

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900 flex items-start gap-3">
            <i className="fa-solid fa-headset text-blue-600 text-base mt-0.5"></i>
            <div>
              <p className="font-bold text-xs mb-0.5">Butuh bantuan lebih lanjut?</p>
              <p className="text-[11px] text-blue-700">
                Hubungi guru bimbingan konseling (BK) atau tim pembina prestasi sekolahmu untuk konsultasi pendaftaran lomba eksternal.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-100 flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
          >
            Tutup Bantuan
          </button>
        </div>
      </div>
    </div>
  );
};
