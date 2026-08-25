import React, { useState, useEffect } from 'react';
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  Award,
  Sparkles,
  BookOpen,
  FolderGit2,
  ChevronDown,
  ChevronUp,
  Target,
  RefreshCw,
  ExternalLink,
  Zap,
  Flame,
  Check,
  Compass
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { RoadmapStage } from '../types';
import { api } from '../services/api';

const CAREER_OPTIONS = [
  'Data Scientist', 'Data Analyst', 'ML Engineer', 'AI Engineer',
  'Data Engineer', 'Software Engineer', 'Business Analyst', 'AI Researcher'
];

export const RoadmapPage: React.FC = () => {
  const {
    profile,
    analysisReport,
    targetRole,
    setTargetRole,
    toggleMilestoneCompletion
  } = useCareer();

  const [selectedRole, setSelectedRole] = useState<string>(targetRole || 'Data Scientist');
  const [stages, setStages] = useState<RoadmapStage[]>(analysisReport?.roadmap || []);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedStageId, setExpandedStageId] = useState<string | null>(null);

  // Sync roadmap when selectedRole or targetRole changes
  useEffect(() => {
    async function loadRoadmapForRole() {
      setIsLoading(true);
      try {
        const fetchedRoadmap = await api.getRoadmap(profile.id || 'demo-alex-student', selectedRole);
        setStages(fetchedRoadmap);
        if (fetchedRoadmap.length > 0 && !expandedStageId) {
          setExpandedStageId(fetchedRoadmap[0].id);
        }
      } catch (err) {
        console.error('Failed to load roadmap', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadRoadmapForRole();
  }, [selectedRole]);

  // Keep selectedRole in sync with context targetRole
  useEffect(() => {
    if (targetRole && targetRole !== selectedRole) {
      setSelectedRole(targetRole);
    }
  }, [targetRole]);

  const handleRoleChange = (newRole: string) => {
    setSelectedRole(newRole);
    setTargetRole(newRole);
  };

  const completedCount = stages.filter(s => s.is_completed).length;
  const progressPercent = Math.round((completedCount / Math.max(1, stages.length)) * 100);

  // Calculate earned XP
  const totalXP = stages.reduce((acc, s) => acc + (s.xp_reward || 250), 0);
  const earnedXP = stages.filter(s => s.is_completed).reduce((acc, s) => acc + (s.xp_reward || 250), 0);
  const userLevel = Math.max(1, Math.floor(earnedXP / 400) + 1);

  const toggleExpand = (id: string) => {
    setExpandedStageId(prev => prev === id ? null : id);
  };

  const handleToggleStage = async (stageId: string, currentStatus: boolean) => {
    const nextStatus = !currentStatus;
    setStages(prev => prev.map(s => s.id === stageId ? { ...s, is_completed: nextStatus } : s));
    await toggleMilestoneCompletion(stageId, nextStatus);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner & Dynamic Target Role Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 flex items-center">
              <Map className="w-3.5 h-3.5 mr-1" /> Dynamic Execution Plan
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
              <Flame className="w-3 h-3 mr-1 text-amber-500 fill-amber-500" /> Level {userLevel} Explorer
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
            Your 6-Month AI Career Roadmap
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
            Custom learning trajectory with verified tutorials & resource links for <strong className="text-teal-600 dark:text-teal-400">{selectedRole}</strong>.
          </p>
        </div>

        {/* Role Selector Dropdown & Progress Badges */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Target Role:</label>
            <select
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm font-bold text-teal-600 dark:text-teal-400 focus:ring-2 focus:ring-teal-500 focus:outline-none shadow-sm"
            >
              {CAREER_OPTIONS.map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div className="hidden sm:flex items-center space-x-2.5 px-3.5 py-2 rounded-xl glass-card border-teal-500/30">
            <Award className="w-4 h-4 text-teal-500" />
            <span className="text-xs font-black text-teal-600 dark:text-teal-400">
              {completedCount}/{stages.length} ({progressPercent}%)
            </span>
          </div>
        </div>
      </div>

      {/* Gamified Joy & XP Progress Bar */}
      <div className="p-4 sm:p-5 rounded-2xl glass-card border-teal-500/30 bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-transparent flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-teal-500/20">
            <Zap className="w-6 h-6 text-amber-300 fill-amber-300" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                Student Learning XP: {earnedXP} / {totalXP} XP
              </h3>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                +{stages.length > 0 ? stages[0].xp_reward : 250} XP per Milestone
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Complete each stage and explore the recommended links to unlock recruiter-ready milestones!
            </p>
          </div>
        </div>

        <div className="w-full sm:w-48 flex flex-col justify-center">
          <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
            <span>Roadmap Completion</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-teal-500 via-indigo-500 to-emerald-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center space-x-2 text-xs text-teal-500 py-2">
          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          <span>Synthesizing custom 6-month roadmap with curated resources for {selectedRole}...</span>
        </div>
      )}

      {/* 6-Month Timeline Cards */}
      <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
        
        {stages.map((stage) => {
          const isExpanded = expandedStageId === stage.id;
          return (
            <div
              key={stage.id}
              className={`p-6 rounded-3xl glass-card border transition-all duration-200 relative ${
                stage.is_completed
                  ? 'border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/10 dark:bg-emerald-950/10 shadow-sm'
                  : 'hover:border-teal-500/50'
              }`}
            >
              {/* Timeline Connector Dot */}
              <div
                className={`absolute -left-[35px] sm:-left-[43px] top-7 w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white dark:bg-slate-900 cursor-pointer transition ${
                  stage.is_completed
                    ? 'border-emerald-500 text-emerald-500 shadow-md'
                    : 'border-slate-400 dark:border-slate-600 text-slate-400'
                }`}
                onClick={() => handleToggleStage(stage.id, stage.is_completed)}
                title={stage.is_completed ? "Click to mark incomplete" : "Click to mark completed"}
              >
                {stage.is_completed ? (
                  <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-white" />
                ) : (
                  <Circle className="w-3 h-3" />
                )}
              </div>

              {/* Stage Top Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                    MONTH {stage.month}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    {stage.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <span className="flex items-center text-slate-500 dark:text-slate-400">
                    <Clock className="w-3.5 h-3.5 mr-1 text-indigo-500" />
                    ~{stage.estimated_hours} Hours
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-bold border border-amber-200 dark:border-amber-900">
                    +{stage.xp_reward || 250} XP
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                    {stage.difficulty}
                  </span>

                  {/* Toggle Checkbox Button */}
                  <button
                    onClick={() => handleToggleStage(stage.id, stage.is_completed)}
                    className={`px-3 py-1 rounded-xl font-bold text-xs transition ${
                      stage.is_completed
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950'
                    }`}
                  >
                    {stage.is_completed ? 'Completed ✓' : 'Mark Done'}
                  </button>

                  <button
                    onClick={() => toggleExpand(stage.id)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {stage.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-teal-700 dark:text-teal-300 border border-slate-200 dark:border-slate-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-5 animate-in fade-in">
                  
                  {/* Curated Resource Links (Requested by User) */}
                  {stage.resources && stage.resources.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 mb-2.5 flex items-center">
                        <ExternalLink className="w-3.5 h-3.5 mr-1 text-teal-500" /> Curated Learning Resources & Interactive Tutorials:
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {stage.resources.map((res, rIdx) => (
                          <a
                            key={rIdx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-md transition-all group flex flex-col justify-between"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                                  {res.type}
                                </span>
                                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-teal-500 transition-colors" />
                              </div>
                              <h5 className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                                {res.title}
                              </h5>
                            </div>

                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium">
                              Platform: <strong>{res.platform}</strong>
                            </p>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Learning Objectives */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                      <BookOpen className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Core Learning Objectives:
                    </h4>
                    <ul className="space-y-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      {stage.learning_objectives.map((obj, oIdx) => (
                        <li key={oIdx} className="flex items-start">
                          <span className="text-teal-500 font-bold mr-2">•</span>
                          <span>{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Recommended Practical Projects */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 flex items-center">
                      <FolderGit2 className="w-3.5 h-3.5 mr-1 text-teal-500" /> Recommended Hands-On Builds:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {stage.recommended_projects.map((proj, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200"
                        >
                          🚀 {proj}
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};
