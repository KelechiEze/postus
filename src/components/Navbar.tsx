import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onNavigate?: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
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
    <>
      {/* Floating Capsule Navbar */}
      <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-6 pl-5 pr-2 py-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.4)] min-w-[240px] sm:min-w-[260px]"
        >
          {/* Brand Wordmark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-white font-medium text-[14px] sm:text-[15px] tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Pyxel AI<sup className="text-[10px] ml-0.5 font-normal">®</sup>
          </a>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center px-4 py-1.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all text-white text-[11px] font-semibold tracking-wider uppercase cursor-pointer"
            aria-label="Open navigation menu"
          >
            MENU
          </button>
        </motion.div>
      </header>

      {/* Slide-Down / Fade Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 md:p-14"
          >
            {/* Top Bar with Brand & Close */}
            <div className="flex items-center justify-between max-w-6xl w-full mx-auto">
              <span className="text-white font-medium text-lg tracking-tight">
                Pyxel AI<sup className="text-xs ml-0.5">®</sup>
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="max-w-6xl w-full mx-auto py-8">
              <nav className="flex flex-col gap-4 sm:gap-6">
                {[
                  { label: 'Overview', id: 'hero' },
                  { label: 'Features', id: 'features' },
                  { label: 'Selected Works', id: 'works' },
                  { label: 'Testimonials', id: 'testimonials' },
                  { label: 'Neural Insights', id: 'insights' },
                  { label: 'Contact', id: 'contact' },
                ].map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={`#${item.id}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                    className="font-pixel text-3xl sm:text-5xl md:text-6xl font-bold uppercase text-white/80 hover:text-[#A4F01D] transition-colors flex items-center gap-3 group w-fit"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="w-6 h-6 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-[#A4F01D]" />
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Bottom Footer Info */}
            <div className="max-w-6xl w-full mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/50">
              <p>The ultimate neural studio for next-generation creators.</p>
              <div className="flex items-center gap-6">
                <span>Next-Gen Visuals</span>
                <span>·</span>
                <span>Real-Time 3D</span>
                <span>·</span>
                <span>© 2026 Pyxel AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
