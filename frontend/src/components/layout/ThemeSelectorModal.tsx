import React from 'react';
import {
  Palette,
  X,
  Sun,
  Moon,
  Laptop,
  Check,
  Sparkles
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';
import { ColorTheme, ThemeMode } from '../../types';

interface ThemeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const COLOR_THEMES: { id: ColorTheme; label: string; primary: string; secondary: string; desc: string }[] = [
  { id: 'obsidian', label: 'Obsidian Black (Pro Edition)', primary: '#000000', secondary: '#ffffff', desc: 'Ultra-Minimal Pitch Black & Titanium' },
  { id: 'emerald', label: 'Cyber Emerald', primary: '#0d9488', secondary: '#10b981', desc: 'AI Cyber Intelligence' },
  { id: 'indigo', label: 'Modern Indigo', primary: '#6366f1', secondary: '#8b5cf6', desc: 'SaaS Modern & Royal' },
  { id: 'blue', label: 'Ocean Cloud', primary: '#2563eb', secondary: '#06b6d4', desc: 'Enterprise Cloud' },
  { id: 'rose', label: 'Sunset Crimson', primary: '#e11d48', secondary: '#f43f5e', desc: 'High Energy & Vibrant' },
  { id: 'amber', label: 'Golden Amber', primary: '#d97706', secondary: '#f59e0b', desc: 'Warm Horizon & Focus' },
];

export const ThemeSelectorModal: React.FC<ThemeSelectorModalProps> = ({ isOpen, onClose }) => {
  const {
    themeMode,
    setThemeMode,
    colorTheme,
    setColorTheme
  } = useCareer();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Palette className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Customize Theme
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose your preferred interface appearance and color palette
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Appearance Mode (Light / Dark / System) */}
        <div className="my-5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            Appearance Mode
          </label>
          
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setThemeMode('dark')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center space-y-1.5 transition ${
                themeMode === 'dark'
                  ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400 ring-2 ring-teal-500/40'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
              }`}
            >
              <Moon className="w-4 h-4" />
              <span>Dark</span>
            </button>

            <button
              onClick={() => setThemeMode('light')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center space-y-1.5 transition ${
                themeMode === 'light'
                  ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400 ring-2 ring-teal-500/40'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Light</span>
            </button>

            <button
              onClick={() => setThemeMode('system')}
              className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center space-y-1.5 transition ${
                themeMode === 'system'
                  ? 'bg-teal-500/10 border-teal-500 text-teal-600 dark:text-teal-400 ring-2 ring-teal-500/40'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-teal-400'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>System</span>
            </button>
          </div>
        </div>

        {/* Color Palette Selection */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
            Accent Color Palette
          </label>

          <div className="space-y-2">
            {COLOR_THEMES.map((theme) => {
              const isSelected = colorTheme === theme.id;
              return (
                <div
                  key={theme.id}
                  onClick={() => setColorTheme(theme.id)}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-teal-500/10 border-teal-500 ring-2 ring-teal-500/30'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex -space-x-1">
                      <div
                        className="w-5 h-5 rounded-full border border-white dark:border-slate-900 shadow-sm"
                        style={{ backgroundColor: theme.primary }}
                      />
                      <div
                        className="w-5 h-5 rounded-full border border-white dark:border-slate-900 shadow-sm"
                        style={{ backgroundColor: theme.secondary }}
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {theme.label}
                      </h4>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">
                        {theme.desc}
                      </p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Close / Apply button */}
        <button
          onClick={onClose}
          className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold transition shadow-md shadow-teal-500/20"
        >
          Done & Apply
        </button>

      </div>
    </div>
  );
};
