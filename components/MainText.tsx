
import React, { useEffect, useState } from 'react';
import { motion, Variants, useMotionValue, useTransform, animate } from 'framer-motion';

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

interface MainTextProps {
    onOpenConfession: () => void;
    onOpenAdmin: () => void;
}

const MainText: React.FC<MainTextProps> = ({ onOpenConfession, onOpenAdmin }) => {
  // Motion value for age counting
  const count = useMotionValue(0);
  const roundedAge = useTransform(count, (latest) => Math.round(latest));

  // Secret Admin Trigger Logic
  const [clickCount, setClickCount] = useState(0);

  const handleBirthdayClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Reset count if user is too slow (increased to 2 seconds for easier access)
    setTimeout(() => setClickCount(0), 2000);

    if (newCount === 3) {
        onOpenAdmin();
        setClickCount(0);
    }
  };

  // Age Animation Logic
  useEffect(() => {
    const controls = animate(count, 19, { duration: 2.5, ease: "circOut" });
    return controls.stop;
  }, [count]);

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
      className="flex flex-col items-center justify-center text-center z-[60] select-none px-4 w-full h-full pointer-events-none overflow-y-auto overflow-x-hidden relative"
    >
      {/* "i am tourist" text at the top */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-10 pointer-events-auto"
      >
         <span className="text-white/30 text-xs md:text-sm font-mono tracking-[0.5em] uppercase">
            i am tourist
         </span>
      </motion.div>

      <div className="pointer-events-auto w-full flex flex-col items-center py-10">
            <motion.div 
                className="flex flex-col items-center relative"
                variants={contentFade}
                initial="initial"
                animate="animate"
                exit="exit"
            >
              {/* Primary Line: saadiii */}
              <motion.div className="mb-12 relative">
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
              </motion.div>

              {/* The Picture - Static */}
              <motion.div 
                variants={imageAnim}
                initial="hidden"
                animate="show"
                className="relative w-72 h-72 md:w-[28rem] md:h-[28rem] rounded-xl overflow-hidden mb-12 bg-neutral-800 shadow-2xl border border-neutral-800"
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
                className="flex items-center gap-8 md:gap-12 border-t border-b border-white/10 py-4 px-12 bg-white/5 backdrop-blur-sm rounded-full mb-12"
              >
                 <div 
                    onClick={handleBirthdayClick}
                    className="flex flex-col items-center cursor-pointer active:scale-95 transition-transform group"
                    title="Tap 3 times for Admin"
                 >
                    <span className="text-white/40 text-[10px] md:text-xs tracking-widest uppercase mb-1 group-hover:text-purple-400 transition-colors">BORN ON</span>
                    <span className="text-white text-xl md:text-2xl font-stylish font-bold tracking-widest group-hover:text-purple-300 transition-colors">6.6.2006</span>
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

              {/* ANONYMOUS Q&A BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)" }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenConfession}
                className="px-10 py-4 bg-transparent border border-white/30 rounded-full text-white font-bold tracking-widest text-sm uppercase transition-all hover:bg-white/5 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] cursor-none"
              >
                SEND ANONYMOUS MESSAGE TO SAAD
              </motion.button>

            </motion.div>
      </div>
    </motion.div>
  );
};

export default MainText;
