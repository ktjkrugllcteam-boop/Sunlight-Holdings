/*
 * 404 Not Found Page - Luminescent Noir Design
 */

import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function NotFound() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
      <div className="container">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 404 Number */}
          <div className="relative mb-8">
            <span className="font-serif text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#2962ff]/30 to-transparent leading-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-6xl md:text-7xl text-white">404</span>
            </div>
          </div>

          <h1 className="font-serif text-2xl md:text-3xl text-white mb-4">
            {language === 'fr' ? 'Page Non Trouvée' : 'Page Not Found'}
          </h1>
          
          <p className="text-white/60 mb-10">
            {language === 'fr' 
              ? 'La page que vous recherchez n\'existe pas ou a été déplacée.'
              : 'The page you are looking for does not exist or has been moved.'}
          </p>

          <Link href="/">
            <motion.button
              className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-[#d4af37]/50 text-[#d4af37] font-display text-sm tracking-wider uppercase hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              {language === 'fr' ? 'Retour à l\'Accueil' : 'Back to Home'}
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
