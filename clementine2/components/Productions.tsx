'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import data from '@/data/data.json';
import Image from 'next/image';

type FilterType = 'Tout' | '3D/Vidéos/XR' | 'Photos' | 'Autres';

export default function Productions() {
  const allProductions = data.productions;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>('Tout');

  // Filtrer les productions selon le filtre sélectionné
  const productions = allProductions.filter((production) => {
    if (selectedFilter === 'Tout') {
      return true;
    }
    
    // Séparer les types par espaces pour gérer les types multiples
    const productionTypes = production.type.split(' ').filter(t => t.length > 0);
    
    if (selectedFilter === '3D/Vidéos/XR') {
      const filterTypes = ['3D', 'Vidéos', 'XR'];
      return productionTypes.some(type => filterTypes.includes(type));
    } else if (selectedFilter === 'Photos') {
      const filterTypes = ['Photos', 'Photographies'];
      return productionTypes.some(type => filterTypes.includes(type));
    } else if (selectedFilter === 'Autres') {
      const filterTypes = ['Autres', '2D'];
      return productionTypes.some(type => filterTypes.includes(type));
    }
    return true;
  });

  // Calculer la progression du scroll
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const progress = scrollWidth > 0 ? (scrollLeft / scrollWidth) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    }
  }, []);

  // Convertir le scroll vertical en scroll horizontal
  const handleWheel = useCallback((e: WheelEvent) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Vérifier si on peut scroller horizontalement
      const canScrollHorizontal = container.scrollWidth > container.clientWidth;
      
      if (canScrollHorizontal) {
        // Vérifier si on est à la fin ou au début du scroll horizontal
        const isAtStart = container.scrollLeft <= 0;
        const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 1;
        
        // Si on scroll vers le bas et qu'on est à la fin, ou vers le haut et qu'on est au début, laisser le scroll vertical normal
        if ((e.deltaY > 0 && isAtEnd) || (e.deltaY < 0 && isAtStart)) {
          return; // Laisser le comportement par défaut
        }
        
        // Empêcher le scroll vertical par défaut
        e.preventDefault();
        
        // Convertir le deltaY (scroll vertical) en scroll horizontal
        container.scrollLeft += e.deltaY;
      }
    }
  }, []);

  // Fonction pour vérifier si un lien est externe
  const isExternalLink = (link: string | undefined): boolean => {
    if (!link) return false;
    return link.startsWith('http://') || link.startsWith('https://');
  };

  // Fonction pour obtenir l'URL complète du lien
  const getLinkUrl = (link: string | undefined): string => {
    if (!link) return '#';
    if (isExternalLink(link)) {
      return link;
    }
    // Si le lien ne commence pas par http, on assume que c'est une URL externe complète
    if (link.startsWith('//')) {
      return `https:${link}`;
    }
    return link;
  };

  // Réinitialiser le scroll quand le filtre change
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      setScrollProgress(0);
    }
  }, [selectedFilter]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      // Calcul initial
      handleScroll();
      
      // Écouter le scroll horizontal
      container.addEventListener('scroll', handleScroll, { passive: true });
      
      // Écouter le scroll vertical (wheel) sur le conteneur pour le convertir en horizontal
      container.addEventListener('wheel', handleWheel, { passive: false });
      
      // Écouter aussi sur la section entière pour capturer le scroll même en dehors du conteneur
      const section = container.closest('section');
      if (section) {
        section.addEventListener('wheel', handleWheel, { passive: false });
      }
      
      // Recalculer si la taille change
      const resizeObserver = new ResizeObserver(() => {
        handleScroll();
      });
      resizeObserver.observe(container);
      
      return () => {
        container.removeEventListener('scroll', handleScroll);
        container.removeEventListener('wheel', handleWheel);
        if (section) {
          section.removeEventListener('wheel', handleWheel);
        }
        resizeObserver.disconnect();
      };
    }
  }, [handleScroll, handleWheel, productions]);

  return (
    <section
      id="productions"
      className="bg-[var(--background)] flex items-center justify-center"
    >
      <div className="w-full">
        {/* Titre */}
        <div className="px-4 md:px-8 lg:px-16 mb-8">
          <h2 className="text-5xl md:text-6xl font-serif text-[var(--accent)] !mb-8 text-center tracking-wide">
            Productions
          </h2>
        </div>

        {/* Filtres */}
        <div className="px-4 md:px-8 lg:px-16 !mb-8 flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => setSelectedFilter('Tout')}
            className={`btn-custom ${selectedFilter === 'Tout' ? 'opacity-100' : 'opacity-60'}`}
          >
            Tout
          </button>
          <button
            onClick={() => setSelectedFilter('3D/Vidéos/XR')}
            className={`btn-custom ${selectedFilter === '3D/Vidéos/XR' ? 'opacity-100' : 'opacity-60'}`}
          >
            3D / Vidéos / XR
          </button>
          <button
            onClick={() => setSelectedFilter('Photos')}
            className={`btn-custom ${selectedFilter === 'Photos' ? 'opacity-100' : 'opacity-60'}`}
          >
            Photos
          </button>
          <button
            onClick={() => setSelectedFilter('Autres')}
            className={`btn-custom ${selectedFilter === 'Autres' ? 'opacity-100' : 'opacity-60'}`}
          >
            Autres
          </button>
        </div>

        {/* Barre de progression avec lignes */}
        <div className="relative !mb-16 px-4 md:px-8 lg:px-16 flex items-center justify-center">
          <div className="h-px bg-[var(--text-dark)]/20 w-[50%] relative">
            <div
              className="absolute top-0 left-0 h-px bg-[var(--green)] transition-all duration-300"
              style={{ width: `${scrollProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Zone de défilement horizontal pleine largeur */}
        <div className="relative w-full">
          {/* Ligne centrale horizontale derrière les projets */}
          <div 
            className="absolute left-0 right-0 top-1/2 h-px bg-[var(--text-dark)]/20 z-0"
            style={{ transform: 'translateY(-50%)' }}
          ></div>
          
          <div
            ref={scrollContainerRef}
            className="flex gap-16 overflow-x-auto scrollbar-hide pb-8 !px-16 relative z-10"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {productions.map((production, index) => {
              const isReversed = index % 2 === 1; // Alternance : impair = description en haut
              
              return (
                <div
                  key={production.id}
                  className="flex-shrink-0 relative"
                  style={{ width: '400px' }}
                >
                  {/* Ligne verticale depuis la barre de progression */}
                  <div 
                    className="absolute left-1/2 top-0 w-px bg-[var(--text-dark)]/20 z-20"
                    style={{ 
                      height: '48px',
                      transform: 'translateX(-50%) translateY(-48px)'
                    }}
                  ></div>
                  
                  {/* Carte */}
                  <div className="px-8 h-full">
                    <div className="overflow-hidden h-full flex flex-col gap-3">
                      {isReversed ? (
                        <>
                          {/* Description en haut */}
                          <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-3">
                              <span className="text-sm text-[var(--text-dark)]/70 font-light uppercase tracking-wider">
                                {production.type}
                              </span>
                            </div>
                            {production.link ? (
                              <a
                                href={getLinkUrl(production.link)}
                                target={isExternalLink(production.link) ? '_blank' : '_self'}
                                rel={isExternalLink(production.link) ? 'noopener noreferrer' : undefined}
                                className="text-2xl font-light text-[var(--text-dark)] mb-4 hover:opacity-70 transition-opacity cursor-pointer"
                              >
                                {production.title}
                              </a>
                            ) : (
                              <h3 className="text-2xl font-light text-[var(--text-dark)] mb-4">
                                {production.title}
                              </h3>
                            )}
                            <p className="text-md text-[var(--text-dark)]/80 leading-relaxed flex-grow whitespace-pre-line">
                              {production.description}
                            </p>
                          </div>
                          
                          {/* Image en bas */}
                          {production.link ? (
                            <a
                              href={getLinkUrl(production.link)}
                              target={isExternalLink(production.link) ? '_blank' : '_self'}
                              rel={isExternalLink(production.link) ? 'noopener noreferrer' : undefined}
                              className="relative w-full aspect-[4/3] bg-[var(--accent)] overflow-hidden block hover:opacity-90 transition-opacity cursor-pointer"
                            >
                              {production.image && (
                                <Image
                                  src={"/clementine/"+ production.image}
                                  alt={production.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              )}
                            </a>
                          ) : (
                            <div className="relative w-full aspect-[4/3] bg-[var(--accent)] overflow-hidden">
                              {production.image && (
                                <Image
                                  src={production.image}
                                  alt={production.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              )}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {/* Image en haut */}
                          {production.link ? (
                            <a
                              href={getLinkUrl(production.link)}
                              target={isExternalLink(production.link) ? '_blank' : '_self'}
                              rel={isExternalLink(production.link) ? 'noopener noreferrer' : undefined}
                              className="relative w-full aspect-[4/3] bg-[var(--accent)] overflow-hidden block hover:opacity-90 transition-opacity cursor-pointer"
                            >
                              {production.image && (
                                <Image
                                  src={"/clementine/" + production.image}
                                  alt={production.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              )}
                            </a>
                          ) : (
                            <div className="relative w-full aspect-[4/3] bg-[var(--accent)] overflow-hidden">
                              {production.image && (
                                <Image
                                  src={production.image}
                                  alt={production.title}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                />
                              )}
                            </div>
                          )}

                          {/* Description en bas */}
                          <div className="p-6 flex flex-col flex-grow">
                            <div className="mb-3">
                              <span className="text-sm text-[var(--text-dark)]/70 font-light uppercase tracking-wider">
                                {production.type}
                              </span>
                            </div>
                            {production.link ? (
                              <a
                                href={getLinkUrl(production.link)}
                                target={isExternalLink(production.link) ? '_blank' : '_self'}
                                rel={isExternalLink(production.link) ? 'noopener noreferrer' : undefined}
                                className="text-2xl font-light text-[var(--text-dark)] mb-4 hover:opacity-70 transition-opacity cursor-pointer"
                              >
                                {production.title}
                              </a>
                            ) : (
                              <h3 className="text-2xl font-light text-[var(--text-dark)] mb-4">
                                {production.title}
                              </h3>
                            )}
                            <p className="text-md text-[var(--text-dark)]/80 leading-relaxed flex-grow whitespace-pre-line">
                              {production.description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

