// // import { useEffect, useState } from 'react';
// // import Layout from '@/components/Layout';
// // import { Link } from 'wouter';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import {
// //   ArrowLeft,
// //   ArrowRight,
// //   X,
// //   MapPin,
// //   ChevronLeft,
// //   ChevronRight,
// //   Play,
// //   Eye
// // } from 'lucide-react';
// // import VirtualTour from '@/components/VirtualTour';

// // type PropertyImage = {
// //   imageId: number;
// //   url: string;
// //   name: string;
// //   mappingPoints: any[];
// // };

// // type Property = {
// //   Id: string;
// //   projectName: string;
// //   location: string;
// //   name: string | null;
// //   price: number;
// //   thumbImage: string;
// //   description: string;
// //   images: PropertyImage[];
// // };

// // export default function PlatinumEdge() {
// //   const [property, setProperty] = useState<Property | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [lightboxOpen, setLightboxOpen] = useState(false);
// //   const [currentImageIndex, setCurrentImageIndex] = useState(0);
// //   const [virtualTourOpen, setVirtualTourOpen] = useState(false);

// //   const params = new URLSearchParams(window.location.search);
// //   const propertyId = params.get('id');
// //     const closeLightbox = () => {
// //     setLightboxOpen(false);
// //   };
// //    const nextImage = () => {
// //     setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
// //   };

// //   const prevImage = () => {
// //     setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
// //   };


// //   useEffect(() => {
// //     if (!propertyId) return;

// //     fetch(`http://localhost:3000/api/property/Id?Id=${propertyId}`)
// //       .then(res => res.json())
// //       .then(data => {
// //         console.log("Fetch Property Response:", data);
// //         setProperty(data);
// //         setLoading(false);
// //       })
// //       .catch(err => {
// //         console.error(err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) {
// //     return (
// //       <Layout>
// //         <div className="h-screen flex items-center justify-center text-white">
// //           Loading property...
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   if (!property) {
// //     return (
// //       <Layout>
// //         <div className="h-screen flex items-center justify-center text-red-500">
// //           Property not found
// //         </div>
// //       </Layout>
// //     );
// //   }

// //   const galleryImages = property.images.map(img => ({
// //     src: img.url,
// //     alt: img.name
// //   }));

// //   const openLightbox = (index: number) => {
// //     setCurrentImageIndex(index);
// //     setLightboxOpen(true);
// //   };

// //   return (
// //     <Layout>
// //       {/* Hero Section */}
// //       <section className="relative h-[70vh] min-h-[600px] flex items-end overflow-hidden">
// //         <div className="absolute inset-0">
// //           <img
// //             src={property.thumbImage}
// //             alt={property.projectName}
// //             className="w-full h-full object-cover"
// //           />
// //           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent" />
// //         </div>

// //         <div className="relative z-10 container pb-16">
// //           <motion.div
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.8 }}
// //           >
// //             <Link href="/portfolio">
// //               <span className="inline-flex items-center gap-2 text-white/60 hover:text-white font-display text-sm tracking-wider uppercase mb-8 transition-colors">
// //                 <ArrowLeft size={16} />
// //                 Portfolio
// //               </span>
// //             </Link>

// //             <div className="flex items-center gap-2 text-[#2962ff] mb-4">
// //               <MapPin size={18} />
// //               <span className="font-display text-sm tracking-widest uppercase">
// //                 {property.location}
// //               </span>
// //             </div>

// //             <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8">
// //               {property.projectName}
// //             </h1>

