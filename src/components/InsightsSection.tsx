import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';

export const InsightsSection: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<{
    title: string;
    description: string;
    image: string;
    readTime: string;
    author: string;
    content: string;
  } | null>(null);

  const insights = [
    {
      id: 'insight-1',
      title: 'SYNTHETIC AVATARS IN HIGH-FASHION DESIGN',
      description:
        'How neural networks are shifting from pure asset generation to defining the next decade of digital haute couture and virtual identity.',
      image: '/assets/insights1.png',
      fallback: 'https://kelechieze.wordpress.com/wp-content/uploads/2026/11/insights1.png',
      readTime: '4 MIN READ',
      author: 'ELENA ROSTOVA',
      content:
        'The boundary between digital fabric and tangible couture is evaporating. Generative diffusion algorithms now simulate the micro-weave of organza, the subtle sheen of ripstop nylon, and the drape of heavy silk with sub-millimeter precision. Design houses are no longer limited by manufacturing prototypes—virtual collections are generated, evaluated in spatial 3D, and delivered across global digital ecosystems before a single thread is spun.',
    },
    {
      id: 'insight-2',
      title: 'MASTERING PROMPT PRECISION',
      description:
        'A technical breakdown of engineering high-fidelity material outputs and cybernetic apparel layers without losing brand consistency.',
      image: '/assets/insights2.png',
      fallback: 'https://kelechieze.wordpress.com/wp-content/uploads/2026/11/insights2.png',
      readTime: '6 MIN READ',
      author: 'ALEXEI VANCE',
      content:
        'Prompt engineering in production design systems requires deterministic rigor. By standardizing camera intrinsics, volumetric lighting tokens, and material BRDF descriptors in prompts, engineering teams can guarantee reproducible outputs across divergent seed states. This article examines token weight optimization, negative prompt gating, and latent guidance strategies.',
    },
    {
      id: 'insight-3',
      title: 'ALGORITHMIC BRAND DNA',
      description:
        'How to maintain visual identity across massive generative outputs by balancing human-centric design with AI scale.',
      image: '/assets/insights3.png',
      fallback: 'https://kelechieze.wordpress.com/wp-content/uploads/2026/11/green.png',
      readTime: '5 MIN READ',
      author: 'MAI TANAKA',
      content:
        'Scaling generative visual workflows across enterprise marketing requires more than high throughput; it demands absolute brand cohesion. Through custom LoRA adaptation, strict color space harmonization, and human-in-the-loop curation loops, studio designers are establishing immutable aesthetic guardrails that let AI accelerate creativity without diluting brand equity.',
    },
  ];

  return (
    <section
      id="insights"
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
            INSIGHTS
          </motion.div>

          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-pixel text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-black leading-[1.08]"
          >
            NEURAL INSIGHTS
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-neutral-500 text-sm sm:text-base md:text-[17px] max-w-xl mx-auto mt-4 font-normal leading-relaxed px-4"
          >
            Deep dives into the convergence of generative AI, synthetic
            <br className="hidden sm:inline" /> human aesthetics, and the future of digital craftsmanship.
          </motion.p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {insights.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setActiveArticle(item)}
              className="group bg-white rounded-[40px] sm:rounded-[48px] p-4 sm:p-5 pb-8 flex flex-col justify-between cursor-pointer shadow-xs border border-black/[0.03] hover:shadow-lg transition-all duration-300"
            >
              <div>
                {/* Artwork Container */}
                <div className="rounded-[30px] sm:rounded-[36px] overflow-hidden aspect-[4/3] w-full bg-neutral-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      if (item.fallback) e.currentTarget.src = item.fallback;
                    }}
                  />
                </div>

                {/* Content */}
                <div className="pt-5 px-3">
                  <h3 className="font-pixel text-lg sm:text-xl font-bold uppercase text-black leading-tight tracking-tight group-hover:text-neutral-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-500 text-xs sm:text-[13px] font-normal leading-relaxed mt-2.5">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* SEE ALL Button */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('insights');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="font-pixel text-black font-bold uppercase text-xs sm:text-sm tracking-widest px-8 py-3.5 rounded-full border border-black/15 hover:border-black/30 hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            SEE ALL
          </button>
        </div>
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {activeArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-black rounded-[36px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-7 sm:p-10"
            >
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-black flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close article"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-neutral-400 font-semibold tracking-wider uppercase mb-3">
                <span>{activeArticle.readTime}</span>
                <span>·</span>
                <span>{activeArticle.author}</span>
              </div>

              <h2 className="font-pixel text-2xl sm:text-3xl font-bold uppercase text-black leading-tight mb-4">
                {activeArticle.title}
              </h2>

              <div className="rounded-[24px] overflow-hidden aspect-[16/9] mb-6 bg-neutral-100">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-neutral-700 text-sm sm:text-base leading-relaxed space-y-4">
                <p className="font-medium text-black">{activeArticle.description}</p>
                <p>{activeArticle.content}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
