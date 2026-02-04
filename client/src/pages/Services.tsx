import { useLanguage } from '@/contexts/LanguageContext';
import Layout from '@/components/Layout';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowRight, Palette, Sofa, Sparkles, ClipboardCheck, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Services() {
  const { language } = useLanguage();
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/property/getpages');
        const data = await res.json();
  
        const page = data.find(p => p.slug === 'our-services');
        setPageData(page);
      } catch (err) {
        console.error('Failed to fetch page data:', err);
      }
    }
    fetchData();
  }, []);

  if (!pageData) return <Layout><p className="text-white text-center py-24">Loading...</p></Layout>;


  const services = [
    {
      icon: Palette,
      title: pageData.hero?.title?.[language] || 'Service 1',
      description: pageData.intro?.paragraphs?.[language]?.[0] || '',
      features: pageData.intro?.paragraphs?.[language] || [],
    },
    {
      icon: Sofa,
      title: pageData.hero?.title?.[language] || 'Service 2',
      description: pageData.intro?.paragraphs?.[language]?.[1] || '',
      features: pageData.intro?.paragraphs?.[language] || [],
    },
    {
      icon: Sparkles,
      title: pageData.hero?.title?.[language] || 'Service 3',
      description: pageData.intro?.paragraphs?.[language]?.[0] || '',
      features: pageData.intro?.paragraphs?.[language] || [],
    },
    {
      icon: ClipboardCheck,
      title: pageData.hero?.title?.[language] || 'Service 4',
      description: pageData.intro?.paragraphs?.[language]?.[1] || '',
      features: pageData.intro?.paragraphs?.[language] || [],
    }
  ];


  const process = [
    { step: '01', title: language === 'fr' ? 'Consultation' : 'Consultation', description: pageData.intro?.paragraphs?.[language]?.[0] || '' },
    { step: '02', title: language === 'fr' ? 'Conception' : 'Design', description: pageData.intro?.paragraphs?.[language]?.[1] || '' },
    { step: '03', title: language === 'fr' ? 'Exécution' : 'Execution', description: pageData.intro?.paragraphs?.[language]?.[0] || '' },
    { step: '04', title: language === 'fr' ? 'Livraison' : 'Delivery', description: pageData.intro?.paragraphs?.[language]?.[1] || '' },
  ];

  const hero = pageData.hero;
  const intro = pageData.intro;
  const caseStudies = pageData.caseStudies || [];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero?.background_image}
            alt={hero?.title?.[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0f1a]/80 via-[#0a0f1a]/60 to-[#0a0f1a]" />
        </div>

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
              {hero?.title?.[language]}
            </h1>
            <p className="text-white/70 text-xl max-w-2xl mx-auto">{hero?.subtitle?.[language]}</p>
          </motion.div>
        </div>
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
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">{intro?.heading?.[language]}</h2>
              <div className="space-y-6 text-white/70 leading-relaxed">
                {intro?.paragraphs?.[language]?.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
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
                {intro?.images?.map((img, idx) => (
                  <div key={idx} className="aspect-[3/4] overflow-hidden mt-8">
                    <img src={img} alt={`Intro Image ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 lg:py-32 bg-[#050810]">
        <div className="container">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-blue mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{language === 'fr' ? 'Ce Que Nous Offrons' : 'What We Offer'}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div key={index} className="group p-8 lg:p-10 bg-[#0d1220] border border-[#2962ff]/10 hover:border-[#2962ff]/30 transition-all duration-500"
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

      {/* Process Steps */}
      <section className="py-24 lg:py-32">
        <div className="container">
          <motion.div className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-gold mx-auto mb-8" />
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">{language === 'fr' ? 'Notre Processus' : 'Our Process'}</h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div key={index} className="relative text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="font-serif text-6xl text-[#2962ff]/20 mb-4">{item.step}</div>
                <h3 className="font-serif text-xl text-white mb-3">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-24 lg:py-32 bg-[#050810]">
        <div className="container">
          {caseStudies.map((cs, idx) => (
            <div key={idx} className="grid lg:grid-cols-2 gap-16 items-center mb-16">
              <motion.div className={idx % 2 === 0 ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {cs.images.map((img, i) => (
                    <img key={i} src={img} alt={cs.title} className="w-full aspect-square object-cover" />
                  ))}
                </div>
              </motion.div>

              <motion.div className={idx % 2 === 0 ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}
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
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">{cs.title}</h2>
                <div className="space-y-4 text-white/70 leading-relaxed mb-8">
                  {cs.description[language]?.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                <Link href={cs.link_url}>
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
          ))}
        </div>
      </section>
    </Layout>
  );
}
