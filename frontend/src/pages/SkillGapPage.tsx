import React, { useState, useEffect } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';
import {
  GitCompare,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { api } from '../services/api';
import { SkillGapResponse } from '../types';

const CAREER_OPTIONS = [
  'Data Scientist', 'Data Analyst', 'ML Engineer', 'AI Engineer',
  'Data Engineer', 'Software Engineer', 'Business Analyst', 'AI Researcher'
];

export const SkillGapPage: React.FC = () => {
  const {
    profile,
    targetRole,
    setTargetRole,
    analysisReport,
    setActiveTab
  } = useCareer();

  const [selectedRole, setSelectedRole] = useState<string>(targetRole || 'Data Scientist');
  const [skillGapData, setSkillGapData] = useState<SkillGapResponse | null>(analysisReport?.primary_skill_gaps || null);
  const [isLoading, setIsLoading] = useState(false);

  // Sync when role changes
  useEffect(() => {
    async function fetchSkillGap() {
      setIsLoading(true);
      try {
        const res = await api.getSkillGap(profile.id || 'demo-alex-student', selectedRole);
        setSkillGapData(res);
        setTargetRole(selectedRole);
      } catch (err) {
        console.error('Failed to fetch skill gap for role', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSkillGap();
  }, [selectedRole]);

  // Chart dataset
  const chartData = (skillGapData?.skill_gaps || []).map(item => ({
    name: item.skill,
    'Your Level': item.user_level,
    'Required Benchmark': item.required_level,
    gap: item.gap,
    status: item.status
  }));

  // Filtered Priority Lists
  const highPriority = (skillGapData?.skill_gaps || []).filter(s => s.priority === 'HIGH');
  const mediumPriority = (skillGapData?.skill_gaps || []).filter(s => s.priority === 'MEDIUM');
  const lowPriority = (skillGapData?.skill_gaps || []).filter(s => s.priority === 'LOW');

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner & Dynamic Role Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 flex items-center space-x-1">
            <GitCompare className="w-3.5 h-3.5 mr-1" /> Skill Intelligence
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Your Skill Gap Analysis
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Comparing your verified proficiencies against real-world benchmark requirements.
          </p>
        </div>

        {/* Role Selector Dropdown */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Benchmark Role:</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-teal-600 dark:text-teal-400 focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-sm"
          >
            {CAREER_OPTIONS.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary KPI Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl glass-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-500 uppercase">Target Fit</span>
            <p className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              {skillGapData?.role_match_score || 82}%
            </p>
          </div>
          <Target className="w-6 h-6 text-teal-500" />
        </div>

        <div className="p-4 rounded-2xl glass-card border-emerald-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Strong Skills</span>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              {skillGapData?.strong_skills_count || 0}
            </p>
          </div>
          <CheckCircle2 className="w-6 h-6 text-emerald-500" />
        </div>

        <div className="p-4 rounded-2xl glass-card border-amber-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">To Improve</span>
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-0.5">
              {skillGapData?.improve_skills_count || 0}
            </p>
          </div>
          <AlertTriangle className="w-6 h-6 text-amber-500" />
        </div>

        <div className="p-4 rounded-2xl glass-card border-rose-500/30 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase">Major Gaps</span>
            <p className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-0.5">
              {skillGapData?.major_gaps_count || 0}
            </p>
          </div>
          <Flame className="w-6 h-6 text-rose-500" />
        </div>

      </div>

      {/* Interactive Horizontal Benchmark Comparison Chart */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {selectedRole} — Current Level vs Required Benchmark
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Teal bar = Your verified score • Indigo bar = Industry requirement
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs font-semibold">
            <span className="flex items-center text-teal-600 dark:text-teal-400">
              <span className="w-3 h-3 rounded-full bg-teal-500 inline-block mr-1.5" /> Your Current Level
            </span>
            <span className="flex items-center text-indigo-600 dark:text-indigo-400">
              <span className="w-3 h-3 rounded-full bg-indigo-500 inline-block mr-1.5" /> Benchmark Requirement
            </span>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={110} />
              <Tooltip
                formatter={(value: any, name: any) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
              <Bar dataKey="Your Level" fill="#0d9488" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Required Benchmark" fill="#6366f1" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Ranked Skill Priorities Section */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Skills You Should Learn Next (Priority Ranked)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Ranked based on deficit magnitude, role importance weight, and prerequisite hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(skillGapData?.skill_gaps || []).map((item, idx) => (
            <div
              key={item.skill}
              className={`p-5 rounded-2xl glass-card border transition-all ${
                item.priority === 'HIGH'
                  ? 'border-rose-300 dark:border-rose-900/60 bg-rose-50/20 dark:bg-rose-950/10'
                  : item.priority === 'MEDIUM'
                  ? 'border-amber-300 dark:border-amber-900/60 bg-amber-50/20 dark:bg-amber-950/10'
                  : 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                    {item.skill}
                  </h4>
                </div>

                <span
                  className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase ${
                    item.priority === 'HIGH'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                      : item.priority === 'MEDIUM'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  }`}
                >
                  Priority: {item.priority}
                </span>
              </div>

              {/* Levels & Gap */}
              <div className="flex items-center space-x-4 text-xs my-2.5 py-1.5 px-3 rounded-lg bg-slate-100/60 dark:bg-slate-800/60">
                <span>Current: <strong>{item.user_level}%</strong></span>
                <span>Required: <strong>{item.required_level}%</strong></span>
                <span className={item.gap > 0 ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-emerald-600 dark:text-emerald-400 font-bold'}>
                  {item.gap > 0 ? `Deficit: -${item.gap}%` : 'Surplus / Met'}
                </span>
              </div>

              {/* Rationale */}
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-2">
                {item.reason}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
