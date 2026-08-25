import React from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Play,
  Cpu,
  Target,
  GitCompare,
  Map,
  Bot,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Award
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

interface LandingPageProps {
  onStartOnboarding: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartOnboarding }) => {
  const { loadDemo, setActiveTab, setCurrentFlow } = useCareer();

  const handleExploreCareers = () => {
    setCurrentFlow('app');
    setActiveTab('career-explorer');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 overflow-x-hidden">
      
      {/* Background glowing gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-500/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
        
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-300 text-xs font-semibold mb-6 shadow-sm animate-pulse-slow">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          <span>AI-Powered Career Intelligence for Modern Learners</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
          Build the Career <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-teal-500 via-indigo-500 to-teal-400 bg-clip-text text-transparent">
            You're Meant For.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          AI-powered career guidance that analyzes your skills, interests, projects and goals to create a personalized, explainable career roadmap.
        </p>

        {/* CTA Buttons Group */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          
          <button
            onClick={onStartOnboarding}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-500/25 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>Analyze My Career</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={loadDemo}
            className="flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 text-slate-800 dark:text-slate-200 font-bold text-sm sm:text-base shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <Play className="w-4 h-4 text-teal-500 fill-teal-500/20" />
            <span>Try Live Demo</span>
          </button>

          <button
            onClick={handleExploreCareers}
            className="px-5 py-3.5 rounded-2xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-semibold transition hover:bg-slate-100 dark:hover:bg-slate-800/60"
          >
            Explore Careers →
          </button>

        </div>

        {/* Interactive AI Intelligence Pipeline Diagram */}
        <div className="mt-16 max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">ai_career_pipeline.py</span>
            </div>
            <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2.5 py-1 rounded-full border border-teal-200 dark:border-teal-800">
              Deterministic Multi-Factor Matrix
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
            
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-left hover:border-teal-500 transition">
              <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-xs mb-2">
                01
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Student Profile</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Academics, skills, projects, certifications & interests.</p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-left hover:border-indigo-500 transition">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs mb-2">
                02
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">AI Analysis</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">5-Factor weighted scoring & benchmark matching.</p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-left hover:border-amber-500 transition">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs mb-2">
                03
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Explainable XAI</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Transparent score attribution & match percentages.</p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 text-left hover:border-rose-500 transition">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-xs mb-2">
                04
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Skill Gap Matrix</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Deficit indexing & prioritized learning hierarchy.</p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-teal-500/20 to-indigo-500/20 border border-teal-500/40 text-left">
              <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold text-xs mb-2">
                05
              </div>
              <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">Dynamic Roadmap</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">6-Month milestones, projects & AI coach guidance.</p>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400">10+</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Industry Roles Modeled</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">5-Factor</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Explainable AI Scoring</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400">6-Month</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Personalized Roadmaps</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">100%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Offline Fallback Ready</p>
            </div>
          </div>

        </div>

      </section>

      {/* Feature Highlights Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200 dark:border-slate-800">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
            Answers Three Essential Questions
          </h2>
          <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Every view is engineered to turn student confusion into clear, confident career momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-6 rounded-3xl glass-card glass-card-hover">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5">
              <Compass className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase text-teal-600 dark:text-teal-400 tracking-wider">Question 01</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">"Where am I now?"</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Career Readiness Score, skill proficiency radar, and transparent evaluation of past projects and coursework against real industry metrics.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card glass-card-hover">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
              <Target className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">Question 02</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">"Where should I go?"</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Explainable AI matching across 10+ career benchmarks, detailing exact mathematical compatibility percentages and strengths.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card glass-card-hover">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5">
              <Map className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase text-teal-600 dark:text-teal-400 tracking-wider">Question 03</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 mb-2">"What exactly should I do next?"</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Prioritized skill gaps, 6-month interactive roadmap, resume-worthy project blueprints, and a contextual AI career advisor.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        <p>AI Career Navigator — "Your skills. Your potential. Your roadmap."</p>
        <p className="mt-1">Production-Quality AI Career Intelligence Platform.</p>
      </footer>

    </div>
  );
};
