import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  Sun,
  Moon,
  Tv,
  Bot,
  UserCheck,
  Menu,
  X,
  Play,
  Palette,
  Globe
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';
import { ThemeSelectorModal } from './ThemeSelectorModal';

interface NavbarProps {
  onOpenMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMobileMenu, isMobileMenuOpen }) => {
  const {
    profile,
    isDarkMode,
    toggleTheme,
    togglePresentationMode,
    toggleAssistant,
    loadDemo,
    activeTab,
    setActiveTab,
    currentFlow,
    setCurrentFlow,
    isLoading
  } = useCareer();

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  const handleBrandClick = () => {
    if (currentFlow === 'landing') {
      setCurrentFlow('app');
      setActiveTab('dashboard');
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleProfileClick = () => {
    setCurrentFlow('app');
    setActiveTab('career-profile');
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Brand Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={handleBrandClick}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-teal-500/20 text-white font-bold">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-teal-600 via-indigo-600 to-teal-500 dark:from-teal-400 dark:via-indigo-400 dark:to-teal-300 bg-clip-text text-transparent">
                  AI Career Navigator
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                  <Sparkles className="w-3 h-3 mr-1" /> AI Powered
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                Know where you are. Discover where you belong. Build your path.
              </p>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Launch 3D Cosmos Splash Button */}
            <button
              onClick={() => setCurrentFlow('splash')}
              className="hidden lg:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition shadow-sm"
              title="Launch 3D Space Cosmos Splashscreen"
            >
              <Globe className="w-3.5 h-3.5 text-teal-500" />
              <span>3D Cosmos</span>
            </button>

            {/* Try Demo Button */}
            <button
              onClick={loadDemo}
              disabled={isLoading}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/80 border border-indigo-200 dark:border-indigo-800/80 transition shadow-sm"
              title="Load pre-configured Alex Student demo profile"
            >
              <Play className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 fill-indigo-500/20" />
              <span className="hidden xs:inline">Try Demo</span>
            </button>

            {/* Presentation Mode Toggle */}
            <button
              onClick={togglePresentationMode}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 hover:bg-amber-100 dark:bg-amber-950/60 dark:text-amber-300 dark:hover:bg-amber-900/80 border border-amber-200 dark:border-amber-800 transition shadow-sm"
              title="Open Presentation Mode for project evaluations"
            >
              <Tv className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">Presentation Mode</span>
            </button>

            {/* Ask AI Career Coach */}
            <button
              onClick={toggleAssistant}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 text-white hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 transition shadow-md shadow-teal-500/25"
            >
              <Bot className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask Career AI</span>
            </button>

            {/* Theme Customizer Trigger */}
            <button
              onClick={() => setIsThemeModalOpen(true)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center"
              title="Change Theme & Palette"
            >
              <Palette className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            </button>

            {/* Quick Dark/Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle Theme"
              title="Toggle Light / Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {/* Active Profile Pill */}
            <div
              onClick={handleProfileClick}
              className="hidden lg:flex items-center space-x-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-teal-500 transition"
            >
              <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold">
                {profile.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold leading-tight text-slate-800 dark:text-slate-200">
                  {profile.name}
                </p>
                <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                  {profile.degree || 'Student'}
                </p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </header>

      {/* Theme Selector Modal */}
      <ThemeSelectorModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />
    </>
  );
};
