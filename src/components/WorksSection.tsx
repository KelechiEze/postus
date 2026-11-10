import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ProjectData } from './ProjectDetailPage';

export const ALL_PROJECTS: ProjectData[] = [
  {
    id: 'aero-shell',
    title: 'AERO SHELL',
    tag1: 'AERO',
    tag2: '1/10 3D STUDIO',
    subtitle:
      'Aero is a modern, collaborative portfolio template designed to showcase creative work with clarity and personality. It emphasizes clean layouts, thoughtful typography, and smooth user interactions.',
    image1: '/assets/blue.png',
    image2: '/assets/aero_detail2.png',
    panoramicImage: '/assets/joshua_tree.png',
    problem:
      'You can choose to set up different types of input fields depending on your content. For instance, a blog might have a title, a slug, and a long form field for formatted content. These may be different for a product directory or a portfolio/blog where you may need to add an image field. To edit the fields each CMS item will have, click on any of the column titles. This will trigger a modal to add new fields, where you can also re-arrange the fields or modify or delete the existing ones.',
    solution:
      'Traditional digital garment rendering has long been bottlenecked by immense computational constraints and rigid simulation physics. Today, advanced generative AI systems bypass these limitations by understanding the intricate behavior of light, fabric weight, and texture at a molecular level. From hyper-realistic cyberpunk apparel layers to delicate pleated puffers that react to virtual environments, synthetic outerwear empowers designers to manifest concepts that would be physically impossible or financially prohibitive in the real world.',
  },
  {
    id: 'kinetic-puffer',
    title: 'KINETIC PUFFER',
    tag1: 'CYBERWEAR',
    tag2: 'NEURAL PUFFER',
    subtitle:
      'Aero is a modern, collaborative portfolio template designed to showcase creative work with clarity and personality. It emphasizes clean layouts, thoughtful typography, and smooth user interactions.',
    image1: '/assets/green.png',
    image2: '/assets/handimage.png',
    panoramicImage: '/assets/thehero.png',
    problem:
      'You can choose to set up different types of input fields depending on your content. For instance, a blog might have a title, a slug, and a long form field for formatted content. These may be different for a product directory or a portfolio/blog where you may need to add an image field. To edit the fields each CMS item will have, click on any of the column titles. This will trigger a modal to add new fields, where you can also re-arrange the fields or modify or delete the existing ones.',
    solution:
      'Traditional digital garment rendering has long been bottlenecked by immense computational constraints and rigid simulation physics. Today, advanced generative AI systems bypass these limitations by understanding the intricate behavior of light, fabric weight, and texture at a molecular level.',
  },
  {
    id: 'monolithic-environments',
    title: 'MONOLITHIC ENVIRONMENTS',
    tag1: 'LANDSCAPE GENERATION',
    tag2: 'NEO-SPATIAL 12',
    subtitle:
      'Aero is a modern, collaborative portfolio template designed to showcase creative work with clarity and personality. It emphasizes clean layouts, thoughtful typography, and smooth user interactions.',
    image1: '/assets/monolithic.png',
    image2: '/assets/monolithic_detail2.png',
    panoramicImage: '/assets/fashion_runway.png',
    problem:
      'You can choose to set up different types of input fields depending on your content. For instance, a blog might have a title, a slug, and a long form field for formatted content. These may be different for a product directory or a portfolio/blog where you may need to add an image field. To edit the fields each CMS item will have, click on any of the column titles. This will trigger a modal to add new fields, where you can also re-arrange the fields or modify or delete the existing ones.',
    solution:
      'By harnessing volumetric terrain generation and real-time ray-traced water reflections, synthetic landscapes can be synthesized with unprecedented photographic fidelity. Digital set design becomes frictionless, allowing directors and architects to explore unbounded spatial environments.',
  },
  {
    id: 'synthetic-gaze',
    title: 'SYNTHETIC GAZE',
    tag1: 'SYNTHETIC-X',
    tag2: '003 DIGITAL HUMAN',
    subtitle:
      'Aero is a modern, collaborative portfolio template designed to showcase creative work with clarity and personality. It emphasizes clean layouts, thoughtful typography, and smooth user interactions.',
    image1: '/assets/synthetic_gaze.png',
    image2: '/assets/synthetic_detail2.png',
    panoramicImage: '/assets/chrome_handle.png',
    problem:
      'You can choose to set up different types of input fields depending on your content. For instance, a blog might have a title, a slug, and a long form field for formatted content. These may be different for a product directory or a portfolio/blog where you may need to add an image field. To edit the fields each CMS item will have, click on any of the column titles. This will trigger a modal to add new fields, where you can also re-arrange the fields or modify or delete the existing ones.',
    solution:
      'Achieving photorealistic human gaze requires micro-surface dermal subsurface scattering, anisotropic iris reflections, and realistic tear film optics. Pyxel AI provides an end-to-end neural pipeline that renders synthetic facial expressions indistinguishable from high-end medium format photography.',
  },
];

