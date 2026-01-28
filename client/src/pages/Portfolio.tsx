import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

type Property = {
  id: number;
  title: string;
  location: string;
  description: string;
  ThumbImage: string;
};

export default function Portfolio() {
  const { t } = useLanguage();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/property/propertiesGet");
        
        if (!res.ok) {
          throw new Error(`Error fetching properties: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Fetch Properties Response:", data);
        setProperties(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Layout>
      {/* Hero */}
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
              {t("portfolio.page.title")}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              {t("portfolio.page.intro")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Properties */}
      <section className="pb-24 lg:pb-32">
        <div className="container">
          {loading ? (
            <p className="text-white/40">Loading...</p>
          ) : (
            properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.1
                }}
              >
                <Link href={`/portfolio/platinum-edge?id=${property.id}`}>
                  <div className="group relative overflow-hidden cursor-pointer mb-10">
                    <div className="aspect-[21/9] overflow-hidden">
                      <img
                        src={property.thumbImage}
                        alt={property.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/20 to-transparent" />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div>
                          <div className="flex items-center gap-2 text-[#2962ff] mb-3">
                            <MapPin size={16} />
                            <span className="font-display text-xs tracking-widest uppercase">
                              {property.location}
                            </span>
                          </div>
                          <h2 className="font-serif text-3xl lg:text-4xl text-white mb-3">
                            {property.title}
                          </h2>
                          <p className="text-white/60 max-w-xl">
                            {property.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 text-[#d4af37] font-display text-sm tracking-wider uppercase group-hover:gap-4 transition-all shrink-0">
                          {t("portfolio.viewDetails")}
                          <ArrowRight size={18} />
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 border border-[#2962ff]/0 group-hover:border-[#2962ff]/30 transition-colors duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </Layout>
  );
}
