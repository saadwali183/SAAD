
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useTransform, animate } from 'framer-motion';

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
  const [isTyping, setIsTyping] = useState(true); // Start TRUE so user sees it immediately
  
  // Motion value for age counting
  const count = useMotionValue(0);
  const roundedAge = useTransform(count, (latest) => Math.round(latest));

  // Age Animation Logic
  useEffect(() => {
    if (!isMagic) {
        const controls = animate(count, 19, { duration: 2.5, ease: "circOut" });
        return controls.stop;
    }
  }, [isMagic, count]);

  // Fake Typing Logic Loop
  useEffect(() => {
    let active = true;
    const runLoop = async () => {
        while(active) {
            // Type for 3 seconds initially
            await new Promise(r => setTimeout(r, 3000));
            if(!active) break;
            
            setIsTyping(false);
            
            // Wait brief moment (1-2 seconds)
            await new Promise(r => setTimeout(r, Math.random() * 1000 + 1000));
            if(!active) break;
            
            setIsTyping(true);
        }
    }
    runLoop();
    return () => { active = false; };
  }, []);

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
      className="flex flex-col items-center justify-center text-center z-[60] select-none px-4 w-full h-full pointer-events-none overflow-y-auto overflow-x-hidden"
    >
      <div className="pointer-events-auto w-full flex justify-center py-10">
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
                   awww pookie you love fires too
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
                className="flex flex-col items-center relative"
                variants={contentFade}
                initial="initial"
                animate="animate"
                exit="exit"
            >
              {/* Primary Line: saadiii */}
              <motion.div className="mb-2 relative">
                <motion.h1 
                    className="text-7xl md:text-[10rem] font-stylish leading-none tracking-tight perspective-1000"
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

                {/* Fake Typing Indicator - HIGH VISIBILITY VERSION */}
                <AnimatePresence>
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 5, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="absolute -top-16 left-1/2 -translate-x-1/2 md:-top-4 md:left-auto md:right-[-2rem] md:translate-x-full bg-black border-2 border-pink-500 rounded-xl px-5 py-3 flex items-center gap-3 shadow-[0_0_20px_rgba(236,72,153,0.6)] z-[80] pointer-events-none min-w-[160px]"
                        >
                            <span className="text-xs md:text-sm text-pink-400 font-bold font-mono tracking-widest uppercase whitespace-nowrap">
                                Saad is typing
                            </span>
                            <div className="flex gap-1 items-center">
                                <motion.div 
                                    animate={{ y: [0, -4, 0], backgroundColor: ["#fff", "#ec4899", "#fff"] }} 
                                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }} 
                                    className="w-1.5 h-1.5 bg-white rounded-full" 
                                />
                                <motion.div 
                                    animate={{ y: [0, -4, 0], backgroundColor: ["#fff", "#ec4899", "#fff"] }} 
                                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.1 }} 
                                    className="w-1.5 h-1.5 bg-white rounded-full" 
                                />
                                <motion.div 
                                    animate={{ y: [0, -4, 0], backgroundColor: ["#fff", "#ec4899", "#fff"] }} 
                                    transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.2 }} 
                                    className="w-1.5 h-1.5 bg-white rounded-full" 
                                />
                            </div>
                            
                            {/* Little triangle arrow to make it look like a speech bubble */}
                            <div className="absolute top-full left-1/2 -translate-x-1/2 md:left-0 md:-translate-x-1/2 md:top-1/2 md:-ml-2 w-3 h-3 bg-black border-b-2 border-r-2 border-pink-500 rotate-45 md:rotate-[135deg]" />
                        </motion.div>
                    )}
                </AnimatePresence>
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
                className={`relative w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-xl overflow-hidden mb-8 bg-neutral-800 ${isMagic ? 'shadow-xl border-4 border-white' : 'shadow-2xl border border-neutral-800'}`}
              >
                 <motion.img 
                    src={STATIC_IMAGE} 
                    alt="Character" 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                 />
              </motion.div>
              
              {/* BIRTHDAY & AGE SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="flex items-center gap-8 md:gap-12 mb-10 border-t border-b border-white/10 py-4 px-12 bg-white/5 backdrop-blur-sm rounded-full"
              >
                 <div className="flex flex-col items-center">
                    <span className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-1">BORN ON</span>
                    <span className="text-white text-xl md:text-2xl font-stylish font-bold tracking-widest">6.6.2006</span>
                 </div>
                 
                 <div className="w-px h-8 bg-white/20" />
                 
                 <div className="flex flex-col items-center">
                    <span className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-1">LEVEL</span>
                    <div className="flex items-baseline">
                        <motion.span className="text-white text-xl md:text-2xl font-stylish font-bold tabular-nums">
                            {roundedAge}
                        </motion.span>
                    </div>
                 </div>
              </motion.div>

              {/* Buttons Container */}
              <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 z-50 items-center w-full max-w-4xl px-4">
                  {/* The Pink Button */}
                  <motion.button
                    variants={imageAnim}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onMagicClick}
                    className="px-8 py-3 bg-pink-500 hover:bg-pink-400 text-white font-bold rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)] tracking-widest text-xs md:text-sm uppercase transition-all duration-300 cursor-none w-full md:w-auto"
                  >
                    WANNA EAT FRIES
                  </motion.button>

                  {/* The Green Button */}
                  <motion.button
                    variants={imageAnim}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCallClick}
                    className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] tracking-widest text-xs md:text-sm uppercase transition-all duration-300 cursor-none w-full md:w-auto"
                  >
                    Call Karo Bacha
                  </motion.button>

                  {/* The Unique Gradient Button (Do I Know?) */}
                  <motion.button
                    variants={imageAnim}
                    whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 0 35px rgba(6,182,212,0.8), 0 0 15px rgba(147,51,234,0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onHypeClick}
                    className="relative px-8 py-3 font-bold rounded-full tracking-widest text-xs md:text-sm uppercase transition-all duration-300 cursor-none overflow-hidden group border border-white/20 text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] w-full md:w-auto"
                  >
                     {/* Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 group-hover:from-cyan-400 group-hover:via-blue-500 group-hover:to-purple-500 transition-colors duration-500" />
                    
                    {/* Content */}
                    <span className="relative z-10 drop-shadow-md flex items-center justify-center gap-2 text-center">
                        DO SAAD KNOW YOU?
                    </span>
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
