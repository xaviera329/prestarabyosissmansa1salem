export type TalentCategoryKey = 'sains' | 'teknologi' | 'seni' | 'olahraga' | 'bahasa' | 'bisnis';

export interface CategoryDetail {
  key: TalentCategoryKey;
  name: string;
  badge: string;
  icon: string; // FontAwesome icon class
  color: string;
  bgColor: string;
  borderColor: string;
  gradient: string;
  description: string;
  strengths: string[];
  careerProspects: string[];
  competitions: Competition[];
}

export interface Competition {
  id: string;
  title: string;
  organizer: string;
  level: 'Sekolah' | 'Kabupaten/Kota' | 'Provinsi' | 'Nasional' | 'Internasional';
  registrationPeriod: string;
  rewards: string;
  description: string;
  requirements: string[];
  link: string;
}

export interface QuestionOption {
  category: TalentCategoryKey;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
  createdAt?: number;
}

export interface ClassItem {
  id: string;
  name: string;
  createdAt?: number;
}

export interface StudentProfile {
  name: string;
  studentClass: string;
  email?: string;
  photoURL?: string;
}

export interface SurveyResponse {
  id: string;
  studentName: string;
  studentClass: string;
  studentEmail?: string;
  photoURL?: string;
  
  // Section B: Minat Siswa
  selectedInterests: string[]; // Jawaban Nomor 4 (Pilihan Ganda Checkbox)
  topInterestToDevelop: string; // Jawaban Nomor 5 (Isian Teks Singkat)
  
  // Section C: Potensi dan Kemampuan
  selectedAbilities: string[]; // Jawaban Nomor 6 (Pilihan Ganda Checkbox)
  untriedOpportunityWish: string; // Jawaban Nomor 7 (Isian Paragraf)
  
  // Analisis & Rekomendasi
  dominantCategory?: TalentCategoryKey;
  categoryScores?: Record<TalentCategoryKey, number>;
  answers?: Record<string, any>;
  
  submittedAt: string;
  timestamp: number;
}

export interface FirebaseAppConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  firestoreDatabaseId?: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}
