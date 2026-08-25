import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  AnalysisReport,
  ActiveTab,
  RoadmapStage,
  ColorTheme,
  ThemeMode
} from '../types';
import { api } from '../services/api';
import confetti from 'canvas-confetti';

export type AppFlow = 'splash' | 'landing' | 'onboarding' | 'analyzing' | 'app';

interface CareerContextType {
  profile: StudentProfile;
  setProfile: React.Dispatch<React.SetStateAction<StudentProfile>>;
  analysisReport: AnalysisReport | null;
  setAnalysisReport: React.Dispatch<React.SetStateAction<AnalysisReport | null>>;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  targetRole: string;
  setTargetRole: (role: string) => void;
  currentFlow: AppFlow;
  setCurrentFlow: (flow: AppFlow) => void;
  isDarkMode: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
  toggleTheme: () => void;
  isPresentationMode: boolean;
  togglePresentationMode: () => void;
  isAssistantOpen: boolean;
  toggleAssistant: () => void;
  isLoading: boolean;
  runAnalysis: (customProfile?: StudentProfile, explicitTargetRole?: string) => Promise<AnalysisReport>;
  loadDemo: () => Promise<void>;
  toggleMilestoneCompletion: (milestoneId: string, completed: boolean) => Promise<void>;
}

const defaultProfile: StudentProfile = {
  name: 'Alex Student',
  college: 'National Institute of Technology',
  degree: 'B.Tech Data Science',
  current_semester: 6,
  cgpa: 8.4,
  preferred_career: 'Data Scientist',
  career_readiness_score: 82,
  skills: [
    { name: 'Python', level: 88, category: 'Technical' },
    { name: 'SQL', level: 76, category: 'Technical' },
    { name: 'Statistics', level: 64, category: 'AI/Data' },
    { name: 'Machine Learning', level: 61, category: 'AI/Data' },
    { name: 'Data Visualization', level: 72, category: 'AI/Data' },
    { name: 'Deep Learning', level: 42, category: 'AI/Data' },
    { name: 'Data Analysis', level: 80, category: 'AI/Data' },
    { name: 'Mathematics', level: 70, category: 'AI/Data' },
    { name: 'Excel', level: 75, category: 'Technical' },
    { name: 'Power BI', level: 68, category: 'Technical' },
    { name: 'JavaScript', level: 55, category: 'Technical' },
    { name: 'HTML', level: 70, category: 'Technical' },
    { name: 'CSS', level: 65, category: 'Technical' },
  ],
  projects: [
    {
      name: 'Student Academic Performance Prediction',
      description: 'Built a supervised regression model predicting semester GPA from historical engagement metrics with Scikit-Learn.',
      technologies: ['Python', 'Scikit-Learn', 'Pandas'],
      project_type: 'Academic Capstone',
      difficulty: 'Intermediate'
    },
    {
      name: 'Customer Churn Diagnostic Analyzer',
      description: 'Exploratory data analysis and logistic regression pipeline to identify drivers of telecom subscription cancellations.',
      technologies: ['Python', 'Pandas', 'SQL', 'Seaborn'],
      project_type: 'Portfolio Project',
      difficulty: 'Intermediate'
    },
    {
      name: 'AI Resume Analyzer & Keyword Matcher',
      description: 'Text parsing application extracting key skills from PDF resumes and matching against job description postings.',
      technologies: ['Python', 'NLP', 'FastAPI'],
      project_type: 'Independent Project',
      difficulty: 'Intermediate'
    }
  ],
  certifications: [
    { name: 'Python for Data Science & ML Bootcamp', issuer: 'Udemy / Jose Portilla', year: '2024' },
    { name: 'Data Visualization with Python & Power BI', issuer: 'Coursera / IBM', year: '2025' },
    { name: 'AI Fundamentals & Ethics', issuer: 'Google Cloud', year: '2025' }
  ],
  interests: ['Data Science', 'Artificial Intelligence', 'Machine Learning', 'Data Analytics']
};

const CareerContext = createContext<CareerContextType | undefined>(undefined);