// //             <motion.button
// //               onClick={() => setVirtualTourOpen(true)}
// //               className="group inline-flex items-center gap-3 px-8 py-4 bg-[#2962ff]/20 backdrop-blur-sm border border-[#2962ff]/50 text-white font-display text-sm tracking-wider uppercase hover:bg-[#2962ff]/30 hover:border-[#2962ff] transition-all"
// //               whileHover={{ scale: 1.02 }}
// //               whileTap={{ scale: 0.98 }}
// //             >
// //               <Eye size={20} className="text-[#2962ff]" />
// //               Virtual Tour
// //               <Play size={16} className="text-[#d4af37] group-hover:translate-x-1 transition-transform" />
// //             </motion.button>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Overview */}
// //       <section className="py-24 lg:py-32">
// //         <div className="container max-w-4xl">
// //           <motion.div
// //             initial={{ opacity: 0, y: 40 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.8 }}
// //           >
// //             <div className="accent-line-gold mb-8" />
// //             <p className="text-white/80 text-xl leading-relaxed mb-8">
// //               {property.description}
// //             </p>
// //             <p className="text-white/60 text-lg leading-relaxed">
// //               Starting from ${property.price.toLocaleString()}
// //             </p>
// //           </motion.div>
// //         </div>
// //       </section>

// //       {/* Photo Gallery */}
// //       <section className="py-16 lg:py-24 bg-[#050810]">
// //         <div className="container">
// //           <motion.div
// //             className="mb-12"
// //             initial={{ opacity: 0, y: 30 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             viewport={{ once: true }}
// //             transition={{ duration: 0.8 }}
// //           >
// //             <div className="accent-line-blue mb-8" />
// //             <h2 className="font-serif text-3xl md:text-4xl text-white">
// //               Gallery
// //             </h2>
// //           </motion.div>

// //           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
// //             {galleryImages.map((image, index) => (
// //               <motion.div
// //                 key={index}
// //                 className="relative aspect-square overflow-hidden cursor-pointer group"
// //                 initial={{ opacity: 0, y: 20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 viewport={{ once: true }}
// //                 transition={{ duration: 0.5, delay: index * 0.05 }}
// //                 onClick={() => openLightbox(index)}
// //               >
// //                 <img
// //                   src={image.src}
// //                   alt={image.alt}
// //                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
// //                 />
// //                 <div className="absolute inset-0 bg-[#0a0f1a]/0 group-hover:bg-[#0a0f1a]/40 transition-colors duration-300" />
// //                 <div className="absolute inset-0 border border-[#2962ff]/0 group-hover:border-[#2962ff]/50 transition-colors duration-300" />
// //               </motion.div>
// //             ))}
// //           </div>
// //         </div>
// //       </section>

// //       {/* Lightbox */}
// //       <AnimatePresence>
// //         {lightboxOpen && (
// //           <motion.div
// //             className="fixed inset-0 z-50 bg-[#0a0f1a]/98 flex items-center justify-center"
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //           >
// //             <button
// //               onClick={closeLightbox}
// //               className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"
// //             >
// //               <X size={32} />
// //             </button>

// //             <button
// //               onClick={prevImage}
// //               className="absolute left-6 text-white/60 hover:text-white"
// //             >
// //               <ChevronLeft size={40} />
// //             </button>

// //             <button
// //               onClick={nextImage}
// //               className="absolute right-6 text-white/60 hover:text-white"
// //             >
// //               <ChevronRight size={40} />
// //             </button>

// //             <motion.img
// //               key={currentImageIndex}
// //               src={galleryImages[currentImageIndex]?.src}
// //               alt=""
// //               className="max-h-[80vh] object-contain"
// //               initial={{ opacity: 0, scale: 0.95 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               exit={{ opacity: 0, scale: 0.95 }}
// //             />
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <VirtualTour
// //         isOpen={virtualTourOpen}
// //         onClose={() => setVirtualTourOpen(false)}
// //        rooms={property.images}
// //       />
// //     </Layout>
// //   );
// // }
// import { useEffect, useState } from "react";
// import Layout from "@/components/Layout";
// import { Link } from "wouter";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, X, MapPin, ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
// import VirtualTour from "@/components/VirtualTour";

// type RoomImage = {
//   imageID: number;
//   url: string;
// };

// type RoomConnection = {
//   connectionID: number;
//   from: number;
//   to: number;
// };

// type Room = {
//   roomId: number;
//   roomName: string;
//   description: string;
//   mapX: number;
//   mapY: number;
//   images: RoomImage[];
//   connections: RoomConnection[];
// };

