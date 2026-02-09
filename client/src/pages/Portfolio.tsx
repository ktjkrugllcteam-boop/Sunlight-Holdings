





import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";


type LocalizedContent = {
  [key: string]: string;
};

type Property = {
  id: number;
  title: LocalizedContent | string;
  location: LocalizedContent | string;
  description: LocalizedContent | string;
  thumbImage: string;
};


const parseJSON = (input: string) => {
  try {
    return JSON.parse(input);
  } catch (e) {
    return input;
  }
};

const getLocalized = (content: LocalizedContent | string, language: string) => {
  if (typeof content === "object" && content !== null) {

    return (content as any)[language] || (content as any)["en"] || "";
  }
  return content;
};

export default function Portfolio() {
  const { language, t } = useLanguage();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/property/propertiesGet");

        if (!res.ok) {
          throw new Error(`Error fetching properties: ${res.statusText}`);
        }

        const rawData = await res.json();


        const formattedData = rawData.map((item: any) => ({
          id: item.id,
          thumbImage: item.thumbImage,
          title: parseJSON(item.projectName),
          location: parseJSON(item.location),
          description: parseJSON(item.description),
        }));

        setProperties(formattedData);
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
              {t("portfolio.page.title")}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              {t("portfolio.page.intro")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Properties List */}
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
                  delay: index * 0.1,
                }}
              >

                <Link href={`/portfolio/property?id=${property.id}`}>
                  <div className="group relative overflow-hidden cursor-pointer mb-10">
                    <div className="aspect-[15/9] lg:aspect-[21/9] overflow-hidden">
                      <img
                        src={property.thumbImage}
                        alt={getLocalized(property.title, language) as string}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/30 to-transparent" />
                    </div>

                
                    <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-12">
                      <div className="flex items-center justify-between lg:items-end lg:justify-between gap-4">

                        <div>
                      
                          <div className="flex items-center gap-2 text-[#2962ff] mb-0 lg:mb-3">
                            <MapPin size={16} />
                            <span className="font-display text-xs tracking-widest uppercase">
                              {getLocalized(property.location, language)}
                            </span>
                          </div>

                        
                          <div className="hidden lg:block">
                            <h2 className="font-serif text-3xl text-white mb-3">
                              {getLocalized(property.title, language)}
                            </h2>
                            <p className="text-white/60 max-w-xl">
                              {getLocalized(property.description, language)}
                            </p>
                          </div>
                        </div>

                   
                        <div className="flex items-center gap-2 text-[#d4af37] font-display text-xs lg:text-sm tracking-wider uppercase group-hover:gap-4 transition-all shrink-0">
                          {t("portfolio.viewDetails")}
                          <ArrowRight size={16} />
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