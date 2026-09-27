import { CategoryDetail, Question, SurveyResponse, TalentCategoryKey } from '../types';

export const CATEGORIES_DATA: Record<TalentCategoryKey, CategoryDetail> = {
  sains: {
    key: 'sains',
    name: 'Sains & Penelitian Alam',
    badge: 'Peneliti Muda',
    icon: 'fa-solid fa-flask-vial',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'Kamu memiliki rasa keingintahuan ilmiah yang tinggi, analitis tajam terhadap gejala alam, suka bereksperimen dengan metode terstruktur, serta senang memecahkan teka-teki logika berdasarkan bukti empiris.',
    strengths: [
      'Penalaran logis & metodologis yang kuat',
      'Ketelitian tinggi dalam observasi dan eksperimen',
      'Kemampuan menganalisis data secara kritis',
      'Ketertarikan pada ilmu lingkungan, biologi, kimia, dan fisika'
    ],
    careerProspects: ['Ilmuwan / Peneliti', 'Dokter / Tenaga Medis', 'Ahli Bioteknologi', 'Data Analyst', 'Ahli Lingkungan Hidup'],
    competitions: [
      {
        id: 'opsi-2025',
        title: 'OPSI (Olimpiade Penelitian Siswa Indonesia)',
        organizer: 'Pusat Prestasi Nasional (Puspresnas) Kemendikbudristek',
        level: 'Nasional',
        registrationPeriod: 'Agustus - Oktober',
        rewards: 'Medali Emas/Perak/Perunggu, Sertifikat Nasional & Beasiswa Talenta Indonesia',
        description: 'Ajang bergengsi riset ilmiah tingkat SMA/MA sederajat yang melombakan bidang Matematika Sains dan Teknologi (MST), Fisika Terapan, dan Ilmu Hayati.',
        requirements: ['Siswa aktif SMA/MA', 'Karya tulis ilmiah orisinil', 'Tim terdiri dari 1-2 siswa didampingi guru pembimbing'],
        link: 'https://pusatprestasinasional.kemdikbud.go.id'
      },
      {
        id: 'osn-sains-2025',
        title: 'OSN (Olimpiade Sains Nasional) Bidang IPA/Fisika/Kimia/Biologi',
        organizer: 'Balai Pengembangan Talenta Indonesia (BPTI)',
        level: 'Nasional',
        registrationPeriod: 'Februari - April',
        rewards: 'Tiket Pelatnas Olimpiade Internasional (IPhO, IBO, IChO) & Beasiswa Unggulan',
        description: 'Kompetisi sains paling prestisius di Indonesia untuk menguji kemampuan akademik murni dan pemecahan soal berstandar internasional.',
        requirements: ['Lolos seleksi OSN-K (Kota/Kabupaten) dan OSN-P (Provinsi)', 'Maksimal usia 18 tahun'],
        link: 'https://bpti.kemdikbud.go.id'
      },
      {
        id: 'lkir-brin-2025',
        title: 'LKIR (Lomba Karya Ilmiah Remaja) BRIN ke-57',
        organizer: 'Badan Riset dan Inovasi Nasional (BRIN)',
        level: 'Nasional',
        registrationPeriod: 'Mei - Juli',
        rewards: 'Dana Pembinaan, Fasilitas Mentoring Periset BRIN & Rekomendasi ISEF Amerika Serikat',
        description: 'Kompetisi riset remaja terlama di Indonesia yang membuka kesempatan siswa dimentori langsung oleh peneliti utama BRIN.',
        requirements: ['Proposal penelitian inovatif', 'Kategori IPA & Rekayasa Teknik', 'Siswa SMP/SMA'],
        link: 'https://brin.go.id'
      }
    ]
  },
  teknologi: {
    key: 'teknologi',
    name: 'Teknologi & Rekayasa Komputasi',
    badge: 'Tech Innovator',
    icon: 'fa-solid fa-laptop-code',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    gradient: 'from-indigo-500 to-blue-600',
    description: 'Kamu memiliki kecerdasan komputasional yang tajam, sangat menyukai dunia pemrograman, algoritma logika, otomasi cerdas, kecerdasan buatan (AI), serta perekayasaan sistem software dan hardware.',
    strengths: [
      'Kemampuan computational thinking & problem solving',
      'Cepat mempelajari bahasa pemrograman & framework baru',
      'Kreatif merancang solusi sistem otomatis dan aplikasi digital',
      'Fokus mendalam dan ketahanan dalam debugging kesalahan'
    ],
    careerProspects: ['Software Engineer', 'AI / Machine Learning Engineer', 'Cyber Security Specialist', 'Robotics Engineer', 'Cloud Architect'],
    competitions: [
      {
        id: 'osn-informatika-2025',
        title: 'OSN Bidang Informatika & Pemrograman (TOKI)',
        organizer: 'BPTI & Tim Olimpiade Komputer Indonesia (TOKI)',
        level: 'Nasional',
        registrationPeriod: 'Januari - Maret',
        rewards: 'Medali, Akses Langsung Seleksi IOI (International Olympiad in Informatics)',
        description: 'Kompetisi pemrograman kompetitif menguji struktur data, algoritma graf, dynamic programming, dan problem solving kompleks.',
        requirements: ['Siswa aktif SMA/SMK', 'Bahasa pemrograman C++', 'Logika matematika kuat'],
        link: 'https://toki.id'
      },
      {
        id: 'hackathon-pelajar-2025',
        title: 'National High School Hackathon & App Challenge',
        organizer: 'CompFest Fasilkom UI / Arkavidia ITB',
        level: 'Nasional',
        registrationPeriod: 'Juni - Agustus',
        rewards: 'Total Hadiah Rp 45 Juta, Free Cloud Credit, Peluang Inkubasi Startup Pelajar',
        description: 'Tantangan 48 jam membangun prototipe aplikasi mobile atau web yang memecahkan masalah nyata di lingkungan sekolah dan sosial.',
        requirements: ['Tim 2-3 orang', 'Prototipe fungsional (Web/Mobile/AI)', 'Pitch deck slide presentasi'],
        link: 'https://compfest.id'
      },
      {
        id: 'robotika-iot-2025',
        title: 'Madrasah & National High School Robotic Competition (MRC)',
        organizer: 'Kementerian Agama & Komite Robotika Indonesia',
        level: 'Nasional',
        registrationPeriod: 'September - November',
        rewards: 'Piala Bergilir Menteri, Uang Pembinaan & Golden Ticket Masuk PTN Teknik',
        description: 'Kompetisi perakitan dan pemrograman robot otomatis, IoT (Internet of Things), dan mobile autonomous robots.',
        requirements: ['Siswa SMA/MA/SMK', 'Membawa kit robotik dan micro-controller (Arduino/ESP32)'],
        link: 'https://kemenag.go.id'
      }
    ]
  },
  seni: {
    key: 'seni',
    name: 'Seni, Desain & Kreativitas Visual',
    badge: 'Creative Prodigy',
    icon: 'fa-solid fa-palette',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    gradient: 'from-pink-500 to-rose-500',
    description: 'Kamu diberkahi imajinasi visual yang kaya, kepekaan estetika komposisi warna, bakat mengekspresikan emosi lewat karya visual/multimedia/audio, serta pandai membuat konten yang menyentuh hati audiens.',
    strengths: [
      'Kreativitas orisinal & sensibilitas estetika visual tinggi',
      'Kemampuan menyampaikan narasi emosional lewat media visual',
      'Keahlian dalam ilustrasi, tipografi, fotografi, atau videografi',
      'Kemampuan berpikir out-of-the-box dan fleksibilitas artistik'
    ],
    careerProspects: ['UI/UX Designer', 'Creative Director', 'Animator & 3D Artist', 'Illustrator', 'Video Editor & Filmmaker'],
    competitions: [
      {
        id: 'fls2n-seni-2025',
        title: 'FLS2N (Festival dan Lomba Seni Siswa Nasional)',
        organizer: 'Balai Pengembangan Talenta Indonesia (BPTI)',
        level: 'Nasional',
        registrationPeriod: 'Maret - Mei',
        rewards: 'Medali Emas/Perak/Perunggu Seni, Tabungan Pendidikan & Piagam Prestasi',
        description: 'Festival seni tahunan resmi tingkat nasional untuk cabang Desain Poster Digital, Film Pendek Dokumenter, Kriya Seni, dan Komik Strip.',
        requirements: ['Siswa aktif SMA/SMK', 'Karya orisinil dengan tema pelestarian budaya & karakter bangsa'],
        link: 'https://bpti.kemdikbud.go.id'
      },
      {
        id: 'indonesia-student-design-2025',
        title: 'National Student Digital Illustration & Poster Awards',
        organizer: 'Asosiasi Desainer Grafis Indonesia (ADGI) & Institut Kesenian Jakarta',
        level: 'Nasional',
        registrationPeriod: 'Juli - September',
        rewards: 'Pen Tablet Grafis Profesional, Lisensi Software Desain & Beasiswa DKV',
        description: 'Ajang unjuk karya ilustrasi digital dan desain visual masa kini yang dinilai langsung oleh kurator seni dan art director profesional.',
        requirements: ['File resolusi tinggi 300 DPI', 'Konsep filosofi karya tertulis', 'Format digital artwork'],
        link: 'https://adgi.or.id'
      },
      {
        id: 'short-film-pelajar-2025',
        title: 'Festival Film Pendek & Sinematografi Pelajar Indonesia',
        organizer: 'Festival Film Indonesia (FFI) Edukasi & Kemendikbudristek',
        level: 'Nasional',
        registrationPeriod: 'Agustus - Oktober',
        rewards: 'Piala Pelajar Emas, Masterclass Sinematografi & Pemutaran di Bioskop Komunitas',
        description: 'Kompetisi pembuatan karya film fiksi dan dokumenter pendek berdurasi 5-15 menit karya pelajar.',
        requirements: ['Tim produksi pelajar', 'Format MP4 Full HD 1080p', 'Poster & Sinopsis film'],
        link: 'https://festivalfilm.id'
      }
    ]
  },
  olahraga: {
    key: 'olahraga',
    name: 'Olahraga, Atletik & Kebugaran Fisik',
    badge: 'Sports Champion',
    icon: 'fa-solid fa-person-running',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    gradient: 'from-amber-500 to-orange-500',
    description: 'Kamu memiliki energi kinetik melimpah, ketahanan fisik dan kelincahan motorik prima, jiwa sportivitas tinggi, serta semangat pantang menyerah dalam strategi pertandingan tim maupun individu.',
    strengths: [
      'Daya tahan kardiovaskular, kecepatan, dan refleks motorik unggul',
      'Kepemimpinan lapangan & kerjasama tim yang solid',
      'Disiplin ketat dalam latihan dan manajemen kebugaran',
      'Mentalitas juara dan kemampuan mengatasi tekanan pertandingan'
    ],
    careerProspects: ['Atlet Profesional', 'Pelatih Kebugaran / Coach Fisik', 'Sport Physiotherapist', 'Manajer Klub Olahraga', 'Event Organizer Olahraga'],
    competitions: [
      {
        id: 'o2sn-2025',
        title: 'O2SN (Olimpiade Olahraga Siswa Nasional)',
        organizer: 'BPTI & Komite Olahraga Nasional Indonesia (KONI)',
        level: 'Nasional',
        registrationPeriod: 'Februari - Mei',
        rewards: 'Medali Nasional, Jalur Prestasi PPDB PTN & Pembinaan Pelatda PON Remaja',
        description: 'Ajang kejuaraan multi-cabang olahraga pelajar tingkat nasional: Atletik Lari/Lompat, Renang, Pencak Silat, Karate, dan Bulutangkis.',
        requirements: ['Surat rekomendasi sekolah dan Dispora setempat', 'Lolos seleksi kabupaten/provinsi'],
        link: 'https://bpti.kemdikbud.go.id'
      },
      {
        id: 'dbl-basket-2025',
        title: 'Development Basketball League (DBL) High School Series',
        organizer: 'DBL Indonesia',
        level: 'Provinsi',
        registrationPeriod: 'Bervariasi per seri regional (Juli - Desember)',
        rewards: 'DBL Indonesia All-Star (Pelatihan di Amerika Serikat) & Beasiswa Kuliah',
        description: 'Kompetisi bola basket dan dance pelajar terbesar di Indonesia dengan standar regulasi ketat yang menjunjung student-athlete berprestasi.',
        requirements: ['Rapor akademik memenuhi standar minimal', 'Tim sekolah putra/putri'],
        link: 'https://www.dbl.id'
      },
      {
        id: 'piala-menpora-esport-2025',
        title: 'Piala Menpora & Liga E-Sports Pelajar Nasional',
        organizer: 'Kemenpora RI & Pengurus Besar Esports Indonesia (PB ESI)',
        level: 'Nasional',
        registrationPeriod: 'Juli - September',
        rewards: 'Total Hadiah Rp 100 Juta, Sertifikat Menpora & Jalur Masuk Tim Pro Akademi',
        description: 'Kompetisi e-sports resmi pelajar untuk game taktis beregu (Mobile Legends, PUBG Mobile, Valorant) dengan fokus strategi dan kepemimpinan.',
        requirements: ['Surat izin kepala sekolah', 'Akun terverifikasi resmi', 'Tim 5 orang'],
        link: 'https://pbesi.org'
      }
    ]
  },
  bahasa: {
    key: 'bahasa',
    name: 'Bahasa, Komunikasi & Literasi Sastra',
    badge: 'Master of Discourse',
    icon: 'fa-solid fa-microphone-lines',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    gradient: 'from-cyan-500 to-sky-600',
    description: 'Kamu sangat piawai dalam merangkai kata-kata, memiliki wawasan retorika yang luas, percaya diri dalam public speaking, mahir bernegosiasi persuasif, dan berbakat dalam karya sastra maupun bahasa asing.',
    strengths: [
      'Artikulasi vokal & retorika persuasif yang memukau',
      'Kemampuan menulis esai kritis, fiksi, atau jurnalistik mendalam',
      'Kemampuan analisis argumen dan berpikir cepat saat berdebat',
      'Kecakapan berkomunikasi lintas budaya dan bahasa asing'
    ],
    careerProspects: ['Diplomat Luar Negeri', 'Jurnalis / Produser Berita', 'Public Relations Specialist', 'Lawyer / Pengacara', 'Author / Penulis Buku'],
    competitions: [
      {
        id: 'nsdc-ldbi-2025',
        title: 'NSDC & LDBI (National Schools Debating Championship / Lomba Debat Bahasa Indonesia)',
        organizer: 'Pusat Prestasi Nasional (Puspresnas)',
        level: 'Nasional',
        registrationPeriod: 'Mei - Juli',
        rewards: 'Medali Debat Nasional, Piagam Kemendikbud & Delegasi WSDC Dunia',
        description: 'Kompetisi debat parlemen tingkat nasional menggunakan sistem World Schools Style dalam Bahasa Indonesia dan Bahasa Inggris.',
        requirements: ['Tim 3 delegasi perwakilan sekolah/provinsi', 'Menguasai mosi sosial politik ekonomi dunia'],
        link: 'https://pusatprestasinasional.kemdikbud.go.id'
      },
      {
        id: 'mun-pelajar-2025',
        title: 'Indonesia Youth Model United Nations (IY-MUN)',
        organizer: 'Indonesian Youth Diplomacy & Universitas Terkemuka',
        level: 'Nasional',
        registrationPeriod: 'Agustus - Oktober',
        rewards: 'Best Delegate Award, Honorable Mention & Rekomendasi MUN Jenewa Swiss',
        description: 'Simulasi sidang Perserikatan Bangsa-Bangsa (PBB) di mana siswa berperan sebagai duta besar negara anggota untuk memecahkan krisis global.',
        requirements: ['Penulisan Position Paper sesuai dewan yang dipilih (UNHCR, WHO, UNSC)', 'Kefasihan Bahasa Inggris'],
        link: 'https://indonesianyouthdiplomacy.org'
      },
      {
        id: 'lomba-esai-literasi-2025',
        title: 'Festival Literasi Siswa & Lomba Menulis Esai Kritis Nasional',
        organizer: 'Badan Pengembangan dan Pembinaan Bahasa Kemendikbudristek',
        level: 'Nasional',
        registrationPeriod: 'Oktober (Bulan Bahasa)',
        rewards: 'Uang Pembinaan, Penerbitan Buku Antologi Ber-ISBN & Laptop',
        description: 'Lomba karya cipta esai opini publik dan ulasan kritis pelajar untuk menumbuhkan budaya berpikir kritis dan cinta literasi membaca.',
        requirements: ['Naskah esai orisinil 1.500 - 2.500 kata', 'Bebas plagiarisme (Turnitin < 15%)'],
        link: 'https://badanbahasa.kemdikbud.go.id'
      }
    ]
  },
  bisnis: {
    key: 'bisnis',
    name: 'Bisnis, Kewirausahaan & Inovasi Sosial',
    badge: 'Future Entrepreneur',
    icon: 'fa-solid fa-briefcase',
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200',
    gradient: 'from-violet-500 to-purple-600',
    description: 'Kamu memiliki kepekaan tajam terhadap peluang pasar, naluri kepemimpinan bisnis yang kuat, pola pikir strategis dalam manajemen modal dan pemasaran, serta visi menciptakan inovasi produk yang berdampak positif.',
    strengths: [
      'Pola pikir komersial & kepekaan membaca kebutuhan konsumen',
      'Kemampuan pitching dan negosiasi bisnis yang meyakinkan',
      'Kecakapan perencanaan anggaran dan manajemen risiko',
      'Visi inovasi sosial dan kepemimpinan organisasi'
    ],
    careerProspects: ['Startup Founder / CEO', 'Investment Banker / Keuangan', 'Product Manager', 'Business Development Director', 'Konsultan Manajemen'],
    competitions: [
      {
        id: 'fiksi-2025',
        title: 'FIKSI (Festival Inovasi dan Kewirausahaan Siswa Indonesia)',
        organizer: 'Balai Pengembangan Talenta Indonesia (BPTI) Kemendikbudristek',
        level: 'Nasional',
        registrationPeriod: 'Juni - September',
        rewards: 'Medali Emas Wirausaha Muda, Modal Pengembangan Usaha & Ekspo Nasional',
        description: 'Kompetisi rencana bisnis dan validasi produk inovasi karya pelajar tingkat SMA/MA dalam bidang Boga, Grafika, Fashion, dan Aplikasi Bisnis Digital.',
        requirements: ['Proposal Rencana Bisnis (Business Plan)', 'Prototipe atau sampel produk siap jual', 'Tim 1-2 siswa'],
        link: 'https://bpti.kemdikbud.go.id'
      },
      {
        id: 'business-plan-itb-ui-2025',
        title: 'National High School Business Pitch Competition',
        organizer: 'SBM ITB & FEB UI Entrepreneurship Center',
        level: 'Nasional',
        registrationPeriod: 'Agustus - Oktober',
        rewards: 'Total Hadiah Rp 40 Juta, Mentoring Bersama Venture Capital & Golden Ticket Kuliah Bisnis',
        description: 'Ajang mempresentasikan model bisnis inovatif dan berkelanjutan (ESG) di hadapan panel investor modal ventura dan CEO industri terkemuka.',
        requirements: ['Executive Summary dan Pitch Deck 10 Slide', 'Analisis finansial 3 tahun'],
        link: 'https://sbm.itb.ac.id'
      },
      {
        id: 'social-venture-pelajar-2025',
        title: 'Young Social Entrepreneurs Competition',
        organizer: 'Singapore International Foundation & Komunitas Startup Muda Indonesia',
        level: 'Internasional',
        registrationPeriod: 'Januari - Maret',
        rewards: 'Seed Funding hingga $10,000 USD & Workshop Internasional di Singapura',
        description: 'Kompetisi inisiatif bisnis sosial yang bertujuan mengatasi tantangan kemiskinan, pendidikan, atau lingkungan melalui kewirausahaan.',
        requirements: ['Model bisnis sosial berkelanjutan', 'Bahasa Inggris aktif', 'Tim 2-4 orang'],
        link: 'https://sif.org.sg'
      }
    ]
  }
};

export const DEFAULT_QUESTIONS: Question[] = [];

export const SAMPLE_RESPONSES: SurveyResponse[] = [];

export const CLASS_OPTIONS: string[] = [];