// type Property = {
//   Id: number;
//   projectName: string;
//   location: string;
//   description: string;
//   thumbImage: string;
//   price: string | number;
//   rooms: Room[];
// };

// export default function PlatinumEdge() {
//   const [property, setProperty] = useState<Property | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [virtualTourOpen, setVirtualTourOpen] = useState(false);
//   const [galleryImages, setGalleryImages] = useState<RoomImage[]>([]);

//   const params = new URLSearchParams(window.location.search);
//   const propertyId = params.get("id");

//   const closeLightbox = () => setLightboxOpen(false);
//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

//   useEffect(() => {
//     if (!propertyId) return;

//     fetch(`http://localhost:3000/api/property/Id?Id=${propertyId}`)
//       .then((res) => res.json())
//       .then((data: Property) => {
//         setProperty(data);
      
//         const allImages: RoomImage[] = data.rooms.flatMap((room) => room.images);
//         setGalleryImages(allImages);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <Layout>
//         <div className="h-screen flex items-center justify-center text-white">Loading property...</div>
//       </Layout>
//     );
//   }

//   if (!property) {
//     return (
//       <Layout>
//         <div className="h-screen flex items-center justify-center text-red-500">Property not found</div>
//       </Layout>
//     );
//   }

//   const openLightbox = (index: number) => {
//     setCurrentImageIndex(index);
//     setLightboxOpen(true);
//   };

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <section className="relative h-[70vh] min-h-[600px] flex items-end overflow-hidden">
//         <div className="absolute inset-0">
//           <img src={property.thumbImage} alt={property.projectName} className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent" />
//         </div>

//         <div className="relative z-10 container pb-16">
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//             <Link href="/portfolio">
//               <span className="inline-flex items-center gap-2 text-white/60 hover:text-white font-display text-sm tracking-wider uppercase mb-8 transition-colors">
//                 <ArrowLeft size={16} />
//                 Portfolio
//               </span>
//             </Link>

//             <div className="flex items-center gap-2 text-[#2962ff] mb-4">
//               <MapPin size={18} />
//               <span className="font-display text-sm tracking-widest uppercase">{property.location}</span>
//             </div>

//             <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8">{property.projectName}</h1>

//             <motion.button
//               onClick={() => setVirtualTourOpen(true)}
//               className="group inline-flex items-center gap-3 px-8 py-4 bg-[#2962ff]/20 backdrop-blur-sm border border-[#2962ff]/50 text-white font-display text-sm tracking-wider uppercase hover:bg-[#2962ff]/30 hover:border-[#2962ff] transition-all"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <Eye size={20} className="text-[#2962ff]" />
//               Virtual Tour
//               <Play size={16} className="text-[#d4af37] group-hover:translate-x-1 transition-transform" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Overview */}
//       <section className="py-24 lg:py-32">
//         <div className="container max-w-4xl">
//           <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
//             <div className="accent-line-gold mb-8" />
//             <p className="text-white/80 text-xl leading-relaxed mb-8">{property.description}</p>
//             <p className="text-white/60 text-lg leading-relaxed">Starting from ${Number(property.price).toLocaleString()}</p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Rooms Gallery */}
//    {/* Photo Gallery */}
// <section className="py-16 lg:py-24 bg-[#050810]">
//   <div className="container">
//     <motion.div
//       className="mb-12"
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ duration: 0.8 }}
//     >
//       <div className="accent-line-blue mb-8" />
//       <h2 className="font-serif text-3xl md:text-4xl text-white">Gallery</h2>
//     </motion.div>

//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//       {galleryImages.map((image, index) => (
//         <motion.div
//           key={index}
//           className="relative aspect-square overflow-hidden cursor-pointer group"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5, delay: index * 0.05 }}
//           onClick={() => openLightbox(index)}
//         >
//           <img
//             src={image.url}
//             alt=""
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//           <div className="absolute inset-0 bg-[#0a0f1a]/0 group-hover:bg-[#0a0f1a]/40 transition-colors duration-300" />
//           <div className="absolute inset-0 border border-[#2962ff]/0 group-hover:border-[#2962ff]/50 transition-colors duration-300" />
//         </motion.div>
//       ))}
//     </div>
//   </div>
// </section>


