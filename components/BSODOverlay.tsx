
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BSODOverlayProps {
  onClose: () => void;
}

const BSODOverlay: React.FC<BSODOverlayProps> = ({ onClose }) => {
  const [stage, setStage] = useState<'crash' | 'kidding'>('crash');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress counter for "Deleting"
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        // Random increments to look realistic
        return prev + Math.random() * 5; 
      });
    }, 100);

    // Switch to "Just Kidding" after 4 seconds
    const stageTimer = setTimeout(() => {
      setStage('kidding');
    }, 4000);

    // Close after "Just Kidding" shows for 2 seconds
    const closeTimer = setTimeout(() => {
      onClose();
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(stageTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }} // Instant cut to black/blue
      className="fixed inset-0 z-[999] bg-[#0078D7] text-white font-segoe p-8 md:p-24 cursor-none select-none flex flex-col justify-start items-start overflow-hidden font-sans"
    >
      <AnimatePresence mode="wait">
        {stage === 'crash' ? (
          <motion.div 
            key="crash"
            className="w-full max-w-5xl"
          >
            <h1 className="text-8xl md:text-9xl mb-8 font-light">:(</h1>
            <p className="text-2xl md:text-3xl mb-12 leading-relaxed">
              Your device ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.
            </p>
            
            <div className="flex items-center gap-4 text-2xl md:text-3xl mb-8 font-light">
              <span>{Math.min(100, Math.round(progress))}% complete</span>
            </div>

            <div className="mt-12 p-4 bg-black/20 rounded font-mono text-sm md:text-lg space-y-2 text-yellow-300">
                <p>{'>'} DELETING C:/WINDOWS/SYSTEM32...</p>
                <p>{'>'} ERASING USER DATA...</p>
                <p>{'>'} UPLOADING BROWSING HISTORY TO MOM...</p>
                {progress > 50 && <p className="text-red-400">{'>'} CRITICAL ERROR: NO BACKUP FOUND</p>}
            </div>

            <div className="mt-12 flex items-start gap-4">
               <div className="w-24 h-24 bg-white p-2">
                  <div className="w-full h-full bg-black flex items-center justify-center">
                      <span className="text-[10px] text-white text-center leading-none">QR CODE<br/>HERE</span>
                  </div>
               </div>
               <div className="text-sm md:text-base opacity-80 space-y-1">
                   <p>For more information about this issue and possible fixes, visit https://www.windows.com/stopcode</p>
                   <p>If you call a support person, give them this info:</p>
                   <p>Stop code: CRITICAL_PROCESS_DIED</p>
               </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="kidding"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full flex flex-col items-center justify-center text-center"
          >
             <h2 className="text-6xl md:text-8xl font-black mb-4">JUST KIDDING 😜</h2>
             <p className="text-2xl md:text-3xl">Your system is safe.</p>
             <p className="text-xl opacity-60 mt-4">(Don't press red buttons next time)</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BSODOverlay;
