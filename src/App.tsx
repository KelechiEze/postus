/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { WorksSection } from './components/WorksSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { InsightsSection } from './components/InsightsSection';
import { ContactSection } from './components/ContactSection';
import { FooterSection } from './components/FooterSection';
import { ProjectDetailPage, ProjectData } from './components/ProjectDetailPage';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const scrollToSection = (id: string) => {
    if (selectedProject) {
      setSelectedProject(null);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black selection:bg-[#A4F01D] selection:text-black">
      {/* Floating Pill Top Navigation */}
      <Navbar onNavigate={scrollToSection} />

      {selectedProject ? (
        <ProjectDetailPage
          project={selectedProject}
          onBack={() => {
            setSelectedProject(null);
            setTimeout(() => {
              const el = document.getElementById('works');
              el?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
          onNavigateSection={scrollToSection}
        />
      ) : (
        <>
          {/* Hero Section */}
          <HeroSection onScrollDown={() => scrollToSection('features')} />

          {/* Features Section with 2x2 Bento Cards */}
          <FeaturesSection />

          {/* Works Section: Selected Neural Outputs */}
          <WorksSection onSelectProject={(project) => setSelectedProject(project)} />

          {/* Testimonials Section: Trusted by Industry Leaders */}
          <TestimonialsSection />

          {/* Insights Section: Neural Insights */}
          <InsightsSection />

          {/* Contact Section: Design Starts with a Conversation */}
          <ContactSection />

          {/* Footer Section: Neon Green Navigation & Large Wordmark */}
          <FooterSection onNavigate={scrollToSection} />
        </>
      )}
    </div>
  );
}
