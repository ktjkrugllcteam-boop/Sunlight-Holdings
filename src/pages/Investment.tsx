/*
 * Investment Approach Page - Luminescent Noir Design
 * 
 * Sections:
 * 1. Hero - Value creation headline
 * 2. Introduction - Investment philosophy overview
 * 3. Acquisition Criteria - What we look for
 * 4. Development Philosophy - How we develop
 * 5. Partnership Structures - Collaboration options
 * 6. CTA - Partnership inquiry
 */

import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Building, Palette, Handshake, Briefcase, Users, Lightbulb } from 'lucide-react';

export default function Investment() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/investment-hero.jpg"
            alt="Investment"
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
              {t('investment.hero.title')}
            </h1>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent" />
      </section>

      {/* Introduction */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/70 text-xl leading-relaxed">
              {t('investment.intro.text')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Acquisition Criteria */}
      <section className="py-24 lg:py-32 bg-[#050810]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="accent-line-gold mb-8" />
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
                {t('investment.criteria.title')}
              </h2>
              
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>{t('investment.criteria.text1')}</p>
                <p>{t('investment.criteria.text2')}</p>
                <p>{t('investment.criteria.text3')}</p>
              </div>
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
                  src="/images/hero-abstract-1.jpg"
                  alt="Acquisition"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#2962ff]/30 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Development Philosophy */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              className="order-2 lg:order-1 relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/kitchen.jpg"
                  alt="Development"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#d4af37]/30 -z-10" />
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="accent-line-blue mb-8" />
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-8">
                {t('investment.development.title')}
              </h2>
              
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>{t('investment.development.text1')}</p>
                <p>{t('investment.development.text2')}</p>
                <p>{t('investment.development.text3')}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partnership Structures */}
      <section className="py-24 lg:py-32 bg-[#050810]">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-gold mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              {t('investment.partnership.title')}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {t('investment.partnership.intro')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
            {/* Joint Venture */}
            <motion.div
              className="group p-8 lg:p-10 bg-[#0d1220] border border-[#2962ff]/10 hover:border-[#2962ff]/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-[#2962ff]/10 rounded-full group-hover:bg-[#2962ff]/20 transition-colors">
                <Handshake className="text-[#2962ff]" size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4">
                {t('investment.partnership.jv.title')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('investment.partnership.jv.text')}
              </p>
            </motion.div>

            {/* Development Partnerships */}
            <motion.div
              className="group p-8 lg:p-10 bg-[#0d1220] border border-[#d4af37]/10 hover:border-[#d4af37]/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-[#d4af37]/10 rounded-full group-hover:bg-[#d4af37]/20 transition-colors">
                <Building className="text-[#d4af37]" size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4">
                {t('investment.partnership.dev.title')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('investment.partnership.dev.text')}
              </p>
            </motion.div>

            {/* Advisory Services */}
            <motion.div
              className="group p-8 lg:p-10 bg-[#0d1220] border border-[#2962ff]/10 hover:border-[#2962ff]/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="w-12 h-12 mb-6 flex items-center justify-center bg-[#2962ff]/10 rounded-full group-hover:bg-[#2962ff]/20 transition-colors">
                <Lightbulb className="text-[#2962ff]" size={24} />
              </div>
              <h3 className="font-serif text-xl text-white mb-4">
                {t('investment.partnership.advisory.title')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('investment.partnership.advisory.text')}
              </p>
            </motion.div>
          </div>

          <motion.p
            className="text-white/50 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('investment.partnership.outro')}
          </motion.p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/contact">
              <motion.button
                className="group inline-flex items-center gap-3 px-10 py-4 bg-[#2962ff] text-white font-display text-sm tracking-wider uppercase hover:bg-[#1e4fd6] transition-colors glow-blue"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t('investment.cta')}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
