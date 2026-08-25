import React, { useRef } from 'react';
import {
  Award,
  X,
  Download,
  Share2,
  CheckCircle,
  Printer,
  Sparkles,
  ShieldCheck,
  Compass,
  ExternalLink,
  Copy
} from 'lucide-react';
import { RoadmapStage, StudentProfile } from '../../types';
import confetti from 'canvas-confetti';

interface MilestoneCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  stage: RoadmapStage | null;
  profile: StudentProfile;
  targetRole: string;
}

export const MilestoneCertificateModal: React.FC<MilestoneCertificateModalProps> = ({
  isOpen,
  onClose,
  stage,
  profile,
  targetRole
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!isOpen || !stage) return null;

  const issueDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certId = `ACN-${(stage.month || 1).toString().padStart(2, '0')}-${(stage.id || 'milestone').toUpperCase().slice(0, 6)}-${Math.floor(1000 + Math.random() * 9000)}`;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    navigator.clipboard?.writeText(
      `🎓 I just completed the "${stage.title}" milestone on AI Career Navigator for the ${targetRole} Track! Verified Credential ID: ${certId}`
    );
    alert('Certificate Credential Copied to Clipboard! Ready to share on LinkedIn or your portfolio.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      
      {/* Container */}
      <div className="w-full max-w-3xl bg-white dark:bg-[#0c0f17] border border-amber-500/30 dark:border-amber-400/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-auto">
        
        {/* Top Control Bar */}
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-wide text-amber-300">
              Official Milestone Certificate of Completion
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition border border-slate-700"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-xs font-bold text-black transition shadow-md shadow-amber-500/20"
              title="Copy verification credential"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div className="p-6 sm:p-10 bg-gradient-to-b from-amber-500/[0.03] via-transparent to-amber-500/[0.03]">
          
          <div
            ref={certificateRef}
            className="relative border-4 border-double border-amber-600/40 dark:border-amber-400/30 rounded-2xl p-6 sm:p-10 bg-white dark:bg-[#07090e] text-center shadow-inner overflow-hidden"
          >
            
            {/* Background Corner Ornaments */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500/50 rounded-tl" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500/50 rounded-tr" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500/50 rounded-bl" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500/50 rounded-br" />

            {/* Certificate Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 flex items-center justify-center text-black shadow-lg shadow-amber-500/30 mb-3">
                <Compass className="w-7 h-7" />
              </div>
              <p className="text-[11px] font-mono tracking-[0.3em] uppercase text-amber-600 dark:text-amber-400 font-bold">
                AI CAREER NAVIGATOR &bull; ACCREDITATION BOARD
              </p>
              <h2 className="text-2xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 dark:text-white mt-1">
                Certificate of Completion
              </h2>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent my-2" />
            </div>

            {/* Recipient Notice */}
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic">
              This is to certify that
            </p>

            {/* Student Name */}
            <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-amber-100 my-2 tracking-tight">
              {profile.name || 'Alex Student'}
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              has successfully fulfilled all curriculum requirements, practical assessments, and verified milestones for:
            </p>

            {/* Milestone Title & Career Track Banner */}
            <div className="my-4 py-3 px-6 rounded-xl bg-amber-500/10 border border-amber-500/30 inline-block max-w-xl">
              <p className="text-sm sm:text-base font-bold text-amber-900 dark:text-amber-300">
                {stage.title}
              </p>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                {targetRole} Career Specialization Track &bull; Month {stage.month}
              </p>
            </div>

            {/* Skills & Focus Area Badges */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-lg mx-auto my-4">
              {(stage.skills || []).map((area, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {area}
                </span>
              ))}
            </div>

            {/* Signatures & Seal Grid */}
            <div className="grid grid-cols-3 items-center gap-4 mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80">
              
              {/* Left Signature */}
              <div className="text-left">
                <div className="h-8 flex items-end">
                  <span className="font-serif italic text-base text-slate-700 dark:text-slate-300">
                    Dr. Sarah Chen
                  </span>
                </div>
                <div className="w-28 h-px bg-slate-300 dark:bg-slate-700 my-1" />
                <p className="text-[10px] text-slate-500 font-medium">Head of AI Career Intelligence</p>
              </div>

              {/* Center Holographic Seal */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-amber-600 flex items-center justify-center text-black font-black shadow-lg shadow-amber-500/20 border-2 border-amber-200">
                  <ShieldCheck className="w-9 h-9 text-black" />
                </div>
                <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest mt-1">
                  VERIFIED AI SEAL
                </span>
              </div>

              {/* Right Signature */}
              <div className="text-right">
                <div className="h-8 flex items-end justify-end">
                  <span className="font-serif italic text-base text-slate-700 dark:text-slate-300">
                    Alex Mercer
                  </span>
                </div>
                <div className="w-28 h-px bg-slate-300 dark:bg-slate-700 my-1 ml-auto" />
                <p className="text-[10px] text-slate-500 font-medium">Curriculum Accreditation Dir.</p>
              </div>

            </div>

            {/* Bottom Metadata */}
            <div className="flex items-center justify-between mt-6 text-[10px] font-mono text-slate-400 dark:text-slate-500">
              <span>Credential ID: <strong className="text-slate-600 dark:text-slate-400">{certId}</strong></span>
              <span>Issued On: <strong className="text-slate-600 dark:text-slate-400">{issueDate}</strong></span>
            </div>

          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>+250 XP Awarded to your Career Profile!</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-bold text-xs hover:opacity-90 transition shadow-md"
          >
            Continue Learning
          </button>
        </div>

      </div>

    </div>
  );
};
