import React, { useEffect, useRef, useState } from 'react';
import {
  Compass,
  ArrowRight,
  Play
} from 'lucide-react';

interface SpaceCosmosSplashProps {
  onEnterApp: () => void;
  onLoadDemo: () => void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  size: number;
  opacity: number;
}

export const SpaceCosmosSplash: React.FC<SpaceCosmosSplashProps> = ({ onEnterApp, onLoadDemo }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isWarping, setIsWarping] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Keyboard Enter key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isWarping) {
        triggerWarpEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWarping]);

  const triggerWarpEnter = () => {
    setIsWarping(true);
    setTimeout(() => {
      onEnterApp();
    }, 800);
  };

  const triggerWarpDemo = () => {
    setIsWarping(true);
    setTimeout(() => {
      onLoadDemo();
    }, 800);
  };

  // 3D Space Canvas Animation Engine (Ultra-Minimalist Pitch Black Cosmos)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.0008;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.0008;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize 3D Stars (Monochrome Silver & Pure White)
    const numStars = 600;
    const stars: Star[] = [];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 3200,
        y: (Math.random() - 0.5) * 3200,
        z: Math.random() * 2000,
        prevZ: 2000,
        size: Math.random() * 1.5 + 0.4,
        opacity: Math.random() * 0.8 + 0.2
      });
    }

    let speed = 2.0;
    let ringAngle = 0;

    const render = () => {
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      if (isWarping) {
        speed += 2.2;
      }

      // Pure Pitch Black Deep Space Background
      ctx.fillStyle = isWarping ? 'rgba(0, 0, 0, 0.25)' : '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Minimalist Ambient Center Halo
      const centerGlow = ctx.createRadialGradient(cx, cy, 5, cx, cy, 380);
      centerGlow.addColorStop(0, 'rgba(255, 255, 255, 0.04)');
      centerGlow.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
      centerGlow.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 380, 0, Math.PI * 2);
      ctx.fill();

      // Subtle Minimal Orbiting Celestial Wire Rings
      ringAngle += 0.003;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, 260, 90, ringAngle + mouseRef.current.x, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(cx, cy, 380, 130, -ringAngle * 0.7 + mouseRef.current.y, 0, Math.PI * 2);
      ctx.stroke();

      // Render 3D Perspective Stars
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.prevZ = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.z = 2000;
          star.prevZ = 2000;
          star.x = (Math.random() - 0.5) * 3200;
          star.y = (Math.random() - 0.5) * 3200;
        }

        const k = 450 / star.z;
        const px = star.x * k + cx + mouseRef.current.x * 250;
        const py = star.y * k + cy + mouseRef.current.y * 250;

        const prevK = 450 / star.prevZ;
        const prevPx = star.x * prevK + cx + mouseRef.current.x * 250;
        const prevPy = star.y * prevK + cy + mouseRef.current.y * 250;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthAlpha = Math.min(1, (2000 - star.z) / 1200) * star.opacity;

          if (isWarping || speed > 8) {
            // Warp Hyperdrive Streak Lines
            ctx.strokeStyle = `rgba(255, 255, 255, ${depthAlpha})`;
            ctx.lineWidth = Math.min(3, (1 - star.z / 2000) * 4);
            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.stroke();
          } else {
            // Crisp Silver Stardust
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
            const radius = Math.max(0.5, (1 - star.z / 2000) * star.size * 2);
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isWarping]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none flex flex-col justify-between items-center text-white">
      
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top Brand Tag */}
      <header className="relative z-10 pt-10 text-center">
        <div className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-neutral-400">
          <Compass className="w-3.5 h-3.5 text-white" />
          <span>AI CAREER NAVIGATOR &bull; OBSIDIAN PRO</span>
        </div>
      </header>

      {/* Minimalist Centerpiece */}
      <main className="relative z-10 text-center max-w-xl mx-auto px-6">
        
        {/* Core Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          AI Career Navigator
        </h1>

        {/* 1-Line Tagline */}
        <p className="text-sm sm:text-base text-neutral-400 font-normal tracking-wide mb-10">
          Your skills. Your potential. Your roadmap.
        </p>

        {/* Minimalist Enter Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={triggerWarpEnter}
            disabled={isWarping}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-extrabold text-sm tracking-wide shadow-xl shadow-white/10 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2.5 ${
              isWarping ? 'opacity-80 scale-105' : ''
            }`}
          >
            <span>{isWarping ? 'ENTERING...' : 'Enter Navigator'}</span>
            <span className="text-[11px] font-mono opacity-60">↵</span>
          </button>

          <button
            onClick={triggerWarpDemo}
            disabled={isWarping}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-950 hover:bg-neutral-900 text-neutral-300 border border-neutral-800 hover:border-neutral-600 font-semibold text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2"
          >
            <Play className="w-3.5 h-3.5 text-neutral-400 fill-neutral-400" />
            <span>Try Demo</span>
          </button>
        </div>

        {/* Keyboard Hint */}
        <p className="text-[11px] text-neutral-500 mt-6 font-mono">
          Press <span className="text-neutral-300 font-bold">Enter ↵</span> to begin
        </p>

      </main>

      {/* Minimalist Bottom Footer */}
      <footer className="relative z-10 pb-8 text-center">
        <p className="text-[11px] text-neutral-600 font-mono tracking-wider uppercase">
          AI-Powered Career Intelligence Platform
        </p>
      </footer>

    </div>
  );
};