//       <VirtualTour isOpen={virtualTourOpen} onClose={() => setVirtualTourOpen(false)} rooms={property.rooms} />
//     </Layout>
//   );
// }
// import { useEffect, useState } from "react";
// import Layout from "@/components/Layout";
// import { Link } from "wouter";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowLeft, X, MapPin, ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
// import VirtualTour from "@/components/VirtualTour";
// import { useLanguage } from "@/contexts/LanguageContext"; // 1. Import Language Context

// type RoomImage = {
//   imageID: number;
//   url: string;
// };

// type RoomConnection = {
//   connectionID: number;
//   from: number;
//   to: number;
// };

// type Room = {
//   roomId: number;
//   roomName: any; // Can be string or object
//   description: any;
//   mapX: number;
//   mapY: number;
//   images: RoomImage[];
//   connections: RoomConnection[];
// };

// type Property = {
//   Id: number;
//   projectName: any; // Changed to any to handle {en:..., fr:...} object
//   location: any;
//   description: any;
//   thumbImage: string;
//   price: string | number;
//   rooms: Room[];
// };

// export default function PlatinumEdge() {
//   const { language } = useLanguage(); // 2. Get current language
//   const [property, setProperty] = useState<Property | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [lightboxOpen, setLightboxOpen] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [virtualTourOpen, setVirtualTourOpen] = useState(false);
//   const [galleryImages, setGalleryImages] = useState<RoomImage[]>([]);

//   const params = new URLSearchParams(window.location.search);
//   const propertyId = params.get("id");

//   // 3. Helper to extract text based on language
//   const getLocalized = (content: any) => {
//     if (typeof content === "object" && content !== null) {
//       return content[language] || content["en"] || "";
//     }
//     // If it's a JSON string, try to parse it
//     if (typeof content === "string" && (content.startsWith("{") || content.startsWith("["))) {
//       try {
//         const parsed = JSON.parse(content);
//         return parsed[language] || parsed["en"] || content;
//       } catch (e) {
//         return content;
//       }
//     }
//     return content;
//   };

//   const closeLightbox = () => setLightboxOpen(false);
//   const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
//   const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

//   useEffect(() => {
//     if (!propertyId) return;

//     fetch(`http://localhost:3000/api/property/Id?Id=${propertyId}`)
//       .then((res) => res.json())
//       .then((data: Property) => {
//         // If the DB driver didn't auto-parse JSON columns, we might need to parse here.
//         // But usually mysql2 handles JSON types automatically. 
//         console.log("Property Data:", data); 
//         setProperty(data);
        
//         const allImages: RoomImage[] = data.rooms.flatMap((room) => room.images);
//         setGalleryImages(allImages);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, [propertyId]);

//   if (loading) {
//     return (
//       <Layout>
//         <div className="h-screen flex items-center justify-center text-white">Loading property...</div>
//       </Layout>
//     );
//   }

//   if (!property) {
//     return (
//       <Layout>
//         <div className="h-screen flex items-center justify-center text-red-500">Property not found</div>
//       </Layout>
//     );
//   }

//   const openLightbox = (index: number) => {
//     setCurrentImageIndex(index);
//     setLightboxOpen(true);
//   };

//   return (
//     <Layout>
//       {/* Hero Section */}
//       <section className="relative h-[70vh] min-h-[600px] flex items-end overflow-hidden">
//         <div className="absolute inset-0">
//           <img src={property.thumbImage} alt={getLocalized(property.projectName)} className="w-full h-full object-cover" />
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent" />
//         </div>

//         <div className="relative z-10 container pb-16">
//           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
//             <Link href="/portfolio">
//               <span className="inline-flex items-center gap-2 text-white/60 hover:text-white font-display text-sm tracking-wider uppercase mb-8 transition-colors">
//                 <ArrowLeft size={16} />
//                 Portfolio
//               </span>
//             </Link>

