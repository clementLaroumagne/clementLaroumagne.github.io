'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import About from '@/components/About';
import Productions from '@/components/Productions';
import Contact from '@/components/Contact';
import ScrollToTop from '@/components/ScrollToTop';

type ActiveSection = 'about' | 'productions' | 'contact' | null;

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>(null);

  // Désactiver le scroll tant qu'aucune section n'est sélectionnée
  useEffect(() => {
    if (activeSection === null) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }

    // Cleanup
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, [activeSection]);

      return (
        <main className="relative">
          <Header onSectionChange={setActiveSection} activeSection={activeSection} />
          {activeSection && (
            <div className="min-h-screen relative flex items-center justify-center pt-32 pb-32">
              <div
                key={activeSection}
                className="transition-opacity duration-500 ease-in-out w-full"
              >
                {activeSection === 'about' && <About onSectionChange={setActiveSection} />}
                {activeSection === 'productions' && <Productions />}
                {activeSection === 'contact' && <Contact />}
              </div>
            </div>
          )}
          <ScrollToTop />
        </main>
      );
}
