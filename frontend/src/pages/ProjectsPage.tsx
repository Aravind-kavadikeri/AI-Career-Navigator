import React, { useState } from 'react';
import {
  FolderGit2,
  Star,
  Clock,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Layers,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { useCareer } from '../context/CareerContext';

export const ProjectsPage: React.FC = () => {
  const { analysisReport, targetRole } = useCareer();
  const projects = analysisReport?.project_recommendations || [];
  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div>
        <span className="text-xs uppercase tracking-wider font-extrabold text-teal-600 dark:text-teal-400 flex items-center space-x-1">
          <FolderGit2 className="w-3.5 h-3.5 mr-1" /> Portfolio Engineering
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
          Gap-Targeted Portfolio Projects
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
          Build high-impact, full-stack applications that directly eliminate your identified skill gaps in <strong className="text-teal-600 dark:text-teal-400">{targetRole}</strong>.
        </p>
      </div>

      {/* Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((proj) => {
          const isExpanded = expandedId === proj.id;
          return (
            <div
              key={proj.id}
              className="p-6 rounded-3xl glass-card border hover:border-teal-500/50 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                {/* Top Tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                    Bridges: {proj.target_gap_skill}
                  </span>

                  {/* Star Rating */}
                  <div className="flex items-center space-x-1" title={`Portfolio Value: ${proj.portfolio_value} of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= proj.portfolio_value
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {proj.description}
                </p>

                {/* Skills Gained Chips */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {proj.skills_gained.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {/* Implementation Steps (Collapsible) */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5 animate-in fade-in">
                    <h4 className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300 flex items-center">
                      <Code2 className="w-3.5 h-3.5 mr-1 text-indigo-500" /> 5-Step Architecture Blueprint:
                    </h4>
                    <ol className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                      {proj.implementation_steps.map((step, sIdx) => (
                        <li key={sIdx} className="flex items-start">
                          <span className="font-bold text-teal-500 mr-2">{sIdx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {/* Bottom Card Controls */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" />
                    ~{proj.estimated_days} Days
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {proj.difficulty}
                  </span>
                </div>

                <button
                  onClick={() => toggleExpand(proj.id)}
                  className="flex items-center space-x-1 font-bold text-teal-600 dark:text-teal-400 hover:underline"
                >
                  <span>{isExpanded ? 'Hide Steps' : 'View Blueprint'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