//             <div className="flex items-center gap-2 text-[#2962ff] mb-4">
//               <MapPin size={18} />
//               {/* 4. Use getLocalized for Location */}
//               <span className="font-display text-sm tracking-widest uppercase">
//                 {getLocalized(property.location)}
//               </span>
//             </div>

//             {/* 5. Use getLocalized for Project Name */}
//             <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8">
//               {getLocalized(property.projectName)}
//             </h1>

//             <motion.button
//               onClick={() => setVirtualTourOpen(true)}
//               className="group inline-flex items-center gap-3 px-8 py-4 bg-[#2962ff]/20 backdrop-blur-sm border border-[#2962ff]/50 text-white font-display text-sm tracking-wider uppercase hover:bg-[#2962ff]/30 hover:border-[#2962ff] transition-all"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//             >
//               <Eye size={20} className="text-[#2962ff]" />
//               Virtual Tour
//               <Play size={16} className="text-[#d4af37] group-hover:translate-x-1 transition-transform" />
//             </motion.button>
//           </motion.div>
//         </div>
//       </section>

//       {/* Overview */}
//       <section className="py-24 lg:py-32">
//         <div className="container max-w-4xl">
//           <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
//             <div className="accent-line-gold mb-8" />
//             {/* 6. Use getLocalized for Description */}
//             <p className="text-white/80 text-xl leading-relaxed mb-8">
//               {getLocalized(property.description)}
//             </p>
//             <p className="text-white/60 text-lg leading-relaxed">Starting from ${Number(property.price).toLocaleString()}</p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Photo Gallery */}
//       <section className="py-16 lg:py-24 bg-[#050810]">
//         <div className="container">
//           <motion.div
//             className="mb-12"
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8 }}
//           >
//             <div className="accent-line-blue mb-8" />
//             <h2 className="font-serif text-3xl md:text-4xl text-white">Gallery</h2>
//           </motion.div>

//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {galleryImages.map((image, index) => (
//               <motion.div
//                 key={index}
//                 className="relative aspect-square overflow-hidden cursor-pointer group"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: index * 0.05 }}
//                 onClick={() => openLightbox(index)}
//               >
//                 <img
//                   src={image.url}
//                   alt=""
//                   className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-[#0a0f1a]/0 group-hover:bg-[#0a0f1a]/40 transition-colors duration-300" />
//                 <div className="absolute inset-0 border border-[#2962ff]/0 group-hover:border-[#2962ff]/50 transition-colors duration-300" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightboxOpen && (
//           <motion.div
//             className="fixed inset-0 z-50 bg-[#0a0f1a]/98 flex items-center justify-center"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <button
//               onClick={closeLightbox}
//               className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"
//             >
//               <X size={32} />
//             </button>

//             <button
//               onClick={prevImage}
//               className="absolute left-6 text-white/60 hover:text-white"
//             >
//               <ChevronLeft size={40} />
//             </button>

//             <button
//               onClick={nextImage}
//               className="absolute right-6 text-white/60 hover:text-white"
//             >
//               <ChevronRight size={40} />
//             </button>

//             <motion.img
//               key={currentImageIndex}
//               src={galleryImages[currentImageIndex]?.url}
//               alt=""
//               className="max-h-[80vh] object-contain"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <VirtualTour isOpen={virtualTourOpen} onClose={() => setVirtualTourOpen(false)} rooms={property.rooms} />
//     </Layout>
//   );
// }



import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, X, MapPin, ChevronLeft, ChevronRight, Play, Eye } from "lucide-react";
import VirtualTour from "@/components/VirtualTour";
import { useLanguage } from "@/contexts/LanguageContext";

type RoomImage = {
  imageID: number;
  url: string;
};

type RoomConnection = {
  connectionID: number;
  from: number;
  to: number;
};

type Room = {
  roomId: number;
  roomName: any;
  description: any;
  mapX: number;
  mapY: number;
  images: RoomImage[];
  connections: RoomConnection[];
};

