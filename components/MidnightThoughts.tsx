
import React from 'react';
import { motion } from 'framer-motion';

const THOUGHTS = [
    "why is water wet...",
    "i need spicy wings rn...",
    "did i turn off the stove...",
    "wait who am i...",
    "finger fries are just fries for fingers...",
    "if tomato is a fruit is ketchup a smoothie...",
    "why do we press harder on the remote when batteries are dead...",
    "do fish get thirsty...",
    "loading brain cells...",
    "who named it 'fireplace' and not 'firehome'...",
    "i probably ate fires today...",
    "saad is typing...",
    "error 404: motivation not found..."
];

const MidnightThoughts: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full z-40 bg-gradient-to-t from-black via-black/80 to-transparent py-2 md:py-3 overflow-hidden pointer-events-none select-none border-t border-white/5">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-12 pr-12"
          animate={{ x: "-50%" }}
          transition={{
            repeat: Infinity,
            duration: 40, // Slow, hypnotic scroll
            ease: "linear"
          }}
          style={{ width: "fit-content", display: "flex" }}
        >
          {/* Repeat list multiple times to ensure it fills wide screens and loops smoothly */}
          {[...THOUGHTS, ...THOUGHTS, ...THOUGHTS, ...THOUGHTS].map((thought, i) => (
            <span key={i} className="text-neutral-500 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-80 flex items-center gap-4">
              <span className="w-1 h-1 bg-pink-500/50 rounded-full inline-block" />
              {thought}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default MidnightThoughts;
