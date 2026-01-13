/*
 * Platinum Edge Property Page - Luminescent Noir Design
 * 
 * Sections:
 * 1. Hero - Full-width property image
 * 2. Overview - Property description
 * 3. Photo Gallery - Lightbox gallery
 * 4. Property Highlights - Detailed descriptions
 * 5. Location Context - Almadies district info
 * 6. Inquiries CTA
 */

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, X, MapPin, ChevronLeft, ChevronRight, Play, Eye } from 'lucide-react';
import VirtualTour from '@/components/VirtualTour';

const galleryImages = [
  // Exterior
  { src: '/images/exterior-building.jpg', category: 'exterior', alt: 'Building exterior view' },
  // Living & Dining
  { src: '/images/dining-niches.jpg', category: 'living', alt: 'Dining area with illuminated niches' },
  { src: '/images/kitchen.jpg', category: 'kitchen', alt: 'Modern kitchen with island' },
  { src: '/images/kitchen-niches-wide.jpg', category: 'kitchen', alt: 'Open kitchen with blue LED niches' },
  { src: '/images/living-room-blue-dark.jpg', category: 'living', alt: 'Living room with blue ambient lighting' },
  { src: '/images/living-tv-sofa.jpg', category: 'living', alt: 'Living room with TV and sectional sofa' },
  { src: '/images/tv-wall-bright.jpg', category: 'living', alt: 'TV wall with fluted panels' },
  { src: '/images/living-room-alternate.jpg', category: 'living', alt: 'Living room alternate view' },
  { src: '/images/living-room-plant.jpg', category: 'details', alt: 'Living area with plant' },
  { src: '/images/hallway-art.jpg', category: 'details', alt: 'Hallway with art and TV wall' },
  // Bedrooms
  { src: '/images/bedroom-full-view.jpg', category: 'bedroom', alt: 'Master bedroom with illuminated niches' },
  { src: '/images/bedroom-niches-1.jpg', category: 'bedroom', alt: 'Bedroom with blue LED display niches' },
  { src: '/images/bedroom-niches-2.jpg', category: 'bedroom', alt: 'Bedroom niches with African art' },
  { src: '/images/bedroom-niches-3.jpg', category: 'bedroom', alt: 'Bedroom with ambient lighting' },
  { src: '/images/bedroom-blue-wave.jpg', category: 'bedroom', alt: 'Bedroom with sculptural blue LED wave' },
  { src: '/images/bedroom-arch-view.jpg', category: 'bedroom', alt: 'Bedroom with arched LED headboard' },
  { src: '/images/bedroom-closet.jpg', category: 'bedroom', alt: 'Bedroom with closet view' },
  { src: '/images/bedroom-detail.jpg', category: 'bedroom', alt: 'Bedroom detail with lighting' },
  // Art & Details
  { src: '/images/circular-art-niches.jpg', category: 'art', alt: 'Circular artwork with display niches' },
  { src: '/images/african-art.jpg', category: 'art', alt: 'African painting in hallway' },
  { src: '/images/hallway-blue.jpg', category: 'details', alt: 'Hallway with blue ambient lighting' },
  // Closet & Bathrooms
  { src: '/images/closet-glass.jpg', category: 'closet', alt: 'Walk-in closet with glass doors' },
  { src: '/images/bathroom-1.jpg', category: 'bathroom', alt: 'Modern bathroom with marble' },
  { src: '/images/bathroom-2.jpg', category: 'bathroom', alt: 'Bathroom with rain shower' },
  { src: '/images/bathroom-3.jpg', category: 'bathroom', alt: 'Bathroom with double vanity' },
  { src: '/images/bathroom-4.jpg', category: 'bathroom', alt: 'Bathroom with glass shower' },
  { src: '/images/bathroom-5.jpg', category: 'bathroom', alt: 'Bathroom detail view' },
  { src: '/images/bathroom-6.jpg', category: 'bathroom', alt: 'Bathroom with modern fixtures' },
  { src: '/images/bathroom-7.jpg', category: 'bathroom', alt: 'Bathroom with LED mirror' },
  { src: '/images/bathroom-8.jpg', category: 'bathroom', alt: 'Bathroom with marble walls' },
  { src: '/images/bathroom-9.jpg', category: 'bathroom', alt: 'Bathroom with walk-in shower' },
];