interface WorksSectionProps {
  onSelectProject: (project: ProjectData) => void;
}

export const WorksSection: React.FC<WorksSectionProps> = ({ onSelectProject }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const initialWorks = [
    {
      ...ALL_PROJECTS[0],
      cardSubtitle: 'AI-Generated Synthetic Avant-Garde Outerwear',
    },
    {
      ...ALL_PROJECTS[1],
      cardSubtitle: 'High-Fidelity Cyberpunk Human & Apparel Concept',
    },
  ];

  const extraWorks = [
    {
      ...ALL_PROJECTS[2],
      cardSubtitle:
        'Generating minimalist digital landscapes and abstract 3D structures with advanced spatial computing models.',
    },
    {
      ...ALL_PROJECTS[3],
      cardSubtitle:
        'Crafting hyper-realistic human assets, cinematic facial grids, and authentic digital identity layers.',
    },
  ];

  return (
    <section
      id="works"
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
            WORKS
          </motion.div>

          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-pixel text-3xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-black leading-[1.08]"
          >
            SELECTED
            <br />
            NEURAL OUTPUTS
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-neutral-500 text-sm sm:text-base md:text-[17px] max-w-xl mx-auto mt-4 font-normal leading-relaxed px-4"
          >
            Explore next-generation digital avatars, avant-garde cyber-fashion
            <br className="hidden sm:inline" /> concepts, and hyper-realistic human assets fully generated and upscaled by Pyxel AI.
          </motion.p>
        </div>

        {/* 2x2 Bento Cards Grid matching exact layout from video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px]">
          {/* Initial Row: AERO SHELL & KINETIC PUFFER */}
          {initialWorks.map((work, idx) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => onSelectProject(work)}
              className="group relative rounded-[44px] sm:rounded-[52px] overflow-hidden bg-neutral-900 aspect-square sm:aspect-[4/3] flex flex-col justify-end p-5 sm:p-7 md:p-8 cursor-pointer shadow-xs"
            >
              {/* Background Artwork */}
              <img
                src={work.image1}
                alt={work.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Frosted Glass Floating Capsule Label */}
              <div className="relative z-10 w-full rounded-[28px] sm:rounded-full bg-black/45 backdrop-blur-xl border border-white/10 px-6 py-4 flex flex-col justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:border-white/20">
                <span className="font-pixel text-white font-bold text-lg sm:text-xl uppercase tracking-tight">
                  {work.title}
                </span>
                <span className="text-white/80 text-xs sm:text-sm font-normal tracking-normal mt-0.5">
                  {work.cardSubtitle}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Expanded Second Row: MONOLITHIC ENVIRONMENTS & SYNTHETIC GAZE */}
          <AnimatePresence>
            {isExpanded &&
              extraWorks.map((work, idx) => (
                <motion.div
                  key={work.id}
                  initial={{ opacity: 0, y: 40, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 30, scale: 0.98 }}
                  transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => onSelectProject(work)}
                  className="group relative rounded-[44px] sm:rounded-[52px] overflow-hidden bg-neutral-900 aspect-square sm:aspect-[4/3] flex flex-col justify-end p-5 sm:p-7 md:p-8 cursor-pointer shadow-xs"
                >
                  {/* Background Artwork */}
                  <img
                    src={work.image1}
                    alt={work.title}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Frosted Glass Floating Capsule Label */}
                  <div className="relative z-10 w-full rounded-[28px] sm:rounded-full bg-black/45 backdrop-blur-xl border border-white/10 px-6 py-4 flex flex-col justify-center transition-all duration-300 group-hover:bg-black/60 group-hover:border-white/20">
                    <span className="font-pixel text-white font-bold text-lg sm:text-xl uppercase tracking-tight">
                      {work.title}
                    </span>
                    <span className="text-white/80 text-xs sm:text-sm font-normal tracking-normal mt-0.5">
                      {work.cardSubtitle}
                    </span>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        {/* SEE ALL Button: hides once expanded, matching video behavior */}
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-10 sm:mt-12"
          >
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="font-pixel text-black font-bold uppercase text-xs sm:text-sm tracking-widest px-8 py-3.5 rounded-full border border-black/15 hover:border-black/30 hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
            >
              SEE ALL
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
