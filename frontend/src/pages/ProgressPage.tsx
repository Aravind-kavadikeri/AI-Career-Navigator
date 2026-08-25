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
  ArrowRight,
  ShieldCheck,
  Printer
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
import { MilestoneCertificateModal } from '../components/roadmap/MilestoneCertificateModal';
import { RoadmapStage } from '../types';

export const ProgressPage: React.FC = () => {
  const {
    profile,
    setProfile,
    analysisReport,
    runAnalysis,
    targetRole
  } = useCareer();

  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedCertStage, setSelectedCertStage] = useState<RoadmapStage | null>(null);
  const [isCertOpen, setIsCertOpen] = useState(false);

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

  const completedStages = (analysisReport?.roadmap || []).filter(s => s.is_completed);

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
      console.error('Failed to recalculate profile', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleViewCert = (stage: RoadmapStage) => {
    setSelectedCertStage(stage);
    setIsCertOpen(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> Student Trajectory Analytics
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
            <Sparkles className="w-3 h-3 mr-1" /> Verified Growth
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Career Progress & Skill Velocity
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          Historical growth trajectory, milestones completed, and live proficiency simulator for <strong className="text-teal-600 dark:text-teal-400">{targetRole || 'Data Scientist'}</strong>.
        </p>
      </div>

      {/* 4 Summary Score Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-3xl glass-card border border-teal-500/30 bg-teal-50/10 dark:bg-teal-950/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Readiness Score</span>
            <Award className="w-4 h-4 text-teal-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-teal-600 dark:text-teal-400">
            {profile.career_readiness_score || 82}%
          </p>
          <p className="text-[11px] text-teal-600/80 dark:text-teal-400/80 font-semibold mt-1">
            {progress.current_readiness_level}
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-indigo-500/30 bg-indigo-50/10 dark:bg-indigo-950/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Skills Mastered</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">
            {progress.skills_completed}/{progress.total_skills_tracked}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {Math.round((progress.skills_completed / Math.max(1, progress.total_skills_tracked)) * 100)}% Skill Coverage
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-amber-500/30 bg-amber-50/10 dark:bg-amber-950/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Roadmap Milestones</span>
            <Map className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
            {progress.completed_milestones}/{progress.total_milestones}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {progress.roadmap_completion}% Track Completion
          </p>
        </div>

        <div className="p-5 rounded-3xl glass-card border border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Portfolio Projects</span>
            <FolderGit2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
            {profile.projects?.length || progress.projects_completed}
          </p>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Recruiter Verified Builds
          </p>
        </div>

      </div>

      {/* Growth Trajectory Chart */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Historical Readiness Score Velocity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track your readiness index growth across semester milestones.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-500 flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" /> +40% Overall Growth
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={progress.skill_growth_timeline}>
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
              <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  border: '1px solid #1e293b',
                  borderRadius: '12px',
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

      {/* Verified Milestone Certificates Showcase */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-amber-500/30 bg-gradient-to-r from-amber-500/5 via-transparent to-transparent">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <Award className="w-4 h-4 mr-2 text-amber-500" />
              Verified Course & Milestone Certificates
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Official certificates awarded for completing your curriculum stages.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
            {completedStages.length} Earned
          </span>
        </div>

        {completedStages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {completedStages.map((stg) => (
              <div
                key={stg.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900/90 border border-amber-500/30 hover:border-amber-500 transition shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                      Month {stg.month} Certified
                    </span>
                    <ShieldCheck className="w-4 h-4 text-amber-500" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                    {stg.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {targetRole || 'Data Scientist'} Track
                  </p>
                </div>

                <button
                  onClick={() => handleViewCert(stg)}
                  className="mt-3 w-full py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold text-xs border border-amber-500/30 transition flex items-center justify-center space-x-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View / Print Certificate</span>
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-100/50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-center">
            <Award className="w-8 h-8 text-amber-400/60 mx-auto mb-2" />
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
              No milestones completed yet.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Head to the 6-Month Roadmap tab and check off your completed milestones to earn verified course completion certificates!
            </p>
          </div>
        )}
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

      {/* Certificate Modal */}
      <MilestoneCertificateModal
        isOpen={isCertOpen}
        onClose={() => setIsCertOpen(false)}
        stage={selectedCertStage}
        profile={profile}
        targetRole={targetRole || 'Data Scientist'}
      />

    </div>
  );
};
