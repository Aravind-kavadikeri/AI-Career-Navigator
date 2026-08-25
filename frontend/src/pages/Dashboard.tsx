import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarRadiusAxis
} from 'recharts';
import {
  Sparkles,
  ArrowRight,
  Target,
  Award,
  CheckCircle2,
  FolderGit2,
  Map,
  TrendingUp,
  Bot,
  Compass,
  AlertCircle
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

export const Dashboard: React.FC = () => {
  const {
    profile,
    analysisReport,
    setActiveTab,
    setTargetRole,
    toggleAssistant
  } = useCareer();

  const topMatch = analysisReport?.career_matches?.[0];
  const readiness = analysisReport?.career_readiness_score || 82;
  const currentRoadmapStage = analysisReport?.roadmap?.find(s => !s.is_completed) || analysisReport?.roadmap?.[0];
  const topProject = analysisReport?.project_recommendations?.[0];

  // Skills for Bar Chart
  const skillChartData = profile.skills.slice(0, 7).map(s => ({
    name: s.name,
    level: s.level,
    category: s.category
  }));

  // Skills for Radar Chart
  const radarData = [
    { subject: 'Python', score: profile.skills.find(s => s.name === 'Python')?.level || 88, fullMark: 100 },
    { subject: 'SQL', score: profile.skills.find(s => s.name === 'SQL')?.level || 76, fullMark: 100 },
    { subject: 'Stats', score: profile.skills.find(s => s.name === 'Statistics')?.level || 64, fullMark: 100 },
    { subject: 'ML', score: profile.skills.find(s => s.name === 'Machine Learning')?.level || 61, fullMark: 100 },
    { subject: 'DL', score: profile.skills.find(s => s.name === 'Deep Learning')?.level || 42, fullMark: 100 },
    { subject: 'Viz', score: profile.skills.find(s => s.name === 'Data Visualization')?.level || 72, fullMark: 100 },
  ];

  // Circular gauge data
  const gaugeData = [{ name: 'Readiness', value: readiness, fill: '#0d9488' }];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Welcome Banner with Joy & XP Progress */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 relative overflow-hidden bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-transparent">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                <Sparkles className="w-3.5 h-3.5 mr-1 text-teal-500" />
                AI Career Intelligence Active
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                🔥 5-Day Active Streak!
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Welcome back, {profile.name}! 🚀
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Your profile currently aligns most strongly with <strong>{topMatch?.role || 'Data Scientist'}</strong> at <strong>{topMatch?.match_percentage || 92}% match</strong>. You have <strong>{analysisReport?.primary_skill_gaps.major_gaps_count || 3} primary skill gaps</strong> to bridge before full entry readiness.
            </p>
          </div>

          <div className="px-5 py-4 rounded-2xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-amber-500/20">
              XP
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Gamified Career Path
              </p>
              <p className="text-[11px] text-teal-600 dark:text-teal-400 font-semibold">
                +250 XP for every milestone completed!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('skill-gap')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition shadow-md shadow-teal-500/20 hover:scale-105 active:scale-95"
          >
            <span>Inspect Skill Gaps</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-bold transition hover:scale-105 active:scale-95"
          >
            <span>View 6-Month Roadmap & Resources</span>
          </button>

          <button
            onClick={toggleAssistant}
            className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition hover:scale-105 active:scale-95"
          >
            <Bot className="w-4 h-4" />
            <span>Ask AI Coach</span>
          </button>
        </div>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* 1. Overall Career Readiness Circular Gauge */}
        <div className="p-6 rounded-3xl glass-card flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
              Career Readiness Score
            </span>
            <Award className="w-5 h-5 text-teal-500" />
          </div>

          <div className="relative h-44 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={14}
                data={gaugeData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: '#e2e8f0' }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {readiness}%
              </span>
              <span className="text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                {readiness >= 80 ? 'Competitive Candidate' : 'Developing Profile'}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
            Calculated across skills (35%), projects (25%), interests (20%), academics (10%), & certs (10%).
          </p>
        </div>

        {/* 2. Top Career Role Match Card */}
        <div className="p-6 rounded-3xl glass-card flex flex-col justify-between border-teal-500/30">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase text-teal-600 dark:text-teal-400 tracking-wider">
                Top Career Match
              </span>
              <Target className="w-5 h-5 text-teal-500" />
            </div>

            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {topMatch?.role || 'Data Scientist'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
              {topMatch?.tagline}
            </p>

            <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center mb-1 text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Match Fit:</span>
                <span className="font-extrabold text-teal-600 dark:text-teal-400">{topMatch?.match_percentage || 92}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-teal-500 h-2 rounded-full"
                  style={{ width: `${topMatch?.match_percentage || 92}%` }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (topMatch) setTargetRole(topMatch.role);
              setActiveTab('career-matches');
            }}
            className="w-full mt-4 py-2 px-3 rounded-xl bg-teal-50 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold hover:bg-teal-100 transition flex items-center justify-center space-x-1"
          >
            <span>Explore All Career Matches ({analysisReport?.career_matches?.length || 8})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 3. Active Roadmap Milestone Widget */}
        <div className="p-6 rounded-3xl glass-card flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                Current Roadmap Stage
              </span>
              <Map className="w-5 h-5 text-indigo-500" />
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
              <span className="text-[10px] font-bold uppercase text-indigo-700 dark:text-indigo-300">
                Month {currentRoadmapStage?.month || 1} Objective
              </span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                {currentRoadmapStage?.title || 'Foundations & Statistics'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Estimated ~{currentRoadmapStage?.estimated_hours || 30} hours of study & project execution.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('roadmap')}
            className="w-full mt-4 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition flex items-center justify-center space-x-1 shadow-sm"
          >
            <span>Open Interactive Roadmap</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Interactive Charts: Skill Breakdown & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Horizontal Skill Proficiency Bars */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-card">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Skill Proficiency Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current proficiency levels evaluated from your profile
              </p>
            </div>
            <button
              onClick={() => setActiveTab('progress')}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              Update Skills →
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={skillChartData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11 }} width={80} />
                <Tooltip
                  formatter={(value: any) => [`${value}%`, 'Proficiency']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                />
                <Bar dataKey="level" radius={[0, 6, 6, 0]}>
                  {skillChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.level >= 75 ? '#0d9488' : entry.level >= 55 ? '#6366f1' : '#f59e0b'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Balance Radar Chart */}
        <div className="p-6 rounded-3xl glass-card flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Skill Domain Balance
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Multi-dimensional proficiency radar
            </p>
          </div>

          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#475569" strokeDasharray="3 3" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} />
                <Radar
                  name="Proficiency"
                  dataKey="score"
                  stroke="#0d9488"
                  fill="#0d9488"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
            Balanced foundation across programming, modeling, and analytics.
          </p>
        </div>

      </div>

      {/* Featured Recommended Project & Learning Snippet */}
      {topProject && (
        <div className="p-6 rounded-3xl glass-card border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center flex-shrink-0">
                <FolderGit2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                  Recommended to Bridge Gap: {topProject.target_gap_skill}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {topProject.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-2xl">
                  {topProject.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {topProject.skills_gained.map((sk, idx) => (
                    <span key={idx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('projects')}
              className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex-shrink-0"
            >
              <span>View Implementation Steps</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
