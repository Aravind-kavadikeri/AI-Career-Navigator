import React from 'react';
import {
  User,
  GraduationCap,
  Award,
  FolderGit2,
  BookOpen,
  Edit3,
  Sparkles,
  CheckCircle2,
  Palette,
  Sun,
  Moon,
  Laptop,
  Check
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { ColorTheme } from '../types';

interface CareerProfilePageProps {
  onEditProfile: () => void;
}

const THEME_OPTIONS: { id: ColorTheme; label: string; primary: string; secondary: string; desc: string }[] = [
  { id: 'obsidian', label: 'Obsidian Black (Pro Edition)', primary: '#000000', secondary: '#ffffff', desc: 'Ultra-Minimal Pitch Black & Titanium' },
  { id: 'emerald', label: 'Cyber Emerald', primary: '#0d9488', secondary: '#10b981', desc: 'AI Cyber Intelligence' },
  { id: 'indigo', label: 'Modern Indigo', primary: '#6366f1', secondary: '#8b5cf6', desc: 'SaaS Modern & Royal' },
  { id: 'blue', label: 'Ocean Cloud', primary: '#2563eb', secondary: '#06b6d4', desc: 'Enterprise Cloud' },
  { id: 'rose', label: 'Sunset Crimson', primary: '#e11d48', secondary: '#f43f5e', desc: 'High Energy & Vibrant' },
  { id: 'amber', label: 'Golden Amber', primary: '#d97706', secondary: '#f59e0b', desc: 'Warm Horizon & Focus' },
];

export const CareerProfilePage: React.FC<CareerProfilePageProps> = ({ onEditProfile }) => {
  const {
    profile,
    analysisReport,
    colorTheme,
    setColorTheme,
    themeMode,
    setThemeMode
  } = useCareer();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 flex items-center space-x-1">
            <User className="w-3.5 h-3.5 mr-1" /> Student Record
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Your Career Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Active inputs, verified credentials, and personalized interface appearance studio.
          </p>
        </div>

        <button
          onClick={onEditProfile}
          className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-md shadow-teal-500/20 transition hover:scale-105 active:scale-95"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile & Skills</span>
        </button>
      </div>

      {/* Overview Demographics Card */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-teal-500/30">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Candidate</span>
            <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{profile.name}</h3>
            <p className="text-xs text-slate-500">{profile.college}</p>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Program</span>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-0.5">{profile.degree}</p>
            <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold">Semester {profile.current_semester}</p>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Academic Index</span>
            <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{profile.cgpa} / 10.0</p>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Top Academic Tier</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-bold uppercase">Target Goal</span>
            <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">{profile.preferred_career}</p>
            <span className="text-[10px] text-slate-500">Readiness: {analysisReport?.career_readiness_score || 82}%</span>
          </div>

        </div>
      </div>

      {/* Appearance & Theme Customizer Studio (User Requested Feature) */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-teal-500/40 bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-transparent">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
            <Palette className="w-4 h-4 mr-2 text-teal-500" /> Interface Theme & Palette Studio
          </h3>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
            Instant Live Customization
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
          Personalize your learning workspace. Choose your preferred lighting mode and aesthetic color palette.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Mode Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Lighting & Appearance Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setThemeMode('dark')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center space-y-1.5 transition ${
                  themeMode === 'dark'
                    ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400 ring-2 ring-teal-500/40'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
                }`}
              >
                <Moon className="w-4 h-4" />
                <span>Dark Mode</span>
              </button>

              <button
                onClick={() => setThemeMode('light')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center space-y-1.5 transition ${
                  themeMode === 'light'
                    ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400 ring-2 ring-teal-500/40'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>Light Mode</span>
              </button>

              <button
                onClick={() => setThemeMode('system')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center space-y-1.5 transition ${
                  themeMode === 'system'
                    ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400 ring-2 ring-teal-500/40'
                    : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
                }`}
              >
                <Laptop className="w-4 h-4" />
                <span>System Sync</span>
              </button>
            </div>
          </div>

          {/* Palette Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Accent Color Palette
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {THEME_OPTIONS.map((theme) => {
                const isSelected = colorTheme === theme.id;
                return (
                  <div
                    key={theme.id}
                    onClick={() => setColorTheme(theme.id)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-slate-800 border-teal-500 ring-2 ring-teal-500/40 shadow-sm'
                        : 'bg-white/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className="flex -space-x-1">
                        <div
                          className="w-4 h-4 rounded-full border border-white dark:border-slate-900"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-white dark:border-slate-900"
                          style={{ backgroundColor: theme.secondary }}
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                        {theme.label}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px]">
                        <Check className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Skills Matrix */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center">
          <Award className="w-4 h-4 mr-2 text-teal-500" /> Technical & AI Skills Matrix ({profile.skills.length} Evaluated)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {profile.skills.map((skill) => (
            <div
              key={skill.name}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
            >
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="font-bold text-slate-900 dark:text-white">{skill.name}</span>
                <span className="font-black text-teal-600 dark:text-teal-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-1.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Projects List */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center">
          <FolderGit2 className="w-4 h-4 mr-2 text-indigo-500" /> Active Practical Projects ({profile.projects.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profile.projects.map((proj, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                  {proj.project_type || 'Academic Project'}
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5">
                  {proj.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  {proj.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                {proj.technologies.map((t, tIdx) => (
                  <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications and Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Certifications */}
        <div className="p-6 rounded-3xl glass-card">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> Verified Certifications
          </h3>
          <div className="space-y-3">
            {profile.certifications.map((cert, idx) => (
              <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
                <p className="font-bold text-slate-900 dark:text-white">{cert.name}</p>
                <p className="text-slate-500 mt-0.5">{cert.issuer} • {cert.year}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Domain Interests */}
        <div className="p-6 rounded-3xl glass-card">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center">
            <Sparkles className="w-4 h-4 mr-2 text-amber-500" /> Stated Domain Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((int, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-50 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800"
              >
                {int}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
