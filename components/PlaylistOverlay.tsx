
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlaylistOverlayProps {
  onClose: () => void;
}

const PlaylistOverlay: React.FC<PlaylistOverlayProps> = ({ onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate progress bar moving when playing
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] bg-black text-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 z-0">
         <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-black transition-all duration-1000 ${isPlaying ? 'scale-110' : 'scale-100'}`} />
         <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,_rgba(255,255,255,0.03)_1px,_transparent_1px)] bg-[length:20px_20px] opacity-20" />
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 z-50 text-white/50 hover:text-white transition-colors tracking-widest text-xs uppercase cursor-none"
      >
        CLOSE PLAYER
      </button>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md px-6">
        
        {/* Album Art / Vinyl */}
        <motion.div 
            className="relative w-64 h-64 md:w-80 md:h-80 mb-12"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
        >
            {/* Glow Behind */}
            <div className={`absolute inset-4 rounded-full bg-indigo-500 blur-3xl transition-opacity duration-1000 ${isPlaying ? 'opacity-40' : 'opacity-10'}`} />
            
            {/* The Vinyl Disc */}
            <motion.div
                animate={{ rotate: isPlaying ? 360 : 0 }}
                transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatType: "loop" }}
                className="w-full h-full rounded-full bg-neutral-900 border-8 border-neutral-800 shadow-2xl relative overflow-hidden flex items-center justify-center"
            >
                {/* Grooves */}
                <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.9]" />
                <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.8]" />
                <div className="absolute inset-0 rounded-full border border-white/5 scale-[0.7]" />
                
                {/* Center Label / Image */}
                <div className="w-1/2 h-1/2 rounded-full overflow-hidden relative z-10 border-4 border-neutral-900">
                     <img 
                        src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=2070&auto=format&fit=crop" 
                        alt="Album Cover"
                        className="w-full h-full object-cover opacity-80" 
                     />
                </div>
            </motion.div>
        </motion.div>

        {/* Song Info */}
        <div className="text-center mb-10">
            <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-4xl font-stylish font-bold mb-2 tracking-wide leading-tight"
            >
                DARD DILO KE
            </motion.h2>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-indigo-300 text-sm tracking-[0.3em] uppercase opacity-70"
            >
                MA AUR TUM
            </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/10 rounded-full mb-12 overflow-hidden">
            <motion.div 
                className="h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                style={{ width: `${progress}%` }}
            />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-12">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-white/50 hover:text-white cursor-none">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 rotate-180">
                    <path d="M5 4h3v16H5V4zm11.17 6.88L8.5 5.5v13l7.67-5.38c.6-.42.6-1.34 0-1.76z" />
                 </svg>
            </motion.button>

            <motion.button 
                onClick={() => setIsPlaying(!isPlaying)}
                whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center cursor-none transition-shadow shadow-xl"
            >
                {isPlaying ? (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                     </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8 ml-1">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                )}
            </motion.button>

            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="text-white/50 hover:text-white cursor-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
                    <path d="M5 4h3v16H5V4zm11.17 6.88L8.5 5.5v13l7.67-5.38c.6-.42.6-1.34 0-1.76z" />
                </svg>
            </motion.button>
        </div>

      </div>
    </motion.div>
  );
};

export default PlaylistOverlay;