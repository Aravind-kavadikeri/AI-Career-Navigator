import React, { useEffect, useRef, useState } from 'react';
import {
  Compass,
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  Globe,
  Radio,
  Cpu,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useCareer } from '../../context/CareerContext';

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
  color: string;
}

interface CareerNode {
  name: string;
  angle: number;
  speed: number;
  distance: number;
  color: string;
  size: number;
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
    }, 900);
  };

  const triggerWarpDemo = () => {
    setIsWarping(true);
    setTimeout(() => {
      onLoadDemo();
    }, 900);
  };

  // 3D Space Canvas Animation Engine
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
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.001;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.001;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Initialize 3D Stars
    const numStars = 700;
    const stars: Star[] = [];
    const colors = ['#ffffff', '#a5f3fc', '#99f6e4', '#c084fc', '#818cf8', '#fde047'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 3000,
        y: (Math.random() - 0.5) * 3000,
        z: Math.random() * 2000,
        prevZ: 2000,
        size: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    // Initialize Orbiting Career Galaxies
    const careerNodes: CareerNode[] = [
      { name: 'Data Scientist', angle: 0, speed: 0.006, distance: 340, color: '#14b8a6', size: 6 },
      { name: 'ML Engineer', angle: 1.2, speed: 0.005, distance: 420, color: '#6366f1', size: 5 },
      { name: 'AI Engineer', angle: 2.4, speed: 0.007, distance: 280, color: '#38bdf8', size: 5.5 },
      { name: 'Data Analyst', angle: 3.6, speed: 0.004, distance: 380, color: '#f59e0b', size: 5 },
      { name: 'AI Researcher', angle: 4.8, speed: 0.0055, distance: 480, color: '#ec4899', size: 4.5 }
    ];

    let speed = 2.5;
    let sphereRotation = 0;

    const render = () => {
      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (isWarping) {
        speed += 1.8;
      }

      // Background Clear with Nebula Trail
      ctx.fillStyle = isWarping ? 'rgba(5, 8, 18, 0.3)' : 'rgba(7, 11, 22, 0.9)';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // Draw Center Cosmic Portal Halo
      const gradient = ctx.createRadialGradient(cx, cy, 10, cx, cy, 450);
      gradient.addColorStop(0, 'rgba(13, 148, 136, 0.15)');
      gradient.addColorStop(0.3, 'rgba(99, 102, 241, 0.1)');
      gradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.03)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cx, cy, 450, 0, Math.PI * 2);
      ctx.fill();

      // Render 3D Rotating Celestial Sphere Wireframe
      sphereRotation += 0.004;
      ctx.strokeStyle = 'rgba(45, 212, 191, 0.12)';
      ctx.lineWidth = 1;

      for (let r = 80; r <= 240; r += 50) {
        ctx.beginPath();
        ctx.ellipse(
          cx,
          cy,
          r,
          r * 0.35,
          sphereRotation + mouseRef.current.x * 2,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Render 3D Stars
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.prevZ = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.z = 2000;
          star.prevZ = 2000;
          star.x = (Math.random() - 0.5) * 3000;
          star.y = (Math.random() - 0.5) * 3000;
        }

        // 3D Perspective Projection
        const k = 500 / star.z;
        const px = star.x * k + cx + mouseRef.current.x * 300;
        const py = star.y * k + cy + mouseRef.current.y * 300;

        const prevK = 500 / star.prevZ;
        const prevPx = star.x * prevK + cx + mouseRef.current.x * 300;
        const prevPy = star.y * prevK + cy + mouseRef.current.y * 300;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min(1, (2000 - star.z) / 1000);
          ctx.strokeStyle = star.color;
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;

          if (isWarping || speed > 10) {
            // Warp speed streak lines
            ctx.lineWidth = Math.min(4, (1 - star.z / 2000) * 5);
            ctx.beginPath();
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.stroke();
          } else {
            // Twinkling 3D Point
            const radius = Math.max(0.5, (1 - star.z / 2000) * star.size * 2.5);
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Render Orbiting Career Galaxy Nodes
      ctx.globalAlpha = 1;
      careerNodes.forEach((node) => {
        node.angle += node.speed;
        const nx = cx + Math.cos(node.angle) * node.distance + mouseRef.current.x * 150;
        const ny = cy + Math.sin(node.angle) * (node.distance * 0.45) + mouseRef.current.y * 150;

        // Orbit Trail
        ctx.strokeStyle = `${node.color}33`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, cy, node.distance, node.distance * 0.45, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Node Glow
        const nodeGrad = ctx.createRadialGradient(nx, ny, 1, nx, ny, node.size * 3);
        nodeGrad.addColorStop(0, node.color);
        nodeGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = nodeGrad;
        ctx.beginPath();
        ctx.arc(nx, ny, node.size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Node Planet Core
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(nx, ny, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Label
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.fillStyle = node.color;
        ctx.fillText(node.name, nx + 10, ny + 4);
      });

      ctx.globalAlpha = 1;
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
    <div className="relative w-screen h-screen overflow-hidden bg-[#070b16] select-none flex flex-col justify-between">
      
      {/* 3D Cosmos WebGL/Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Top Cosmic Header */}
      <header className="relative z-10 p-6 sm:p-8 flex items-center justify-between max-w-7xl w-full mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-400 via-indigo-500 to-teal-300 flex items-center justify-center text-white font-black shadow-lg shadow-teal-500/30">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-teal-400 via-indigo-300 to-teal-200 bg-clip-text text-transparent">
                AI Career Navigator
              </span>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-teal-950/90 text-teal-300 border border-teal-500/40 uppercase tracking-wider">
                Cosmos 3D Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              Intelligent Career Guidance Platform for Students & Early-Career Learners
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 backdrop-blur-md">
            <Radio className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
            <span>AI Inference Engine: Online</span>
          </div>
        </div>
      </header>

      {/* Center 3D Hero Portal & Enter Action */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 text-center my-auto">
        
        {/* Cosmos Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-teal-950/70 border border-teal-500/30 text-teal-300 text-xs font-bold mb-6 backdrop-blur-lg shadow-lg shadow-teal-500/10">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span>Explore Your Personalized Tech Career Trajectory</span>
        </div>

        {/* Grand Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-none mb-6 drop-shadow-2xl">
          Chart Your Course Through <br />
          <span className="bg-gradient-to-r from-teal-300 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
            The AI Universe.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal drop-shadow-md">
          Discover where your skills align. Analyze skill gaps, unlock personalized 6-month milestones, and build recruiter-ready projects with explainable AI intelligence.
        </p>

        {/* Big Cosmic Enter Button & Quick Launcher */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          
          <button
            onClick={triggerWarpEnter}
            disabled={isWarping}
            className={`w-full sm:w-auto flex-1 flex items-center justify-center space-x-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 via-indigo-600 to-teal-500 hover:from-teal-400 hover:to-indigo-500 text-white font-extrabold text-base shadow-2xl shadow-teal-500/40 hover:scale-105 active:scale-95 transition-all duration-300 border border-teal-400/30 group ${
              isWarping ? 'scale-110 opacity-90' : ''
            }`}
          >
            <span>{isWarping ? 'WARPING INTO COSMOS...' : 'ENTER THE NAVIGATOR'}</span>
            <div className="px-2 py-0.5 rounded bg-white/20 text-xs font-mono group-hover:bg-white/30 transition">
              ↵ Enter
            </div>
          </button>

          <button
            onClick={triggerWarpDemo}
            disabled={isWarping}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 border border-slate-700/80 font-bold text-sm backdrop-blur-lg hover:border-teal-500 transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <Play className="w-4 h-4 text-teal-400 fill-teal-400/20" />
            <span>Try Live Demo</span>
          </button>

        </div>

        {/* Helper Hint */}
        <p className="text-xs text-slate-400 mt-4 font-mono">
          Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-teal-300">Enter ↵</kbd> on your keyboard to launch instantly
        </p>

      </main>

      {/* Bottom Galaxy Key Metrics */}
      <footer className="relative z-10 p-6 sm:p-8 max-w-5xl mx-auto w-full">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
          
          <div className="text-center">
            <p className="text-xl sm:text-2xl font-black text-teal-400">10+</p>
            <p className="text-[11px] text-slate-400 font-medium">Career Benchmarks</p>
          </div>

          <div className="text-center">
            <p className="text-xl sm:text-2xl font-black text-indigo-400">5-Factor</p>
            <p className="text-[11px] text-slate-400 font-medium">Explainable AI Scoring</p>
          </div>

          <div className="text-center">
            <p className="text-xl sm:text-2xl font-black text-teal-300">6-Month</p>
            <p className="text-[11px] text-slate-400 font-medium">Interactive Roadmaps</p>
          </div>

          <div className="text-center">
            <p className="text-xl sm:text-2xl font-black text-amber-400">+250 XP</p>
            <p className="text-[11px] text-slate-400 font-medium">Gamified Milestones</p>
          </div>

        </div>
      </footer>

    </div>
  );
};
