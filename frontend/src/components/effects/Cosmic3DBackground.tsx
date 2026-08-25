import React, { useEffect, useRef } from 'react';
import { useCareer } from '../../context/CareerContext';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  speed: number;
}

export const Cosmic3DBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const scrollPosRef = useRef(0);
  const targetScrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const { isDarkMode } = useCareer();

  useEffect(() => {
    const handleScroll = () => {
      targetScrollRef.current = window.scrollY || document.documentElement.scrollTop || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - window.innerWidth / 2) * 0.0004;
      mouseRef.current.targetY = (e.clientY - window.innerHeight / 2) * 0.0004;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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

    // Initialize 3D Space Particles
    const numParticles = 240;
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 2400,
        y: (Math.random() - 0.5) * 4000,
        z: Math.random() * 1500 + 100,
        size: Math.random() * 1.8 + 0.5,
        baseAlpha: Math.random() * 0.5 + 0.15,
        speed: Math.random() * 0.2 + 0.05
      });
    }

    let gridOffset = 0;

    const render = () => {
      // Smooth interpolation for scroll and mouse
      scrollPosRef.current += (targetScrollRef.current - scrollPosRef.current) * 0.08;
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const scrollOffset = scrollPosRef.current * 0.45;

      // 1. Ambient Cosmic Grid Horizon with 3D Depth
      if (isDarkMode) {
        gridOffset = (gridOffset + 0.2 + scrollPosRef.current * 0.02) % 60;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
        ctx.lineWidth = 1;

        // Perspective grid lines
        const horizonY = height * 0.65;
        for (let x = -width; x <= width * 2; x += 120) {
          ctx.beginPath();
          ctx.moveTo(cx + mouseRef.current.x * 150, horizonY);
          ctx.lineTo(x + mouseRef.current.x * 300, height + 100);
          ctx.stroke();
        }

        // Horizontal grid depths
        for (let d = 10; d < 300; d += 35) {
          const y = horizonY + (d * d) / 180;
          if (y <= height) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
          }
        }
      }

      // 2. 3D Stars moving with Parallax Scroll Physics
      for (let i = 0; i < numParticles; i++) {
        const p = particles[i];
        
        // Dynamic Y Position relative to scroll
        const effectiveY = p.y - scrollOffset * (1500 / p.z) * 0.5;

        // Wrap around loop in 3D volume
        const wrappedY = ((effectiveY + 2000) % 4000) - 2000;

        // 3D Perspective Projection
        const k = 400 / p.z;
        const px = p.x * k + cx + mouseRef.current.x * (1500 - p.z) * 0.2;
        const py = wrappedY * k + cy + mouseRef.current.y * (1500 - p.z) * 0.2;

        if (px >= -50 && px <= width + 50 && py >= -50 && py <= height + 50) {
          const depthAlpha = Math.min(1, Math.max(0.05, ((1500 - p.z) / 1500) * p.baseAlpha));
          const radius = Math.max(0.4, (1 - p.z / 1800) * p.size * 2);

          if (isDarkMode) {
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fill();

            // Subtle depth halo for closest 3D particles
            if (p.z < 400) {
              ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.25})`;
              ctx.beginPath();
              ctx.arc(px, py, radius * 3.5, 0, Math.PI * 2);
              ctx.fill();
            }
          } else {
            // Crisp Slate Micro-Nodes for Light Mode
            ctx.fillStyle = `rgba(15, 23, 42, ${depthAlpha * 0.25})`;
            ctx.beginPath();
            ctx.arc(px, py, radius * 0.8, 0, Math.PI * 2);
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
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500"
      style={{ opacity: isDarkMode ? 0.85 : 0.4 }}
    />
  );
};
