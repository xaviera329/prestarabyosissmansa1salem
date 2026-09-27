/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ClassItem,
  Competition,
  StudentProfile,
  SurveyResponse,
  FirebaseAppConfig
} from './types';
import { firebaseService, DEFAULT_FIREBASE_CONFIG } from './services/firebaseService';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { SurveyWizard } from './components/SurveyWizard';
import { ResultSection } from './components/ResultSection';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminModal } from './components/AdminModal';
import { FirebaseConfigModal } from './components/FirebaseConfigModal';
import { SingleFileExportModal } from './components/SingleFileExportModal';
import { FAQModal } from './components/FAQModal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'survey' | 'result' | 'admin'>('landing');
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [currentResponse, setCurrentResponse] = useState<SurveyResponse | null>(null);

  // Loading states
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [isSubmittingSurvey, setIsSubmittingSurvey] = useState(false);
  const [isSavingClass, setIsSavingClass] = useState(false);

  // Modals
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);
  const [showFirebaseConfigModal, setShowFirebaseConfigModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);

  // Firebase Config State
  const [firebaseConfig, setFirebaseConfig] = useState<FirebaseAppConfig>(firebaseService.getConfig());
  const [isRealFirebase, setIsRealFirebase] = useState<boolean>(firebaseService.isRealFirebase());

  // Real-time listeners for classes and responses
  useEffect(() => {
    let unsubscribeClasses: () => void = () => {};
    let unsubscribeResponses: () => void = () => {};

    const init = async () => {
      // 1. Subscribe to classes collection
      unsubscribeClasses = firebaseService.subscribeToClasses((cList) => {
        setClasses(cList);
      });

      // 2. Subscribe to responses collection
      unsubscribeResponses = firebaseService.subscribeToResponses((rList) => {
        setResponses(rList);
      });

      setIsAdmin(firebaseService.isAdminLoggedIn());
      setIsRealFirebase(firebaseService.isRealFirebase());
    };
    init();

    return () => {
      if (unsubscribeClasses) unsubscribeClasses();
      if (unsubscribeResponses) unsubscribeResponses();
    };
  }, []);

  // Handlers for Authentication
  const handleGoogleSignIn = async () => {
    setIsLoadingAuth(true);
    try {
      const result = await firebaseService.signInWithGoogle();
      if (result.user) {
        setStudent({
          name: result.user.displayName || 'Siswa',
          studentClass: '',
          email: result.user.email || undefined,
          photoURL: result.user.photoURL || undefined
        });
      } else if (result.mockUser) {
        setStudent({
          name: result.mockUser.displayName,
          studentClass: '',
          email: result.mockUser.email,
          photoURL: result.mockUser.photoURL
        });
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleStartSurvey = (name: string, studentClass: string) => {
    setStudent((prev) => ({
      name,
      studentClass,
      email: prev?.email,
      photoURL: prev?.photoURL
    }));
    setCurrentPage('survey');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitSurvey = async (responsePayload: Omit<SurveyResponse, 'id'>) => {
    setIsSubmittingSurvey(true);
    try {
      const saved = await firebaseService.saveResponse(responsePayload);
      setCurrentResponse(saved);
      setResponses((prev) => [saved, ...prev.filter((r) => r.id !== saved.id)]);
      setCurrentPage('result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsSubmittingSurvey(false);
    }
  };

  const handleRetakeSurvey = () => {
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Admin Handlers
  const handleAdminLogin = async (email: string, pass: string) => {
    setIsLoadingAuth(true);
    try {
      await firebaseService.signInAdmin(email, pass);
      setIsAdmin(true);
      const rList = await firebaseService.getResponses();
      setResponses(rList);
      setCurrentPage('admin');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogoutAdmin = async () => {
    await firebaseService.signOutAdmin();
    setIsAdmin(false);
    setCurrentPage('landing');
  };

  const handleLogoutStudent = async () => {
    await firebaseService.signOutStudent();
    setStudent(null);
    setCurrentResponse(null);
    setCurrentPage('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Class Management Handlers
  const handleAddClass = async (name: string) => {
    setIsSavingClass(true);
    try {
      await firebaseService.addClass(name);
    } finally {
      setIsSavingClass(false);
    }
  };

  const handleDeleteClass = async (id: string) => {
    await firebaseService.deleteClass(id);
  };

  // Firebase Config Handlers
  const handleSaveFirebaseConfig = (config: FirebaseAppConfig) => {
    firebaseService.saveConfig(config);
    setFirebaseConfig(config);
    setIsRealFirebase(firebaseService.isRealFirebase());
  };

  const handleResetFirebaseConfig = () => {
    firebaseService.resetConfigToDummy();
    setFirebaseConfig(DEFAULT_FIREBASE_CONFIG);
    setIsRealFirebase(false);
  };

  return (
    <div className={`min-h-screen ${currentPage === 'landing' ? 'bg-[#0b54cb]' : 'bg-slate-50/70'} text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]`}>
      {/* Navbar: displayed on internal pages (survey, result, admin) */}
      {currentPage !== 'landing' && (
        <Navbar
          currentStudent={student}
          isAdmin={isAdmin}
          onNavigate={(page) => {
            if (page === 'admin' && !isAdmin) {
              setShowAdminLoginModal(true);
            } else {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          onOpenAdminLogin={() => setShowAdminLoginModal(true)}
          onOpenFAQ={() => setShowFAQModal(true)}
          onLogoutAdmin={handleLogoutAdmin}
          onLogoutStudent={handleLogoutStudent}
        />
      )}

      {/* Main Content Area with Smooth Page Transitions */}
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <motion.main
            key="landing"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex-1 w-full flex flex-col"
          >
            <LandingHero
              currentStudent={student}
              classes={classes}
              onGoogleSignIn={handleGoogleSignIn}
              onStartSurvey={handleStartSurvey}
              isLoadingAuth={isLoadingAuth}
              onOpenAdminLogin={() => setShowAdminLoginModal(true)}
              onOpenFAQ={() => setShowFAQModal(true)}
              onOpenFirebaseConfig={() => setShowFirebaseConfigModal(true)}
              onOpenExportModal={() => setShowExportModal(true)}
              onLogoutStudent={handleLogoutStudent}
            />
          </motion.main>
        )}

        {currentPage === 'survey' && student && (
          <motion.main
            key="survey"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex-1 w-full mx-auto max-w-5xl px-4 sm:px-6 py-8"
          >
            <SurveyWizard
              classes={classes}
              student={student}
              onSubmit={handleSubmitSurvey}
              onExit={() => setCurrentPage('landing')}
              onLogoutStudent={handleLogoutStudent}
              isSubmitting={isSubmittingSurvey}
            />
          </motion.main>
        )}

        {currentPage === 'result' && currentResponse && (
          <motion.main
            key="result"
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="flex-1 w-full mx-auto max-w-5xl px-4 sm:px-6 py-8"
          >
            <ResultSection
              response={currentResponse}
              onRetake={handleRetakeSurvey}
              onOpenCompetitionModal={(_c: Competition) => {}}
            />
          </motion.main>
        )}

        {currentPage === 'admin' && isAdmin && (
          <motion.main
            key="admin"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex-1 w-full mx-auto max-w-5xl px-4 sm:px-6 py-8"
          >
            <AdminDashboard
              responses={responses}
              classes={classes}
              onAddClass={handleAddClass}
              onDeleteClass={handleDeleteClass}
              onLogoutAdmin={handleLogoutAdmin}
              isSavingClass={isSavingClass}
            />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Clean Professional Footer for Internal Pages */}
      {currentPage !== 'landing' && (
        <footer className="mt-auto py-5 border-t border-slate-200/80 bg-white/70 backdrop-blur-xs text-center text-xs text-slate-500 space-y-0.5">
          <div className="max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
            <p>
              © {new Date().getFullYear()} <strong>PRESTARA</strong> — Survei Minat dan Potensi Siswa
            </p>
            <p className="text-[11px] text-slate-400 font-medium">
              By @osissman1salem
            </p>
          </div>
        </footer>
      )}

      {/* Modals */}
      <AdminModal
        isOpen={showAdminLoginModal}
        onClose={() => setShowAdminLoginModal(false)}
        onLogin={handleAdminLogin}
        isLoading={isLoadingAuth}
      />

      <FirebaseConfigModal
        isOpen={showFirebaseConfigModal}
        onClose={() => setShowFirebaseConfigModal(false)}
        currentConfig={firebaseConfig}
        onSaveConfig={handleSaveFirebaseConfig}
        onResetConfig={handleResetFirebaseConfig}
        isRealFirebase={isRealFirebase}
      />

      <SingleFileExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        currentConfig={firebaseConfig}
      />

      <FAQModal
        isOpen={showFAQModal}
        onClose={() => setShowFAQModal(false)}
      />
    </div>
  );
}
