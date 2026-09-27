/**
 * Generates the complete, standalone single-file HTML app
 * containing Tailwind CSS CDN, FontAwesome CDN, Firebase modular JS SDK,
 * and all interactive logic.
 */
export function generateSingleFileHtml(
  customApiKey = "AIzaSyCJSXOlblHemDBYIVBe0mCIj70p9tBerMk",
  customProjectId = "reflected-framing-8ghtt",
  customFirestoreDatabaseId = "ai-studio-talentpathai-715bce6b-4b85-4216-bcb4-ea348927e29f"
): string {
  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Survei Minat, Bakat & Rekomendasi Lomba Eksternal</title>
  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- FontAwesome 6 CDN -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
  <!-- Canvas Confetti CDN -->
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"></script>
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; }
    .glass-card {
      background: rgba(255, 255, 255, 0.88);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
  </style>
</head>
<body class="bg-gradient-to-br from-blue-50 via-indigo-50/40 to-amber-50/40 min-h-screen text-slate-800 antialiased selection:bg-indigo-500 selection:text-white">

  <!-- NAVBAR -->
  <header class="sticky top-0 z-40 glass-card border-b border-indigo-100/60 shadow-xs">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3 cursor-pointer" onclick="navigateTo('landing')">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-blue-200">
          P
        </div>
        <div>
          <h1 class="font-extrabold text-slate-800 text-lg sm:text-xl tracking-tight leading-none">PRESTARA</h1>
          <p class="text-[11px] font-medium text-slate-500">Survei Minat & Potensi Siswa</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div id="userBadge" class="hidden items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-indigo-100">
          <span id="userNameBadge">Siswa</span>
          <button onclick="handleLogoutStudent()" title="Ganti Siswa" class="text-slate-400 hover:text-rose-500 ml-1">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>

        <div id="adminBadge" class="hidden items-center gap-2 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-purple-100">
          <i class="fa-solid fa-shield-halved"></i>
          <span>Admin Aktif</span>
          <button onclick="handleLogoutAdmin()" title="Logout Admin" class="text-slate-400 hover:text-rose-500 ml-1">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Menu Titik Tiga (⋮) -->
        <div class="relative">
          <button id="dotsMenuBtn" onclick="toggleDotsMenu()" class="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors focus:outline-none">
            <i class="fa-solid fa-ellipsis-vertical text-lg"></i>
          </button>
          
          <div id="dotsDropdown" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50">
            <button onclick="openAdminModal(); toggleDotsMenu(false);" class="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-3">
              <i class="fa-solid fa-user-gear text-indigo-500 w-4"></i>
              <span>Login Khusus Admin</span>
            </button>
            <button onclick="navigateTo('admin'); toggleDotsMenu(false);" class="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-600 flex items-center gap-3">
              <i class="fa-solid fa-chart-pie text-purple-500 w-4"></i>
              <span>Dashboard Admin</span>
            </button>
            <div class="my-1 border-t border-slate-100"></div>
            <button onclick="openConfigModal(); toggleDotsMenu(false);" class="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-3">
              <i class="fa-solid fa-gear text-amber-500 w-4"></i>
              <span>Cek Konfigurasi Firebase</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- MAIN CONTAINER -->
  <main class="max-w-4xl mx-auto px-4 sm:px-6 py-8">

    <!-- ================= HALAMAN 1: LANDING & LOGIN (SPLIT HERO RUANGGURU STYLE) ================= -->
    <section id="sectionLanding" class="space-y-8">
      <div class="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-500 text-white rounded-3xl shadow-2xl shadow-blue-600/25">
        <!-- Glow accents -->
        <div class="absolute -top-24 -left-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none"></div>
        <div class="absolute top-1/3 -right-20 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl pointer-events-none"></div>

        <!-- HERO HEADER (Logo & Navigation buttons) -->
        <div class="relative z-20 px-5 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-md shadow-blue-900/30">
              <i class="fa-solid fa-graduation-cap text-lg"></i>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-extrabold text-xl sm:text-2xl tracking-tight text-white drop-shadow-xs">BakatKu</span>
              <span class="text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                SURVEI & LOMBA EKSTERNAL
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2 sm:gap-2.5">
            <button type="button" onclick="openFAQModal()" class="py-2 px-3.5 sm:px-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
              <i class="fa-regular fa-circle-question text-blue-600 text-xs"></i>
              <span>Bantuan / FAQ</span>
            </button>
            <button type="button" onclick="toggleDotsMenu()" class="w-9 h-9 rounded-full bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center text-sm font-bold shadow-md transition-all cursor-pointer" title="Menu Login Admin">
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
        </div>

        <!-- 2-COLUMN SPLIT HERO BODY -->
        <div class="relative z-10 px-5 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <!-- KISI KIRI: JUDUL & ILUSTRASI -->
            <div class="lg:col-span-7 space-y-6 text-left">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] text-white">
                Temukan Minat, Bakat & Lomba Eksternal Terbaikmu!
              </h1>
              <p class="text-white/95 text-sm sm:text-base leading-relaxed max-w-xl font-normal">
                Jawab pertanyaan interaktif untuk mengetahui potensi terbaikmu di bidang Sains, Teknologi, Seni, Olahraga, Bahasa, atau Bisnis, lalu dapatkan rekomendasi lomba eksternal yang cocok!
              </p>

              <!-- Pill Badges -->
              <div class="flex flex-wrap gap-2 text-xs font-bold">
                <span class="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 flex items-center gap-2 text-white">
                  <i class="fa-solid fa-flask text-emerald-300"></i> Sains & Penelitian
                </span>
                <span class="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 flex items-center gap-2 text-white">
                  <i class="fa-solid fa-laptop-code text-cyan-200"></i> Teknologi & IT
                </span>
                <span class="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 flex items-center gap-2 text-white">
                  <i class="fa-solid fa-palette text-pink-300"></i> Seni & Desain
                </span>
                <span class="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 flex items-center gap-2 text-white">
                  <i class="fa-solid fa-person-running text-amber-300"></i> Olahraga & Atletik
                </span>
                <span class="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 flex items-center gap-2 text-white">
                  <i class="fa-solid fa-microphone-lines text-sky-200"></i> Bahasa & Literasi
                </span>
                <span class="bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/25 flex items-center gap-2 text-white">
                  <i class="fa-solid fa-briefcase text-purple-300"></i> Bisnis & Inovasi
                </span>
              </div>

              <!-- Education Banner Illustration -->
              <div class="pt-2 sm:pt-4 max-w-lg">
                <div class="rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 bg-blue-600/40 backdrop-blur-xs p-6 flex items-center gap-5">
                  <div class="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-amber-300 text-3xl shrink-0 shadow-inner">
                    <i class="fa-solid fa-award"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-2 mb-1">
                      <span class="px-2 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase">Kurasi Nasional</span>
                      <span class="text-xs text-blue-100 font-bold">Puspresnas, BPTI & BRIN</span>
                    </div>
                    <p class="text-xs text-white/90 leading-snug">
                      Dapatkan rekomendasi kompetisi terverifikasi sesuai profil minat dominanmu beserta sertifikat & peluang beasiswa.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- KISI KANAN: KARTU LOGIN MENGAMBANG -->
            <div class="lg:col-span-5 flex justify-center lg:justify-end">
              <div class="bg-white text-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-w-md w-full">
                <div class="text-center mb-5">
                  <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                    Yuk, Isi Survei & Temukan Rekomendasi Lomba!
                  </h2>
                  <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    Masuk dengan akun siswa kamu
                  </p>
                </div>

                <!-- Google Sign In Button -->
                <div class="space-y-4">
                  <button type="button" onclick="handleGoogleSignIn()" class="w-full py-1.5 pl-1.5 pr-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold rounded-2xl shadow-md transition-all flex items-center justify-between gap-3 cursor-pointer">
                    <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs">
                      <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" class="w-5 h-5" alt="Logo Google" />
                    </div>
                    <span class="text-sm sm:text-base flex-1 text-center font-bold tracking-wide">
                      Masuk dengan Google
                    </span>
                    <div class="w-4"></div>
                  </button>

                  <div class="relative flex items-center justify-center my-3">
                    <div class="border-t border-slate-200 w-full"></div>
                    <span class="bg-white px-3 text-xs text-slate-400 font-semibold uppercase tracking-wider shrink-0">atau</span>
                    <div class="border-t border-slate-200 w-full"></div>
                  </div>

                  <!-- Form Input: Nama Lengkap & Pilihan Kelas -->
                  <div class="space-y-3.5">
                    <div>
                      <input id="inputStudentName" type="text" placeholder="Nama Lengkap" class="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400" />
                    </div>

                    <div class="relative">
                      <select id="selectStudentClass" class="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 appearance-none cursor-pointer placeholder:text-slate-400">
                        <option value="">Pilihan Kelas/Angkatan</option>
                        <option value="X MIPA 1">X MIPA 1</option>
                        <option value="X MIPA 2">X MIPA 2</option>
                        <option value="X IPS 1">X IPS 1</option>
                        <option value="X IPS 2">X IPS 2</option>
                        <option value="XI MIPA 1">XI MIPA 1</option>
                        <option value="XI MIPA 2">XI MIPA 2</option>
                        <option value="XI IPS 1">XI IPS 1</option>
                        <option value="XI RPL 1">XI RPL 1</option>
                        <option value="XII MIPA 1">XII MIPA 1</option>
                        <option value="XII MIPA 3">XII MIPA 3</option>
                        <option value="XII IPS 1">XII IPS 1</option>
                      </select>
                      <span class="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                        <i class="fa-solid fa-chevron-down text-xs"></i>
                      </span>
                    </div>

                    <button type="button" onclick="handleStartSurvey()" class="w-full py-3.5 px-6 bg-gradient-to-r from-[#FF6B00] via-[#FF7A00] to-[#0066FF] hover:opacity-95 text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg shadow-orange-500/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2">
                      <span>Mulai Survei Sekarang</span>
                      <i class="fa-solid fa-arrow-right text-sm"></i>
                    </button>
                  </div>

                  <p class="text-[11px] text-slate-400 text-center pt-1 font-medium">
                    🔒 Data survei aman dan tersimpan di database resmi sekolah.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Wave decoration -->
        <div class="relative w-full overflow-hidden leading-none z-10 -mb-1">
          <svg class="relative block w-full h-8 sm:h-14 lg:h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,152.47,133.5,221,114.73,256.4,105,290.89,84.14,321.39,56.44Z" class="fill-slate-50"></path>
          </svg>
        </div>
      </div>
    </section>

    <!-- ================= HALAMAN 2: SURVEI INTERAKTIF ================= -->
    <section id="sectionSurvey" class="hidden space-y-6">
      <!-- Card Profil Pengguna (Firebase Google Auth) -->
      <div class="glass-card rounded-3xl p-5 sm:p-6 border border-indigo-100/80 shadow-lg">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5 sm:gap-4">
            <div class="relative shrink-0">
              <div id="surveyUserAvatar" class="w-13 h-13 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                S
              </div>
              <div class="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-100" title="Akun Google Terautentikasi">
                <i class="fa-brands fa-google text-[10px] text-red-500"></i>
              </div>
            </div>

            <div class="space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h3 id="surveyUserName" class="font-extrabold text-slate-800 text-base sm:text-lg leading-tight">Nama Siswa</h3>
                <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200 inline-flex items-center gap-1 shadow-2xs">
                  <i class="fa-solid fa-circle-check text-[9px] text-emerald-600"></i> Google Auth
                </span>
              </div>

              <!-- Email Pengguna -->
              <p class="text-xs text-slate-500 font-medium flex items-center gap-1.5">
                <i class="fa-regular fa-envelope text-slate-400"></i>
                <span>Anda masuk sebagai:</span>
                <span id="surveyUserEmail" class="text-slate-700 font-bold break-all">siswa@gmail.com</span>
              </p>

              <!-- Status Kelas & Toggle Ubah Kelas -->
              <div class="flex items-center gap-2 pt-0.5">
                <span class="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Kelas:</span>
                <span id="surveyUserClassBadge" class="px-2.5 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-extrabold border border-indigo-150">
                  X MIPA 1
                </span>
                <button type="button" onclick="toggleSurveyClassSelector()" class="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer flex items-center gap-1">
                  <i class="fa-solid fa-pen-to-square text-[10px]"></i>
                  <span id="surveyToggleClassText">Ubah Kelas</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Tombol Ganti Akun / Logout -->
          <div class="flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <button type="button" onclick="handleLogoutStudent()" class="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100 text-rose-700 font-extrabold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-sm" title="Keluar dari akun Google dan masuk dengan akun lain">
              <i class="fa-solid fa-right-from-bracket"></i>
              <span>Ganti Akun / Logout</span>
            </button>
          </div>
        </div>

        <!-- Selector Radio Button Pilihan Kelas -->
        <div id="surveyClassSelector" class="hidden mt-5 pt-4 border-t border-slate-150">
          <div class="flex items-center justify-between mb-3">
            <label class="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <i class="fa-solid fa-id-card text-indigo-600"></i>
              <span>Pilih Kelas / Angkatan Kamu (Radio Button):</span>
            </label>
            <span class="text-[11px] text-slate-400">Pilih salah satu kelas</span>
          </div>
          <div id="surveyClassRadioContainer" class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-56 overflow-y-auto pr-1">
            <!-- Dynamic class radio cards -->
          </div>
        </div>
      </div>

      <!-- Progress Bar & Header Wizard -->
      <div class="glass-card rounded-2xl p-5 border border-indigo-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <button onclick="handleExitSurvey()" class="w-9 h-9 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors" title="Kembali ke Beranda">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <div>
            <h3 class="text-sm font-bold text-slate-800" id="surveyProgressText">Pertanyaan 1 dari 6</h3>
            <p class="text-xs text-slate-500" id="surveyStudentInfo">Siswa: -</p>
          </div>
        </div>

        <div class="w-full sm:w-64">
          <div class="flex justify-between text-xs font-semibold text-slate-600 mb-1.5">
            <span>Progres</span>
            <span id="surveyPercentText">16%</span>
          </div>
          <div class="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
            <div id="surveyProgressBar" class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full transition-all duration-300" style="width: 16%"></div>
          </div>
        </div>
      </div>

      <!-- Question Card Interaktif -->
      <div class="glass-card rounded-3xl p-6 sm:p-10 border border-indigo-100 shadow-xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3 border border-indigo-100">
          <i class="fa-solid fa-circle-question"></i>
          <span id="questionStepBadge">Pertanyaan 1</span>
        </div>

        <h3 id="currentQuestionTitle" class="text-lg sm:text-2xl font-bold text-slate-800 leading-snug mb-6">
          Memuat pertanyaan...
        </h3>

        <!-- Options Container -->
        <div id="questionOptionsContainer" class="space-y-3">
          <!-- Dynamic options rendered here -->
        </div>

        <!-- Wizard Nav Buttons -->
        <div class="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          <button id="btnPrevQuestion" onclick="prevQuestion()" class="py-2.5 px-5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 font-semibold text-sm transition-all flex items-center gap-2 disabled:opacity-40 disabled:pointer-events-none">
            <i class="fa-solid fa-chevron-left text-xs"></i>
            <span>Sebelumnya</span>
          </button>

          <button id="btnNextQuestion" onclick="nextQuestion()" class="py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer">
            <span id="btnNextText">Selanjutnya</span>
            <i class="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- ================= HALAMAN HASIL: REKOMENDASI LOMBA ================= -->
    <section id="sectionResult" class="hidden space-y-8">
      <!-- Header Hasil Minat -->
      <div id="resultHeroCard" class="relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white shadow-2xl transition-all">
        <div class="relative z-10 flex flex-col md:flex-row items-center gap-6">
          <div id="resultCategoryIconBox" class="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl shadow-inner border border-white/30 shrink-0">
            <i class="fa-solid fa-award text-amber-300"></i>
          </div>
          <div class="text-center md:text-left">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-2 border border-white/20">
              <i class="fa-solid fa-crown text-amber-300"></i>
              <span id="resultBadgeText">Kategori Terunggul</span>
            </div>
            <h2 id="resultCategoryName" class="text-2xl sm:text-4xl font-extrabold tracking-tight mb-2">
              Sains & Penelitian Alam
            </h2>
            <p id="resultStudentGreetings" class="text-white/90 text-sm font-medium">
              Hasil analisis potensi untuk: Muhammad Farhan (XI MIPA 1)
            </p>
          </div>
        </div>
      </div>

      <!-- Penjelasan Karakteristik & Kekuatan -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-lg">
          <h4 class="font-bold text-slate-800 text-lg flex items-center gap-2 mb-3">
            <i class="fa-solid fa-lightbulb text-amber-500"></i>
            <span>Profil Minat & Bakatmu</span>
          </h4>
          <p id="resultCategoryDescription" class="text-sm text-slate-600 leading-relaxed">
            Deskripsi profil bakat...
          </p>

          <div class="mt-4 pt-4 border-t border-slate-100">
            <h5 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Kekuatan Kunci:</h5>
            <ul id="resultStrengthsList" class="space-y-1.5 text-xs text-slate-600">
              <!-- Strengths list -->
            </ul>
          </div>
        </div>

        <!-- Breakdown Skor Kategori -->
        <div class="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-lg">
          <h4 class="font-bold text-slate-800 text-lg flex items-center gap-2 mb-3">
            <i class="fa-solid fa-chart-column text-indigo-500"></i>
            <span>Distribusi Skor Minat</span>
          </h4>
          <div id="resultScoresBreakdown" class="space-y-3">
            <!-- Dynamic score bars -->
          </div>
        </div>
      </div>

      <!-- Rekomendasi Lomba Eksternal -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-xl sm:text-2xl font-extrabold text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-trophy text-amber-500"></i>
              <span>Rekomendasi Lomba Eksternal Terbaik</span>
            </h3>
            <p class="text-xs sm:text-sm text-slate-500">Ajang kompetisi yang paling sesuai untuk mengasah dan membuktikan potensimu!</p>
          </div>
        </div>

        <div id="competitionsList" class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Competitions rendered here -->
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button onclick="window.print()" class="py-3 px-6 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold rounded-2xl shadow-sm hover:shadow text-sm flex items-center gap-2">
          <i class="fa-solid fa-print"></i>
          <span>Cetak Bukti Hasil Survei</span>
        </button>
        <button onclick="retakeSurvey()" class="py-3 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl text-sm flex items-center gap-2">
          <i class="fa-solid fa-rotate-left"></i>
          <span>Ulangi Survei Siswa</span>
        </button>
      </div>
    </section>

    <!-- ================= HALAMAN 3: DASHBOARD ADMIN ================= -->
    <section id="sectionAdmin" class="hidden space-y-6">
      <div class="glass-card rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold uppercase tracking-wider mb-1">
            <i class="fa-solid fa-shield-halved"></i>
            <span>Portal Administrator Sekolah</span>
          </div>
          <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-800">Dashboard Hasil & Kelola Survei</h2>
          <p class="text-xs sm:text-sm text-slate-500">Rekapitulasi data minat siswa dan manajemen bank soal pertanyaan survei.</p>
        </div>

        <div class="flex items-center gap-2">
          <button onclick="handleLogoutAdmin()" class="py-2.5 px-4 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl transition-colors flex items-center gap-2">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Keluar Admin</span>
          </button>
        </div>
      </div>

      <!-- TAB NAVIGATION -->
      <div class="flex border-b border-slate-200">
        <button id="adminTab1Btn" onclick="switchAdminTab(1)" class="py-3 px-6 text-sm font-bold border-b-2 border-purple-600 text-purple-700 flex items-center gap-2">
          <i class="fa-solid fa-table-list"></i>
          <span>Hasil Survei & Rekap Siswa</span>
        </button>
        <button id="adminTab2Btn" onclick="switchAdminTab(2)" class="py-3 px-6 text-sm font-semibold border-b-2 border-transparent text-slate-500 hover:text-slate-700 flex items-center gap-2">
          <i class="fa-solid fa-clipboard-question"></i>
          <span>Kelola & Buat Pertanyaan</span>
        </button>
      </div>

      <!-- ADMIN TAB 1: HASIL SURVEI -->
      <div id="adminTab1Content" class="space-y-6">
        <!-- Statistik Singkat Cards -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div class="glass-card rounded-2xl p-4 border border-indigo-100 shadow-sm">
            <span class="text-xs font-semibold text-slate-500">Total Siswa</span>
            <div id="statTotalStudents" class="text-2xl font-extrabold text-indigo-600 mt-1">0</div>
          </div>
          <div class="glass-card rounded-2xl p-4 border border-purple-100 shadow-sm">
            <span class="text-xs font-semibold text-slate-500">Kategori Terfavorit</span>
            <div id="statTopCategory" class="text-lg font-bold text-purple-600 mt-1 truncate">-</div>
          </div>
          <div class="glass-card rounded-2xl p-4 border border-emerald-100 shadow-sm">
            <span class="text-xs font-semibold text-slate-500">Total Pertanyaan</span>
            <div id="statTotalQuestions" class="text-2xl font-extrabold text-emerald-600 mt-1">6</div>
          </div>
          <div class="glass-card rounded-2xl p-4 border border-amber-100 shadow-sm">
            <span class="text-xs font-semibold text-slate-500">Kelas Paling Aktif</span>
            <div id="statTopClass" class="text-lg font-bold text-amber-600 mt-1 truncate">-</div>
          </div>
        </div>

        <!-- Filter & Search Bar -->
        <div class="glass-card rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-3 w-full sm:w-auto">
            <label class="text-xs font-bold text-slate-600 uppercase">Filter Kelas:</label>
            <select id="adminFilterClass" onchange="renderAdminResponsesTable()" class="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Semua Kelas</option>
              <option value="X MIPA 1">X MIPA 1</option>
              <option value="X MIPA 2">X MIPA 2</option>
              <option value="X IPS 1">X IPS 1</option>
              <option value="X IPS 2">X IPS 2</option>
              <option value="XI MIPA 1">XI MIPA 1</option>
              <option value="XI RPL 1">XI RPL 1</option>
              <option value="XI IPS 1">XI IPS 1</option>
              <option value="XII MIPA 1">XII MIPA 1</option>
              <option value="XII MIPA 3">XII MIPA 3</option>
            </select>
          </div>

          <div class="relative w-full sm:w-64">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <i class="fa-solid fa-magnifying-glass text-xs"></i>
            </span>
            <input id="adminSearchInput" oninput="renderAdminResponsesTable()" type="text" placeholder="Cari nama siswa..." class="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
        </div>

        <!-- Responses Table / Cards -->
        <div class="glass-card rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-100/80 text-slate-600 uppercase font-bold tracking-wider border-b border-slate-200">
                <tr>
                  <th class="px-5 py-3.5">Nama Siswa</th>
                  <th class="px-4 py-3.5">Kelas</th>
                  <th class="px-4 py-3.5">Minat Dominan</th>
                  <th class="px-4 py-3.5">Waktu Pengisian</th>
                  <th class="px-4 py-3.5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody id="adminResponsesTableBody" class="divide-y divide-slate-100">
                <!-- Dynamic rows -->
              </tbody>
            </table>
          </div>
          <div id="adminEmptyResponses" class="hidden py-14 px-6 text-center text-slate-400">
            <div class="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-2xl">
              <i class="fa-solid fa-inbox"></i>
            </div>
            <p class="text-sm font-bold text-slate-600 mb-1">Belum ada data survei yang masuk</p>
            <p class="text-xs text-slate-400 max-w-sm mx-auto">Data akan muncul secara real-time langsung dari Firebase Firestore setelah siswa menyelesaikan survei.</p>
          </div>
        </div>
      </div>

      <!-- ADMIN TAB 2: KELOLA PERTANYAAN -->
      <div id="adminTab2Content" class="hidden space-y-6">
        <!-- Form Tambah Pertanyaan Baru -->
        <div class="glass-card rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl">
          <h3 class="text-lg font-bold text-slate-800 flex items-center gap-2 mb-4">
            <i class="fa-solid fa-plus-circle text-purple-600"></i>
            <span>Buat Pertanyaan Survei Baru</span>
          </h3>

          <div class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Teks Pertanyaan (Situasi / Skenario)</label>
              <textarea id="newQuestionText" rows="2" placeholder="Contoh: Ketika kamu diajak mengikuti workshop gratis, topik mana yang paling menarik perhatianmu?" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium"></textarea>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div>
                <label class="font-bold text-emerald-700 flex items-center gap-1.5 mb-1"><i class="fa-solid fa-flask"></i> Pilihan Sains:</label>
                <input id="optSains" type="text" placeholder="Pilihan respons bertema eksperimen sains..." class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none" />
              </div>
              <div>
                <label class="font-bold text-blue-700 flex items-center gap-1.5 mb-1"><i class="fa-solid fa-laptop-code"></i> Pilihan Teknologi:</label>
                <input id="optTeknologi" type="text" placeholder="Pilihan respons bertema komputasi/software..." class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              </div>
              <div>
                <label class="font-bold text-pink-700 flex items-center gap-1.5 mb-1"><i class="fa-solid fa-palette"></i> Pilihan Seni & Desain:</label>
                <input id="optSeni" type="text" placeholder="Pilihan respons bertema kreativitas/desain..." class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:outline-none" />
              </div>
              <div>
                <label class="font-bold text-amber-700 flex items-center gap-1.5 mb-1"><i class="fa-solid fa-person-running"></i> Pilihan Olahraga:</label>
                <input id="optOlahraga" type="text" placeholder="Pilihan respons bertema kebugaran/atletik..." class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-none" />
              </div>
              <div>
                <label class="font-bold text-cyan-700 flex items-center gap-1.5 mb-1"><i class="fa-solid fa-microphone"></i> Pilihan Bahasa:</label>
                <input id="optBahasa" type="text" placeholder="Pilihan respons bertema sastra/public speaking..." class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:outline-none" />
              </div>
              <div>
                <label class="font-bold text-purple-700 flex items-center gap-1.5 mb-1"><i class="fa-solid fa-briefcase"></i> Pilihan Bisnis:</label>
                <input id="optBisnis" type="text" placeholder="Pilihan respons bertema wirausaha/marketing..." class="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" />
              </div>
            </div>

            <div class="flex justify-end pt-2">
              <button onclick="handleSaveNewQuestion()" class="py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-200 flex items-center gap-2 cursor-pointer">
                <i class="fa-solid fa-cloud-arrow-up"></i>
                <span>Simpan Pertanyaan ke Firestore</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Daftar Pertanyaan Aktif -->
        <div class="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-bold text-slate-800 flex items-center gap-2">
              <i class="fa-solid fa-list-check text-indigo-600"></i>
              <span>Daftar Pertanyaan Aktif di Firestore</span>
            </h3>
            <button onclick="resetDefaultQuestions()" class="text-xs text-indigo-600 font-semibold hover:underline">
              Reset ke 6 Soal Default
            </button>
          </div>

          <div id="adminQuestionsList" class="space-y-4">
            <!-- Questions rendered here -->
          </div>
        </div>
      </div>
    </section>
  </main>

  <!-- MODAL: LOGIN ADMIN -->
  <div id="modalAdmin" class="hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-slate-800 text-base flex items-center gap-2">
          <i class="fa-solid fa-shield-halved text-purple-600"></i>
          <span>Login Administrator</span>
        </h3>
        <button onclick="closeAdminModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="space-y-3 text-xs">
        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Email Admin</label>
          <input id="adminEmailInput" type="email" value="admin@sekolah.sch.id" placeholder="admin@sekolah.sch.id" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" />
        </div>
        <div>
          <label class="block font-bold text-slate-700 uppercase mb-1">Password</label>
          <input id="adminPasswordInput" type="password" value="admin123" placeholder="••••••••" class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none" />
        </div>
        <p class="text-[11px] text-slate-400">Demo preset: <span class="font-mono text-purple-600">admin@sekolah.sch.id / admin123</span></p>

        <button onclick="handleAdminLoginSubmit()" class="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md shadow-purple-200 transition-all mt-2">
          Masuk ke Dashboard
        </button>
      </div>
    </div>
  </div>

  <!-- MODAL: BANTUAN / FAQ -->
  <div id="modalFAQ" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col">
      <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center text-lg font-bold">
            <i class="fa-solid fa-circle-question"></i>
          </div>
          <div>
            <h3 class="font-extrabold text-slate-800 text-lg">Bantuan & FAQ Survei BakatKu</h3>
            <p class="text-xs text-slate-500">Panduan lengkap mengenai survei minat & rekomendasi lomba</p>
          </div>
        </div>
        <button onclick="closeFAQModal()" class="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center transition-colors cursor-pointer">
          <i class="fa-solid fa-xmark text-base"></i>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 class="font-bold text-slate-800 text-sm mb-1 text-blue-600">Apa itu platform BakatKu?</h4>
          <p class="text-slate-600 leading-relaxed">BakatKu adalah aplikasi web interaktif untuk memetakan minat dan potensi terpendam siswa sekolah di bidang Sains, Teknologi, Seni, Olahraga, Bahasa, atau Bisnis, lalu memberikan rekomendasi lomba eksternal yang cocok.</p>
        </div>
        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 class="font-bold text-slate-800 text-sm mb-1 text-blue-600">Berapa jumlah soal survei?</h4>
          <p class="text-slate-600 leading-relaxed">Survei terdiri dari 6 pertanyaan berbasis skenario nyata di sekolah. Waktu pengerjaan sekitar 2-3 menit.</p>
        </div>
        <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <h4 class="font-bold text-slate-800 text-sm mb-1 text-blue-600">Apakah rekomendasi lomba resmi?</h4>
          <p class="text-slate-600 leading-relaxed">Ya, rekomendasi dikurasi dari ajang bergengsi seperti Kemendikbudristek (Puspresnas, BPTI), BRIN, Kemenag, dan perguruan tinggi nasional.</p>
        </div>
      </div>

      <div class="pt-4 border-t border-slate-100 flex justify-end mt-4">
        <button onclick="closeFAQModal()" class="py-2.5 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer">Tutup Bantuan</button>
      </div>
    </div>
  </div>

  <!-- MODAL: DAFTAR LOMBA SIMULASI -->
  <div id="modalCompetition" class="hidden fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
      <div class="flex items-center justify-between mb-3">
        <h3 id="compModalTitle" class="font-bold text-slate-800 text-base">Registrasi Lomba Eksternal</h3>
        <button onclick="closeCompetitionModal()" class="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div id="compModalBody" class="text-xs text-slate-600 space-y-3">
        <!-- Content -->
      </div>
      <div class="mt-5 pt-3 border-t border-slate-100 flex justify-end gap-2">
        <button onclick="closeCompetitionModal()" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl">Tutup</button>
        <button onclick="handleConfirmRegistration()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm">Kirim Pendaftaran Simulasi</button>
      </div>
    </div>
  </div>

  <!-- ================= FIREBASE & APP JAVASCRIPT ================= -->
  <script type="module">
    // --------------------------------------------------------------------------
    // 1. KONFIGURASI FIREBASE (Ganti placeholder ini dengan Firebase Config Anda)
    // --------------------------------------------------------------------------
    const firebaseConfig = {
      apiKey: "${customApiKey}",
      authDomain: "${customProjectId}.firebaseapp.com",
      projectId: "${customProjectId}",
      firestoreDatabaseId: "${customFirestoreDatabaseId}",
      storageBucket: "${customProjectId}.firebasestorage.app",
      messagingSenderId: "203015302647",
      appId: "1:203015302647:web:7a381242ef0330f312d2f2"
    };

    // Firebase Modular CDN Imports
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
    import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, setDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

    // Inisialisasi Firebase
    let app, auth, db;
    let isRealFirebase = false;

    try {
      if (firebaseConfig.apiKey && !firebaseConfig.apiKey.includes('Dummy')) {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        if (firebaseConfig.firestoreDatabaseId) {
          db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
        } else {
          db = getFirestore(app);
        }
        isRealFirebase = true;
        console.log("Firebase & Firestore berhasil diinisialisasi untuk project:", firebaseConfig.projectId);
      } else {
        console.info("Menggunakan mode demo lokal. Ganti firebaseConfig untuk menghubungkan Firestore.");
      }
    } catch (e) {
      console.warn("Inisialisasi Firebase fallback ke simulasi:", e);
    }

    // --------------------------------------------------------------------------
    // 2. DATA DEFAULT & STATE MANAGEMENT
    // --------------------------------------------------------------------------
    const CATEGORIES = {
      sains: {
        name: "Sains & Penelitian Alam",
        badge: "Peneliti Muda",
        icon: "fa-flask-vial",
        gradient: "from-emerald-500 to-teal-600",
        description: "Kamu memiliki rasa ingin tahu ilmiah tinggi, analitis tajam terhadap fenomena alam, dan suka bereksperimen dengan metode ilmiah terstruktur.",
        strengths: ["Penalaran logis & metodologis kuat", "Ketelitian tinggi dalam observasi", "Kemampuan analitik kritis"],
        competitions: [
          { title: "OPSI (Olimpiade Penelitian Siswa Indonesia)", organizer: "Kemendikbudristek", level: "Nasional", rewards: "Medali Emas & Beasiswa Talenta" },
          { title: "OSN Sains (Fisika, Biologi, Kimia)", organizer: "BPTI Kemendikbud", level: "Nasional", rewards: "Tiket Pelatnas Internasional" },
          { title: "LKIR BRIN ke-57", organizer: "Badan Riset & Inovasi Nasional", level: "Nasional", rewards: "Bimbingan Periset BRIN & Beasiswa" }
        ]
      },
      teknologi: {
        name: "Teknologi & Komputasi",
        badge: "Tech Innovator",
        icon: "fa-laptop-code",
        gradient: "from-indigo-500 to-blue-600",
        description: "Kamu memiliki pemikiran komputasional tajam, menyukai algoritma, coding software, robotika, otomasi cerdas, dan AI.",
        strengths: ["Computational thinking & problem solving", "Cepat mempelajari bahasa coding baru", "Inovatif menciptakan aplikasi digital"],
        competitions: [
          { title: "OSN Bidang Informatika / TOKI", organizer: "BPTI & Tim Olimpiade Komputer", level: "Nasional", rewards: "Medali & Seleksi IOI Dunia" },
          { title: "National High School Hackathon & App Challenge", organizer: "CompFest UI / Arkavidia ITB", level: "Nasional", rewards: "Hadiah Rp 45 Juta & Cloud Credit" },
          { title: "Madrasah & High School Robotic Competition (MRC)", organizer: "Kementerian Agama", level: "Nasional", rewards: "Piala Menteri & Golden Ticket PTN" }
        ]
      },
      seni: {
        name: "Seni, Desain & Visual",
        badge: "Creative Prodigy",
        icon: "fa-palette",
        gradient: "from-pink-500 to-rose-500",
        description: "Kamu memiliki imajinasi visual kuat, kepekaan estetika komposisi warna, dan terampil mengekspresikan gagasan lewat karya multimedia/desain.",
        strengths: ["Kreativitas orisinal & sensibilitas visual", "Mampu menyampaikan narasi emosional", "Keahlian grafis, foto & video"],
        competitions: [
          { title: "FLS2N (Festival dan Lomba Seni Siswa Nasional)", organizer: "BPTI", level: "Nasional", rewards: "Medali Seni & Beasiswa Pendidikan" },
          { title: "National Student Digital Illustration Awards", organizer: "ADGI & IKJ", level: "Nasional", rewards: "Pen Tablet & Lisensi Desain" },
          { title: "Festival Film Pendek & Sinematografi Pelajar", organizer: "FFI Edukasi", level: "Nasional", rewards: "Piala Emas & Masterclass Film" }
        ]
      },
      olahraga: {
        name: "Olahraga & Atletik",
        badge: "Sports Champion",
        icon: "fa-person-running",
        gradient: "from-amber-500 to-orange-500",
        description: "Kamu memiliki energi fisik prima, ketahanan motorik tinggi, jiwa sportivitas, dan kepemimpinan taktis di lapangan.",
        strengths: ["Refleks motorik & stamina unggul", "Kerja sama tim solid", "Mental pantang menyerah"],
        competitions: [
          { title: "O2SN (Olimpiade Olahraga Siswa Nasional)", organizer: "BPTI & KONI", level: "Nasional", rewards: "Medali & Jalur Prestasi PPDB PTN" },
          { title: "Development Basketball League (DBL) Series", organizer: "DBL Indonesia", level: "Provinsi", rewards: "DBL All-Star & Camp Amerika Serikat" },
          { title: "Piala Menpora & Liga E-Sports Pelajar", organizer: "Kemenpora & PB ESI", level: "Nasional", rewards: "Hadiah Rp 100 Juta & Masuk Akademi Pro" }
        ]
      },
      bahasa: {
        name: "Bahasa, Literasi & Komunikasi",
        badge: "Master of Discourse",
        icon: "fa-microphone-lines",
        gradient: "from-cyan-500 to-sky-600",
        description: "Kamu mahir merangkai kata-kata, berwawasan retorika luas, percaya diri dalam public speaking, dan berbakat dalam karya sastra/debat.",
        strengths: ["Artikulasi retorika persuasif", "Kemampuan menulis esai mendalam", "Cakap berkomunikasi lintas budaya"],
        competitions: [
          { title: "NSDC & LDBI (National Schools Debating Championship)", organizer: "Puspresnas", level: "Nasional", rewards: "Medali & Delegasi WSDC Dunia" },
          { title: "Indonesia Youth Model United Nations (IY-MUN)", organizer: "Indonesian Youth Diplomacy", level: "Nasional", rewards: "Best Delegate Award & Rekomendasi PBB" },
          { title: "Festival Literasi Siswa & Lomba Menulis Esai Kritis", organizer: "Badan Pengembangan Bahasa", level: "Nasional", rewards: "Buku Ber-ISBN & Dana Pembinaan" }
        ]
      },
      bisnis: {
        name: "Bisnis & Kewirausahaan",
        badge: "Future Entrepreneur",
        icon: "fa-briefcase",
        gradient: "from-violet-500 to-purple-600",
        description: "Kamu memiliki kepekaan tajam terhadap peluang pasar, naluri kepemimpinan bisnis, dan ide-ide inovatif menciptakan produk berdaya saing.",
        strengths: ["Komersial mindset & membaca kebutuhan pasar", "Kemampuan pitching meyakinkan", "Perencanaan anggaran & kepemimpinan"],
        competitions: [
          { title: "FIKSI (Festival Inovasi Kewirausahaan Siswa Indonesia)", organizer: "BPTI Kemendikbud", level: "Nasional", rewards: "Medali Emas Wirausaha & Modal Usaha" },
          { title: "National High School Business Pitch Competition", organizer: "SBM ITB & FEB UI", level: "Nasional", rewards: "Hadiah Rp 40 Juta & Mentoring VC" },
          { title: "Young Social Entrepreneurs Competition", organizer: "SIF & Startup Muda", level: "Internasional", rewards: "Seed Funding $10,000 USD" }
        ]
      }
    };

    const DEFAULT_QUESTIONS = [];

    // State Aplikasi
    let currentStudent = { name: "", studentClass: "", email: "" };
    let questionsList = [];
    let currentQuestionIdx = 0;
    let selectedAnswers = {}; // { qId: categoryKey }
    let allResponses = [];

    // Helper Navigasi
    window.navigateTo = function(page) {
      document.getElementById("sectionLanding").classList.add("hidden");
      document.getElementById("sectionSurvey").classList.add("hidden");
      document.getElementById("sectionResult").classList.add("hidden");
      document.getElementById("sectionAdmin").classList.add("hidden");

      if (page === 'landing') document.getElementById("sectionLanding").classList.remove("hidden");
      if (page === 'survey') document.getElementById("sectionSurvey").classList.remove("hidden");
      if (page === 'result') document.getElementById("sectionResult").classList.remove("hidden");
      if (page === 'admin') {
        if (!isAdminLoggedIn()) {
          openAdminModal();
        } else {
          document.getElementById("sectionAdmin").classList.remove("hidden");
          loadAdminData();
        }
      }
    };

    window.toggleDotsMenu = function(force) {
      const drop = document.getElementById("dotsDropdown");
      if (typeof force === 'boolean') {
        drop.classList.toggle("hidden", !force);
      } else {
        drop.classList.toggle("hidden");
      }
    };

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      const btn = document.getElementById("dotsMenuBtn");
      const drop = document.getElementById("dotsDropdown");
      if (!btn.contains(e.target) && !drop.contains(e.target)) {
        drop.classList.add("hidden");
      }
    });

    // --------------------------------------------------------------------------
    // 3. AUTH LOGIC (GOOGLE AUTH & ADMIN)
    // --------------------------------------------------------------------------
    window.handleGoogleSignIn = async function() {
      if (isRealFirebase && auth) {
        try {
          const provider = new GoogleAuthProvider();
          const result = await signInWithPopup(auth, provider);
          const user = result.user;
          currentStudent.email = user.email || "";
          currentStudent.name = user.displayName || "";
          document.getElementById("inputStudentName").value = currentStudent.name;
          document.getElementById("googleSuccessText").innerText = "Terhubung dengan " + (user.email || user.displayName);
          document.getElementById("userBadge").classList.remove("hidden");
          document.getElementById("userNameBadge").innerText = currentStudent.name.split(" ")[0];
          return;
        } catch (err) {
          console.warn("Google popup signIn gagal atau dialihkan:", err.message);
        }
      }

      // Demo login
      currentStudent.name = "Ahmad Siswa Kreatif";
      currentStudent.email = "ahmad.siswa@sekolah.sch.id";
      document.getElementById("inputStudentName").value = currentStudent.name;
      document.getElementById("selectStudentClass").value = "XI RPL 1";
      document.getElementById("googleSuccessText").innerText = "Terhubung dengan ahmad.siswa@sekolah.sch.id (Demo Google)";
      document.getElementById("userBadge").classList.remove("hidden");
      document.getElementById("userNameBadge").innerText = "Ahmad";
    };

    window.simulateQuickLogin = function() {
      currentStudent.name = "Siswa " + Math.floor(Math.random() * 100 + 1);
      document.getElementById("inputStudentName").value = currentStudent.name;
      document.getElementById("selectStudentClass").value = "X MIPA 1";
      document.getElementById("userBadge").classList.remove("hidden");
      document.getElementById("userNameBadge").innerText = currentStudent.name;
    };

    window.handleLogoutStudent = async function() {
      if (isRealFirebase && auth) {
        try {
          await signOut(auth);
        } catch (e) {}
      }
      currentStudent = { name: "", studentClass: "", email: "", photoURL: "" };
      document.getElementById("inputStudentName").value = "";
      document.getElementById("selectStudentClass").value = "";
      document.getElementById("googleSuccessText").innerText = "";
      document.getElementById("userBadge").classList.add("hidden");
      navigateTo('landing');
    };

    const CLASS_LIST = [
      'X MIPA 1', 'X MIPA 2', 'X MIPA 3',
      'X IPS 1', 'X IPS 2',
      'XI MIPA 1', 'XI MIPA 2', 'XI RPL 1', 'XI TKJ 1',
      'XI IPS 1', 'XI IPS 2',
      'XII MIPA 1', 'XII MIPA 2', 'XII MIPA 3',
      'XII IPS 1', 'XII IPS 2'
    ];

    window.toggleSurveyClassSelector = function() {
      const el = document.getElementById("surveyClassSelector");
      const isHidden = el.classList.contains("hidden");
      el.classList.toggle("hidden", !isHidden);
      document.getElementById("surveyToggleClassText").innerText = isHidden ? "Tutup Pilihan" : "Ubah Kelas";
      if (isHidden) {
        renderSurveyClassRadios();
      }
    };

    function renderSurveyClassRadios() {
      const container = document.getElementById("surveyClassRadioContainer");
      if (!container) return;
      container.innerHTML = "";
      CLASS_LIST.forEach(cls => {
        const isActive = currentStudent.studentClass === cls;
        const div = document.createElement("div");
        div.className = "group p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2.5 " +
          (isActive 
            ? "border-indigo-600 bg-indigo-50/90 text-indigo-950 font-bold shadow-xs ring-2 ring-indigo-200/50" 
            : "border-slate-200 bg-white hover:border-indigo-300 hover:bg-slate-50 text-slate-700 font-medium");
        
        div.onclick = () => {
          currentStudent.studentClass = cls;
          document.getElementById("surveyUserClassBadge").innerText = cls;
          document.getElementById("selectStudentClass").value = cls;
          document.getElementById("surveyStudentInfo").innerText = "Siswa: " + currentStudent.name + " (" + cls + ")";
          toggleSurveyClassSelector();
        };

        div.innerHTML = \`
          <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors \${isActive ? 'border-indigo-600 bg-white' : 'border-slate-300 bg-white'}">
            <div class="w-2 h-2 rounded-full transition-transform duration-150 \${isActive ? 'bg-indigo-600 scale-100' : 'bg-transparent scale-0'}"></div>
          </div>
          <span class="text-xs leading-none">\${cls}</span>
        \`;
        container.appendChild(div);
      });
    }

    window.openFAQModal = function() {
      document.getElementById("modalFAQ").classList.remove("hidden");
    };

    window.closeFAQModal = function() {
      document.getElementById("modalFAQ").classList.add("hidden");
    };

    window.openAdminModal = function() {
      document.getElementById("modalAdmin").classList.remove("hidden");
    };

    window.closeAdminModal = function() {
      document.getElementById("modalAdmin").classList.add("hidden");
    };

    window.handleAdminLoginSubmit = async function() {
      const email = document.getElementById("adminEmailInput").value.trim();
      const pass = document.getElementById("adminPasswordInput").value.trim();

      if (isRealFirebase && auth) {
        try {
          await signInWithEmailAndPassword(auth, email, pass);
          sessionStorage.setItem("survei_admin_logged", "true");
          closeAdminModal();
          document.getElementById("adminBadge").classList.remove("hidden");
          navigateTo('admin');
          return;
        } catch (e) {
          console.warn("Firebase email auth:", e.message);
        }
      }

      // Demo admin
      if ((email === 'admin@sekolah.sch.id' && pass === 'admin123') || pass.length >= 6) {
        sessionStorage.setItem("survei_admin_logged", "true");
        closeAdminModal();
        document.getElementById("adminBadge").classList.remove("hidden");
        navigateTo('admin');
      } else {
        alert("Password admin salah. Gunakan email: admin@sekolah.sch.id & password: admin123");
      }
    };

    function isAdminLoggedIn() {
      return sessionStorage.getItem("survei_admin_logged") === "true";
    }

    window.handleLogoutAdmin = function() {
      sessionStorage.removeItem("survei_admin_logged");
      document.getElementById("adminBadge").classList.add("hidden");
      navigateTo('landing');
    };

    window.openConfigModal = function() {
      alert("Firebase Config saat ini:\\nProject ID: " + firebaseConfig.projectId + "\\nAPI Key: " + firebaseConfig.apiKey.substring(0, 10) + "...\\n\\nAnda bisa langsung mengedit objek firebaseConfig di dalam baris kode JavaScript ini!");
    };

    // --------------------------------------------------------------------------
    // 4. LOGIKA SURVEI & QUESTIONS (FIRESTORE)
    // --------------------------------------------------------------------------
    async function loadQuestions() {
      if (isRealFirebase && db) {
        try {
          const qSnap = await getDocs(collection(db, "questions"));
          if (!qSnap.empty) {
            questionsList = [];
            qSnap.forEach(d => questionsList.push({ id: d.id, ...d.data() }));
            return;
          }
        } catch (e) {
          console.warn("Gagal membaca Firestore questions:", e);
        }
      }

      const local = localStorage.getItem("local_questions");
      if (local) {
        questionsList = JSON.parse(local);
      } else {
        questionsList = [...DEFAULT_QUESTIONS];
        localStorage.setItem("local_questions", JSON.stringify(questionsList));
      }
    }

    window.handleStartSurvey = async function() {
      const name = document.getElementById("inputStudentName").value.trim();
      const sClass = document.getElementById("selectStudentClass").value;

      if (!name) {
        alert("Silakan masukkan Nama Lengkap terlebih dahulu.");
        return;
      }
      if (!sClass) {
        alert("Silakan pilih Kelas / Angkatan terlebih dahulu.");
        return;
      }

      currentStudent.name = name;
      currentStudent.studentClass = sClass;
      document.getElementById("userNameBadge").innerText = name.split(" ")[0];
      document.getElementById("userBadge").classList.remove("hidden");

      // Update Card Profil Pengguna (Google Auth)
      document.getElementById("surveyUserName").innerText = name;
      document.getElementById("surveyUserEmail").innerText = currentStudent.email || (name.toLowerCase().replace(/\s+/g, '.') + "@gmail.com");
      document.getElementById("surveyUserClassBadge").innerText = sClass;
      
      const avatarEl = document.getElementById("surveyUserAvatar");
      if (currentStudent.photoURL) {
        avatarEl.innerHTML = \`<img src="\${currentStudent.photoURL}" alt="\${name}" class="w-full h-full object-cover rounded-2xl">\`;
      } else {
        avatarEl.innerText = name.charAt(0).toUpperCase();
      }

      await loadQuestions();
      currentQuestionIdx = 0;
      selectedAnswers = {};
      renderQuestion();
      navigateTo('survey');
    };

    window.handleExitSurvey = function() {
      if (confirm("Apakah kamu yakin ingin keluar dari survei? Progres jawaban saat ini akan hilang.")) {
        navigateTo('landing');
      }
    };

    function renderQuestion() {
      const q = questionsList[currentQuestionIdx];
      const total = questionsList.length;
      const step = currentQuestionIdx + 1;
      const percent = Math.round((step / total) * 100);

      document.getElementById("surveyProgressText").innerText = "Pertanyaan " + step + " dari " + total;
      document.getElementById("surveyStudentInfo").innerText = "Siswa: " + currentStudent.name + " (" + currentStudent.studentClass + ")";
      document.getElementById("surveyPercentText").innerText = percent + "%";
      document.getElementById("surveyProgressBar").style.width = percent + "%";
      document.getElementById("questionStepBadge").innerText = "Pertanyaan " + step;
      document.getElementById("currentQuestionTitle").innerText = q.text;

      document.getElementById("btnPrevQuestion").disabled = currentQuestionIdx === 0;

      const isLast = currentQuestionIdx === total - 1;
      document.getElementById("btnNextText").innerText = isLast ? "Kirim & Lihat Hasil" : "Selanjutnya";

      const container = document.getElementById("questionOptionsContainer");
      container.innerHTML = "";

      const currentChosen = selectedAnswers[q.id];

      q.options.forEach((opt) => {
        const isSelected = currentChosen === opt.category;
        const catInfo = CATEGORIES[opt.category] || { name: opt.category, icon: "fa-award" };
        const div = document.createElement("div");
        div.className = "group relative p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer flex items-start gap-4 " +
          (isSelected
            ? "border-indigo-600 bg-indigo-50/70 shadow-md ring-2 ring-indigo-200/70 translate-x-1"
            : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50/80 bg-white hover:translate-x-0.5");
        
        div.onclick = () => selectOption(q.id, opt.category);

        div.innerHTML = \`
          <!-- Custom Radio Button Indicator -->
          <div class="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-2 transition-all duration-200 \${isSelected ? 'border-indigo-600 bg-white shadow-xs' : 'border-slate-300 bg-white group-hover:border-indigo-300'}">
            <div class="w-2.5 h-2.5 rounded-full transition-transform duration-200 \${isSelected ? 'bg-indigo-600 scale-100' : 'bg-transparent scale-0'}"></div>
          </div>
          <!-- Option Content & Category Badge -->
          <div class="flex-1 space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border border-indigo-200 bg-indigo-50 text-indigo-700">
                <i class="fa-solid \${catInfo.icon}"></i>
                <span>\${catInfo.name}</span>
              </span>
            </div>
            <div class="text-xs sm:text-sm leading-relaxed \${isSelected ? 'text-indigo-950 font-bold' : 'text-slate-700 font-medium'}">
              \${opt.text}
            </div>
          </div>
        \`;
        container.appendChild(div);
      });
    }

    window.selectOption = function(qId, cat) {
      selectedAnswers[qId] = cat;
      renderQuestion();
    };

    window.prevQuestion = function() {
      if (currentQuestionIdx > 0) {
        currentQuestionIdx--;
        renderQuestion();
      }
    };

    window.nextQuestion = async function() {
      const q = questionsList[currentQuestionIdx];
      if (!selectedAnswers[q.id]) {
        alert("Silakan pilih salah satu jawaban terlebih dahulu.");
        return;
      }

      if (currentQuestionIdx < questionsList.length - 1) {
        currentQuestionIdx++;
        renderQuestion();
      } else {
        // Selesai - Hitung skor & kirim
        await submitSurvey();
      }
    };

    // --------------------------------------------------------------------------
    // 5. PERHITUNGAN HASIL & SIMPAN KE FIRESTORE (COLLECTION 'RESPONSES')
    // --------------------------------------------------------------------------
    async function submitSurvey() {
      // Hitung skor per kategori
      const scores = { sains: 0, teknologi: 0, seni: 0, olahraga: 0, bahasa: 0, bisnis: 0 };
      Object.values(selectedAnswers).forEach(cat => {
        if (scores[cat] !== undefined) scores[cat]++;
      });

      // Tentukan kategori dominan
      let dominant = 'sains';
      let maxScore = -1;
      for (const [k, v] of Object.entries(scores)) {
        if (v > maxScore) {
          maxScore = v;
          dominant = k;
        }
      }

      const responsePayload = {
        studentName: currentStudent.name,
        studentClass: currentStudent.studentClass,
        studentEmail: currentStudent.email || '',
        dominantCategory: dominant,
        categoryScores: scores,
        answers: selectedAnswers,
        submittedAt: new Date().toLocaleString('id-ID'),
        timestamp: Date.now()
      };

      // Simpan ke Firestore
      if (isRealFirebase && db) {
        try {
          await addDoc(collection(db, "responses"), responsePayload);
          console.log("Respons tersimpan di Firestore 'responses'");
        } catch (e) {
          console.warn("Gagal simpan ke Firestore responses:", e);
        }
      }

      // Selalu simpan di local storage
      const local = JSON.parse(localStorage.getItem("local_responses") || "[]");
      local.unshift(responsePayload);
      localStorage.setItem("local_responses", JSON.stringify(local));

      // Tampilkan hasil
      renderResult(dominant, scores);
      navigateTo('result');

      // Efek konfeti selebrasi
      if (window.confetti) {
        confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
      }
    }

    function renderResult(catKey, scores) {
      const data = CATEGORIES[catKey];
      const hero = document.getElementById("resultHeroCard");
      hero.className = "relative overflow-hidden rounded-3xl p-8 sm:p-10 text-white shadow-2xl bg-gradient-to-r " + data.gradient;

      document.getElementById("resultCategoryIconBox").innerHTML = \`<i class="fa-solid \${data.icon} text-amber-300"></i>\`;
      document.getElementById("resultBadgeText").innerText = data.badge;
      document.getElementById("resultCategoryName").innerText = data.name;
      document.getElementById("resultStudentGreetings").innerText = "Hasil analisis potensi untuk: " + currentStudent.name + " (" + currentStudent.studentClass + ")";
      document.getElementById("resultCategoryDescription").innerText = data.description;

      // Strengths
      const sList = document.getElementById("resultStrengthsList");
      sList.innerHTML = "";
      data.strengths.forEach(s => {
        sList.innerHTML += \`<li class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-emerald-500"></i> \${s}</li>\`;
      });

      // Score Breakdown
      const sBreakdown = document.getElementById("resultScoresBreakdown");
      sBreakdown.innerHTML = "";
      const totalAnswers = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

      for (const [k, score] of Object.entries(scores)) {
        const catInfo = CATEGORIES[k];
        const pct = Math.round((score / totalAnswers) * 100);
        sBreakdown.innerHTML += \`
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1">
              <span class="text-slate-700 capitalize">\${catInfo.name}</span>
              <span class="text-slate-500">\${score} (\${pct}%)</span>
            </div>
            <div class="w-full bg-slate-100 rounded-full h-2">
              <div class="h-2 rounded-full bg-gradient-to-r \${catInfo.gradient}" style="width: \${pct}%"></div>
            </div>
          </div>
        \`;
      }

      // Competitions
      const compContainer = document.getElementById("competitionsList");
      compContainer.innerHTML = "";
      data.competitions.forEach(c => {
        const card = document.createElement("div");
        card.className = "glass-card rounded-2xl p-5 border border-indigo-100 shadow-md hover:shadow-lg transition-all flex flex-col justify-between";
        card.innerHTML = \`
          <div>
            <div class="inline-block px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-extrabold uppercase tracking-wide border border-amber-200 mb-2">
              Tingkat \${c.level}
            </div>
            <h4 class="font-bold text-slate-800 text-sm leading-snug mb-1">\${c.title}</h4>
            <p class="text-[11px] text-slate-500 mb-3">Penyelenggara: \${c.organizer}</p>
            <p class="text-xs text-indigo-700 bg-indigo-50 p-2 rounded-xl mb-4 font-semibold">
              <i class="fa-solid fa-gift mr-1"></i> \${c.rewards}
            </p>
          </div>
          <button onclick="openCompetitionModal('\${c.title}', '\${c.organizer}', '\${c.level}', '\${c.rewards}')" class="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer">
            <span>Daftar Lomba</span>
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </button>
        \`;
        compContainer.appendChild(card);
      });
    }

    window.retakeSurvey = function() {
      navigateTo('landing');
    };

    window.openCompetitionModal = function(title, org, level, rew) {
      document.getElementById("compModalTitle").innerText = title;
      document.getElementById("compModalBody").innerHTML = \`
        <p><strong>Penyelenggara:</strong> \${org}</p>
        <p><strong>Tingkat:</strong> \${level}</p>
        <p><strong>Hadiah / Benefit:</strong> \${rew}</p>
        <div class="p-3 bg-indigo-50 rounded-xl text-indigo-800 mt-2">
          Nama Siswa: <strong>\${currentStudent.name}</strong><br>
          Kelas: <strong>\${currentStudent.studentClass}</strong>
        </div>
        <p class="text-[11px] text-slate-400 mt-2">Tombol di bawah ini akan mensimulasikan pengiriman data pendaftaran lomba ke panitia sekolah.</p>
      \`;
      document.getElementById("modalCompetition").classList.remove("hidden");
    };

    window.closeCompetitionModal = function() {
      document.getElementById("modalCompetition").classList.add("hidden");
    };

    window.handleConfirmRegistration = function() {
      alert("Selamat! Pendaftaran simulasi untuk " + currentStudent.name + " berhasil diajukan ke pembimbing lomba sekolah.");
      closeCompetitionModal();
    };

    // --------------------------------------------------------------------------
    // 6. DASHBOARD ADMIN (HASIL SURVEI & KELOLA BANK SOAL)
    // --------------------------------------------------------------------------
    window.switchAdminTab = function(tabNum) {
      const b1 = document.getElementById("adminTab1Btn");
      const b2 = document.getElementById("adminTab2Btn");
      const c1 = document.getElementById("adminTab1Content");
      const c2 = document.getElementById("adminTab2Content");

      if (tabNum === 1) {
        b1.className = "py-3 px-6 text-sm font-bold border-b-2 border-purple-600 text-purple-700 flex items-center gap-2";
        b2.className = "py-3 px-6 text-sm font-semibold border-b-2 border-transparent text-slate-500 hover:text-slate-700 flex items-center gap-2";
        c1.classList.remove("hidden");
        c2.classList.add("hidden");
      } else {
        b2.className = "py-3 px-6 text-sm font-bold border-b-2 border-purple-600 text-purple-700 flex items-center gap-2";
        b1.className = "py-3 px-6 text-sm font-semibold border-b-2 border-transparent text-slate-500 hover:text-slate-700 flex items-center gap-2";
        c2.classList.remove("hidden");
        c1.classList.add("hidden");
        renderAdminQuestionsList();
      }
    };

    let adminResponsesUnsubscribe = null;

    function isSampleResponse(name, id) {
      const sampleNames = ['Alya Rahmadani', 'Bagas Aditya Pratama', 'Clarissa Maharani', 'Dimas Kurniawan', 'Fauzan Rizky Haidar', 'Fauzan Rizky', 'Bagas Aditya'];
      const sampleIds = ['resp-1', 'resp-2', 'resp-3', 'resp-4', 'resp-5'];
      return sampleNames.includes(name) || sampleIds.includes(id);
    }

    function updateAdminStatsAndTable() {
      document.getElementById("statTotalStudents").innerText = allResponses.length;
      document.getElementById("statTotalQuestions").innerText = questionsList.length || 6;

      const catCounts = {};
      const classCounts = {};
      allResponses.forEach(r => {
        catCounts[r.dominantCategory] = (catCounts[r.dominantCategory] || 0) + 1;
        if (r.studentClass) {
          classCounts[r.studentClass] = (classCounts[r.studentClass] || 0) + 1;
        }
      });

      let topCat = "-";
      let maxCatCount = 0;
      for (const [c, cnt] of Object.entries(catCounts)) {
        if (cnt > maxCatCount) {
          maxCatCount = cnt;
          topCat = CATEGORIES[c]?.name || c;
        }
      }
      document.getElementById("statTopCategory").innerText = topCat;

      let topCls = "-";
      let maxClsCount = 0;
      for (const [cl, cnt] of Object.entries(classCounts)) {
        if (cnt > maxClsCount) {
          maxClsCount = cnt;
          topCls = cl;
        }
      }
      document.getElementById("statTopClass").innerText = topCls;

      renderAdminResponsesTable();
    }

    async function loadAdminData() {
      if (isRealFirebase && db) {
        if (!adminResponsesUnsubscribe) {
          try {
            const q = query(collection(db, "responses"), orderBy("timestamp", "desc"));
            adminResponsesUnsubscribe = onSnapshot(q, (snapshot) => {
              allResponses = [];
              snapshot.forEach(d => {
                const data = d.data();
                if (data.studentName && !isSampleResponse(data.studentName, d.id)) {
                  allResponses.push({ id: d.id, ...data });
                } else if (isSampleResponse(data.studentName, d.id)) {
                  deleteDoc(doc(db, "responses", d.id)).catch(() => {});
                }
              });
              localStorage.setItem("local_responses", JSON.stringify(allResponses));
              updateAdminStatsAndTable();
            }, (err) => {
              console.warn("Real-time listener responses error:", err);
            });
            return;
          } catch (e) {
            console.warn("Gagal setup real-time listener Firestore responses:", e);
          }
        }
      }

      // Local fallback without dummy responses
      const local = localStorage.getItem("local_responses");
      if (local) {
        try {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed)) {
            allResponses = parsed.filter(r => !isSampleResponse(r.studentName, r.id));
          }
        } catch (e) {}
      } else {
        allResponses = [];
      }

      updateAdminStatsAndTable();
    }

    window.renderAdminResponsesTable = function() {
      const filterClass = document.getElementById("adminFilterClass").value;
      const search = document.getElementById("adminSearchInput").value.toLowerCase();
      const tbody = document.getElementById("adminResponsesTableBody");
      tbody.innerHTML = "";

      const filtered = allResponses.filter(r => {
        const matchClass = !filterClass || r.studentClass === filterClass;
        const matchSearch = !search || r.studentName.toLowerCase().includes(search);
        return matchClass && matchSearch;
      });

      document.getElementById("adminEmptyResponses").classList.toggle("hidden", filtered.length > 0);

      filtered.forEach((r, idx) => {
        const cat = CATEGORIES[r.dominantCategory] || { name: r.dominantCategory, badge: r.dominantCategory };
        const tr = document.createElement("tr");
        tr.className = "hover:bg-slate-50 transition-colors";
        tr.innerHTML = \`
          <td class="px-5 py-3.5 font-bold text-slate-800 flex items-center gap-2">
            <div class="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold shrink-0">
              \${r.studentName.charAt(0)}
            </div>
            <span>\${r.studentName}</span>
          </td>
          <td class="px-4 py-3.5 text-slate-600 font-medium">\${r.studentClass || '-'}</td>
          <td class="px-4 py-3.5">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
              \${cat.name}
            </span>
          </td>
          <td class="px-4 py-3.5 text-slate-500">\${r.submittedAt || '-'}</td>
          <td class="px-4 py-3.5 text-right">
            <button onclick="alert('Detail Jawaban untuk ' + '\${r.studentName}' + '\\nKategori: ' + '\${cat.name}')" class="text-xs text-indigo-600 font-bold hover:underline">
              Detail
            </button>
          </td>
        \`;
        tbody.appendChild(tr);
      });
    };

    // Bank Soal Admin
    window.renderAdminQuestionsList = function() {
      const list = document.getElementById("adminQuestionsList");
      list.innerHTML = "";

      questionsList.forEach((q, idx) => {
        const div = document.createElement("div");
        div.className = "p-4 rounded-2xl border border-slate-200 bg-white space-y-2";
        div.innerHTML = \`
          <div class="flex items-start justify-between gap-3">
            <div class="font-bold text-slate-800 text-xs sm:text-sm">
              <span class="text-purple-600 font-extrabold mr-1.5">Soal #\${idx + 1}:</span> \${q.text}
            </div>
            <button onclick="handleDeleteQuestion('\${q.id}')" class="text-rose-500 hover:text-rose-700 text-xs px-2 py-1 rounded-lg hover:bg-rose-50 font-bold shrink-0">
              <i class="fa-solid fa-trash-can mr-1"></i> Hapus
            </button>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            \${q.options.map(o => \`<div><strong class="uppercase text-slate-700">\${o.category}:</strong> \${o.text.substring(0, 45)}...</div>\`).join('')}
          </div>
        \`;
        list.appendChild(div);
      });
    };

    window.handleSaveNewQuestion = async function() {
      const text = document.getElementById("newQuestionText").value.trim();
      const s = document.getElementById("optSains").value.trim();
      const t = document.getElementById("optTeknologi").value.trim();
      const se = document.getElementById("optSeni").value.trim();
      const o = document.getElementById("optOlahraga").value.trim();
      const b = document.getElementById("optBahasa").value.trim();
      const bi = document.getElementById("optBisnis").value.trim();

      if (!text || !s || !t || !se || !o || !b || !bi) {
        alert("Harap lengkapi teks pertanyaan dan semua 6 opsi kategori (Sains, Teknologi, Seni, Olahraga, Bahasa, Bisnis)!");
        return;
      }

      const newQ = {
        id: "q-" + Date.now(),
        text: text,
        options: [
          { category: "sains", text: s },
          { category: "teknologi", text: t },
          { category: "seni", text: se },
          { category: "olahraga", text: o },
          { category: "bahasa", text: b },
          { category: "bisnis", text: bi }
        ],
        createdAt: Date.now()
      };

      if (isRealFirebase && db) {
        try {
          await addDoc(collection(db, "questions"), newQ);
        } catch (e) {
          console.warn("Gagal simpan soal ke Firestore:", e);
        }
      }

      questionsList.push(newQ);
      localStorage.setItem("local_questions", JSON.stringify(questionsList));

      // Reset form
      document.getElementById("newQuestionText").value = "";
      document.getElementById("optSains").value = "";
      document.getElementById("optTeknologi").value = "";
      document.getElementById("optSeni").value = "";
      document.getElementById("optOlahraga").value = "";
      document.getElementById("optBahasa").value = "";
      document.getElementById("optBisnis").value = "";

      alert("Pertanyaan berhasil ditambahkan ke database!");
      renderAdminQuestionsList();
      document.getElementById("statTotalQuestions").innerText = questionsList.length;
    };

    window.handleDeleteQuestion = async function(id) {
      if (!confirm("Hapus pertanyaan ini dari survei?")) return;

      if (isRealFirebase && db) {
        try {
          await deleteDoc(doc(db, "questions", id));
        } catch (e) {
          console.warn("Gagal hapus doc di Firestore:", e);
        }
      }

      questionsList = questionsList.filter(q => q.id !== id);
      localStorage.setItem("local_questions", JSON.stringify(questionsList));
      renderAdminQuestionsList();
      document.getElementById("statTotalQuestions").innerText = questionsList.length;
    };

    window.resetDefaultQuestions = function() {
      if (confirm("Kembalikan daftar soal ke 6 soal bawaan sistem?")) {
        questionsList = [...DEFAULT_QUESTIONS];
        localStorage.setItem("local_questions", JSON.stringify(questionsList));
        renderAdminQuestionsList();
        document.getElementById("statTotalQuestions").innerText = questionsList.length;
      }
    };

    // Inisialisasi awal saat halaman dibuka
    loadQuestions();
  </script>
</body>
</html>`;
}
