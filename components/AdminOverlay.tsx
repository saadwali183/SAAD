
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AdminOverlayProps {
  onClose: () => void;
}

interface Message {
    id: number;
    text: string;
    date: string;
}

const AdminOverlay: React.FC<AdminOverlayProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('saad_confessions');
    if (data) {
        setMessages(JSON.parse(data));
    }
  }, []);

  const clearDatabase = () => {
    if (confirm("Are you sure you want to delete all messages?")) {
        localStorage.removeItem('saad_confessions');
        setMessages([]);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-[200] bg-neutral-950 text-white flex flex-col p-6 md:p-12 overflow-hidden font-mono"
    >
      <div className="flex justify-between items-center mb-12 border-b border-white/10 pb-6">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-500 tracking-tighter">DATABASE_ACCESS_GRANTED</h1>
            <p className="text-xs text-white/40 mt-1 uppercase tracking-widest">User: SAAD | Level: ADMIN</p>
        </div>
        <div className="flex gap-6">
            <button onClick={clearDatabase} className="text-red-500 hover:text-red-400 text-xs tracking-widest uppercase cursor-none border border-red-500/30 px-4 py-2 rounded hover:bg-red-500/10 transition-colors">
                Wipe Data
            </button>
            <button onClick={onClose} className="text-white hover:text-white/70 text-xs tracking-widest uppercase cursor-none border border-white/30 px-4 py-2 rounded hover:bg-white/10 transition-colors">
                Log Out
            </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.length === 0 ? (
            <div className="text-center text-white/20 mt-20">
                <p className="text-xl">NO RECORDS FOUND</p>
                <p className="text-xs mt-2 uppercase tracking-widest max-w-md mx-auto leading-relaxed">
                    The database is empty. 
                    <br/><br/>
                    (Note: Messages are stored in Local Storage. You will only see messages submitted from this browser.)
                </p>
            </div>
        ) : (
            messages.map((msg) => (
                <div key={msg.id} className="bg-white/5 border border-white/10 p-6 rounded hover:bg-white/10 transition-colors">
                    <p className="text-lg md:text-xl font-light mb-4 text-white/90">"{msg.text}"</p>
                    <div className="flex justify-between items-end">
                        <span className="text-[10px] text-green-500/50 uppercase tracking-widest">ID: {msg.id}</span>
                        <span className="text-[10px] text-white/30 uppercase tracking-widest">{msg.date}</span>
                    </div>
                </div>
            ))
        )}
      </div>
    </motion.div>
  );
};

export default AdminOverlay;