export default function PlatinumEdge() {
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-end overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/dining-niches.jpg"
            alt="Platinum Edge"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 container pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Back Link */}
            <Link href="/portfolio">
              <span className="inline-flex items-center gap-2 text-white/60 hover:text-white font-display text-sm tracking-wider uppercase mb-8 transition-colors">
                <ArrowLeft size={16} />
                {t('portfolio.page.title')}
              </span>
            </Link>

            <div className="flex items-center gap-2 text-[#2962ff] mb-4">
              <MapPin size={18} />
              <span className="font-display text-sm tracking-widest uppercase">
                {t('portfolio.platinum.location')}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8">
              {t('portfolio.platinum.name')}
            </h1>

            {/* Virtual Tour Button */}
            <motion.button
              onClick={() => setVirtualTourOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#2962ff]/20 backdrop-blur-sm border border-[#2962ff]/50 text-white font-display text-sm tracking-wider uppercase hover:bg-[#2962ff]/30 hover:border-[#2962ff] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={20} className="text-[#2962ff]" />
              {t('virtualTour.button')}
              <Play size={16} className="text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="accent-line-gold mb-8" />
              <p className="text-white/80 text-xl leading-relaxed mb-8">
                {t('portfolio.platinum.overview')}
              </p>
              <p className="text-white/60 text-lg leading-relaxed">
                {t('portfolio.platinum.features')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 lg:py-24 bg-[#050810]">
        <div className="container">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-blue mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white">
              {t('gallery.title')}
            </h2>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                className="relative aspect-square overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0a0f1a]/0 group-hover:bg-[#0a0f1a]/40 transition-colors duration-300" />
                <div className="absolute inset-0 border border-[#2962ff]/0 group-hover:border-[#2962ff]/50 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Highlights */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Living Area */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] overflow-hidden mb-8">
                <img
                  src="/images/living-room-blue-dark.jpg"
                  alt="Living Area"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">
                {t('gallery.living')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('portfolio.platinum.living')}
              </p>
            </motion.div>

            {/* Kitchen */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[4/3] overflow-hidden mb-8">
                <img
                  src="/images/kitchen.jpg"
                  alt="Kitchen"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl text-white mb-4">
                {t('gallery.kitchen')}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {t('portfolio.platinum.kitchen')}
              </p>
            </motion.div>
          </div>

          {/* Architectural Details */}
          <motion.div
            className="mt-16 lg:mt-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src="/images/circular-art-niches.jpg"
                    alt="Architectural Details"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <h3 className="font-serif text-2xl text-white mb-4">
                  {t('gallery.details')}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {t('portfolio.platinum.details')}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Context */}
      <section className="py-24 lg:py-32 bg-[#050810]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="accent-line-gold mb-8" />
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
                {t('portfolio.platinum.location.title')}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                {t('portfolio.platinum.location.text')}
              </p>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-square bg-[#0d1220] border border-[#2962ff]/20 flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin size={48} className="text-[#2962ff] mx-auto mb-4" />
                  <p className="font-serif text-xl text-white mb-2">Almadies</p>
                  <p className="text-white/50">Dakar, Sénégal</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inquiries CTA */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-blue mx-auto mb-8" />
            <p className="text-white/70 text-xl mb-10">
              {t('portfolio.inquiries')}
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0a0f1a]/98 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute left-4 lg:left-8 p-3 text-white/60 hover:text-white transition-colors"
            >
              <ChevronLeft size={40} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 lg:right-8 p-3 text-white/60 hover:text-white transition-colors"
            >
              <ChevronRight size={40} />
            </button>

            {/* Image */}
            <motion.div
              key={currentImageIndex}
              className="max-w-6xl max-h-[80vh] px-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={galleryImages[currentImageIndex].src}
                alt={galleryImages[currentImageIndex].alt}
                className="max-w-full max-h-[80vh] object-contain"
              />
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-display text-sm text-white/50">
              {currentImageIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Virtual Tour */}
      <VirtualTour 
        isOpen={virtualTourOpen} 
        onClose={() => setVirtualTourOpen(false)} 
      />
    </Layout>
  );
}
