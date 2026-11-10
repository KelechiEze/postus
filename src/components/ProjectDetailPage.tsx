import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { FooterSection } from './FooterSection';

export interface ProjectData {
  id: string;
  tag1: string;
  tag2: string;
  title: string;
  subtitle: string;
  image1: string;
  image2: string;
  problem: string;
  panoramicImage: string;
  solution: string;
}

interface ProjectDetailPageProps {
  project: ProjectData;
  onBack: () => void;
  onNavigateSection: (id: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onNavigateSection,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#F5F5F5] text-black pt-28 sm:pt-32"
    >
      <div className="max-w-[1254px] mx-auto px-4 sm:px-6 lg:px-[93px]">
        {/* Back Button & Tags Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-neutral-100 border border-black/10 text-xs font-semibold tracking-wider uppercase text-black transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL WORKS</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full bg-white border border-black/10 text-[11px] font-semibold tracking-wider uppercase text-neutral-600">
              {project.tag1}
            </span>
            <span className="px-4 py-1.5 rounded-full bg-white border border-black/10 text-[11px] font-semibold tracking-wider uppercase text-neutral-600">
              {project.tag2}
            </span>
          </div>
        </div>

        {/* Project Title & Subtitle */}
        <div className="mb-12 sm:mb-16">
          <h1 className="font-pixel text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-black leading-[1.05]">
            {project.title}
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-3xl mt-4 leading-relaxed font-normal">
            {project.subtitle}
          </p>
        </div>

        {/* Dual Hero Artwork Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[8px] mb-16 sm:mb-20">
          <div className="rounded-[44px] sm:rounded-[52px] overflow-hidden bg-neutral-900 aspect-square sm:aspect-[4/3] shadow-xs">
            <img
              src={project.image1}
              alt={`${project.title} primary view`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-[44px] sm:rounded-[52px] overflow-hidden bg-neutral-900 aspect-square sm:aspect-[4/3] shadow-xs">
            <img
              src={project.image2}
              alt={`${project.title} secondary view`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Problem Section */}
        <div className="max-w-2xl mx-auto mb-14 sm:mb-20 text-center sm:text-left">
          <h2 className="font-pixel text-xl sm:text-2xl font-bold uppercase text-black tracking-tight mb-4">
            PROBLEM
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
            {project.problem}
          </p>
        </div>

        {/* Panoramic / Middle Wide Artwork */}
        <div className="rounded-[44px] sm:rounded-[52px] overflow-hidden bg-neutral-900 aspect-[16/9] sm:h-[480px] w-full mb-14 sm:mb-20 shadow-xs">
          <img
            src={project.panoramicImage}
            alt={`${project.title} wide panoramic visual`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Solution Section */}
        <div className="max-w-2xl mx-auto mb-20 sm:mb-28 text-center sm:text-left">
          <h2 className="font-pixel text-xl sm:text-2xl font-bold uppercase text-black tracking-tight mb-4">
            SOLUTION
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
            {project.solution}
          </p>
        </div>
      </div>

      {/* Signature Neon Lime Footer */}
      <FooterSection onNavigate={onNavigateSection} />
    </motion.div>
  );
};
