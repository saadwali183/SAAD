import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ComplimentOverlayProps {
  onClose: () => void;
}

const COMPLIMENTS = [
  "IS THE COOLEST PERSON ALIVE RIGHT NOW ✨",
  "HAS THE BEST TASTE IN FRIES 🍟",
  "IS SECRETLY A SUPERHERO 🦸‍♂️",
  "JUST MADE THIS WEBSITE 100% COOLER ❄️",
  "IS A CERTIFIED LEGEND 👑",
  "KNOWS THE SECRET TO ETERNAL SWAG 😎"
];

const ComplimentOverlay: React.FC<ComplimentOverlayProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [step, setStep] = useState<'input' | 'result'>('input');
  const [compliment, setCompliment] = useState(COMPLIMENTS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length > 0) {
      setCompliment(COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)]);
      setStep('result');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] h-[200vw] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black animate-spin-slow opacity-50" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'input' ? (
          <motion.form
            key="input"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)" }}
            onSubmit={handleSubmit}
            className="relative z-10 flex flex-col items-center w-full max-w-md"
          >
            <motion.label 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-cyan-400 text-xl tracking-[0.5em] font-light mb-8 uppercase"
            >
              Who are you?
            </motion.label>
            
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ENTER NAME"
              className="w-full bg-transparent border-b-2 border-neutral-800 focus:border-cyan-400 text-center text-5xl md:text-7xl font-bold text-white outline-none placeholder-neutral-800 transition-colors duration-300 py-4 font-stylish"
              autoFocus
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!name.trim()}
              className="mt-12 px-10 py-4 bg-cyan-500 disabled:bg-neutral-800 text-black disabled:text-neutral-600 font-bold tracking-widest rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] cursor-none"
            >
              TELL ME
            </motion.button>
            
            <button 
                type="button"
                onClick={onClose}
                className="mt-8 text-neutral-600 hover:text-white text-xs tracking-widest cursor-none"
            >
                NEVERMIND
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="result"
            className="relative z-10 flex flex-col items-center text-center perspective-1000"
          >
            <motion.div
                initial={{ rotateX: 90, opacity: 0 }}
                animate={{ rotateX: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="mb-8"
            >
                 <span className="text-cyan-300 text-2xl md:text-3xl tracking-[0.2em] font-bold block mb-4 uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                    WAIT... I KNOW YOU!
                 </span>
            </motion.div>

            <motion.h2
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="text-6xl md:text-8xl font-black text-white mb-6 font-stylish"
            >
              {name}
            </motion.h2>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="bg-neutral-900/80 backdrop-blur-md border border-cyan-500/30 p-8 rounded-2xl transform rotate-1 max-w-2xl"
            >
                <p className="text-xl md:text-3xl text-cyan-100 font-medium tracking-wide leading-relaxed">
                   {compliment}
                </p>
            </motion.div>

            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                onClick={onClose}
                className="mt-16 px-8 py-3 border border-neutral-700 hover:border-white text-neutral-400 hover:text-white rounded-full transition-colors cursor-none tracking-widest text-sm"
            >
                HEHEHE (CLOSE)
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ComplimentOverlay;