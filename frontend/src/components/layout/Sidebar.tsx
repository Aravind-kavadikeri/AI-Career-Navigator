import React from 'react';
import {
  LayoutDashboard,
  User,
  Sparkles,
  GitCompare,
  Map,
  FolderGit2,
  BookOpen,
  Compass,
  TrendingUp,
  Target,
  ChevronRight,
  Palette,
  Sun,
  Moon
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';
import { ActiveTab, ColorTheme } from '../../types';

interface SidebarProps {
  onCloseMobile?: () => void;
}

const PALETTES: { id: ColorTheme; label: string; color: string }[] = [
  { id: 'obsidian', label: 'Obsidian Black', color: '#18181b' },
  { id: 'emerald', label: 'Emerald', color: '#0d9488' },
  { id: 'indigo', label: 'Indigo', color: '#6366f1' },
  { id: 'blue', label: 'Blue', color: '#2563eb' },
  { id: 'rose', label: 'Rose', color: '#e11d48' },
  { id: 'amber', label: 'Amber', color: '#d97706' },
];

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const {
    activeTab,
    setActiveTab,
    analysisReport,
    targetRole,
    colorTheme,
    setColorTheme,
    isDarkMode,
    toggleTheme
  } = useCareer();

  const navItems: { id: ActiveTab; label: string; icon: React.FC<{ className?: string }>; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'career-profile', label: 'Career Profile', icon: User },
    { id: 'career-matches', label: 'Career Matches', icon: Sparkles, badge: analysisReport ? `${analysisReport.career_matches.length}` : undefined },
    { id: 'skill-gap', label: 'Skill Gap', icon: GitCompare, badge: analysisReport ? `${analysisReport.primary_skill_gaps.major_gaps_count} gaps` : undefined },
    { id: 'roadmap', label: 'Roadmap', icon: Map },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'career-explorer', label: 'Career Explorer', icon: Compass },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ];

  const handleTabClick = (id: ActiveTab) => {
    setActiveTab(id);
    if (onCloseMobile) onCloseMobile();
  };

  const topMatch = analysisReport?.career_matches?.[0];
  const readiness = analysisReport?.career_readiness_score || 82;

  return (
    <aside className="w-64 flex-shrink-0 flex flex-col justify-between p-4 glass-panel border-r border-slate-200/80 dark:border-slate-800/80 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
      
      {/* Navigation List */}
      <div className="space-y-5">
        
        {/* Active Target Banner */}
        <div className="p-3.5 rounded-xl bg-gradient-to-br from-teal-500/10 via-indigo-500/10 to-teal-500/5 border border-teal-500/20 dark:border-teal-400/20">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] uppercase tracking-wider font-bold text-teal-600 dark:text-teal-400 flex items-center">
              <Target className="w-3 h-3 mr-1" /> Active Target
            </span>
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
              {readiness}%
            </span>
          </div>
          <p className="font-bold text-sm text-slate-900 dark:text-white truncate">
            {targetRole || topMatch?.role || 'Data Scientist'}
          </p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
        </div>

        {/* Navigation links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Theme & Palette Quick Selector in Sidebar */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 space-y-3">
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center">
              <Palette className="w-3.5 h-3.5 mr-1 text-teal-500" /> Theme Palette
            </span>
            <button
              onClick={toggleTheme}
              className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            {PALETTES.map((p) => {
              const isSelected = colorTheme === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setColorTheme(p.id)}
                  title={`${p.label} Palette`}
                  className={`w-6 h-6 rounded-full transition-transform flex items-center justify-center ${
                    isSelected
                      ? 'ring-2 ring-offset-2 ring-slate-900 dark:ring-white scale-110 shadow-sm'
                      : 'opacity-70 hover:opacity-100 hover:scale-105'
                  }`}
                  style={{ backgroundColor: p.color }}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </aside>
  );
};
