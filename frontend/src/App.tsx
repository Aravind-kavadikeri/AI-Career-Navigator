import React, { useState } from 'react';
import { CareerProvider, useCareer } from './context/CareerContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { AICareerAssistant } from './components/ai/AICareerAssistant';
import { PresentationModeModal } from './components/presentation/PresentationModeModal';
import { SpaceCosmosSplash } from './components/splash/SpaceCosmosSplash';
import { LandingPage } from './pages/LandingPage';
import { OnboardingWizard } from './pages/OnboardingWizard';
import { AnalysisSimulation } from './pages/AnalysisSimulation';
import { Dashboard } from './pages/Dashboard';
import { CareerProfilePage } from './pages/CareerProfilePage';
import { CareerMatchesPage } from './pages/CareerMatchesPage';
import { SkillGapPage } from './pages/SkillGapPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { LearningPage } from './pages/LearningPage';
import { CareerExplorerPage } from './pages/CareerExplorerPage';
import { ProgressPage } from './pages/ProgressPage';
import { StudentProfile } from './types';

const MainAppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    profile,
    setProfile,
    runAnalysis,
    loadDemo,
    currentFlow,
    setCurrentFlow
  } = useCareer();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleStartOnboarding = () => {
    setCurrentFlow('onboarding');
  };

  const handleOnboardingComplete = async (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    setCurrentFlow('analyzing');
    try {
      await runAnalysis(updatedProfile);
    } catch (err) {
      console.error('Analysis failed', err);
    }
  };

  const handleSimulationFinished = () => {
    setCurrentFlow('app');
    setActiveTab('dashboard');
  };

  const handleEditProfile = () => {
    setCurrentFlow('onboarding');
  };

  // If in 3D Space Cosmos Splashscreen
  if (currentFlow === 'splash') {
    return (
      <SpaceCosmosSplash
        onEnterApp={() => setCurrentFlow('landing')}
        onLoadDemo={loadDemo}
      />
    );
  }

  // If in Onboarding flow
  if (currentFlow === 'onboarding') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100">
        <Navbar />
        <OnboardingWizard
          initialProfile={profile}
          onComplete={handleOnboardingComplete}
          onCancel={() => setCurrentFlow('landing')}
        />
        <PresentationModeModal />
      </div>
    );
  }

  // If in Animated AI Analysis flow
  if (currentFlow === 'analyzing') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100">
        <Navbar />
        <AnalysisSimulation onFinish={handleSimulationFinished} />
        <PresentationModeModal />
      </div>
    );
  }

  // If on Landing page (and not in active app)
  if (currentFlow === 'landing') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100">
        <Navbar />
        <LandingPage onStartOnboarding={handleStartOnboarding} />
        <AICareerAssistant />
        <PresentationModeModal />
      </div>
    );
  }

  // Active Main App Layout
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 flex flex-col">
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(prev => !prev)}
        isMobileMenuOpen={isMobileMenuOpen}
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Drawer */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden bg-slate-950/80 backdrop-blur-sm">
            <div className="w-64 h-full bg-white dark:bg-slate-900 p-4 border-r border-slate-200 dark:border-slate-800">
              <Sidebar onCloseMobile={() => setIsMobileMenuOpen(false)} />
            </div>
          </div>
        )}

        {/* Main View Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-5xl">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'career-profile' && <CareerProfilePage onEditProfile={handleEditProfile} />}
          {activeTab === 'career-matches' && <CareerMatchesPage />}
          {activeTab === 'skill-gap' && <SkillGapPage />}
          {activeTab === 'roadmap' && <RoadmapPage />}
          {activeTab === 'projects' && <ProjectsPage />}
          {activeTab === 'learning' && <LearningPage />}
          {activeTab === 'career-explorer' && <CareerExplorerPage />}
          {activeTab === 'progress' && <ProgressPage />}
        </main>

      </div>

      {/* Persistent AI Assistant & Presentation Modal */}
      <AICareerAssistant />
      <PresentationModeModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <CareerProvider>
      <MainAppContent />
    </CareerProvider>
  );
};

export default App;
