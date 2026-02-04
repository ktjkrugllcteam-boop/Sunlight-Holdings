import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

// Helper type for multi-language fields
type LocalizedContent = {
  [key: string]: string;
};

type Property = {
  id: number;
  title: LocalizedContent | string; // Can be an object {en:..., fr:...} or fallback string
  location: LocalizedContent | string;
  description: LocalizedContent | string;
  thumbImage: string; // Note: Ensure this matches your DB column name (usually camelCase)
};

export default function Portfolio() {
  // 1️⃣ Get current language code (e.g., 'en', 'fr') alongside 't'
  const { language, t } = useLanguage(); 
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  // 2️⃣ Helper to safely get text based on current language
  const getLocalized = (content: LocalizedContent | string) => {
    if (typeof content === "object" && content !== null) {
      // Return requested language, or fallback to 'en', or empty string
      // @ts-ignore
      return content[language] || content["en"] || "";
    }
    return content; // If it's just a string, return it as is
  };

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/property/propertiesGet");
        
        if (!res.ok) {
          throw new Error(`Error fetching properties: ${res.statusText}`);
        }
        
        const rawData = await res.json();
        console.log("Fetch Properties Response:", rawData);

        // 3️⃣ Parse the JSON strings from DB into objects
        const formattedData = rawData.map((item: any) => ({
          id: item.id, // Ensure your DB returns 'id' or 'Pid'
          thumbImage: item.thumbImage, 
          // Parse the JSON strings:
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


  const parseJSON = (input: string) => {
    try {
      return JSON.parse(input);
    } catch (e) {
      return input; 
    }
  };

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
                        // 4️⃣ Use getLocalized for alt text
                        alt={getLocalized(property.title)}
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
                              {/* 5️⃣ Render Localized Location */}
                              {getLocalized(property.location)}
                            </span>
                          </div>
                          <h2 className="font-serif text-3xl lg:text-4xl text-white mb-3">
                            {/* 6️⃣ Render Localized Title */}
                            {getLocalized(property.title)}
                          </h2>
                          <p className="text-white/60 max-w-xl">
                            {/* 7️⃣ Render Localized Description */}
                            {getLocalized(property.description)}
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