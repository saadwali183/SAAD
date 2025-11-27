
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface ChaosOverlayProps {
  onEnd: () => void;
}

const ChaosOverlay: React.FC<ChaosOverlayProps> = ({ onEnd }) => {
  useEffect(() => {
    // End chaos after 3.5 seconds
    const timer = setTimeout(() => {
      onEnd();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onEnd]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center overflow-hidden cursor-none select-none"
    >
      {/* Background Glitch Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         {Array.from({ length: 20 }).map((_, i) => (
             <motion.div
                key={i}
                className="w-full h-1 bg-black absolute"
                style={{ top: `${Math.random() * 100}%` }}
                animate={{ x: [-100, 100], opacity: [0, 1, 0] }}
                transition={{ duration: 0.2, repeat: Infinity, delay: Math.random() }}
             />
         ))}
      </div>

      {/* Main Glitch Text */}
      <div className="relative z-10">
        <motion.h1
          animate={{
            x: [-5, 5, -3, 3, 0],
            y: [3, -3, 1, -1, 0],
            skewX: [0, 5, -5, 0],
            filter: ["blur(0px)", "blur(2px)", "blur(0px)"]
          }}
          transition={{
            repeat: Infinity,
            duration: 0.15,
            ease: "linear"
          }}
          className="text-6xl md:text-9xl font-black text-black text-center leading-none tracking-tighter"
        >
          MENE KAHA <br/> THA NA! 🤬
        </motion.h1>

        {/* Overlapping Text for Glitch Effect */}
        <motion.h1
          animate={{ x: [2, -2], opacity: [0.5, 0] }}
          transition={{ repeat: Infinity, duration: 0.1 }}
          className="text-6xl md:text-9xl font-black text-red-600 text-center leading-none tracking-tighter absolute top-0 left-0 w-full h-full mix-blend-multiply"
        >
          MENE KAHA <br/> THA NA! 🤬
        </motion.h1>
      </div>

      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="mt-12 text-black font-mono text-xl md:text-3xl tracking-widest font-bold bg-yellow-400 px-4 py-1"
      >
        WHY ARE YOU LIKE THIS?
      </motion.p>
      
      {/* Screen Crack / Flash Overlay */}
      <motion.div
        animate={{ opacity: [0, 0.3, 0, 0.1, 0] }}
        transition={{ repeat: Infinity, duration: 0.5 }}
        className="absolute inset-0 bg-red-500 mix-blend-color-burn pointer-events-none"
      />
    </motion.div>
  );
};

export default ChaosOverlay;
