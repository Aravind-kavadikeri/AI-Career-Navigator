import React, { useState } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  UserCheck,
  Cpu,
  TrendingUp,
  Map,
  Bot,
  Layers,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';

export const PresentationModeModal: React.FC = () => {
  const { isPresentationMode, togglePresentationMode, profile, analysisReport, targetRole } = useCareer();
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isPresentationMode) return null;

  const topMatch = analysisReport?.career_matches?.[0];
  const readiness = analysisReport?.career_readiness_score || 82;

  const slides = [
    {
      title: "1. Student Profile & Input Matrix",
      subtitle: "Comprehensive Data Ingestion & Skill Quantification",
      icon: UserCheck,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <h4 className="text-xs uppercase font-bold text-teal-400 mb-2">Student Demographics</h4>
              <p className="text-lg font-bold text-white">{profile.name}</p>
              <p className="text-sm text-slate-300">{profile.degree} • Semester {profile.current_semester}</p>
              <p className="text-sm text-slate-400 mt-1">College: {profile.college}</p>
              <div className="mt-3 inline-block px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/40">
                Academic CGPA: {profile.cgpa} / 10.0
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
              <h4 className="text-xs uppercase font-bold text-indigo-400 mb-2">Technical & AI Proficiencies</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {profile.skills.slice(0, 8).map((s, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
                    <span className="text-slate-200">{s.name}</span>
                    <span className="font-bold text-teal-400">{s.level}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-300">
            <strong>Active Projects Evaluated:</strong> {profile.projects.map(p => p.name).join(' • ')}
          </div>
        </div>
      )
    },
    {
      title: "2. Deterministic AI Scoring Engine",
      subtitle: "Multi-Factor Mathematical Recommendation Formula",
      icon: Cpu,
      content: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-800/90 border border-teal-500/30">
            <h4 className="text-sm font-bold text-teal-300 mb-2">Mathematical Composite Formulation</h4>
            <code className="text-xs font-mono block bg-slate-950 p-3 rounded-lg text-emerald-400 border border-slate-800">
              Career Match Score = (Technical Skills × 0.35) + (Projects × 0.25) + (Interests × 0.20) + (Academics × 0.10) + (Certifications × 0.10)
            </code>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-center">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <p className="text-2xl font-black text-teal-400">35%</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Tech & AI Skills</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <p className="text-2xl font-black text-indigo-400">25%</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Projects</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <p className="text-2xl font-black text-amber-400">20%</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Interests</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <p className="text-2xl font-black text-rose-400">10%</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Academics</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <p className="text-2xl font-black text-cyan-400">10%</p>
              <p className="text-xs font-semibold text-slate-300 mt-1">Certifications</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Career Matching & Explainable AI (XAI)",
      subtitle: "Transparent Attribution & Top Role Recommendations",
      icon: Award,
      content: (
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-900/40 via-indigo-900/40 to-slate-900/60 border border-teal-500/40 flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-wider font-bold text-teal-400">Top Recommended Career</span>
              <h3 className="text-2xl font-black text-white mt-1">{topMatch?.role || 'Data Scientist'}</h3>
              <p className="text-xs text-slate-300 mt-1">{topMatch?.tagline}</p>
            </div>
            <div className="text-right">
              <span className="text-4xl font-black text-teal-400">{topMatch?.match_percentage || 92}%</span>
              <p className="text-xs text-slate-400">Match Confidence</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-emerald-500/30">
              <h4 className="font-bold text-emerald-400 mb-2 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5" /> Explainable Strengths
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {topMatch?.why_it_matches.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-amber-500/30">
              <h4 className="font-bold text-amber-400 mb-2 flex items-center">
                <Layers className="w-4 h-4 mr-1.5" /> Growth Targets
              </h4>
              <ul className="space-y-1.5 text-slate-300">
                {topMatch?.needs_improvement.map((item, idx) => (
                  <li key={idx}>⚠ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "4. Benchmark Skill Gap Analysis",
      subtitle: "Current Proficiencies vs Industry Benchmark Targets",
      icon: TrendingUp,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
              <p className="text-xl font-bold text-emerald-400">{analysisReport?.primary_skill_gaps.strong_skills_count || 7}</p>
              <p className="text-xs text-emerald-300">Strong Proficiencies</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/60">
              <p className="text-xl font-bold text-amber-400">{analysisReport?.primary_skill_gaps.improve_skills_count || 1}</p>
              <p className="text-xs text-amber-300">Skills to Improve</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/60">
              <p className="text-xl font-bold text-rose-400">{analysisReport?.primary_skill_gaps.major_gaps_count || 3}</p>
              <p className="text-xs text-rose-300">Major Gaps</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs">
            <h4 className="font-bold text-white mb-2">Ranked Learning Priorities (High to Low Impact):</h4>
            <div className="space-y-2">
              {analysisReport?.primary_skill_gaps.skill_gaps.slice(0, 3).map((gap, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded bg-slate-900/60 border border-slate-800">
                  <div>
                    <span className="font-bold text-white">{gap.skill}</span>
                    <span className="text-slate-400 ml-2">(You: {gap.user_level}% vs Req: {gap.required_level}%)</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-bold ${gap.priority === 'HIGH' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-amber-950 text-amber-300'}`}>
                    Priority: {gap.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "5. Dynamic 6-Month Roadmap & AI Coach",
      subtitle: "Actionable Milestones, Portfolio Projects & Contextual Advisor",
      icon: Map,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {analysisReport?.roadmap.slice(0, 6).map((stage, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-800/70 border border-slate-700 text-xs">
                <span className="text-[10px] font-bold text-teal-400 uppercase">Month {stage.month}</span>
                <p className="font-bold text-white truncate mt-0.5">{stage.title}</p>
                <p className="text-slate-400 mt-1">{stage.estimated_hours} Hours • {stage.difficulty}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/60 to-indigo-950/60 border border-teal-500/30 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Context-Grounded AI Career Advisor</h4>
                <p className="text-xs text-slate-300">Answers student inquiries based on live skills, CGPA, and specific roadmap stage.</p>
              </div>
            </div>
            <button
              onClick={() => {
                togglePresentationMode();
              }}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition"
            >
              Explore Live App
            </button>
          </div>
        </div>
      )
    }
  ];

  const slide = slides[currentSlide];
  const SlideIcon = slide.icon;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" /> Presentation & Review Mode
            </span>
            <span className="text-xs text-slate-400">Slide {currentSlide + 1} of {slides.length}</span>
          </div>
          <button
            onClick={togglePresentationMode}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400">
              <SlideIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">{slide.title}</h2>
              <p className="text-xs sm:text-sm text-slate-400">{slide.subtitle}</p>
            </div>
          </div>

          {slide.content}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex space-x-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-8 bg-teal-500' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              disabled={currentSlide === 0}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Prev</span>
            </button>

            <button
              onClick={() => setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))}
              disabled={currentSlide === slides.length - 1}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed flex items-center space-x-1"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
