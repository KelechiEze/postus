import React, { useState } from 'react';
import { motion } from 'motion/react';

export const TestimonialsSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      type: 'quote',
      id: 'quote-1',
      text: 'Pyxel AI completely redefined our design infrastructure from day one. The speed at which it processes 3D assets and high-fidelity textures saved our team hundreds of hours during the conceptual phase. What impressed me the most was the flawless upscaling quality, which allows us to ship pitch-ready presentations instantly.',
      author: 'ELENA ROSTOVA',
      role: 'LEAD CREATIVE DIRECTOR @ NEXUS STUDIO',
    },
    {
      type: 'image',
      id: 'img-1',
      image: '/assets/carou1.png',
      fallback: 'https://kelechieze.wordpress.com/wp-content/uploads/2026/11/carou1.png',
      alt: 'Elena Rostova, Lead Creative Director',
    },
    {
      type: 'quote',
      id: 'quote-2',
      text: 'Pyxel AI completely redefined our design infrastructure from day one. The speed at which it processes 3D assets and high-fidelity textures saved our team hundreds of hours during the conceptual phase. What impressed me the most was the flawless upscaling quality, which allows us to ship pitch-ready presentations instantly.',
      author: 'MAI TANAKA',
      role: 'AI PRODUCT DESIGNER @ SORA DIGITAL',
    },
    {
      type: 'image',
      id: 'img-2',
      image: '/assets/carou2.png',
      fallback: 'https://kelechieze.wordpress.com/wp-content/uploads/2026/11/carou2.png',
      alt: 'Mai Tanaka, AI Product Designer',
    },
    {
      type: 'quote',
      id: 'quote-3',
      text: 'Pyxel AI completely redefined our design infrastructure from day one. The speed at which it processes 3D assets and high-fidelity textures saved our team hundreds of hours during the conceptual phase. What impressed me the most was the flawless upscaling quality, which allows us to ship pitch-ready presentations instantly.',
      author: 'SORA DIGITAL',
      role: 'CREATIVE DESIGN DIRECTOR',
    },
    {
      type: 'image',
      id: 'img-3',
      image: '/assets/carou1.png',
      fallback: 'https://kelechieze.wordpress.com/wp-content/uploads/2026/11/carou1.png',
      alt: 'Nexus Studio Creative Direction',
    },
  ];

  const partners = [
    { name: 'ACME STUDIO' },
    { name: 'open grid' },
    { name: 'Spectrum AI' },
    { name: '✻ sun voice' },
    { name: 'OpenMind®' },
    { name: 'ACME STUDIO' },
    { name: 'open grid' },
    { name: 'Spectrum AI' },
    { name: '✻ sun voice' },
    { name: 'OpenMind®' },
  ];

  // Doubled array for seamless looping marquee
  const loopedCards = [...testimonials, ...testimonials];

  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#F5F5F5] text-black py-20 sm:py-28 md:py-32 overflow-hidden transition-colors"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14 sm:mb-20 px-4">
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center justify-center px-5 py-1.5 rounded-full bg-[#A4F01D] text-black font-semibold text-[11px] sm:text-xs tracking-wider uppercase mb-5 shadow-xs"
          >
            TESTIMONIALS
          </motion.div>

          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-pixel text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-black leading-[1.08]"
          >
            TRUSTED BY
            <br />
            INDUSTRY LEADERS
          </motion.h2>
        </div>

        {/* Continuous Marquee for Testimonials Cards */}
        <div
          className="w-full overflow-hidden relative py-3 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            animate={isPaused ? {} : { x: ['0%', '-50%'] }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center gap-3 sm:gap-4 w-max cursor-grab active:cursor-grabbing"
          >
            {loopedCards.map((item, index) => {
              if (item.type === 'quote') {
                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="w-[320px] sm:w-[380px] md:w-[420px] h-[340px] sm:h-[380px] bg-white rounded-[40px] sm:rounded-[48px] p-7 sm:p-9 flex flex-col justify-between shrink-0 shadow-xs border border-black/[0.03] hover:shadow-md transition-shadow"
                  >
                    <p className="text-neutral-700 text-xs sm:text-[13px] md:text-sm leading-relaxed sm:leading-relaxed font-normal">
                      {item.text}
                    </p>
                    <div className="pt-4 border-t border-black/[0.06]">
                      <h4 className="font-semibold text-xs sm:text-sm text-black uppercase tracking-tight">
                        {item.author}
                      </h4>
                      <p className="text-neutral-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider mt-0.5">
                        {item.role}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="w-[260px] sm:w-[300px] md:w-[340px] h-[340px] sm:h-[380px] rounded-[40px] sm:rounded-[48px] overflow-hidden bg-neutral-200 shrink-0 shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      if (item.fallback) e.currentTarget.src = item.fallback;
                    }}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Partner Logos Marquee */}
        <div className="mt-14 sm:mt-20 overflow-hidden relative w-full py-4">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex items-center gap-4 sm:gap-6 w-max"
          >
            {[...partners, ...partners].map((partner, i) => (
              <div
                key={`${partner.name}-${i}`}
                className="rounded-full bg-white px-7 sm:px-9 py-3 sm:py-3.5 flex items-center justify-center text-xs sm:text-sm font-semibold text-black tracking-tight shadow-xs whitespace-nowrap border border-black/[0.04] hover:bg-neutral-50 transition-colors cursor-default"
              >
                {partner.name}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
