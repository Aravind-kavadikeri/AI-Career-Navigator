import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  CheckCircle2,
  FolderGit2,
  Map,
  Sparkles,
  RefreshCw,
  Sliders,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { useCareer } from '../context/CareerContext';

export const ProgressPage: React.FC = () => {
  const {
    profile,
    setProfile,
    analysisReport,
    runAnalysis,
    targetRole
  } = useCareer();

  const [isUpdating, setIsUpdating] = useState(false);
  const [activeSkillAdjust, setActiveSkillAdjust] = useState<{ name: string; level: number } | null>(null);

  const progress = analysisReport?.progress || {
    overall_progress: 82,
    skills_completed: 8,
    total_skills_tracked: 13,
    roadmap_completion: 33,
    completed_milestones: 2,
    total_milestones: 6,
    projects_completed: 3,
    skill_growth_timeline: [
      { month: 'Month 1', overall_score: 42, skills_mastered: 3, projects_completed: 1 },
      { month: 'Month 2', overall_score: 51, skills_mastered: 5, projects_completed: 1 },
      { month: 'Month 3', overall_score: 63, skills_mastered: 6, projects_completed: 2 },
      { month: 'Month 4', overall_score: 72, skills_mastered: 8, projects_completed: 3 },
      { month: 'Current', overall_score: 82, skills_mastered: 8, projects_completed: 3 }
    ],
    current_readiness_level: 'Competitive Candidate'
  };

  const handleUpdateProficiency = async (skillName: string, newLevel: number) => {
    const updatedSkills = profile.skills.map(s =>
      s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, level: newLevel } : s
    );
    const updatedProfile = { ...profile, skills: updatedSkills };
    setProfile(updatedProfile);
    setIsUpdating(true);
    try {
      await runAnalysis(updatedProfile);
    } catch (err) {
      console.error('Error recalculating progress', err);
    } finally {
      setIsUpdating(false);
      setActiveSkillAdjust(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div>
        <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 flex items-center space-x-1">
          <TrendingUp className="w-3.5 h-3.5 mr-1" /> Analytics & Momentum
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Career Progress & Growth
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Track your milestone trajectory, skill evolution over time, and update your proficiencies to measure readiness gains.
        </p>
      </div>

      {/* Top 4 Progress KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-card border-teal-500/30">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold uppercase text-teal-600 dark:text-teal-400">Career Readiness</span>
            <Award className="w-5 h-5 text-teal-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {progress.overall_progress}%
          </p>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-teal-500 h-1.5 rounded-full" style={{ width: `${progress.overall_progress}%` }} />
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border-emerald-500/30">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold uppercase text-emerald-600 dark:text-emerald-400">Skills Mastered</span>
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {progress.skills_completed} <span className="text-sm font-semibold text-slate-400">/ {progress.total_skills_tracked}</span>
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Meeting industry benchmark targets</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border-indigo-500/30">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">Roadmap Velocity</span>
            <Map className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {progress.roadmap_completion}%
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
            {progress.completed_milestones} of {progress.total_milestones} milestones finished
          </p>
        </div>

        <div className="p-5 rounded-2xl glass-card border-amber-500/30">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold uppercase text-amber-600 dark:text-amber-400">Projects Built</span>
            <FolderGit2 className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">
            {progress.projects_completed}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Active portfolio projects</p>
        </div>

      </div>

      {/* Skill Growth Over Time Area Chart */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Skill Growth & Readiness Trajectory Over Time
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Month-by-month progress curve demonstrating learning velocity
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
            +40% Growth since Month 1
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={progress.skill_growth_timeline}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
              <Tooltip
                formatter={(value: any) => [`${value}%`, 'Readiness Index']}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#fff'
                }}
              />
              <Area
                type="monotone"
                dataKey="overall_score"
                stroke="#0d9488"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorScore)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Interactive Quick Skill Level Updater */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <Sliders className="w-4 h-4 mr-2 text-teal-500" />
              Live Proficiency Level Updater
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Leveled up your skills? Adjust sliders to instantly recalculate career match percentages.
            </p>
          </div>

          {isUpdating && (
            <span className="text-xs text-teal-500 font-bold animate-pulse flex items-center">
              <RefreshCw className="w-3.5 h-3.5 mr-1 animate-spin" /> Recalculating...
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profile.skills.slice(0, 6).map((skill) => (
            <div key={skill.name} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{skill.name}</span>
                <span className="text-xs font-black text-teal-600 dark:text-teal-400">{skill.level}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(e) => handleUpdateProficiency(skill.name, parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
