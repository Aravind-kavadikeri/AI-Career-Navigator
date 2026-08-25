import React, { useEffect, useState, useRef } from 'react';

export const App3DScrollEngine: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const velocityTimeout = useRef<number | null>(null);

  useEffect(() => {
    // 1. Velocity and Progress Tracker on Scroll
    const handleScroll = (e: Event) => {
      const target = (e.target === document ? document.documentElement : e.target) as HTMLElement;
      const scrollTop = target.scrollTop || window.scrollY || 0;
      const scrollHeight = target.scrollHeight || document.documentElement.scrollHeight || 1;
      const clientHeight = target.clientHeight || window.innerHeight || 1;

      const progress = Math.min(100, Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100));
      setScrollProgress(progress);

      const now = Date.now();
      const dt = Math.max(1, now - lastTime.current);
      const dy = scrollTop - lastScrollY.current;
      const velocity = Math.min(15, Math.max(-15, (dy / dt) * 12));

      setScrollVelocity(velocity);
      lastScrollY.current = scrollTop;
      lastTime.current = now;

      // Apply 3D tilt custom property to body/root
      document.documentElement.style.setProperty('--scroll-tilt-x', `${velocity * 0.4}deg`);
      document.documentElement.style.setProperty('--scroll-depth-z', `${Math.abs(velocity) * -1.5}px`);

      if (velocityTimeout.current) clearTimeout(velocityTimeout.current);
      velocityTimeout.current = window.setTimeout(() => {
        setScrollVelocity(0);
        document.documentElement.style.setProperty('--scroll-tilt-x', '0deg');
        document.documentElement.style.setProperty('--scroll-depth-z', '0px');
      }, 120);
    };

    window.addEventListener('scroll', handleScroll, { passive: true, capture: true });

    // 2. 3D Scroll Intersection Observer (Staggered 3D Roll-in for cards)
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view-3d');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    const observeCards = () => {
      const cards = document.querySelectorAll('.glass-card, .observe-3d, .stagger-item');
      cards.forEach((card) => {
        if (!card.classList.contains('in-view-3d')) {
          card.classList.add('scroll-item-3d');
          observer.observe(card);
        }
      });
    };

    observeCards();
    const interval = setInterval(observeCards, 1000);

    // 3. Interactive 3D Card Mouse Tilt with Specular Sheen
    const handleMouseMove = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.glass-card, .interactive-3d') as HTMLElement | null;
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      target.style.setProperty('--card-rot-x', `${rotateX}deg`);
      target.style.setProperty('--card-rot-y', `${rotateY}deg`);
      target.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
      target.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('.glass-card, .interactive-3d') as HTMLElement | null;
      if (target) {
        target.style.setProperty('--card-rot-x', '0deg');
        target.style.setProperty('--card-rot-y', '0deg');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseout', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll, { capture: true });
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Sleek 3D Quantum Laser Scroll Tracker */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/20">
        <div
          className="h-full bg-gradient-to-r from-teal-400 via-indigo-500 to-white dark:from-white dark:via-neutral-300 dark:to-neutral-500 transition-all duration-75 shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Dynamic 3D Velocity Spatial Flare when scrolling fast */}
      {Math.abs(scrollVelocity) > 3 && (
        <div
          className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-150"
          style={{
            background: `radial-gradient(ellipse at 50% ${scrollVelocity > 0 ? '20%' : '80%'}, rgba(255, 255, 255, ${Math.min(0.04, Math.abs(scrollVelocity) * 0.003)}) 0%, transparent 70%)`
          }}
        />
      )}
    </>
  );
};
