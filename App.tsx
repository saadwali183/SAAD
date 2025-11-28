
import React, { useState } from 'react';
import MainText from './components/MainText';
import AmbientParticles from './components/AmbientParticles';
import ConfessionOverlay from './components/ConfessionOverlay';
import AdminOverlay from './components/AdminOverlay';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [showConfession, setShowConfession] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <main 
      className="relative w-screen h-[100dvh] overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background/Vignette Effect for depth */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/30 via-black to-black pointer-events-none z-0" 
      />
      
      {/* Ambient White Motions */}
      <AmbientParticles isMagic={false} />
      
      {/* The Content Layer */}
      <MainText 
        onOpenConfession={() => setShowConfession(true)} 
        onOpenAdmin={() => setShowAdmin(true)}
      />

      {/* Overlays */}
      <AnimatePresence>
        {showConfession && (
            <ConfessionOverlay onClose={() => setShowConfession(false)} />
        )}
        {showAdmin && (
            <AdminOverlay onClose={() => setShowAdmin(false)} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;
