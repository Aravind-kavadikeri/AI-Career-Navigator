import React, { useEffect, useRef, useState } from 'react';
import {
  Compass,
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
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  hasSpikes: boolean;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

export const SpaceCosmosSplash: React.FC<SpaceCosmosSplashProps> = ({ onEnterApp, onLoadDemo }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isWarping, setIsWarping] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Keyboard Enter listener
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
    }, 850);
  };

  const triggerWarpDemo = () => {
    setIsWarping(true);
    setTimeout(() => {
      onLoadDemo();
    }, 850);
  };

  // Realistic 3D Deep Space Canvas Engine
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
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.0006;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.0006;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Realistic Star Colors (Blackbody Radiation spectrum)
    const stellarColors = [
      '#ffffff', // Pure white
      '#f8fafc', // Class A
      '#e2e8f0', // Platinum
      '#bae6fd', // Class B (Light blue-white)
      '#93c5fd', // Class O (Deep blue-white)
      '#fef08a', // Class G (Subtle warm yellow)
      '#fed7aa'  // Class K (Subtle amber)
    ];

    const numStars = 800;
    const stars: Star[] = [];

    for (let i = 0; i < numStars; i++) {
      const isMajor = Math.random() < 0.04;
      stars.push({
        x: (Math.random() - 0.5) * 3600,
        y: (Math.random() - 0.5) * 3600,
        z: Math.random() * 2200,
        prevZ: 2200,
        size: isMajor ? Math.random() * 2.2 + 1.2 : Math.random() * 1.3 + 0.3,
        baseOpacity: Math.random() * 0.7 + 0.3,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2,
        color: stellarColors[Math.floor(Math.random() * stellarColors.length)],
        hasSpikes: isMajor
      });
    }

    // Shooting Meteors
    const meteors: Meteor[] = [];
    const createMeteor = () => {
      meteors.push({
        x: Math.random() * width * 1.2 - width * 0.1,
        y: Math.random() * height * 0.4,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 18 + 14,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 1,
        active: true
      });
    };

    let meteorTimer = 0;
    let speed = 1.6;
    let nebulaTime = 0;

    const render = () => {
      nebulaTime += 0.002;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.03;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.03;

      if (isWarping) {
        speed += 2.6;
      }

      // Deep Space Base Pitch Black
      ctx.fillStyle = isWarping ? 'rgba(0, 0, 0, 0.2)' : '#000000';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 1. Realistic Volumetric Cosmic Dust & Nebula Clouds
      if (!isWarping) {
        const nebulaGrad1 = ctx.createRadialGradient(
          cx + Math.cos(nebulaTime * 0.5) * 200 + mouseRef.current.x * 120,
          cy + Math.sin(nebulaTime * 0.3) * 150 + mouseRef.current.y * 120,
          20,
          cx,
          cy,
          Math.max(width, height) * 0.65
        );
        nebulaGrad1.addColorStop(0, 'rgba(8, 28, 48, 0.18)');
        nebulaGrad1.addColorStop(0.4, 'rgba(15, 23, 42, 0.08)');
        nebulaGrad1.addColorStop(0.8, 'rgba(2, 6, 23, 0.02)');
        nebulaGrad1.addColorStop(1, 'transparent');
        ctx.fillStyle = nebulaGrad1;
        ctx.fillRect(0, 0, width, height);

        const nebulaGrad2 = ctx.createRadialGradient(
          cx - 250 + mouseRef.current.x * 80,
          cy + 180 + mouseRef.current.y * 80,
          30,
          cx - 200,
          cy + 100,
          500
        );
        nebulaGrad2.addColorStop(0, 'rgba(20, 15, 40, 0.12)');
        nebulaGrad2.addColorStop(0.6, 'rgba(4, 9, 20, 0.04)');
        nebulaGrad2.addColorStop(1, 'transparent');
        ctx.fillStyle = nebulaGrad2;
        ctx.fillRect(0, 0, width, height);
      }

      // 2. Realistic Curved Atmospheric Celestial Horizon Arc (Earth/Deep Space Horizon)
      const horizonY = height * 0.88 + mouseRef.current.y * 60;
      const horizonGrad = ctx.createRadialGradient(
        cx + mouseRef.current.x * 100,
        horizonY + 800,
        750,
        cx + mouseRef.current.x * 100,
        horizonY + 800,
        950
      );
      horizonGrad.addColorStop(0, 'rgba(255, 255, 255, 0.08)');
      horizonGrad.addColorStop(0.1, 'rgba(148, 163, 184, 0.05)');
      horizonGrad.addColorStop(0.25, 'rgba(56, 189, 248, 0.03)');
      horizonGrad.addColorStop(0.6, 'rgba(2, 6, 23, 0.01)');
      horizonGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = horizonGrad;
      ctx.beginPath();
      ctx.arc(cx + mouseRef.current.x * 100, horizonY + 800, 950, 0, Math.PI * 2);
      ctx.fill();

      // Atmospheric Rim Line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx + mouseRef.current.x * 100, horizonY + 800, 800, Math.PI * 1.25, Math.PI * 1.75);
      ctx.stroke();

      // 3. Render 3D Realistic Starfield
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.prevZ = star.z;
        star.z -= speed;
        star.twinklePhase += star.twinkleSpeed;

        if (star.z <= 0) {
          star.z = 2200;
          star.prevZ = 2200;
          star.x = (Math.random() - 0.5) * 3600;
          star.y = (Math.random() - 0.5) * 3600;
        }

        const k = 460 / star.z;
        const px = star.x * k + cx + mouseRef.current.x * 240;
        const py = star.y * k + cy + mouseRef.current.y * 240;

        const prevK = 460 / star.prevZ;
        const prevPx = star.x * prevK + cx + mouseRef.current.x * 240;
        const prevPy = star.y * prevK + cy + mouseRef.current.y * 240;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const depthFactor = (2200 - star.z) / 2200;
          const twinkle = 0.75 + Math.sin(star.twinklePhase) * 0.25;
          const alpha = Math.min(1, Math.max(0.1, depthFactor * star.baseOpacity * twinkle));

          if (isWarping || speed > 6) {
            // Relativistic Chromatic Warp Streaks
            ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(1, depthFactor * 1.2)})`;
            ctx.lineWidth = Math.min(3.5, depthFactor * 4);
            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.stroke();
          } else {
            // Realistic Soft Star Glow
            const radius = Math.max(0.4, depthFactor * star.size * 1.8);
            
            // Halo Glow for bright stars
            if (star.hasSpikes && depthFactor > 0.4) {
              const halo = ctx.createRadialGradient(px, py, 0, px, py, radius * 5);
              halo.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.4})`);
              halo.addColorStop(0.5, `rgba(226, 232, 240, ${alpha * 0.1})`);
              halo.addColorStop(1, 'transparent');
              ctx.fillStyle = halo;
              ctx.beginPath();
              ctx.arc(px, py, radius * 5, 0, Math.PI * 2);
              ctx.fill();

              // Telescope 4-Point Optical Diffraction Spikes (Hubble / James Webb style)
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.28})`;
              ctx.lineWidth = 0.8;
              const spikeLen = radius * 7;

              // Horizontal spike
              ctx.beginPath();
              ctx.moveTo(px - spikeLen, py);
              ctx.lineTo(px + spikeLen, py);
              ctx.stroke();

              // Vertical spike
              ctx.beginPath();
              ctx.moveTo(px, py - spikeLen);
              ctx.lineTo(px, py + spikeLen);
              ctx.stroke();
            }

            // Star Core
            ctx.fillStyle = star.color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1;
          }
        }
      }

      // 4. Random Periodic Shooting Meteors
      meteorTimer++;
      if (meteorTimer > 160 && !isWarping) {
        if (Math.random() < 0.35) {
          createMeteor();
        }
        meteorTimer = 0;
      }

      for (let m = meteors.length - 1; m >= 0; m--) {
        const met = meteors[m];
        if (!met.active) continue;

        const tailX = met.x - Math.cos(met.angle) * met.length;
        const tailY = met.y - Math.sin(met.angle) * met.length;

        const metGrad = ctx.createLinearGradient(tailX, tailY, met.x, met.y);
        metGrad.addColorStop(0, 'transparent');
        metGrad.addColorStop(0.7, `rgba(226, 232, 240, ${met.opacity * 0.4})`);
        metGrad.addColorStop(1, `rgba(255, 255, 255, ${met.opacity})`);

        ctx.strokeStyle = metGrad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(met.x, met.y);
        ctx.stroke();

        met.x += Math.cos(met.angle) * met.speed;
        met.y += Math.sin(met.angle) * met.speed;
        met.opacity -= 0.015;

        if (met.opacity <= 0 || met.x > width + 200 || met.y > height + 200) {
          meteors.splice(m, 1);
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
      
      {/* Photorealistic 3D Cosmos Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />

      {/* Top Minimal Brand Tag */}
      <header className="relative z-10 pt-10 text-center animate-in fade-in duration-700">
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400">
          <Compass className="w-3.5 h-3.5 text-white/90" />
          <span>AI CAREER NAVIGATOR &bull; PRO EDITION</span>
        </div>
      </header>

      {/* Minimalist Centerpiece */}
      <main className="relative z-10 text-center max-w-xl mx-auto px-6 animate-in fade-in zoom-in duration-500">
        
        {/* Core Title with Subtle White Titanium Glow */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]">
          AI Career Navigator
        </h1>

        {/* 1-Line Minimalist Tagline */}
        <p className="text-sm sm:text-base text-neutral-400 font-light tracking-wide mb-10">
          Your skills. Your potential. Your roadmap.
        </p>

        {/* Minimalist Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={triggerWarpEnter}
            disabled={isWarping}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full bg-white hover:bg-neutral-200 text-black font-extrabold text-sm tracking-wide shadow-2xl shadow-white/20 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2.5 ${
              isWarping ? 'opacity-90 scale-105 ring-4 ring-white/30' : ''
            }`}
          >
            <span>{isWarping ? 'LAUNCHING...' : 'Enter Navigator'}</span>
            <span className="text-[11px] font-mono opacity-60">↵</span>
          </button>

          <button
            onClick={triggerWarpDemo}
            disabled={isWarping}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-950/80 hover:bg-neutral-900 text-neutral-300 border border-white/10 hover:border-white/30 font-semibold text-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 backdrop-blur-md"
          >
            <Play className="w-3.5 h-3.5 text-neutral-400 fill-neutral-400" />
            <span>Try Demo</span>
          </button>
        </div>

        {/* Keyboard Hint */}
        <p className="text-[11px] text-neutral-500 mt-6 font-mono tracking-wider">
          Press <span className="text-neutral-300 font-bold border-b border-neutral-700 pb-0.5">Enter ↵</span> to launch
        </p>

      </main>

      {/* Minimalist Bottom Footer */}
      <footer className="relative z-10 pb-8 text-center animate-in fade-in duration-700">
        <p className="text-[10px] text-neutral-600 font-mono tracking-[0.2em] uppercase">
          Intelligent Career Guidance Platform
        </p>
      </footer>

    </div>
  );
};
