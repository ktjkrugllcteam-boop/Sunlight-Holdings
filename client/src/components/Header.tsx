/*
 * Header Component - Luminescent Noir Design
 * - Transparent header that becomes solid on scroll
 * - Language toggle (FR/EN)
 * - Subtle glow effects on navigation items
 */

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/portfolio', label: t('nav.portfolio') },
    { href: '/investment', label: t('nav.investment') },
    { href: '/contact', label: t('nav.contact') },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0a0f1a]/95 backdrop-blur-md border-b border-[#2962ff]/20'
            : 'bg-transparent'
        }`}
      >
        <div className="container">
          <nav className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-3 group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2962ff] to-[#d4af37] rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-[2px] bg-[#0a0f1a] rounded-full flex items-center justify-center">
                    <span className="text-[#d4af37] font-serif text-lg lg:text-xl font-bold">S</span>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="font-serif text-lg lg:text-xl text-white tracking-wide">
                    Sunlight
                  </span>
                  <span className="font-serif text-lg lg:text-xl text-[#d4af37] tracking-wide ml-1">
                    Holdings
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.span
                    className={`relative font-display text-sm tracking-wider uppercase transition-colors duration-300 ${
                      isActive(item.href)
                        ? 'text-[#2962ff]'
                        : 'text-white/80 hover:text-white'
                    }`}
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#2962ff] to-transparent"
                        layoutId="activeNav"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Language Toggle & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1.5 text-xs font-display tracking-wider rounded-full transition-all duration-300 ${
                    language === 'fr'
                      ? 'bg-[#2962ff] text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  FR
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 text-xs font-display tracking-wider rounded-full transition-all duration-300 ${
                    language === 'en'
                      ? 'bg-[#2962ff] text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-[#0a0f1a]/98 backdrop-blur-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="relative pt-24 px-6">
              <div className="flex flex-col gap-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                      <span
                        className={`block font-serif text-2xl transition-colors ${
                          isActive(item.href)
                            ? 'text-[#2962ff]'
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Decorative element */}
              <div className="mt-12 w-20 h-[2px] bg-gradient-to-r from-[#2962ff] to-[#d4af37]" />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
