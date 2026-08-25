import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowRight,
  BrainCircuit,
  Cpu
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface AnalysisSimulationProps {
  onFinish: () => void;
}

const STAGES = [
  "Analyzing technical & programming skills...",
  "Evaluating practical project experience...",
  "Mapping domain interests & passions...",
  "Comparing against 10+ career benchmarks...",
  "Identifying skill gaps & learning priorities...",
  "Synthesizing 6-month personalized roadmap..."
];

export const AnalysisSimulation: React.FC<AnalysisSimulationProps> = ({ onFinish }) => {
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStageIdx((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsCompleted(true);
          confetti({
            particleCount: 70,
            spread: 60,
            origin: { y: 0.6 }
          });
          return prev;
        }
      });
    }, 850);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full glass-card p-8 sm:p-10 text-center border border-slate-200 dark:border-slate-800 shadow-2xl relative overflow-hidden">
        
        {/* Glowing orb in center */}
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-teal-500/25 mb-6 relative">
          {isCompleted ? (
            <Sparkles className="w-10 h-10 animate-bounce" />
          ) : (
            <BrainCircuit className="w-10 h-10 animate-pulse" />
          )}
          {!isCompleted && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping" />
          )}
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          {isCompleted ? "Your Career Intelligence Report is Ready" : "Analyzing Your Career Profile..."}
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          {isCompleted
            ? "We have generated your personalized match scores, skill gap matrix, and learning roadmap."
            : "Running multi-factor scoring algorithms and benchmark alignment..."}
        </p>

        {/* Animated Checkmarks List */}
        <div className="my-8 space-y-3 text-left">
          {STAGES.map((stageText, idx) => {
            const isDone = idx <= currentStageIdx;
            const isCurrent = idx === currentStageIdx && !isCompleted;

            return (
              <div
                key={idx}
                className={`flex items-center space-x-3 text-xs sm:text-sm p-2 rounded-xl transition-all duration-300 ${
                  isDone
                    ? 'text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/40'
                    : 'text-slate-400 dark:text-slate-600 opacity-40'
                }`}
              >
                {isDone && !isCurrent ? (
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-500 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-slate-400/40 flex-shrink-0" />
                )}
                <span className={isCurrent ? 'font-bold text-indigo-600 dark:text-indigo-400' : ''}>
                  {stageText}
                </span>
              </div>
            );
          })}
        </div>

        {/* View Results Button */}
        {isCompleted && (
          <button
            onClick={onFinish}
            className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-teal-500/25 transition-all hover:scale-105 active:scale-95 animate-in fade-in"
          >
            <span>View My Results</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}

      </div>
    </div>
  );
};
