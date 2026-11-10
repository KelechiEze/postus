import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    about: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', about: '' });
    }, 4000);
  };

  return (
    <section
      id="contact"
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
            CONTACT
          </motion.div>

          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="font-pixel text-2xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-black leading-[1.12]"
          >
            DESIGN STARTS WITH A CONVERSATION.
            <br />
            LET'S MAKE SOMETHING THAT LASTS
          </motion.h2>
        </div>

        {/* 2 Column Contact Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 items-stretch">
          {/* Left: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[44px] sm:rounded-[52px] p-7 sm:p-10 flex flex-col justify-between shadow-xs border border-black/[0.03]"
          >
            {submitted ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#A4F01D] flex items-center justify-center text-black shadow-md">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="font-pixel text-2xl font-bold uppercase text-black">
                  MESSAGE TRANSMITTED
                </h3>
                <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
                  Thank you for reaching out. We will review your project details and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                    NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Meggie Khasiyev"
                    className="w-full rounded-full bg-[#F4F4F4] px-6 py-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#A4F01D] transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. meggiekhasiyev@gmail.com"
                    className="w-full rounded-full bg-[#F4F4F4] px-6 py-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#A4F01D] transition-all"
                  />
                </div>

                {/* About Project */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider uppercase text-neutral-400 mb-2">
                    ABOUT PROJECT
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.about}
                    onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                    placeholder="e.g. I want a landing page website..."
                    className="w-full rounded-full bg-[#F4F4F4] px-6 py-4 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#A4F01D] transition-all"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#1A1A1A] hover:bg-black active:scale-[0.99] text-white font-pixel font-bold uppercase text-base sm:text-lg py-4 transition-all tracking-wider mt-4 cursor-pointer shadow-sm"
                >
                  SUBMIT
                </button>
              </form>
            )}
          </motion.div>

          {/* Right: Architectural Concrete Sculpture Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-[44px] sm:rounded-[52px] overflow-hidden p-4 sm:p-5 flex items-center justify-center shadow-xs border border-black/[0.03] min-h-[360px]"
          >
            <div className="w-full h-full rounded-[36px] sm:rounded-[42px] overflow-hidden bg-neutral-100 relative">
              <img
                src="/assets/contact-form.png"
                alt="Architectural concrete geometric sculpture"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://kelechieze.wordpress.com/wp-content/uploads/2026/11/contact-form.png';
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
