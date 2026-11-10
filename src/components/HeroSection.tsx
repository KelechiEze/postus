import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FluidHeroCanvas } from './FluidHeroCanvas';

interface HeroSectionProps {
  onScrollDown?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollDown }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.65], ['0px', '-40px']);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] flex flex-col justify-end items-center pb-16 sm:pb-20 md:pb-24 px-4 overflow-hidden select-none cursor-crosshair"
    >
      {/* Real-Time WebGL Fluid / Smoke Simulation with Image Reveal */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      >
        <FluidHeroCanvas
          imageSrc="/assets/thehero.png"
          fallbackSrc="https://kelechieze.wordpress.com/wp-content/uploads/2026/11/thehero.png"
          className="w-full h-full"
        />
        {/* Soft bottom transition gradient allowing the subject to remain crystal clear and definitive */}
        <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
      </motion.div>

      {/* Hero Typography & Copy */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center pointer-events-none"
      >
        {/* Headline */}
        <h1 className="font-pixel text-[34px] xs:text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.05] tracking-tight uppercase font-bold text-white drop-shadow-sm">
          <span>CREATE </span>
          <span className="text-[#A4F01D] drop-shadow-[0_0_30px_rgba(164,240,29,0.35)]">
            BEYOND
          </span>
          <br />
          <span>HUMAN IMAGINATION</span>
        </h1>

        {/* Subtitle */}
        <p className="text-white/85 text-xs sm:text-base md:text-[17px] max-w-xl sm:max-w-2xl mx-auto text-center mt-4 sm:mt-5 font-normal leading-relaxed tracking-normal px-2">
          The ultimate neural studio for next-generation creators. Generate premium visual
          assets, upscale artwork, and automate your design workflow instantly.
        </p>

        {/* Scroll Indicator button */}
        {onScrollDown && (
          <button
            type="button"
            onClick={onScrollDown}
            className="mt-8 text-white/50 hover:text-white transition-colors cursor-pointer group pointer-events-auto"
            aria-label="Scroll to features"
          >
            <div className="w-5 h-9 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-white/50 transition-colors">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full bg-[#A4F01D]"
              />
            </div>
          </button>
        )}
      </motion.div>
    </section>
  );
};
