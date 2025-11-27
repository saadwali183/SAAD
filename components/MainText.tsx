import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface MainTextProps {
  isMagic: boolean;
  onMagicClick: () => void;
  onCallClick: () => void;
}

const MainText: React.FC<MainTextProps> = ({ isMagic, onMagicClick, onCallClick }) => {
  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const contentFade: Variants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5 }
    },
    exit: { 
        opacity: 0, 
        scale: 1.05,
        transition: { duration: 0.3 }
    }
  };

  const letterAnim: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    show: { 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.6, -0.05, 0.01, 0.99] as const
        }
    }
  };

  const mainTextPulse: Variants = {
    hidden: { 
        textShadow: "0 0 0px rgba(255,255,255,0)" 
    },
    show: {
      textShadow: [
        "0 0 20px rgba(255,255,255,0.1)",
        "0 0 50px rgba(255,255,255,0.4)",
        "0 0 20px rgba(255,255,255,0.1)",
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    }
  };

  const imageAnim: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    show: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: {
            duration: 1.2,
            ease: "easeOut",
            delay: 1.0
        }
    }
  };

  const flickerGlow: Variants = {
    animate: {
      textShadow: [
        "0px 0px 4px rgba(255,255,255,0.1)",
        "0px 0px 10px rgba(255,255,255,0.4)",
        "0px 0px 4px rgba(255,255,255,0.1)",
        "0px 0px 15px rgba(255,255,255,0.6)",
        "0px 0px 4px rgba(255,255,255,0.1)",
      ],
      opacity: [1, 0.9, 1, 0.8, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center text-center z-[60] select-none px-4 w-full h-full pointer-events-none"
    >
      <div className="pointer-events-auto">
      <AnimatePresence mode="wait">
        {isMagic ? (
            /* Magic Mode Content */
            <motion.div 
                key="magic-content"
                variants={contentFade}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center"
            >
                <h1 className="text-5xl md:text-8xl font-stylish text-white mb-6 drop-shadow-lg text-center leading-tight">
                   awww pookie you love me
                </h1>
                <p className="text-2xl md:text-5xl font-light text-white tracking-widest lowercase animate-pulse">
                    lesssssss gooooooooo
                </p>
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: 1, duration: 1 }}
                  className="mt-8 text-6xl"
                >
                  🍟❤️🔥
                </motion.div>
                
                {/* Back Button for UX */}
                 <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    onClick={onMagicClick}
                    className="mt-12 text-white/50 hover:text-white text-sm tracking-widest cursor-none"
                 >
                    BACK
                 </motion.button>
            </motion.div>
        ) : (
            /* Default Mode Content */
            <motion.div 
                key="default-content"
                className="flex flex-col items-center"
                variants={contentFade}
                initial="initial"
                animate="animate"
                exit="exit"
            >
              {/* Primary Line: saadiii */}
              <motion.div className="mb-4 md:mb-6 relative">
                <motion.h1 
                    className="text-8xl md:text-[10rem] font-stylish text-white leading-none tracking-tight"
                    variants={mainTextPulse}
                    animate="show"
                    initial="hidden"
                >
                  {Array.from("saadiii").map((char, i) => (
                    <motion.span key={i} variants={letterAnim} className="inline-block">
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>

              {/* Secondary Line: i love finger fries */}
              <div className="text-xl md:text-3xl font-light tracking-[0.2em] text-neutral-300 flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-8 md:mb-12">
                <motion.div className="flex lowercase">
                    {Array.from("i love").map((char, i) => (
                        <motion.span key={i} variants={letterAnim} animate="show" initial="hidden" className="inline-block">
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.div>
                
                {/* Special treatment for finger fries */}
                <motion.div 
                    variants={flickerGlow}
                    animate="animate"
                    className="flex relative font-bold text-white lowercase"
                >
                     {Array.from("finger fries").map((char, i) => (
                        <motion.span key={i} variants={letterAnim} animate="show" initial="hidden" className="inline-block">
                            {char === " " ? "\u00A0" : char}
                        </motion.span>
                    ))}
                </motion.div>
              </div>

              {/* The Picture - Cool Person with Sunglasses */}
              <motion.div 
                variants={imageAnim}
                initial="hidden"
                animate="show"
                className={`relative w-80 h-80 md:w-[30rem] md:h-[30rem] rounded-xl overflow-hidden mb-12 transition-all duration-700 ${isMagic ? 'shadow-xl border-4 border-white' : 'shadow-none border-none'}`}
              >
                <img 
                    src="https://images.unsplash.com/photo-1488161628813-994252600322?q=80&w=1000&auto=format&fit=crop" 
                    alt="Saad with Sunglasses" 
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105 grayscale contrast-125"
                />
              </motion.div>

              {/* Buttons Container */}
              <div className="flex flex-col md:flex-row gap-6 z-50">
                  {/* The Pink Button */}
                  <motion.button
                    variants={letterAnim}
                    initial="hidden"
                    animate="show"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onMagicClick}
                    className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] tracking-widest text-sm md:text-base uppercase transition-all duration-300 cursor-none"
                  >
                    WANNA EAT FRIES
                  </motion.button>

                  {/* The Green Button */}
                  <motion.button
                    variants={letterAnim}
                    initial="hidden"
                    animate="show"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCallClick}
                    className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] tracking-widest text-sm md:text-base uppercase transition-all duration-300 cursor-none"
                  >
                    Call Karo Bacha
                  </motion.button>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MainText;