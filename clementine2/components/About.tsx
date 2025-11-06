import data from '@/data/data.json';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

type ActiveSection = 'about' | 'productions' | 'contact' | null;

interface AboutProps {
  onSectionChange: (section: ActiveSection) => void;
}

export default function About({ onSectionChange }: AboutProps) {

  return (
    <section
      id="about"
      className="px-4 md:px-8 lg:px-16 bg-[var(--background)] flex items-center justify-center pt-16 pb-16 md:pt-0 md:pb-0"
    >
      <div className="max-w-7xl mx-auto">
        {/* Structure en trois colonnes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20 items-start !px-8">
          {/* Colonne gauche */}
          <div className="flex flex-col space-y-8 items-center gap-8">
            {/* Titre principal */}
            <h2 className="w-full text-5xl md:text-6xl text-center !mb-16 font-serif text-[var(--accent)] tracking-wide mt-8 md:mt-0">
              À propos
            </h2>
            
            {/* Texte réduit */}
            <div className="space-y-4">
              <p className="text-[var(--text-dark)] text-center text-sm md:text-base uppercase tracking-wider font-light leading-relaxed">
                CLÉMENTINE DUFOUR EST UNE ARTISTE SPÉCIALISÉE DANS LA 3D, LA RÉALISATION ET LA PRODUCTION DE VIDÉOS.
              </p>
              <p className="text-[var(--text-dark)] text-center text-sm md:text-base italic leading-relaxed">
                une artiste et exploratrice de la nature, de l'histoire et des antiquités
              </p>
            </div>

            {/* Bouton pour voir les projets */}
            <div className="mt-8">
              <button
                onClick={() => onSectionChange('productions')}
                className="btn-custom"
              >
                Voir les projets
              </button>
            </div>
          </div>

          {/* Colonne centrale - Photo en grande taille */}
          <div className="flex justify-center items-center">
            <div className="w-full overflow-hidden" style={{ borderRadius: 0 }}>
              {/* Image mobile */}
              <div className="flex justify-center items-center w-full bg-[var(--background)] md:hidden">
                <Image
                  src="/champi.png"
                  alt="Clémentine Dufour"
                  width={150}
                  height={150}
                  className="object-contain"
                  unoptimized
                />
              </div>
              {/* Image desktop */}
              <div className="relative w-full aspect-[3/4] bg-[var(--accent)] hidden md:block">
                <Image
                  src="/photoclem.jpg"
                  alt="Clémentine Dufour"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col space-y-8 items-center gap-8">
            {/* Texte réduit */}
            <div className="space-y-4 text-right">
              <p className="text-[var(--text-dark)] text-center text-sm md:text-base uppercase tracking-wider font-light leading-relaxed">
                CLÉMENTINE CRÉE DES CRÉATIONS EN 3D ET DES VIDÉOS COMME MOYEN D'EXPRIMER SA PASSION POUR L'HISTOIRE, LA NATURE ET LE PATRIMOINE.
              </p>
            </div>

            {/* Bouton pour aller sur contact */}
            <div className="mt-8">
              <button
                onClick={() => onSectionChange('contact')}
                className="btn-custom"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

