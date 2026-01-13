/*
 * Services Page - Luminescent Noir Design
 * 
 * Showcases Sunlight Holdings' full-service capabilities:
 * - Interior Design
 * - Furniture Selection & Procurement
 * - Complete Property Transformation
 * - Project Management
 */

import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Sofa, Sparkles, ClipboardCheck, Eye, Lightbulb, Ruler, Truck } from 'lucide-react';

export default function Services() {
  const { language } = useLanguage();

  const services = [
    {
      icon: Palette,
      title: language === 'fr' ? 'Design Intérieur' : 'Interior Design',
      description: language === 'fr'
        ? 'Conception d\'espaces de vie exceptionnels qui allient esthétique contemporaine et fonctionnalité. Notre approche signature intègre des éléments d\'éclairage ambiant, des matériaux premium et une attention méticuleuse aux détails.'
        : 'Creating exceptional living spaces that blend contemporary aesthetics with functionality. Our signature approach integrates ambient lighting elements, premium materials, and meticulous attention to detail.',
      features: language === 'fr'
        ? ['Conception lumineuse signature', 'Palettes de couleurs sur mesure', 'Plans d\'aménagement optimisés', 'Sélection des matériaux']
        : ['Signature lighting design', 'Custom color palettes', 'Optimized floor plans', 'Material selection']
    },
    {
      icon: Sofa,
      title: language === 'fr' ? 'Sélection de Mobilier' : 'Furniture Selection',
      description: language === 'fr'
        ? 'Curation et approvisionnement de mobilier haut de gamme auprès de fournisseurs internationaux. Nous sélectionnons chaque pièce pour créer des intérieurs cohérents qui reflètent le luxe et le confort.'
        : 'Curating and sourcing high-end furniture from international suppliers. We select each piece to create cohesive interiors that reflect luxury and comfort.',
      features: language === 'fr'
        ? ['Approvisionnement international', 'Pièces sur mesure', 'Coordination des livraisons', 'Installation complète']
        : ['International sourcing', 'Custom pieces', 'Delivery coordination', 'Complete installation']
    },
    {
      icon: Sparkles,
      title: language === 'fr' ? 'Transformation Complète' : 'Complete Transformation',
      description: language === 'fr'
        ? 'De l\'espace brut à la résidence de luxe clé en main. Nous gérons l\'ensemble du processus de transformation, des travaux de rénovation à la décoration finale.'
        : 'From raw space to turnkey luxury residence. We manage the entire transformation process, from renovation works to final styling.',
      features: language === 'fr'
        ? ['Rénovation complète', 'Systèmes domotiques', 'Éclairage LED intégré', 'Finitions premium']
        : ['Complete renovation', 'Smart home systems', 'Integrated LED lighting', 'Premium finishes']
    },
    {
      icon: ClipboardCheck,
      title: language === 'fr' ? 'Gestion de Projet' : 'Project Management',
      description: language === 'fr'
        ? 'Supervision de bout en bout de votre projet immobilier. Nous coordonnons tous les intervenants, gérons les délais et assurons une exécution impeccable.'
        : 'End-to-end oversight of your property project. We coordinate all stakeholders, manage timelines, and ensure flawless execution.',
      features: language === 'fr'
        ? ['Coordination des artisans', 'Contrôle qualité', 'Respect des délais', 'Gestion budgétaire']
        : ['Contractor coordination', 'Quality control', 'Timeline management', 'Budget oversight']
    }
  ];

  const process = [
    {
      step: '01',
      title: language === 'fr' ? 'Consultation' : 'Consultation',
      description: language === 'fr'
        ? 'Nous analysons vos objectifs, votre budget et votre vision pour créer un brief détaillé.'
        : 'We analyze your goals, budget, and vision to create a detailed brief.'
    },
    {
      step: '02',
      title: language === 'fr' ? 'Conception' : 'Design',
      description: language === 'fr'
        ? 'Notre équipe développe des concepts visuels, des plans d\'aménagement et des sélections de matériaux.'
        : 'Our team develops visual concepts, floor plans, and material selections.'
    },
    {
      step: '03',
      title: language === 'fr' ? 'Exécution' : 'Execution',
      description: language === 'fr'
        ? 'Nous supervisons tous les travaux, de la rénovation à l\'installation du mobilier.'
        : 'We oversee all works, from renovation to furniture installation.'
    },
    {
      step: '04',
      title: language === 'fr' ? 'Livraison' : 'Delivery',
      description: language === 'fr'
        ? 'Remise des clés d\'une propriété entièrement transformée, prête à habiter ou à louer.'
        : 'Handover of a fully transformed property, ready to live in or rent out.'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/living-room.jpg"
            alt="Interior Design"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-[#0a0f1a]/60 to-[#0a0f1a]" />
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
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6">
              {language === 'fr' ? 'Nos Services' : 'Our Services'}
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              {language === 'fr'
                ? 'De la vision à la réalité. Nous transformons les espaces en résidences d\'exception.'
                : 'From vision to reality. We transform spaces into exceptional residences.'}
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0f1a] to-transparent" />
      </section>

      {/* Introduction */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="accent-line-gold mb-8" />
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {language === 'fr' ? 'Au-Delà de l\'Investissement' : 'Beyond Investment'}
              </h2>
              <div className="space-y-6 text-white/70 leading-relaxed">
                <p>
                  {language === 'fr'
                    ? 'Sunlight Holdings ne se limite pas à l\'acquisition immobilière. Nous offrons une expertise complète en design intérieur et transformation de propriétés, développée à travers nos propres projets d\'investissement.'
                    : 'Sunlight Holdings goes beyond property acquisition. We offer complete expertise in interior design and property transformation, developed through our own investment projects.'}
                </p>
                <p>
                  {language === 'fr'
                    ? 'Notre approche signature - illustrée par le Platinum Edge - combine éclairage ambiant innovant, matériaux premium et design contemporain pour créer des espaces qui captivent et inspirent.'
                    : 'Our signature approach - illustrated by the Platinum Edge - combines innovative ambient lighting, premium materials, and contemporary design to create spaces that captivate and inspire.'}
                </p>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="/images/kitchen.jpg"
                    alt="Kitchen Design"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] overflow-hidden mt-8">
                  <img
                    src="/images/bedroom-1.jpg"
                    alt="Bedroom Design"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border border-[#2962ff]/30 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 bg-[#050810]">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-blue mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              {language === 'fr' ? 'Ce Que Nous Offrons' : 'What We Offer'}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Une gamme complète de services pour transformer votre propriété en résidence d\'exception.'
                : 'A complete range of services to transform your property into an exceptional residence.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group p-8 lg:p-10 bg-[#0d1220] border border-[#2962ff]/10 hover:border-[#2962ff]/30 transition-all duration-500"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 mb-6 flex items-center justify-center bg-gradient-to-br from-[#2962ff]/20 to-[#d4af37]/20 rounded-lg group-hover:from-[#2962ff]/30 group-hover:to-[#d4af37]/30 transition-colors">
                  <service.icon className="text-[#d4af37]" size={28} />
                </div>
                <h3 className="font-serif text-2xl text-white mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed mb-6">{service.description}</p>
                <ul className="grid grid-cols-2 gap-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/50 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#2962ff] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-gold mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              {language === 'fr' ? 'Notre Processus' : 'Our Process'}
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              {language === 'fr'
                ? 'Une méthodologie éprouvée pour des résultats exceptionnels.'
                : 'A proven methodology for exceptional results.'}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={index}
                className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="font-serif text-6xl text-[#2962ff]/20 mb-4">{item.step}</div>
                <h3 className="font-serif text-xl text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
                
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-[#2962ff]/30 to-transparent" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study - Platinum Edge */}
      <section className="py-24 lg:py-32 bg-[#050810]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="/images/niches.jpg"
                  alt="LED Niches"
                  className="w-full aspect-square object-cover"
                />
                <img
                  src="/images/bathroom-1.jpg"
                  alt="Bathroom"
                  className="w-full aspect-square object-cover"
                />
                <img
                  src="/images/closet.jpg"
                  alt="Closet"
                  className="w-full aspect-square object-cover"
                />
                <img
                  src="/images/dining.jpg"
                  alt="Dining"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="order-1 lg:order-2"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-full mb-6">
                <Eye size={16} className="text-[#d4af37]" />
                <span className="text-[#d4af37] text-sm font-display tracking-wider uppercase">
                  {language === 'fr' ? 'Étude de Cas' : 'Case Study'}
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                Platinum Edge
              </h2>
              <div className="space-y-4 text-white/70 leading-relaxed mb-8">
                <p>
                  {language === 'fr'
                    ? 'Notre projet phare illustre parfaitement notre approche. Nous avons transformé cet appartement de 4 chambres avec vue panoramique sur l\'océan en une résidence de luxe unique à Dakar.'
                    : 'Our flagship project perfectly illustrates our approach. We transformed this 4-bedroom apartment with panoramic ocean views into a unique luxury residence in Dakar.'}
                </p>
                <p>
                  {language === 'fr'
                    ? 'De la conception du système d\'éclairage LED signature à la sélection de chaque meuble, nous avons géré l\'intégralité du projet pour créer un espace qui commande aujourd\'hui un loyer premium de 4,5 millions FCFA par mois.'
                    : 'From designing the signature LED lighting system to selecting every piece of furniture, we managed the entire project to create a space that now commands a premium rent of 4.5 million FCFA per month.'}
                </p>
              </div>
              <Link href="/portfolio/platinum-edge">
                <motion.button
                  className="group inline-flex items-center gap-3 px-8 py-3 border border-[#d4af37]/50 text-[#d4af37] font-display text-sm tracking-wider uppercase hover:bg-[#d4af37]/10 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {language === 'fr' ? 'Voir le Projet' : 'View Project'}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
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
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              {language === 'fr' ? 'Prêt à Transformer Votre Propriété?' : 'Ready to Transform Your Property?'}
            </h2>
            <p className="text-white/60 mb-10">
              {language === 'fr'
                ? 'Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons créer un espace d\'exception.'
                : 'Contact us to discuss your project and discover how we can create an exceptional space.'}
            </p>
            <Link href="/contact">
              <motion.button
                className="group inline-flex items-center gap-3 px-10 py-4 bg-[#2962ff] text-white font-display text-sm tracking-wider uppercase hover:bg-[#1e4fd6] transition-colors glow-blue"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {language === 'fr' ? 'Démarrer un Projet' : 'Start a Project'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
