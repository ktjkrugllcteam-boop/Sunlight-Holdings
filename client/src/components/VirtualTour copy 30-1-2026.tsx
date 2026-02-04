/*
 * Virtual Tour Component - Dynamic Version
 * Supports new JSON structure with auto-scaling map
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, Home, 
  Grid3X3, MapPin, Eye, ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface APIImage {
  imageID: number;
  url: string;
}

interface APIConnection {
  connectionID: number;
  from: number;
  to: number;
}

interface APIRoom {
  roomId: number;
  roomName: string;
  description: string;
  mapX: number;
  mapY: number;
  images: APIImage[];
  connections: APIConnection[];
}

interface VirtualTourProps {
  isOpen: boolean;
  onClose: () => void;
  startRoomId?: number;
  rooms: APIRoom[];
}

export default function VirtualTour({ 
  isOpen, 
  onClose, 
  startRoomId = 1, 
  rooms = [] // Default to empty array to prevent crashes if undefined
}: VirtualTourProps) {
  const { language } = useLanguage();
  const [currentRoomId, setCurrentRoomId] = useState<number>(startRoomId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFloorPlan, setShowFloorPlan] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  // Safe fallback if rooms is empty
  const currentRoom = useMemo(() => {
    if (!rooms || rooms.length === 0) return undefined;
    return rooms.find(r => r.roomId === currentRoomId) || rooms[0];
  }, [rooms, currentRoomId]);

  const connectedRooms = useMemo(() => {
    if (!currentRoom || !rooms) return [];
    
    const connectedIds = (currentRoom.connections || []).map(conn => {
      return conn.from === currentRoom.roomId ? conn.to : conn.from;
    });

    return rooms.filter(r => connectedIds.includes(r.roomId));
  }, [currentRoom, rooms]);

  const mapBounds = useMemo(() => {
    if (!rooms || !rooms.length) return { w: 100, h: 100 };
    const maxX = Math.max(...rooms.map(r => r.mapX || 0)) + 50; 
    const maxY = Math.max(...rooms.map(r => r.mapY || 0)) + 50;
    return { w: maxX, h: maxY };
  }, [rooms]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [currentRoomId]);

  
  const nextImage = useCallback(() => {
    if (!currentRoom?.images) return;
    setCurrentImageIndex(prev => 
      prev < currentRoom.images.length - 1 ? prev + 1 : prev
    );
  }, [currentRoom?.images?.length]); 

  const prevImage = useCallback(() => {
    setCurrentImageIndex(prev => prev > 0 ? prev - 1 : prev);
  }, []);

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
  }, [isOpen, onClose, nextImage, prevImage]); 

  const navigateToRoom = useCallback((roomId: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentRoomId(roomId);
      setIsTransitioning(false);
    }, 500);
  }, []);


  if (!isOpen || !currentRoom) return null;

 
  const currentImageUrl = currentRoom.images?.[currentImageIndex]?.url || '';

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
              {currentImageUrl ? (
                <img
                  src={currentImageUrl}
                  alt={currentRoom.roomName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40">
                  No Image Available
                </div>
              )}
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
                  {currentRoom.roomName}
                </h2>
                <p className="text-white/60 text-sm">
                  {currentRoom.description}
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

        
          {currentRoom.images && currentRoom.images.length > 1 && (
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
                  currentImageIndex === (currentRoom.images?.length || 0) - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-[#0a0f1a]/80'
                }`}
                whileHover={currentImageIndex < (currentRoom.images?.length || 0) - 1 ? { scale: 1.1 } : {}}
                whileTap={currentImageIndex < (currentRoom.images?.length || 0) - 1 ? { scale: 0.95 } : {}}
                disabled={currentImageIndex === (currentRoom.images?.length || 0) - 1}
              >
                <ChevronRight size={24} />
              </motion.button>
            </>
          )}

          {/* Image Counter */}
          {currentRoom.images && currentRoom.images.length > 1 && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-[#0a0f1a]/60 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-display tracking-wider z-20">
              {currentImageIndex + 1} / {currentRoom.images.length}
            </div>
          )}

          {/* Room Navigation Hotspots (Middle Buttons) */}
          <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            {connectedRooms.map((room) => (
              <motion.button
                key={room.roomId}
                onClick={() => navigateToRoom(room.roomId)}
                className="min-w-[140px] justify-center group flex items-center gap-3 px-6 py-3 bg-[#0a0f1a]/70 backdrop-blur-sm border border-[#2962ff]/30 hover:border-[#2962ff] transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Eye size={18} className="text-[#2962ff]" />
                <span className="text-white font-display text-sm tracking-wider uppercase">
                  {room.roomName}
                </span>
                <ArrowRight size={16} className="text-white/50 group-hover:text-[#d4af37] group-hover:translate-x-1 transition-all" />
              </motion.button>
            ))}
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            {/* Room Thumbnails */}
            <AnimatePresence>
              {showThumbnails && currentRoom.images && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mb-6 flex justify-center gap-2 overflow-x-auto pb-2"
                >
                  {currentRoom.images.map((img, idx) => (
                    <motion.button
                      key={img.imageID}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`relative w-20 h-14 overflow-hidden border-2 transition-all ${
                        idx === currentImageIndex 
                          ? 'border-[#2962ff]' 
                          : 'border-transparent hover:border-white/30'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Room Navigation Pills */}
            <div className="flex justify-center gap-2 flex-wrap">
              {rooms.map((room) => (
                <motion.button
                  key={room.roomId}
                  onClick={() => navigateToRoom(room.roomId)}
                  className={`px-4 py-2 text-xs font-display tracking-wider uppercase transition-all ${
                    room.roomId === currentRoomId
                      ? 'bg-[#2962ff] text-white'
                      : 'bg-[#0a0f1a]/60 backdrop-blur-sm border border-white/10 text-white/60 hover:text-white hover:border-white/30'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {room.roomName}
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
                      key={room.roomId}
                      onClick={() => navigateToRoom(room.roomId)}
                      className={`absolute w-4 h-4 rounded-full transition-all z-10 ${
                        room.roomId === currentRoomId
                          ? 'bg-[#2962ff] ring-4 ring-[#2962ff]/30'
                          : 'bg-[#d4af37]/60 hover:bg-[#d4af37]'
                      }`}
                      style={{
                        left: `${(room.mapX / mapBounds.w) * 100}%`,
                        top: `${(room.mapY / mapBounds.h) * 100}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      whileHover={{ scale: 1.3 }}
                      title={room.roomName}
                    />
                  ))}
                  
                  {/* Connection lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {rooms.map((room) =>
                      (room.connections || []).map((conn) => {
                        if (conn.from !== room.roomId) return null;

                        const targetRoom = rooms.find(r => r.roomId === conn.to);
                        if (!targetRoom) return null;

                        return (
                          <line
                            key={`${room.roomId}-${targetRoom.roomId}`}
                            x1={`${(room.mapX / mapBounds.w) * 100}%`}
                            y1={`${(room.mapY / mapBounds.h) * 100}%`}
                            x2={`${(targetRoom.mapX / mapBounds.w) * 100}%`}
                            y2={`${(targetRoom.mapY / mapBounds.h) * 100}%`}
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