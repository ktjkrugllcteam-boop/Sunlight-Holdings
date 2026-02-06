





import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, CheckCircle } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();


  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // STOP the page from reloading
  //   console.log("1. Submit button clicked. Page reload prevented.");

  //   setStatus("submitting");

  //   // Gather data from the form
  //   const formData = new FormData(event.currentTarget);
  //   const data = Object.fromEntries(formData.entries());
  //   console.log("2. Form Data collected:", data);

  //   try {
  //     console.log("3. Sending request to Formspree...");

  //     const response = await fetch("https://formspree.io/f/xwvvvenr", {
  //       method: "POST",
  //       body: JSON.stringify(data),
  //       headers: {
  //         "Accept": "application/json",
  //         "Content-Type": "application/json"
  //       },
  //     });

  //     console.log("4. Response received. Status:", response.status);

  //     if (response.ok) {
  //       setStatus("success");
  //       console.log("5. Success! Message sent.");
  //     } else {
  //       const errorData = await response.json();
  //       console.error("5. Formspree Error:", errorData);
  //       setStatus("error");
  //       setErrorMessage(errorData.error || "Failed to send message");
  //     }
  //   } catch (error) {
  //     console.error("5. Network Error:", error);
  //     setStatus("error");
  //     setErrorMessage("Network error. Please try again.");
  //   }
  // };

useEffect(() => {

  console.log("ALL ENV VARS:", import.meta.env);
  const key = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  console.log(" Loaded Site Key:", key ? "Present (starts with " + key.substring(0, 4) + ")" : "MISSING");

  if (!key) {
    console.error(" Missing VITE_RECAPTCHA_SITE_KEY. Check your .env file and restart server.");
    return;
  }


  if (document.getElementById("recaptcha-script")) {
    console.log(" reCAPTCHA script already appended");
    return;
  }

  const script = document.createElement("script");
  script.id = "recaptcha-script";
  script.src = `https://www.google.com/recaptcha/api.js?render=${key}`;
  script.async = true;
  script.defer = true;

  script.onload = () => {
    console.log(" reCAPTCHA script loaded successfully");
  };

  script.onerror = (err) => {
    console.error(" Failed to load reCAPTCHA script:", err);
  };

  document.body.appendChild(script);


  return () => {
 
  };
}, []);




const handleSubmit = async (event) => {
  event.preventDefault();
  setStatus("submitting");

  console.log(" Form submit triggered");

  const formData = new FormData(event.currentTarget);
  const data = Object.fromEntries(formData.entries());

  try {
    if (!window.grecaptcha) {
      console.error(" grecaptcha not available");
      throw new Error("reCAPTCHA not loaded");
    }

    console.log(" Waiting for reCAPTCHA ready...");

    const token = await new Promise((resolve, reject) => {
      window.grecaptcha.ready(async () => {
        try {
          console.log(" reCAPTCHA ready, executing...");
          const token = await window.grecaptcha.execute(
            import.meta.env.VITE_RECAPTCHA_SITE_KEY,
            { action: "contact_form" }
          );
          resolve(token);
        } catch (err) {
          reject(err);
        }
      });
    });

   

    if (!token) {
      throw new Error("Empty reCAPTCHA token");
    }

    console.log(" Sending request to API...");

    const response = await fetch("/api/property/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        recaptchaToken: token,
      }),
    });



    if (!response.ok) {
      const err = await response.json();
      console.error(" API error:", err);
      throw new Error(err.error || "API error");
    }

    const result = await response.json();
    console.log(" API success:", result);

    setStatus("success");
  } catch (err) {
    console.error("Submission error:", err);
    setStatus("error");
    setErrorMessage(err.message || "Network error");
  }
};


  return (
    <Layout>
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
        <div className="container">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="accent-line-gold mb-8" />
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              {t("contact.hero.title")}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              {t("contact.intro")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">

            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {status === "success" ? (
                <div className="bg-[#0d1220] border border-[#2962ff]/20 p-12 text-center">
                  <CheckCircle className="mx-auto mb-6 text-[#2962ff]" size={40} />
                  <h3 className="font-serif text-2xl text-white mb-4 notranslate">
                    Message Sent
                  </h3>
                  <p className="text-white/60 notranslate">
                    Thank you. We will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-[#2962ff] hover:underline text-sm"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs uppercase text-white/50 mb-3 tracking-wider">
                        {t("contact.form.name")} *
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-white/50 mb-3 tracking-wider">
                        {t("contact.form.email")} *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs uppercase text-white/50 mb-3 tracking-wider">
                        {t("contact.form.organization")}
                      </label>
                      <input
                        name="organization"
                        type="text"
                        className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase text-white/50 mb-3 tracking-wider">
                        {t("contact.form.inquiryType")}
                      </label>
                      <select
                        name="inquiryType"
                        className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white outline-none transition-colors appearance-none cursor-pointer"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="investment">Investment</option>
                        <option value="media">Media</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-white/50 mb-3 tracking-wider">
                      {t("contact.form.message")} *
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      required
                      className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white outline-none resize-none transition-colors"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-200 text-sm">
                      {errorMessage}
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center gap-3 px-10 py-4 bg-[#2962ff] text-white font-display text-sm tracking-wider uppercase hover:bg-[#1e4fd6] transition-colors disabled:opacity-50"
                    whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "submitting" ? 1 : 0.98 }}
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="notranslate">Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="notranslate">{t("contact.form.submit")}</span>
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="accent-line-blue mb-8" />
              <h3 className="font-serif text-2xl text-white mb-8">
                {t('contact.direct.title')}
              </h3>

              <div className="space-y-6 mb-12">
                <a href="mailto:contact@sunlightholdings.sn" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#2962ff]/10 rounded-full shrink-0 group-hover:bg-[#2962ff]/20 transition-colors">
                    <Mail className="text-[#2962ff]" size={18} />
                  </div>
                  <div>
                    <p className="font-display text-xs tracking-wider uppercase text-white/50 mb-1">
                      {t('contact.direct.email')}
                    </p>
                    <p className="text-white group-hover:text-[#2962ff] transition-colors">
                      contact@sunlightholdings.sn
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#d4af37]/10 rounded-full shrink-0">
                    <MapPin className="text-[#d4af37]" size={18} />
                  </div>
                  <div>
                    <p className="font-display text-xs tracking-wider uppercase text-white/50 mb-1">
                      {t('contact.direct.location')}
                    </p>
                    <p className="text-white">
                      Dakar, Sénégal
                    </p>
                  </div>
                </div>

                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#2962ff]/10 rounded-full shrink-0 group-hover:bg-[#2962ff]/20 transition-colors">
                    <Linkedin className="text-[#2962ff]" size={18} />
                  </div>
                  <div>
                    <p className="font-display text-xs tracking-wider uppercase text-white/50 mb-1">
                      LinkedIn
                    </p>
                    <p className="text-white group-hover:text-[#2962ff] transition-colors">
                      Sunlight Holdings
                    </p>
                  </div>
                </a>
              </div>

              <div className="p-6 bg-[#0d1220] border-l-2 border-[#d4af37]">
                <p className="text-white/50 text-sm leading-relaxed">
                  {t('contact.note')}
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
