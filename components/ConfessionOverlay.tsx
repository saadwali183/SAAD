
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfessionOverlayProps {
  onClose: () => void;
}

const ConfessionOverlay: React.FC<ConfessionOverlayProps> = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim().length > 0) {
      // 1. Get existing messages
      const existingData = localStorage.getItem('saad_confessions');
      const messages = existingData ? JSON.parse(existingData) : [];
      
      // 2. Add new message
      const newMessage = {
        id: Date.now(),
        text: message,
        date: new Date().toLocaleString(),
        isRead: false
      };
      
      messages.unshift(newMessage); // Add to top
      
      // 3. Save back
      localStorage.setItem('saad_confessions', JSON.stringify(messages));
      
      // 4. Show success state
      setIsSent(true);
      
      // 5. Close automatically after 2s
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6 text-center"
    >
      <div className="absolute top-8 right-8">
        <button onClick={onClose} className="text-white/40 hover:text-white text-xs tracking-widest uppercase cursor-none">Close</button>
      </div>

      <AnimatePresence mode="wait">
        {!isSent ? (
          <motion.form 
            key="form"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            onSubmit={handleSubmit}
            className="w-full max-w-lg flex flex-col items-center"
          >
            <h2 className="text-white text-2xl md:text-4xl font-stylish mb-2">Anonymous Message</h2>
            <p className="text-white/40 text-xs tracking-widest mb-12 uppercase">He won't know it's you.</p>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your confession or question here..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-white text-lg placeholder-white/20 focus:outline-none focus:border-purple-500/50 transition-colors h-48 resize-none mb-8 font-light"
              autoFocus
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!message.trim()}
              className="px-12 py-4 bg-white text-black font-bold tracking-widest rounded-full uppercase disabled:opacity-50 disabled:cursor-not-allowed cursor-none"
            >
              Send Secretly
            </motion.button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-white text-3xl font-stylish mb-2">Sent.</h2>
            <p className="text-white/40 text-sm tracking-widest uppercase">Your secret is safe (maybe).</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ConfessionOverlay;
