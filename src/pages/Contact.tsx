// /*
//  * Contact Page - Luminescent Noir Design
//  * 
//  * Sections:
//  * 1. Hero - Clean, minimal design
//  * 2. Inquiry Context - Brief intro
//  * 3. Contact Form - Partnership inquiry form
//  * 4. Direct Contact - Email and location
//  * 5. Note - Response time and focus areas
//  */

// import { useState } from 'react';
// import { useLanguage } from '@/contexts/LanguageContext';
// import Layout from '@/components/Layout';
// import { motion } from 'framer-motion';
// import { Send, Mail, MapPin, Linkedin, CheckCircle } from 'lucide-react';
// import { toast } from 'sonner';

// export default function Contact() {
//   const { t } = useLanguage();
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     organization: '',
//     inquiryType: '',
//     message: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Simulate form submission
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     setIsSubmitting(false);
//     setIsSubmitted(true);
//     toast.success(t('contact.form.success'));
//   };

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20">
//         <div className="container">
//           <motion.div
//             className="max-w-3xl"
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="accent-line-gold mb-8" />
//             <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6">
//               {t('contact.hero.title')}
//             </h1>
//             <p className="text-white/60 text-lg leading-relaxed">
//               {t('contact.intro')}
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Contact Form & Info */}
//       <section className="py-16 lg:py-24">
//         <div className="container">
//           <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
//             {/* Form */}
//             <motion.div
//               className="lg:col-span-2"
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8 }}
//             >
//               {isSubmitted ? (
//                 <div className="bg-[#0d1220] border border-[#2962ff]/20 p-12 text-center">
//                   <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-[#2962ff]/10 rounded-full">
//                     <CheckCircle className="text-[#2962ff]" size={32} />
//                   </div>
//                   <h3 className="font-serif text-2xl text-white mb-4">
//                     {t('contact.form.success').split('.')[0]}
//                   </h3>
//                   <p className="text-white/60">
//                     {t('contact.form.success').split('.')[1]}
//                   </p>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit} className="space-y-8">
//                   <div className="grid md:grid-cols-2 gap-8">
//                     {/* Name */}
//                     <div>
//                       <label className="block font-display text-xs tracking-wider uppercase text-white/50 mb-3">
//                         {t('contact.form.name')} *
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         required
//                         value={formData.name}
//                         onChange={handleChange}
//                         className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors"
//                       />
//                     </div>

//                     {/* Email */}
//                     <div>
//                       <label className="block font-display text-xs tracking-wider uppercase text-white/50 mb-3">
//                         {t('contact.form.email')} *
//                       </label>
//                       <input
//                         type="email"
//                         name="email"
//                         required
//                         value={formData.email}
//                         onChange={handleChange}
//                         className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid md:grid-cols-2 gap-8">
//                     {/* Organization */}
//                     <div>
//                       <label className="block font-display text-xs tracking-wider uppercase text-white/50 mb-3">
//                         {t('contact.form.organization')}
//                       </label>
//                       <input
//                         type="text"
//                         name="organization"
//                         value={formData.organization}
//                         onChange={handleChange}
//                         className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors"
//                       />
//                     </div>

//                     {/* Inquiry Type */}
//                     <div>
//                       <label className="block font-display text-xs tracking-wider uppercase text-white/50 mb-3">
//                         {t('contact.form.inquiryType')}
//                       </label>
//                       <select
//                         name="inquiryType"
//                         value={formData.inquiryType}
//                         onChange={handleChange}
//                         className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white outline-none transition-colors appearance-none cursor-pointer"
//                       >
//                         <option value="" className="bg-[#0d1220]">--</option>
//                         <option value="investment" className="bg-[#0d1220]">{t('contact.form.inquiryType.investment')}</option>
//                         <option value="jv" className="bg-[#0d1220]">{t('contact.form.inquiryType.jv')}</option>
//                         <option value="general" className="bg-[#0d1220]">{t('contact.form.inquiryType.general')}</option>
//                         <option value="media" className="bg-[#0d1220]">{t('contact.form.inquiryType.media')}</option>
//                       </select>
//                     </div>
//                   </div>

//                   {/* Message */}
//                   <div>
//                     <label className="block font-display text-xs tracking-wider uppercase text-white/50 mb-3">
//                       {t('contact.form.message')} *
//                     </label>
//                     <textarea
//                       name="message"
//                       required
//                       rows={6}
//                       value={formData.message}
//                       onChange={handleChange}
//                       className="w-full bg-[#0d1220] border border-white/10 focus:border-[#2962ff]/50 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors resize-none"
//                     />
//                   </div>

