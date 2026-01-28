/*
 * Portfolio Page - Luminescent Noir Design
 * 
 * Sections:
 * 1. Hero - Portfolio overview
 * 2. Property Grid - Featured properties
 */

import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24">
        <div className="container">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-gold mb-8" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {t('portfolio.page.title')}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              {t('portfolio.page.intro')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Property Grid */}
      <section className="pb-24 lg:pb-32">
        <div className="container">
          {/* Platinum Edge - Featured Property */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/portfolio/platinum-edge">
              <div className="group relative overflow-hidden cursor-pointer mb-8">
                {/* Main Image */}
                <div className="aspect-[21/9] overflow-hidden">
                  <img
                    src="/images/dining-niches.jpg"
                    alt="Platinum Edge"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/20 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div>
                      <div className="flex items-center gap-2 text-[#2962ff] mb-3">
                        <MapPin size={16} />
                        <span className="font-display text-xs tracking-widest uppercase">
                          {t('portfolio.platinum.location')}
                        </span>
                      </div>
                      <h2 className="font-serif text-3xl lg:text-4xl text-white mb-3">
                        {t('portfolio.platinum.name')}
                      </h2>
                      <p className="text-white/60 max-w-xl">
                        {t('portfolio.platinum.description')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[#d4af37] font-display text-sm tracking-wider uppercase group-hover:gap-4 transition-all shrink-0">
                      {t('portfolio.viewDetails')}
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </div>

                {/* Glow border on hover */}
                <div className="absolute inset-0 border border-[#2962ff]/0 group-hover:border-[#2962ff]/30 transition-colors duration-500" />
              </div>
            </Link>
          </motion.div>

          {/* Additional Properties Grid - Placeholder for future */}
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Coming Soon Card 1 */}
            <div className="relative aspect-[4/3] bg-[#0d1220] border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-[#2962ff]/30 flex items-center justify-center">
                  <span className="text-[#2962ff] font-serif text-2xl">+</span>
                </div>
                <p className="font-display text-xs tracking-widest uppercase text-white/30">
                  {t('portfolio.page.title') === 'Notre Portfolio' ? 'Prochainement' : 'Coming Soon'}
                </p>
              </div>
            </div>

            {/* Coming Soon Card 2 */}
            <div className="relative aspect-[4/3] bg-[#0d1220] border border-white/5 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-[#d4af37]/30 flex items-center justify-center">
                  <span className="text-[#d4af37] font-serif text-2xl">+</span>
                </div>
                <p className="font-display text-xs tracking-widest uppercase text-white/30">
                  {t('portfolio.page.title') === 'Notre Portfolio' ? 'Prochainement' : 'Coming Soon'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
