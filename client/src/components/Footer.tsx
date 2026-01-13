/*
 * Footer Component - Luminescent Noir Design
 * - Dark background with subtle glow accents
 * - Company information and navigation links
 * - Social links and legal information
 */

import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Linkedin, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#050810] border-t border-[#2962ff]/10">
      {/* Decorative top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#2962ff]/50 to-transparent" />
      
      <div className="container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2962ff] to-[#d4af37] rounded-full opacity-80" />
                <div className="absolute inset-[2px] bg-[#050810] rounded-full flex items-center justify-center">
                  <span className="text-[#d4af37] font-serif text-lg font-bold">S</span>
                </div>
              </div>
              <div>
                <span className="font-serif text-xl text-white tracking-wide">Sunlight</span>
                <span className="font-serif text-xl text-[#d4af37] tracking-wide ml-1">Holdings</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-md mb-6">
              {t('footer.tagline')}
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm">
              <MapPin size={16} className="text-[#2962ff]" />
              <span>{t('footer.location')}</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-[#d4af37] mb-6">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link href="/" className="text-white/60 hover:text-white transition-colors text-sm">
                {t('nav.home')}
              </Link>
              <Link href="/about" className="text-white/60 hover:text-white transition-colors text-sm">
                {t('nav.about')}
              </Link>
              <Link href="/portfolio" className="text-white/60 hover:text-white transition-colors text-sm">
                {t('nav.portfolio')}
              </Link>
              <Link href="/investment" className="text-white/60 hover:text-white transition-colors text-sm">
                {t('nav.investment')}
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-display text-xs tracking-widest uppercase text-[#d4af37] mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:contact@sunlightholdings.sn"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group"
              >
                <Mail size={16} className="text-[#2962ff] group-hover:text-[#d4af37] transition-colors" />
                <span>contact@sunlightholdings.sn</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm group"
              >
                <Linkedin size={16} className="text-[#2962ff] group-hover:text-[#d4af37] transition-colors" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-xs">
              © {currentYear} Sunlight Holdings SARL. {t('footer.rights')}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-white/30 hover:text-white/60 transition-colors text-xs">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-white/30 hover:text-white/60 transition-colors text-xs">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