//                   {/* Submit */}
//                   <motion.button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="group inline-flex items-center gap-3 px-10 py-4 bg-[#2962ff] text-white font-display text-sm tracking-wider uppercase hover:bg-[#1e4fd6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
//                     whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
//                   >
//                     {isSubmitting ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                         {t('contact.form.submit')}...
//                       </>
//                     ) : (
//                       <>
//                         {t('contact.form.submit')}
//                         <Send size={18} className="group-hover:translate-x-1 transition-transform" />
//                       </>
//                     )}
//                   </motion.button>
//                 </form>
//               )}
//             </motion.div>

//             {/* Contact Info */}
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.8, delay: 0.2 }}
//             >
//               <div className="accent-line-blue mb-8" />
//               <h3 className="font-serif text-2xl text-white mb-8">
//                 {t('contact.direct.title')}
//               </h3>

//               <div className="space-y-6 mb-12">
//                 <a
//                   href="mailto:contact@sunlightholdings.sn"
//                   className="flex items-start gap-4 group"
//                 >
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#2962ff]/10 rounded-full shrink-0 group-hover:bg-[#2962ff]/20 transition-colors">
//                     <Mail className="text-[#2962ff]" size={18} />
//                   </div>
//                   <div>
//                     <p className="font-display text-xs tracking-wider uppercase text-white/50 mb-1">
//                       {t('contact.direct.email')}
//                     </p>
//                     <p className="text-white group-hover:text-[#2962ff] transition-colors">
//                       
//                     </p>
//                   </div>
//                 </a>

//                 <div className="flex items-start gap-4">
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#d4af37]/10 rounded-full shrink-0">
//                     <MapPin className="text-[#d4af37]" size={18} />
//                   </div>
//                   <div>
//                     <p className="font-display text-xs tracking-wider uppercase text-white/50 mb-1">
//                       {t('contact.direct.location')}
//                     </p>
//                     <p className="text-white">
//                       Dakar, Sénégal
//                     </p>
//                   </div>
//                 </div>

//                 <a
//                   href="https://linkedin.com"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-start gap-4 group"
//                 >
//                   <div className="w-10 h-10 flex items-center justify-center bg-[#2962ff]/10 rounded-full shrink-0 group-hover:bg-[#2962ff]/20 transition-colors">
//                     <Linkedin className="text-[#2962ff]" size={18} />
//                   </div>
//                   <div>
//                     <p className="font-display text-xs tracking-wider uppercase text-white/50 mb-1">
//                       LinkedIn
//                     </p>
//                     <p className="text-white group-hover:text-[#2962ff] transition-colors">
//                       Sunlight Holdings
//                     </p>
//                   </div>
//                 </a>
//               </div>

//               {/* Note */}
//               <div className="p-6 bg-[#0d1220] border-l-2 border-[#d4af37]">
//                 <p className="text-white/50 text-sm leading-relaxed">
//                   {t('contact.note')}
//                 </p>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// }


import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, CheckCircle } from "lucide-react";

export default function Contact() {
  const { t } = useLanguage();

  // Simple state to manage the form status
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // STOP the page from reloading
    console.log("1. Submit button clicked. Page reload prevented.");

    setStatus("submitting");

    // Gather data from the form
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log("2. Form Data collected:", data);

    try {
      console.log("3. Sending request to Formspree...");
      
      const response = await fetch("https://formspree.io/f/xwvvvenr", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
      });

      console.log("4. Response received. Status:", response.status);

      if (response.ok) {
        setStatus("success");
        console.log("5. Success! Message sent.");
      } else {
        const errorData = await response.json();
        console.error("5. Formspree Error:", errorData);
        setStatus("error");
        setErrorMessage(errorData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("5. Network Error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  return (
    <Layout>
      {/* Hero Section (Unchanged) */}
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

      {/* Contact Form & Info */}
      <section className="py-16 lg:py-24">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-16 lg:gap-24">
            
            {/* Form Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {status === "success" ? (
                // Success Message
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
                // The Form
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Name */}
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

                    {/* Email */}
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
                    {/* Organization */}
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

                    {/* Inquiry Type */}
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

                  {/* Message */}
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

                  {/* Error Message Display */}
                  {status === "error" && (
                    <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-200 text-sm">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
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

            {/* Contact Info (Right Sidebar) - Kept exactly as it was */}
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
    </Layout>
  );
}
