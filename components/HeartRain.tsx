import React from 'react';
import { motion } from 'framer-motion';

const HeartRain: React.FC = () => {
  // Generate random hearts
  const hearts = Array.from({ length: 50 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // Random percentage for left position
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
    scale: Math.random() * 0.5 + 0.5,
    color: Math.random() > 0.5 ? '#ff69b4' : '#ff1493' // Mix of pinks
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[55] overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0, scale: 0 }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 1, 1, 0], 
            scale: heart.scale 
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
             position: 'absolute',
             color: heart.color,
             fontSize: `${heart.scale * 3}rem`,
             filter: 'drop-shadow(0 0 10px rgba(255,105,180,0.5))'
          }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  );
};

export default HeartRain;