type Property = {
  Id: number;
  projectName: any;
  location: any;
  description: any;
  thumbImage: string;
  price: any; // 1️⃣ CHANGED: Fixed type to accept object or string
  rooms: Room[];
};

export default function PlatinumEdge() {
  const { language } = useLanguage();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [virtualTourOpen, setVirtualTourOpen] = useState(false);
  const [galleryImages, setGalleryImages] = useState<RoomImage[]>([]);

  const params = new URLSearchParams(window.location.search);
  const propertyId = params.get("id");

  const getLocalized = (content: any) => {
    if (typeof content === "object" && content !== null) {
      return content[language] || content["en"] || "";
    }
    if (typeof content === "string" && (content.startsWith("{") || content.startsWith("["))) {
      try {
        const parsed = JSON.parse(content);
        return parsed[language] || parsed["en"] || content;
      } catch (e) {
        return content;
      }
    }
    return content;
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);

  useEffect(() => {
    if (!propertyId) return;

    fetch(`http://localhost:3000/api/property/Id?Id=${propertyId}`)
      .then((res) => res.json())
      .then((data: Property) => {
        console.log("Property Data:", data); 
        setProperty(data);
        
        const allImages: RoomImage[] = data.rooms.flatMap((room) => room.images);
        setGalleryImages(allImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [propertyId]);

  if (loading) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center text-white">Loading property...</div>
      </Layout>
    );
  }

  if (!property) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center text-red-500">Property not found</div>
      </Layout>
    );
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={property.thumbImage} alt={getLocalized(property.projectName)} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-[#0a0f1a]/40 to-transparent" />
        </div>

        <div className="relative z-10 container pb-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/portfolio">
              <span className="inline-flex items-center gap-2 text-white/60 hover:text-white font-display text-sm tracking-wider uppercase mb-8 transition-colors">
                <ArrowLeft size={16} />
                Portfolio
              </span>
            </Link>

            <div className="flex items-center gap-2 text-[#2962ff] mb-4">
              <MapPin size={18} />
              <span className="font-display text-sm tracking-widest uppercase">
                {getLocalized(property.location)}
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-8">
              {getLocalized(property.projectName)}
            </h1>

            <motion.button
              onClick={() => setVirtualTourOpen(true)}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-[#2962ff]/20 backdrop-blur-sm border border-[#2962ff]/50 text-white font-display text-sm tracking-wider uppercase hover:bg-[#2962ff]/30 hover:border-[#2962ff] transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye size={20} className="text-[#2962ff]" />
              Virtual Tour
              <Play size={16} className="text-[#d4af37] group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-24 lg:py-32">
        <div className="container max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="accent-line-gold mb-8" />
            <p className="text-white/80 text-xl leading-relaxed mb-8">
              {getLocalized(property.description)}
            </p>
            {/* 2️⃣ CHANGED: Use getLocalized instead of Number/toLocaleString */}
            <p className="text-white/60 text-lg leading-relaxed">
              {getLocalized(property.price)}
            </p>
          </motion.div>
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
            <h2 className="font-serif text-3xl md:text-4xl text-white">Gallery</h2>
          </motion.div>

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
                  src={image.url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[#0a0f1a]/0 group-hover:bg-[#0a0f1a]/40 transition-colors duration-300" />
                <div className="absolute inset-0 border border-[#2962ff]/0 group-hover:border-[#2962ff]/50 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
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
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white"
            >
              <X size={32} />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-6 text-white/60 hover:text-white"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-6 text-white/60 hover:text-white"
            >
              <ChevronRight size={40} />
            </button>

            <motion.img
              key={currentImageIndex}
              src={galleryImages[currentImageIndex]?.url}
              alt=""
              className="max-h-[80vh] object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3️⃣ CHANGED: Pass price prop to VirtualTour */}
      <VirtualTour 
        isOpen={virtualTourOpen} 
        onClose={() => setVirtualTourOpen(false)} 
        rooms={property.rooms} 
        price={property.price}
      />
    </Layout>
  );
}