/*
 * About Page - Luminescent Noir Design
 * 
 * Sections:
 * 1. Hero - Architectural detail image
 * 2. Our Philosophy - Company founding story
 * 3. Leadership - Principal credentials
 * 4. Why West Africa - Market opportunity
 */

import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { GraduationCap, Building2, Globe } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/about-hero.jpg"
            alt="Architecture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/70 via-[#0a0f1a]/50 to-[#0a0f1a]" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex justify-center mb-8">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              {t('about.hero.title')}
            </h1>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent" />
      </section>

      {/* Our Philosophy */}
      <section className="py-24 lg:py-32 relative">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="accent-line-gold mb-8" />
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-10">
                {t('about.philosophy.title')}
              </h2>
              
              <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                <p>{t('about.philosophy.text1')}</p>
                <p>{t('about.philosophy.text2')}</p>
                <p className="text-[#d4af37] italic font-serif text-xl">
                  {t('about.philosophy.text3')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 lg:py-32 relative bg-[#050810]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="/images/hero-abstract-1.jpg"
                  alt="Leadership"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -left-4 w-full h-full border border-[#2962ff]/30 -z-10" />
            </motion.div>

            {/* Content */}
            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="accent-line-blue mb-8" />
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t('about.leadership.title')}
              </h2>
              
              <div className="mb-8">
                <h3 className="font-display text-lg text-[#d4af37] mb-2">
                  {t('about.leadership.role')}
                </h3>
              </div>

              {/* Credentials */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#2962ff]/10 rounded-full shrink-0">
                    <GraduationCap className="text-[#2962ff]" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">MBA, IE Business School Madrid</p>
                    <p className="text-white/50 text-sm">International Business Administration</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#d4af37]/10 rounded-full shrink-0">
                    <GraduationCap className="text-[#d4af37]" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">MSc, Oxford Saïd Business School</p>
                    <p className="text-white/50 text-sm">Advanced Management Studies</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#2962ff]/10 rounded-full shrink-0">
                    <Building2 className="text-[#2962ff]" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">Al Habtoor Group, Dubai</p>
                    <p className="text-white/50 text-sm">Portfolio Manager - $500M Real Estate Portfolio</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#d4af37]/10 rounded-full shrink-0">
                    <Globe className="text-[#d4af37]" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">International Experience</p>
                    <p className="text-white/50 text-sm">Middle East, Caribbean, West Africa</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why West Africa */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/hallway-blue.jpg"
            alt="Ambient Lighting"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/95 to-[#0a0f1a]" />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="accent-line-gold mb-8" />
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-10">
                {t('about.whyAfrica.title')}
              </h2>
              
              <div className="space-y-6 text-white/70 text-lg leading-relaxed">
                <p>{t('about.whyAfrica.text1')}</p>
                <p>{t('about.whyAfrica.text2')}</p>
                <p>{t('about.whyAfrica.text3')}</p>
              </div>

              {/* Key Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/10">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="font-serif text-4xl md:text-5xl text-[#2962ff] mb-2">15+</div>
                  <div className="font-display text-xs tracking-wider uppercase text-white/50">
                    {t('about.whyAfrica.title') === 'Pourquoi l\'Afrique de l\'Ouest' ? 'Années d\'Expérience' : 'Years Experience'}
                  </div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="font-serif text-4xl md:text-5xl text-[#d4af37] mb-2">$500M</div>
                  <div className="font-display text-xs tracking-wider uppercase text-white/50">
                    {t('about.whyAfrica.title') === 'Pourquoi l\'Afrique de l\'Ouest' ? 'Portfolio Géré' : 'Portfolio Managed'}
                  </div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="font-serif text-4xl md:text-5xl text-[#2962ff] mb-2">3</div>
                  <div className="font-display text-xs tracking-wider uppercase text-white/50">
                    {t('about.whyAfrica.title') === 'Pourquoi l\'Afrique de l\'Ouest' ? 'Continents' : 'Continents'}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
