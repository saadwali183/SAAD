import React from 'react';
import { motion } from 'framer-motion';

interface CallingOverlayProps {
  onEndCall: () => void;
}

const CallingOverlay: React.FC<CallingOverlayProps> = ({ onEndCall }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-between py-24 text-white font-sans"
    >
        {/* Background Blur Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 to-black z-[-1]" />

        {/* Caller Info */}
        <div className="flex flex-col items-center gap-6 mt-10 z-10 w-full px-4">
            <motion.div 
                animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 rgba(255,255,255,0)", "0 0 50px rgba(255,255,255,0.1)", "0 0 0 rgba(255,255,255,0)"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-40 h-40 rounded-full bg-neutral-900 border border-neutral-700 relative overflow-hidden mb-4 shadow-2xl"
            >
                 <img 
                    src="https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=1000&auto=format&fit=crop" 
                    alt="Caller" 
                    className="w-full h-full object-cover opacity-90" 
                 />
            </motion.div>
            
            <div className="text-center">
                <h2 className="text-5xl md:text-6xl font-light tracking-wider mb-2">SAAD</h2>
                <p className="text-xl md:text-2xl text-green-400 font-medium tracking-widest uppercase animate-pulse mb-2">
                    User Adding To You...
                </p>
                <p className="text-lg text-neutral-500 tracking-widest">
                    OK RUKO
                </p>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-10 z-10">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onEndCall}
                className="w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all cursor-none"
            >
                {/* Hangup Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={0} stroke="currentColor" className="w-8 h-8 fill-white">
                  <path d="M22.056 7.039c-.534-.69-1.222-1.246-1.996-1.637l-2.028-.886a1.996 1.996 0 0 0-1.85.163l-2.84 1.894a15.932 15.932 0 0 1-6.684 0L3.818 4.68A1.996 1.996 0 0 0 1.97 4.516l-2.029.886c-.773.391-1.46.947-1.996 1.637C-4.14 9.944 12 26 22.056 7.039z" transform="rotate(135 12 12)" />
                </svg>
            </motion.button>
        </div>
    </motion.div>
  );
};

export default CallingOverlay;