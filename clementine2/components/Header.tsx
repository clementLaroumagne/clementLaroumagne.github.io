'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

type ActiveSection = 'about' | 'productions' | 'contact' | null;

interface HeaderProps {
  onSectionChange: (section: ActiveSection) => void;
  activeSection: ActiveSection;
}

interface WatercolorTrace {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
}

export default function Header({ onSectionChange, activeSection }: HeaderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [traces, setTraces] = useState<WatercolorTrace[]>([]);
  const traceIdRef = useRef(0);

  useEffect(() => {
    // S'assurer que la vidéo démarre automatiquement
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Ignorer les erreurs d'autoplay
      });
    }
  }, []);

  // Couleurs aquarelle pour les traces
  const watercolorColors = [
    'rgba(212, 196, 176, 0.4)', // beige
    'rgba(232, 220, 198, 0.35)', // beige clair
    'rgba(107, 142, 90, 0.3)', // vert doux
    'rgba(139, 168, 122, 0.25)', // vert clair
    'rgba(92, 74, 58, 0.2)', // marron
  ];

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!headerRef.current) return;

    const rect = headerRef.current.getBoundingClientRect();
    let x: number;
    let y: number;

    // Gérer les événements tactiles et souris
    if (e instanceof TouchEvent && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else if (e instanceof MouseEvent) {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    } else {
      return;
    }

    // Créer une nouvelle trace
    const newTrace: WatercolorTrace = {
      id: traceIdRef.current++,
      x,
      y,
      size: Math.random() * 80 + 40, // Taille aléatoire entre 40 et 120px
      color: watercolorColors[Math.floor(Math.random() * watercolorColors.length)],
      opacity: 1,
    };

    setTraces((prev) => {
      // Limiter à 15 traces maximum pour les performances
      const updated = [...prev, newTrace].slice(-15);
      return updated;
    });

    // Faire disparaître la trace après 2 secondes
    setTimeout(() => {
      setTraces((prev) => prev.filter((trace) => trace.id !== newTrace.id));
    }, 2000);
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    // Événements souris
    header.addEventListener('mousemove', handleMouseMove);
    
    // Événements tactiles pour mobile
    header.addEventListener('touchmove', handleMouseMove, { passive: true });
    header.addEventListener('touchstart', handleMouseMove, { passive: true });

    return () => {
      header.removeEventListener('mousemove', handleMouseMove);
      header.removeEventListener('touchmove', handleMouseMove);
      header.removeEventListener('touchstart', handleMouseMove);
    };
  }, [handleMouseMove]);

  const handleSectionClick = (section: 'about' | 'productions' | 'contact') => {
    onSectionChange(section);
    // Scroll vers le bas pour voir le contenu
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <header 
      ref={headerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ cursor: 'none' }}
    >
      {/* Vidéo de fond */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0"
        aria-hidden="true"
      >
        <source src="/clementine/hdVdo_Bg.mp4" type="video/mp4" />
      </video>

      {/* Traces aquarelle */}
      <div className="absolute inset-0 z-[15] pointer-events-none">
        {traces.map((trace) => (
          <div
            key={trace.id}
            className="absolute rounded-full"
            style={{
              left: `${trace.x}px`,
              top: `${trace.y}px`,
              width: `${trace.size}px`,
              height: `${trace.size}px`,
              backgroundColor: trace.color,
              transform: 'translate(-50%, -50%)',
              filter: 'blur(20px)',
              opacity: trace.opacity,
              transition: 'opacity 2s ease-out',
            }}
          />
        ))}
      </div>

      {/* Overlay avec grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10" />
      <div 
        className="absolute inset-0 z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Contenu */}
      <div className="relative z-20 flex items-center justify-center md:justify-end h-full w-full !px-16 md:px-8 lg:px-16 py-8">
        {/* Titre centré en haut */}
        <div className="w-full flex flex-col items-center gap-1 md:gap-4 absolute top-8 left-1/2 transform -translate-x-1/2 md:translate-y-1/2 translate-y-[200%]">
          <h1 className="text-5xl md:text-7xl lg:text-8xl text-[var(--green)] tracking-normal text-center">
            Clémentine Dufour
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl text-[var(--green)] tracking-normal text-center font-light">
            Généraliste 3D & Vidéaste
          </h2>
        </div>

        {/* Navigation - Verticale à droite, centrée en hauteur */}
        <nav className="flex flex-col items-center md:items-end gap-6 md:gap-8">
          <button
            onClick={() => handleSectionClick('about')}
            className={`text-3xl md:text-3xl lg:text-4xl font-bold tracking-normal text-[var(--green)] transition-all duration-300 ${
              activeSection === 'about'
                ? 'underline'
                : 'hover:underline'
            }`}
            style={{ cursor: 'none' }}
          >
            À propos
          </button>
          <button
            onClick={() => handleSectionClick('productions')}
            className={`text-3xl md:text-3xl lg:text-4xl font-bold tracking-normal text-[var(--green)] transition-all duration-300 ${
              activeSection === 'productions'
                ? 'underline'
                : 'hover:underline'
            }`}
            style={{ cursor: 'none' }}
          >
            Productions
          </button>
          <button
            onClick={() => handleSectionClick('contact')}
            className={`text-3xl md:text-3xl lg:text-4xl font-bold tracking-normal text-[var(--green)] transition-all duration-300 ${
              activeSection === 'contact'
                ? 'underline'
                : 'hover:underline'
            }`}
            style={{ cursor: 'none' }}
          >
            Contact
          </button>
        </nav>
      </div>
    </header>
  );
}

