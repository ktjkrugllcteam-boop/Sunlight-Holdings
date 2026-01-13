/*
 * Home Page - Luminescent Noir Design
 * 
 * Sections:
 * 1. Hero - Full-screen with property image background
 * 2. Company Introduction - Brief positioning statement
 * 3. Portfolio Preview - Featured properties grid
 * 4. Investment Philosophy - Three pillars
 * 5. Leadership Preview - Brief mention with link
 * 6. Contact CTA - Partnership inquiry prompt
 */

import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Target, Clock } from 'lucide-react';

export default function Home() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/dining-niches.jpg"
            alt="Platinum Edge Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            {/* Decorative line */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6 max-w-4xl mx-auto">
              {t('hero.headline')}
            </h1>
            
            <p className="font-display text-sm md:text-base tracking-widest uppercase text-white/70 mb-10 max-w-2xl mx-auto">
              {t('hero.subheadline')}
            </p>

            <Link href="/portfolio">
              <motion.button
                className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#d4af37]/50 text-[#d4af37] font-display text-sm tracking-wider uppercase hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('hero.cta')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="font-display text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>

        {/* Decorative corner elements */}
        <div className="absolute top-24 left-8 w-20 h-20 border-l border-t border-[#2962ff]/30" />
        <div className="absolute bottom-24 right-8 w-20 h-20 border-r border-b border-[#d4af37]/30" />
      </section>

      {/* Company Introduction */}
      <section className="py-24 lg:py-32 relative">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-gold mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
              {t('intro.title')}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              {t('intro.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 lg:py-32 relative bg-[#050810]">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a] via-transparent to-[#0a0f1a]" />
        </div>

        <div className="container relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-blue mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              {t('portfolio.title')}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>

          {/* Property Card */}
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/portfolio/platinum-edge">
              <div className="group relative overflow-hidden cursor-pointer">
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src="/images/hero-abstract-2.jpg"
                    alt="Platinum Edge"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/30 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                    <div>
                      <span className="font-display text-xs tracking-widest uppercase text-[#2962ff] mb-2 block">
                        Almadies, Dakar
                      </span>
                      <h3 className="font-serif text-2xl lg:text-3xl text-white mb-3">
                        Platinum Edge
                      </h3>
                      <p className="text-white/60 max-w-md">
                        {t('portfolio.platinum.description')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-[#d4af37] font-display text-sm tracking-wider uppercase group-hover:gap-4 transition-all">
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

          {/* View All Link */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/portfolio">
              <span className="inline-flex items-center gap-2 text-white/60 hover:text-white font-display text-sm tracking-wider uppercase transition-colors">
                {t('portfolio.viewAll')}
                <ArrowRight size={16} />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Investment Philosophy */}
      <section className="py-24 lg:py-32 relative">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-gold mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              {t('philosophy.title')}
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Pillar 1 */}
            <motion.div
              className="group p-8 lg:p-10 bg-[#0d1220] border border-[#2962ff]/10 hover:border-[#2962ff]/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-[#2962ff]/10 rounded-full group-hover:bg-[#2962ff]/20 transition-colors">
                <Sparkles className="text-[#2962ff]" size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4">
                {t('philosophy.pillar1.title')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('philosophy.pillar1.text')}
              </p>
            </motion.div>

            {/* Pillar 2 */}
            <motion.div
              className="group p-8 lg:p-10 bg-[#0d1220] border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-[#d4af37]/10 rounded-full group-hover:bg-[#d4af37]/20 transition-colors">
                <Target className="text-[#d4af37]" size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4">
                {t('philosophy.pillar2.title')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('philosophy.pillar2.text')}
              </p>
            </motion.div>

            {/* Pillar 3 */}
            <motion.div
              className="group p-8 lg:p-10 bg-[#0d1220] border border-[#2962ff]/10 hover:border-[#2962ff]/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-[#2962ff]/10 rounded-full group-hover:bg-[#2962ff]/20 transition-colors">
                <Clock className="text-[#2962ff]" size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4">
                {t('philosophy.pillar3.title')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('philosophy.pillar3.text')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/about-hero.jpg"
            alt="Architecture"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0f1a] via-[#0a0f1a]/90 to-[#0a0f1a]" />
        </div>

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="accent-line-gold mb-8" />
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t('leadership.title')}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                {t('leadership.text')}
              </p>
              <Link href="/about">
                <motion.span
                  className="inline-flex items-center gap-2 text-[#d4af37] font-display text-sm tracking-wider uppercase hover:gap-4 transition-all"
                  whileHover={{ x: 5 }}
                >
                  {t('leadership.learnMore')}
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/circular-art-niches.jpg"
                  alt="Art and Design"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative frame */}
              <div className="absolute -top-4 -right-4 w-full h-full border border-[#d4af37]/30 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 lg:py-32 relative bg-[#050810]">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-blue mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              {t('contact.title')}
            </h2>
            <p className="text-white/60 text-lg mb-10">
              {t('contact.subtitle')}
            </p>
            <Link href="/contact">
              <motion.button
                className="group inline-flex items-center gap-3 px-10 py-4 bg-[#2962ff] text-white font-display text-sm tracking-wider uppercase hover:bg-[#1e4fd6] transition-colors glow-blue"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('contact.cta')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
