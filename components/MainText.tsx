
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface MainTextProps {
  isMagic: boolean;
  onMagicClick: () => void;
  onCallClick: () => void;
  onHypeClick: () => void;
}

// Single Static High-Quality Image
const STATIC_IMAGE = "https://avatarfiles.alphacoders.com/374/374849.png"; // Luffy

// Updated Colors: White and Purple Mix
const LETTER_COLORS = [
    "#FFFFFF", // White
    "#D500F9", // Neon Purple
    "#FFFFFF", // White
    "#9D00FF", // Electric Purple
    "#FFFFFF", // White
    "#E040FB", // Soft Purple
    "#FFFFFF", // White
];

const MainText: React.FC<MainTextProps> = ({ isMagic, onMagicClick, onCallClick, onHypeClick }) => {
  // Animation variants
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const letterContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const letterAnim: Variants = {
    hidden: { 
        opacity: 0, 
        y: 100, 
        rotateX: -90,
        filter: 'blur(10px)' 
    },
    show: { 
        opacity: 1, 
        y: 0, 
        rotateX: 0,
        filter: 'blur(0px)',
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 100
        }
    }
  };

  const floatingWave: Variants = {
    animate: (i: number) => ({
      y: [0, -15, 0],
      textShadow: [
        `0 0 10px ${LETTER_COLORS[i % LETTER_COLORS.length]}40`, // 40 is hex opacity
        `0 0 40px ${LETTER_COLORS[i % LETTER_COLORS.length]}80`,
        `0 0 10px ${LETTER_COLORS[i % LETTER_COLORS.length]}40`,
      ],
      transition: {
        delay: 1.5 + (i * 0.1), // Start after entrance
        repeat: Infinity,
        duration: 4,
        ease: "easeInOut"
      }
    })
  };

  const secondaryText: Variants = {
    hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
    show: { 
        opacity: 1, 
        clipPath: "inset(0 0% 0 0)",
        transition: {
            duration: 1.5,
            ease: "easeOut",
            delay: 1.2
        }
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
            delay: 0.5
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
      <div className="pointer-events-auto w-full flex justify-center">
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
              <motion.div className="mb-2 relative">
                <motion.h1 
                    className="text-8xl md:text-[10rem] font-stylish leading-none tracking-tight perspective-1000"
                    variants={letterContainer}
                    initial="hidden"
                    animate={["show", "animate"]}
                >
                  {Array.from("saadiii").map((char, i) => (
                    <motion.span 
                        key={i} 
                        custom={i}
                        variants={{...letterAnim, ...floatingWave}}
                        className="inline-block origin-bottom transform-style-3d"
                        style={{ color: LETTER_COLORS[i % LETTER_COLORS.length] }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>

              {/* Secondary Text */}
              <motion.p
                variants={secondaryText}
                className="text-white/70 text-sm md:text-lg uppercase tracking-[0.3em] font-light mb-10"
              >
                i probably ate fires today
              </motion.p>

              {/* The Picture - Static */}
              <motion.div 
                variants={imageAnim}
                initial="hidden"
                animate="show"
                className={`relative w-80 h-80 md:w-[30rem] md:h-[30rem] rounded-xl overflow-hidden mb-12 bg-neutral-800 ${isMagic ? 'shadow-xl border-4 border-white' : 'shadow-2xl border border-neutral-800'}`}
              >
                 <motion.img 
                    src={STATIC_IMAGE} 
                    alt="Character" 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                 />
              </motion.div>

              {/* Buttons Container */}
              <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 z-50">
                  {/* The Pink Button */}
                  <motion.button
                    variants={imageAnim}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onMagicClick}
                    className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] tracking-widest text-xs md:text-sm uppercase transition-all duration-300 cursor-none"
                  >
                    WANNA EAT FRIES
                  </motion.button>

                  {/* The Green Button */}
                  <motion.button
                    variants={imageAnim}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCallClick}
                    className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] tracking-widest text-xs md:text-sm uppercase transition-all duration-300 cursor-none"
                  >
                    Call Karo Bacha
                  </motion.button>

                  {/* The Cyan/Blue Button (Do I Know?) */}
                  <motion.button
                    variants={imageAnim}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onHypeClick}
                    className="px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full shadow-[0_0_20px_rgba(6,182,212,0.5)] tracking-widest text-xs md:text-sm uppercase transition-all duration-300 cursor-none"
                  >
                    DO I KNOW ?
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
