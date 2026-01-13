/*
 * Virtual Tour Component - Immersive Room-by-Room Experience
 * 
 * Features:
 * - Full-screen immersive photo viewer
 * - Room-by-room navigation with smooth transitions
 * - Interactive hotspots to move between spaces
 * - Mini-map/floor plan navigation
 * - Ken Burns effect for cinematic feel
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, Home, Maximize2, 
  Grid3X3, MapPin, Eye, ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Room {
  id: string;
  name: { fr: string; en: string };
  images: string[];
  description: { fr: string; en: string };
  connections: string[]; // IDs of connected rooms
  position: { x: number; y: number }; // Position on floor plan
}

const rooms: Room[] = [
  {
    id: 'entrance',
    name: { fr: 'Entrée', en: 'Entrance' },
    images: ['/images/hallway-art.jpg', '/images/hallway-blue.jpg'],
    description: {
      fr: 'Hall d\'entrée avec éclairage ambiant bleu et art africain',
      en: 'Entrance hall with blue ambient lighting and African art'
    },
    connections: ['living', 'bedroom1'],
    position: { x: 50, y: 15 }
  },
  {
    id: 'living',
    name: { fr: 'Salon', en: 'Living Room' },
    images: [
      '/images/living-tv-sofa.jpg',
      '/images/living-room-blue-dark.jpg',
      '/images/tv-wall-bright.jpg',
      '/images/living-room-alternate.jpg',
      '/images/living-room-plant.jpg'
    ],
    description: {
      fr: 'Espace de vie avec mur média personnalisé et éclairage ambiant',
      en: 'Living space with custom media wall and ambient lighting'
    },
    connections: ['entrance', 'dining', 'kitchen'],
    position: { x: 30, y: 40 }
  },
  {
    id: 'dining',
    name: { fr: 'Salle à Manger', en: 'Dining Room' },
    images: ['/images/dining-niches.jpg', '/images/circular-art-niches.jpg'],
    description: {
      fr: 'Salle à manger avec niches illuminées et art contemporain',
      en: 'Dining area with illuminated niches and contemporary art'
    },
    connections: ['living', 'kitchen'],
    position: { x: 50, y: 50 }
  },
  {
    id: 'kitchen',
    name: { fr: 'Cuisine', en: 'Kitchen' },
    images: ['/images/kitchen-niches-wide.jpg', '/images/kitchen.jpg'],
    description: {
      fr: 'Cuisine ouverte avec îlot en marbre et niches LED bleues',
      en: 'Open kitchen with marble island and blue LED niches'
    },
    connections: ['living', 'dining'],
    position: { x: 70, y: 40 }
  },
  {
    id: 'bedroom1',
    name: { fr: 'Chambre Principale', en: 'Master Bedroom' },
    images: [
      '/images/bedroom-niches-1.jpg',
      '/images/bedroom-niches-2.jpg',
      '/images/bedroom-niches-3.jpg',
      '/images/bedroom-full-view.jpg'
    ],
    description: {
      fr: 'Chambre principale avec niches d\'exposition illuminées',
      en: 'Master bedroom with illuminated display niches'
    },
    connections: ['entrance', 'bedroom2', 'bathroom1', 'closet'],
    position: { x: 25, y: 75 }
  },
  {
    id: 'bedroom2',
    name: { fr: 'Suite', en: 'Suite' },
    images: [
      '/images/bedroom-blue-wave.jpg',
      '/images/bedroom-arch-view.jpg',
      '/images/bedroom-closet.jpg',
      '/images/bedroom-detail.jpg'
    ],
    description: {
      fr: 'Suite avec tête de lit sculpturale et éclairage LED',
      en: 'Suite with sculptural headboard and LED lighting'
    },
    connections: ['bedroom1', 'bathroom2'],
    position: { x: 50, y: 85 }
  },
  {
    id: 'bathroom1',
    name: { fr: 'Salle de Bain Principale', en: 'Master Bathroom' },
    images: [
      '/images/bathroom-1.jpg',
      '/images/bathroom-2.jpg',
      '/images/bathroom-3.jpg'
    ],
    description: {
      fr: 'Salle de bain en marbre avec douche à l\'italienne',
      en: 'Marble bathroom with walk-in rain shower'
    },
    connections: ['bedroom1'],
    position: { x: 15, y: 85 }
  },
  {
    id: 'bathroom2',
    name: { fr: 'Salle de Bain Suite', en: 'Suite Bathroom' },
    images: [
      '/images/bathroom-4.jpg',
      '/images/bathroom-5.jpg',
      '/images/bathroom-6.jpg',
      '/images/bathroom-7.jpg',
      '/images/bathroom-8.jpg',
      '/images/bathroom-9.jpg'
    ],
    description: {
      fr: 'Salle de bain moderne avec finitions premium',
      en: 'Modern bathroom with premium finishes'
    },
    connections: ['bedroom2'],
    position: { x: 75, y: 85 }
  },
  {
    id: 'closet',
    name: { fr: 'Dressing', en: 'Walk-in Closet' },
    images: ['/images/closet-glass.jpg'],
    description: {
      fr: 'Dressing avec portes vitrées et éclairage intégré',
      en: 'Walk-in closet with glass doors and integrated lighting'
    },
    connections: ['bedroom1'],
    position: { x: 35, y: 65 }
  }
];

interface VirtualTourProps {
  isOpen: boolean;
  onClose: () => void;
  startRoom?: string;
}

export default function VirtualTour({ isOpen, onClose, startRoom = 'entrance' }: VirtualTourProps) {
  const { language } = useLanguage();
  const [currentRoomId, setCurrentRoomId] = useState(startRoom);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  const currentRoom = rooms.find(r => r.id === currentRoomId) || rooms[0];
  const connectedRooms = rooms.filter(r => currentRoom.connections.includes(r.id));

  // Reset image index when room changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentRoomId]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'm') setShowFloorPlan(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const nextImage = useCallback(() => {
    setCurrentImageIndex(prev => 
      prev < currentRoom.images.length - 1 ? prev + 1 : prev
    );
  }, [currentRoom.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : prev);
  }, []);

  const navigateToRoom = useCallback((roomId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentRoomId(roomId);
      setIsTransitioning(false);
    }, 500);
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#0a0f1a]"
      >
        {/* Main Image Display */}
        <div className="relative w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentRoomId}-${currentImageIndex}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: isTransitioning ? 0 : 1, 
                scale: 1,
                transition: { duration: 0.8 }
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0"
            >
              <img
                src={currentRoom.images[currentImageIndex]}
                alt={currentRoom.name[language]}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a]/80 via-transparent to-[#0a0f1a]/40" />
            </motion.div>
          </AnimatePresence>

          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between z-20">
            <div className="flex items-center gap-4">
              <motion.button
                onClick={onClose}
                className="p-3 bg-[#0a0f1a]/60 backdrop-blur-sm border border-white/10 text-white hover:bg-[#0a0f1a]/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={20} />
              </motion.button>
              <div>
                <h2 className="font-serif text-2xl text-white">
                  {currentRoom.name[language]}
                </h2>
                <p className="text-white/60 text-sm">
                  {currentRoom.description[language]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                onClick={() => setShowThumbnails(!showThumbnails)}
                className={`p-3 backdrop-blur-sm border transition-colors ${
                  showThumbnails 
                    ? 'bg-[#2962ff]/20 border-[#2962ff]/50 text-[#2962ff]' 
                    : 'bg-[#0a0f1a]/60 border-white/10 text-white hover:bg-[#0a0f1a]/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 size={20} />
              </motion.button>
              <motion.button
                onClick={() => setShowFloorPlan(!showFloorPlan)}
                className={`p-3 backdrop-blur-sm border transition-colors ${
                  showFloorPlan 
                    ? 'bg-[#2962ff]/20 border-[#2962ff]/50 text-[#2962ff]' 
                    : 'bg-[#0a0f1a]/60 border-white/10 text-white hover:bg-[#0a0f1a]/80'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MapPin size={20} />
              </motion.button>
            </div>
          </div>

          {/* Image Navigation Arrows */}
          {currentRoom.images.length > 1 && (
            <>
              <motion.button
                onClick={prevImage}
                className={`absolute left-6 top-1/2 -translate-y-1/2 p-4 bg-[#0a0f1a]/60 backdrop-blur-sm border border-white/10 text-white transition-all z-20 ${
                  currentImageIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#0a0f1a]/80'
                }`}
                whileHover={currentImageIndex > 0 ? { scale: 1.1 } : {}}
                whileTap={currentImageIndex > 0 ? { scale: 0.95 } : {}}
                disabled={currentImageIndex === 0}
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                onClick={nextImage}
                className={`absolute right-6 top-1/2 -translate-y-1/2 p-4 bg-[#0a0f1a]/60 backdrop-blur-sm border border-white/10 text-white transition-all z-20 ${
                  currentImageIndex === currentRoom.images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#0a0f1a]/80'
                }`}
                whileHover={currentImageIndex < currentRoom.images.length - 1 ? { scale: 1.1 } : {}}
                whileTap={currentImageIndex < currentRoom.images.length - 1 ? { scale: 0.95 } : {}}
                disabled={currentImageIndex === currentRoom.images.length - 1}
              >
                <ChevronRight size={24} />
              </motion.button>
            </>
          )}

          {/* Image Counter */}
          {currentRoom.images.length > 1 && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#0a0f1a]/60 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-display tracking-wider z-20">
              {currentImageIndex + 1} / {currentRoom.images.length}
            </div>
          )}

          {/* Room Navigation Hotspots */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            {connectedRooms.map((room) => (
              <motion.button
                key={room.id}
                onClick={() => navigateToRoom(room.id)}
                className="group flex items-center gap-3 px-6 py-3 bg-[#0a0f1a]/70 backdrop-blur-sm border border-[#2962ff]/30 hover:border-[#2962ff] transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={18} className="text-[#2962ff]" />
                <span className="text-white font-display text-sm tracking-wider uppercase">
                  {room.name[language]}
                </span>
                <ArrowRight size={16} className="text-white/50 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            {/* Room Thumbnails */}
            <AnimatePresence>
              {showThumbnails && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mb-6 flex justify-center gap-2 overflow-x-auto pb-2"
                >
                  {currentRoom.images.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-14 overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex 
                          ? 'border-[#2962ff]' 
                          : 'border-transparent hover:border-white/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Room Navigation Pills */}
            <div className="flex justify-center gap-2">
              {rooms.map((room) => (
                <motion.button
                  key={room.id}
                  onClick={() => navigateToRoom(room.id)}
                  className={`px-4 py-2 text-xs font-display tracking-wider uppercase transition-all ${
                    room.id === currentRoomId
                      ? 'bg-[#2962ff] text-white'
                      : 'bg-[#0a0f1a]/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {room.name[language]}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Floor Plan Overlay */}
          <AnimatePresence>
            {showFloorPlan && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-24 right-6 w-80 bg-[#0a0f1a]/90 backdrop-blur-md border border-[#2962ff]/20 p-4 z-30"
              >
                <h3 className="font-serif text-lg text-white mb-4 flex items-center gap-2">
                  <Home size={18} className="text-[#2962ff]" />
                  {language === 'fr' ? 'Plan de l\'appartement' : 'Floor Plan'}
                </h3>
                
                {/* Simplified Floor Plan */}
                <div className="relative aspect-[4/3] bg-[#0d1220] border border-[#2962ff]/10">
                  {/* Room markers */}
                  {rooms.map((room) => (
                    <motion.button
                      key={room.id}
                      onClick={() => navigateToRoom(room.id)}
                      className={`absolute w-4 h-4 rounded-full transition-all ${
                        room.id === currentRoomId
                          ? 'bg-[#2962ff] ring-4 ring-[#2962ff]/30'
                          : 'bg-[#d4af37]/60 hover:bg-[#d4af37]'
                      }`}
                      style={{
                        left: `${room.position.x}%`,
                        top: `${room.position.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      whileHover={{ scale: 1.3 }}
                      title={room.name[language]}
                    />
                  ))}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {rooms.map((room) =>
                      room.connections.map((connId) => {
                        const connRoom = rooms.find(r => r.id === connId);
                        if (!connRoom || room.id > connId) return null;
                        return (
                          <line
                            key={`${room.id}-${connId}`}
                            x1={`${room.position.x}%`}
                            y1={`${room.position.y}%`}
                            x2={`${connRoom.position.x}%`}
                            y2={`${connRoom.position.y}%`}
                            stroke="rgba(41, 98, 255, 0.3)"
                            strokeWidth="1"
                          />
                        );
                      })
                    )}
                  </svg>
                </div>

                {/* Legend */}
                <div className="mt-4 flex items-center gap-4 text-xs text-white/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#2962ff]" />
                    <span>{language === 'fr' ? 'Position actuelle' : 'Current position'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#d4af37]/60" />
                    <span>{language === 'fr' ? 'Autres pièces' : 'Other rooms'}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
