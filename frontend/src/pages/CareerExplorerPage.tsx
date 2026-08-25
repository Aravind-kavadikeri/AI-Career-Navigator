import React, { useState, useEffect } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Layers,
  ChevronRight,
  Code2,
  FolderGit2,
  Award
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';
import { api } from '../services/api';

export const CareerExplorerPage: React.FC = () => {
  const { setTargetRole, setActiveTab } = useCareer();
  const [careersData, setCareersData] = useState<Record<string, any>>({});
  const [selectedRoleKey, setSelectedRoleKey] = useState<string>('Data Scientist');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCareers() {
      setIsLoading(true);
      try {
        const data = await api.getCareersEncyclopedia();
        setCareersData(data);
      } catch (err) {
        console.error('Failed to load careers encyclopedia', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCareers();
  }, []);

  const rolesList = Object.keys(careersData);
  const activeRoleData = careersData[selectedRoleKey] || careersData['Data Scientist'];

  const handleSelectRoleToNavigate = (roleName: string) => {
    setTargetRole(roleName);
    setActiveTab('skill-gap');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div>
        <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 flex items-center space-x-1">
          <Compass className="w-3.5 h-3.5 mr-1" /> Career Encyclopedia
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Explore AI & Data Careers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Browse benchmark requirements, core technologies, career progression pathways, and typical projects for 8+ tech roles.
        </p>
      </div>

      {/* Role Navigation Pill Tabs */}
      <div className="flex flex-wrap gap-2 pb-2">
        {rolesList.map((r) => (
          <button
            key={r}
            onClick={() => setSelectedRoleKey(r)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedRoleKey === r
                ? 'bg-teal-600 text-white shadow-md shadow-teal-500/20'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-teal-400'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Selected Role Detail Section */}
      {activeRoleData && (
        <div className="space-y-6">
          
          {/* Hero Role Card */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card border border-teal-500/30 bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-transparent">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-teal-600 dark:text-teal-400">
                  {activeRoleData.category} • {activeRoleData.difficulty}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  {activeRoleData.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-2xl leading-relaxed">
                  {activeRoleData.description}
                </p>
              </div>

              <button
                onClick={() => handleSelectRoleToNavigate(activeRoleData.title)}
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-bold shadow-lg shadow-teal-500/25 transition hover:scale-105 flex-shrink-0"
              >
                <span>Analyze My Gap for {activeRoleData.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Required Benchmark Skills */}
            <div className="p-6 rounded-3xl glass-card">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center">
                <Award className="w-4 h-4 mr-2 text-teal-500" /> Benchmark Skill Requirements
              </h3>
              <div className="space-y-3">
                {Object.entries(activeRoleData.required_skills as Record<string, number>).slice(0, 6).map(([skill, req]) => (
                  <div key={skill}>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{skill}</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">{req}% Required</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-teal-500 h-1.5 rounded-full"
                        style={{ width: `${req}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Core Tech Stack:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeRoleData.core_technologies?.map((tech: string, tIdx: number) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Typical Industry Projects */}
            <div className="p-6 rounded-3xl glass-card">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center">
                <FolderGit2 className="w-4 h-4 mr-2 text-indigo-500" /> Typical Industry Projects
              </h3>
              <div className="space-y-3">
                {activeRoleData.typical_projects?.map((proj: string, pIdx: number) => (
                  <div
                    key={pIdx}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-200 flex items-start space-x-2"
                  >
                    <span className="text-teal-500 font-bold">🚀</span>
                    <span>{proj}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Career Progression Pathways */}
          <div className="p-6 sm:p-8 rounded-3xl glass-card">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2 text-teal-500" /> Career Progression Timeline
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {activeRoleData.career_progression?.map((stage: any, sIdx: number) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700"
                >
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                    {stage.experience}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-2">
                    {stage.level}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {stage.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
