import React, { useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { PixelIcon } from './PixelIcon';

export const FeaturesSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays reliably even if autoplay policy restricts
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  return (
    <section
      id="features"
      className="relative w-full bg-[#F5F5F5] text-black py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-[93px] transition-colors"
    >
      <div className="max-w-[1254px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center justify-center px-5 py-1.5 rounded-full bg-[#A4F01D] text-black font-semibold text-[11px] sm:text-xs tracking-wider uppercase mb-5 shadow-xs"
          >
            FEATURES
          </motion.div>

          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-pixel text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-black leading-[1.08]"
          >
            CURATED FOR
            <br />
            ELITE CREATORS
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-neutral-500 text-sm sm:text-base md:text-[17px] max-w-xl mx-auto mt-4 font-normal leading-relaxed px-4"
          >
            Generate premium visual assets, upscale artwork, and
            <br className="hidden sm:inline" /> automate your design workflow instantly.
          </motion.p>
        </div>

        {/* 2x2 Bento Cards Grid with exact 8px spacing and 52px corner radius matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px]">
          {/* Card 1: Hand Image (Top Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-[44px] sm:rounded-[52px] overflow-hidden bg-neutral-900 aspect-square sm:aspect-[4/3] flex flex-col justify-end p-7 sm:p-9 md:p-10"
          >
            {/* Background Image */}
            <img
              src="/assets/handimage.png"
              alt="Hand holding liquid chrome sphere"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.src =
                  'https://kelechieze.wordpress.com/wp-content/uploads/2026/11/handimage.png';
              }}
            />

            {/* Gradient Scrim for crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

            {/* Bottom Title */}
            <div className="relative z-10">
              <h3 className="font-pixel text-2xl sm:text-3xl md:text-[34px] font-bold uppercase text-white tracking-tight leading-[1.1] drop-shadow-md">
                TURN PROMPTS INTO
                <br />
                PREMIUM VISUALS
              </h3>
            </div>
          </motion.div>

          {/* Card 2: Electric Lime Green (Top Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-[44px] sm:rounded-[52px] overflow-hidden bg-[#A4F01D] aspect-square sm:aspect-[4/3] flex flex-col justify-between p-7 sm:p-9 md:p-10 text-black transition-all duration-300"
          >
            {/* Category Tag */}
            <div className="text-black font-semibold text-xs sm:text-sm tracking-wider uppercase select-none">
              TEXT TO ASSET
            </div>

            {/* Center Pixel Glyph (Exact 48x48 from reference) */}
            <div className="flex items-center justify-center my-auto py-4">
              <PixelIcon className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Description Prose */}
            <p className="text-black text-[15px] sm:text-[17px] md:text-[18px] leading-relaxed font-normal max-w-md">
              Type your vision and watch Pyxel transform it into high-fidelity 3D elements,
              textures, and digital art in real-time.
            </p>
          </motion.div>

          {/* Card 3: Pastel Lavender (Bottom Left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-[44px] sm:rounded-[52px] overflow-hidden bg-[#C2A5FB] aspect-square sm:aspect-[4/3] flex flex-col justify-between p-7 sm:p-9 md:p-10 text-black transition-all duration-300"
          >
            {/* Category Tag */}
            <div className="text-black font-semibold text-xs sm:text-sm tracking-wider uppercase select-none">
              TEXT TO ASSET
            </div>

            {/* Center Pixel Glyph (Exact 48x48 from reference) */}
            <div className="flex items-center justify-center my-auto py-4">
              <PixelIcon className="w-12 h-12 text-black group-hover:scale-110 transition-transform duration-300" />
            </div>

            {/* Description Prose */}
            <p className="text-black text-[15px] sm:text-[17px] md:text-[18px] leading-relaxed font-normal max-w-md">
              Type your vision and watch Pyxel transform it into high-fidelity 3D elements,
              textures, and digital art in real-time.
            </p>
          </motion.div>

          {/* Card 4: 3D Video Background (Bottom Right) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative rounded-[44px] sm:rounded-[52px] overflow-hidden bg-neutral-900 aspect-square sm:aspect-[4/3] flex flex-col justify-end p-7 sm:p-9 md:p-10"
          >
            {/* Background 3D Video */}
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            >
              <source src="/assets/zavid.mp4" type="video/mp4" />
              <source src="/assets/aistudio/zavid_a5f9a115.mp4" type="video/mp4" />
            </video>

            {/* Gradient Scrim for crisp text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom Title */}
            <div className="relative z-10">
              <h3 className="font-pixel text-2xl sm:text-3xl md:text-[34px] font-bold uppercase text-white tracking-tight leading-[1.1] drop-shadow-md">
                TURN PROMPTS INTO
                <br />
                PREMIUM VISUALS
              </h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
