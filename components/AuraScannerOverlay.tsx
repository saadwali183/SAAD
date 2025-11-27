
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuraScannerOverlayProps {
  onClose: () => void;
}

const ROASTS = [
  { color: "text-gray-400", title: "DUSTY GRAY", desc: "Go take a shower immediately." },
  { color: "text-orange-400", title: "NEON PIZZA", desc: "You are just hungry. Eat something." },
  { color: "text-blue-500", title: "ERROR 404", desc: "No personality found. Try restarting." },
  { color: "text-red-500", title: "CHAOS RED", desc: "Too much coffee. Calm down." },
  { color: "text-yellow-300", title: "LOW BATTERY", desc: "You look exhausted. Go sleep." },
  { color: "text-purple-400", title: "CRINGE VIOLET", desc: "Your last post was embarrassing." },
  { color: "text-green-400", title: "ENVY GREEN", desc: "Stop stalking your ex." },
  { color: "text-pink-400", title: "DELUSIONAL PINK", desc: "You think you're the main character (you're not)." },
  { color: "text-indigo-400", title: "MIDNIGHT BLUE", desc: "Overthinking everything. Stop it." },
  { color: "text-white", title: "BLANK CANVAS", desc: "Thoughts empty. Head empty." }
];

const AuraScannerOverlay: React.FC<AuraScannerOverlayProps> = ({ onClose }) => {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(ROASTS[0]);

  useEffect(() => {
    // Pick a random roast
    setResult(ROASTS[Math.floor(Math.random() * ROASTS.length)]);

    // Scan for 3 seconds then show result
    const timer = setTimeout(() => {
      setScanning(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center font-mono overflow-hidden select-none"
    >
      <AnimatePresence mode="wait">
        {scanning ? (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center"
          >
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[length:50px_50px] opacity-20" />

            {/* Scanning Laser Line */}
            <motion.div
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute left-0 right-0 h-2 bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.8)] z-20"
            />
            <motion.div
              initial={{ top: "-10%" }}
              animate={{ top: "110%" }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
              className="absolute left-0 right-0 h-24 bg-gradient-to-b from-green-500/0 via-green-500/20 to-green-500/0 z-10"
            />

            <h2 className="text-green-500 text-2xl md:text-4xl font-bold tracking-[0.5em] animate-pulse z-30 bg-black/50 px-4 py-2">
              ANALYZING AURA...
            </h2>
            <p className="text-green-400/60 mt-4 tracking-widest text-xs md:text-sm z-30">
              DO NOT MOVE
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", bounce: 0.5 }}
            className="relative z-50 flex flex-col items-center text-center px-4 max-w-2xl"
          >
            <motion.div 
                className={`w-40 h-40 md:w-56 md:h-56 rounded-full mb-8 blur-3xl opacity-40 animate-pulse ${result.color.replace('text-', 'bg-')}`}
            />
            
            <h3 className="text-white/50 text-sm md:text-lg tracking-[0.5em] mb-4 uppercase">Analysis Complete</h3>
            
            <h1 className={`text-5xl md:text-7xl font-black mb-6 tracking-tight ${result.color} drop-shadow-[0_0_15px_currentColor]`}>
              {result.title}
            </h1>
            
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-xl backdrop-blur-md">
                <p className="text-xl md:text-3xl text-white font-light">
                    "{result.desc}"
                </p>
            </div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              onClick={onClose}
              className="mt-12 px-8 py-3 border border-white/20 hover:bg-white/10 text-white rounded-full tracking-widest text-xs uppercase transition-all cursor-none"
            >
              ACCEPT FATE (CLOSE)
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AuraScannerOverlay;