export const CareerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile);
  const [analysisReport, setAnalysisReport] = useState<AnalysisReport | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [targetRole, setTargetRoleState] = useState<string>('Data Scientist');
  const [currentFlow, setCurrentFlow] = useState<AppFlow>('splash');

  
  // Theme state persisted in localStorage (Default: Premium Obsidian Black)
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('career_navigator_theme_mode') as ThemeMode) || 'dark';
  });
  
  const [colorTheme, setColorThemeState] = useState<ColorTheme>(() => {
    return (localStorage.getItem('career_navigator_color_theme') as ColorTheme) || 'obsidian';
  });

  const isDarkMode = themeMode === 'dark' || (themeMode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync theme mode and color palette with HTML root
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.setAttribute('data-theme', colorTheme);
  }, [isDarkMode, colorTheme]);

  // Run initial analysis with demo data on mount
  useEffect(() => {
    runAnalysis(defaultProfile).catch((err) => console.log('Initial analysis setup:', err));
  }, []);

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode);
    localStorage.setItem('career_navigator_theme_mode', mode);
  };

  const setColorTheme = (theme: ColorTheme) => {
    setColorThemeState(theme);
    localStorage.setItem('career_navigator_color_theme', theme);
  };

  const toggleTheme = () => {
    const nextMode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
  };

  const togglePresentationMode = () => {
    setIsPresentationMode((prev) => !prev);
  };

  const toggleAssistant = () => {
    setIsAssistantOpen((prev) => !prev);
  };

  const setTargetRole = async (newRole: string) => {
    setTargetRoleState(newRole);
    try {
      const [updatedRoadmap, updatedGap, updatedProjects] = await Promise.all([
        api.getRoadmap(profile.id || 'demo-alex-student', newRole),
        api.getSkillGap(profile.id || 'demo-alex-student', newRole),
        api.getProjectRecommendations(profile.id || 'demo-alex-student', newRole)
      ]);
      setAnalysisReport((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          top_career_match: newRole,
          roadmap: updatedRoadmap,
          primary_skill_gaps: updatedGap,
          project_recommendations: updatedProjects
        };
      });
    } catch (err) {
      console.warn('Failed to update roadmap on targetRole change', err);
    }
  };

  const runAnalysis = async (customProfile?: StudentProfile, explicitTargetRole?: string): Promise<AnalysisReport> => {
    setIsLoading(true);
    const profileToAnalyze = customProfile || profile;
    try {
      const report = await api.analyzeCareer(profileToAnalyze);
      setAnalysisReport(report);
      setProfile((prev) => ({
        ...prev,
        id: report.profile_id,
        career_readiness_score: report.career_readiness_score
      }));
      const resolvedRole = explicitTargetRole || report.top_career_match || profileToAnalyze.preferred_career || 'Data Scientist';
      setTargetRoleState(resolvedRole);
      setIsLoading(false);
      return report;
    } catch (error) {
      console.error('Failed to run analysis', error);
      setIsLoading(false);
      throw error;
    }
  };

  const loadDemo = async () => {
    setIsLoading(true);
    try {
      const demoData = await api.loadDemoProfile();
      setProfile(demoData);
      const report = await runAnalysis(demoData);
      setAnalysisReport(report);
      setCurrentFlow('app');
      setActiveTab('dashboard');
      setIsLoading(false);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (error) {
      console.error('Demo load fallback', error);
      setProfile(defaultProfile);
      await runAnalysis(defaultProfile);
      setCurrentFlow('app');
      setActiveTab('dashboard');
      setIsLoading(false);
    }
  };

  const toggleMilestoneCompletion = async (milestoneId: string, completed: boolean) => {
    if (!analysisReport) return;

    const updatedRoadmap = analysisReport.roadmap.map((stage) => {
      if (stage.id === milestoneId) {
        return { ...stage, is_completed: completed };
      }
      return stage;
    });

    const completedCount = updatedRoadmap.filter((s) => s.is_completed).length;
    const newRoadmapPercentage = Math.round((completedCount / updatedRoadmap.length) * 100);

    setAnalysisReport((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        roadmap: updatedRoadmap,
        progress: {
          ...prev.progress,
          completed_milestones: completedCount,
          roadmap_completion: newRoadmapPercentage
        }
      };
    });

    if (completed) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    try {
      await api.toggleMilestone(profile.id || 'demo-alex-student', milestoneId, completed);
    } catch (error) {
      console.warn('Failed to sync milestone state with backend', error);
    }
  };

  return (
    <CareerContext.Provider
      value={{
        profile,
        setProfile,
        analysisReport,
        setAnalysisReport,
        activeTab,
        setActiveTab,
        targetRole,
        setTargetRole,
        currentFlow,
        setCurrentFlow,
        isDarkMode,
        themeMode,
        setThemeMode,
        colorTheme,
        setColorTheme,
        toggleTheme,
        isPresentationMode,
        togglePresentationMode,
        isAssistantOpen,
        toggleAssistant,
        isLoading,
        runAnalysis,
        loadDemo,
        toggleMilestoneCompletion
      }}
    >
      {children}
    </CareerContext.Provider>
  );
};

export const useCareer = () => {
  const context = useContext(CareerContext);
  if (!context) {
    throw new Error('useCareer must be used within a CareerProvider');
  }
  return context;
};
