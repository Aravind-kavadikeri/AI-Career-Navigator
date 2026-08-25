import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  PieChart as PieIcon,
  BarChart2,
  Target,
  Info,
  ChevronRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { useCareer } from '../context/CareerContext';
import { CareerMatch } from '../types';

export const CareerMatchesPage: React.FC = () => {
  const { analysisReport, setTargetRole, setActiveTab } = useCareer();
  const matches = analysisReport?.career_matches || [];
  
  const [selectedRole, setSelectedRole] = useState<string>(matches[0]?.role || 'Data Scientist');
  const activeMatch = matches.find(m => m.role === selectedRole) || matches[0];

  const handleSelectRole = (match: CareerMatch) => {
    setSelectedRole(match.role);
    setTargetRole(match.role);
  };

  const handleViewPath = (match: CareerMatch) => {
    setSelectedRole(match.role);
    setTargetRole(match.role);
    setActiveTab('skill-gap');
  };

  // Explainable AI factors data
  const xaiData = activeMatch ? [
    { name: 'Tech Skills (35% max)', score: activeMatch.xai_breakdown.technical_skills, max: 35, fill: '#0d9488' },
    { name: 'Projects (25% max)', score: activeMatch.xai_breakdown.projects, max: 25, fill: '#6366f1' },
    { name: 'Interests (20% max)', score: activeMatch.xai_breakdown.interests, max: 20, fill: '#f59e0b' },
    { name: 'Academics (10% max)', score: activeMatch.xai_breakdown.academic_performance, max: 10, fill: '#ec4899' },
    { name: 'Certs (10% max)', score: activeMatch.xai_breakdown.certifications, max: 10, fill: '#06b6d4' },
  ] : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div>
        <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 mr-1" /> Recommendation Engine
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Recommended Career Roles
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Statistical similarity calculated between your skill matrix, project technologies, academic record, and industry benchmarks.
        </p>
      </div>

      {/* Main Grid: Left = Career Cards, Right = Deep Explainable AI View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Ranked Career Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-3.5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Ranked Compatibility ({matches.length} Roles)
          </h3>

          {matches.map((match, idx) => {
            const isSelected = match.role === selectedRole;
            return (
              <div
                key={match.role}
                onClick={() => handleSelectRole(match)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-teal-500/10 border-teal-500 ring-2 ring-teal-500/50 shadow-md'
                    : 'glass-card hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{match.role}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{match.category}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`text-base font-black ${
                      match.match_percentage >= 85 ? 'text-teal-600 dark:text-teal-400' :
                      match.match_percentage >= 70 ? 'text-indigo-600 dark:text-indigo-400' : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      {match.match_percentage}%
                    </span>
                    <p className="text-[10px] text-slate-400">Match</p>
                  </div>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-1.5 rounded-full ${
                      match.match_percentage >= 85 ? 'bg-teal-500' :
                      match.match_percentage >= 70 ? 'bg-indigo-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${match.match_percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep Explainable AI (XAI) Panel (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {activeMatch ? (
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-teal-500/30 space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
                <div>
                  <span className="text-xs uppercase font-extrabold text-teal-600 dark:text-teal-400 tracking-wider">
                    Detailed Match Analysis
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
                    {activeMatch.role}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {activeMatch.tagline}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="text-center p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/80 border border-teal-200 dark:border-teal-800">
                    <span className="text-3xl font-black text-teal-600 dark:text-teal-400">
                      {activeMatch.match_percentage}%
                    </span>
                    <p className="text-[10px] font-bold text-teal-800 dark:text-teal-300 uppercase">Match Score</p>
                  </div>
                </div>
              </div>

              {/* Explainable AI (XAI) Factor Contribution Breakdown */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs uppercase font-bold text-slate-700 dark:text-slate-300 flex items-center">
                    <Info className="w-3.5 h-3.5 mr-1 text-teal-500" />
                    Why this recommendation? (Explainable AI Attribution)
                  </h4>
                  <span className="text-[11px] text-slate-400 font-mono">100-Point Formula</span>
                </div>

                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={xaiData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 110, bottom: 5 }}
                    >
                      <XAxis type="number" domain={[0, 40]} unit=" pts" tick={{ fontSize: 10 }} />
                      <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={120} />
                      <Tooltip
                        formatter={(value: any, name: any, item: any) => [`${value} / ${item.payload.max} pts`, 'Score Contribution']}
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          fontSize: '12px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="score" radius={[0, 6, 6, 0]}>
                        {xaiData.map((entry, index) => (
                          <Cell key={`xai-cell-${index}`} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Strengths and Growth Areas Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Strengths */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/50">
                  <h4 className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 flex items-center mb-2.5">
                    <CheckCircle2 className="w-4 h-4 mr-1.5 text-emerald-500" /> Why this matches
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {activeMatch.why_it_matches.map((st, sIdx) => (
                      <li key={sIdx} className="flex items-start">
                        <span className="text-emerald-500 font-bold mr-1.5">✓</span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Growth Areas */}
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50">
                  <h4 className="text-xs font-bold uppercase text-amber-800 dark:text-amber-300 flex items-center mb-2.5">
                    <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-500" /> Needs improvement
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    {activeMatch.needs_improvement.map((gi, gIdx) => (
                      <li key={gIdx} className="flex items-start">
                        <span className="text-amber-500 font-bold mr-1.5">⚠</span>
                        <span>{gi}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Recommended Next Step & CTA */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] font-bold uppercase text-teal-600 dark:text-teal-400">
                    Recommended Next Step:
                  </p>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                    {activeMatch.recommended_next_step}
                  </p>
                </div>

                <button
                  onClick={() => handleViewPath(activeMatch)}
                  className="flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-md shadow-teal-500/20 flex-shrink-0"
                >
                  <span>View Career Path</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ) : null}
        </div>

      </div>

    </div>
  );
};
