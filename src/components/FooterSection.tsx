import React from 'react';
import { Instagram, Twitter, Dribbble } from 'lucide-react';

interface FooterSectionProps {
  onNavigate?: (id: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onNavigate }) => {
  const navPills = [
    { label: 'INDEX', id: 'hero' },
    { label: 'FEATURES', id: 'features' },
    { label: 'WORKS', id: 'works' },
    { label: 'TESTIMONIALS', id: 'testimonials' },
    { label: 'INSIGHTS', id: 'insights' },
    { label: 'CONTACT', id: 'contact' },
  ];

  const handleScroll = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="w-full bg-[#A4F01D] text-black rounded-t-[48px] sm:rounded-t-[64px] px-6 sm:px-12 md:px-16 pt-10 sm:pt-14 md:pt-16 pb-10 sm:pb-14 md:pb-16 overflow-hidden select-none min-h-[85vh] sm:min-h-[88vh] md:min-h-[92vh] lg:min-h-[800px] flex flex-col justify-between">
      <div className="max-w-[1400px] w-full mx-auto flex-1 flex flex-col justify-between">
        {/* Top 6 Navigation Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 w-full">
          {navPills.map((pill) => (
            <button
              key={pill.label}
              type="button"
              onClick={() => handleScroll(pill.id)}
              className="flex-1 min-w-[110px] sm:min-w-[130px] rounded-full bg-black/10 hover:bg-black/20 active:scale-95 text-black text-[11px] sm:text-xs font-semibold tracking-wider uppercase py-3 sm:py-3.5 px-4 text-center transition-all cursor-pointer"
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Massive Brand Wordmark */}
        <div className="my-auto py-16 sm:py-24 md:py-28 overflow-hidden flex items-center justify-center">
          <h1 className="text-[64px] xs:text-[90px] sm:text-[140px] md:text-[185px] lg:text-[235px] xl:text-[270px] font-bold tracking-tighter leading-none text-black whitespace-nowrap select-none">
            Pyxel AI<sup className="text-[0.4em] font-normal ml-1">®</sup>
          </h1>
        </div>

        {/* Bottom Credits & Socials */}
        <div className="flex flex-row items-end justify-between gap-4 pt-6 text-xs text-black/75">
          <div className="flex flex-col text-[11px] sm:text-xs text-black/70 font-medium leading-relaxed">
            <span>Pyxel AI© 2026. All rights reserved.</span>
            <span>Designed by Meggie Khasiyev</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-black/35 flex items-center justify-center hover:bg-black hover:text-[#A4F01D] hover:border-black transition-all cursor-pointer"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://dribbble.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-black/35 flex items-center justify-center hover:bg-black hover:text-[#A4F01D] hover:border-black transition-all cursor-pointer"
              aria-label="Dribbble"
            >
              <Dribbble className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-black/35 flex items-center justify-center hover:bg-black hover:text-[#A4F01D] hover:border-black transition-all cursor-pointer"
              aria-label="Twitter / X"
            >
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
