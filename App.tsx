import React, { useState } from 'react';
import FireCursor from './components/FireCursor';
import MainText from './components/MainText';
import AmbientParticles from './components/AmbientParticles';
import CallingOverlay from './components/CallingOverlay';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isMagic, setIsMagic] = useState(false);
  const [isCalling, setIsCalling] = useState(false);

  return (
    <main 
      className={`relative w-screen h-screen overflow-hidden flex items-center justify-center transition-colors duration-1000 ease-in-out ${isMagic ? 'bg-pink-500' : 'bg-black'}`}
    >
      {/* Background/Vignette Effect for depth - Fades out in magic mode */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900/30 via-black to-black pointer-events-none z-0 transition-opacity duration-1000 ${isMagic ? 'opacity-0' : 'opacity-100'}`} 
      />
      
      {/* Magic Background Overlay */}
      <div 
        className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-400 via-pink-500 to-pink-600 pointer-events-none z-0 transition-opacity duration-1000 ${isMagic ? 'opacity-100' : 'opacity-0'}`} 
      />

      {/* Ambient White Motions */}
      <AmbientParticles isMagic={isMagic} />

      {/* The Particle System Layer (Cursor) */}
      <FireCursor color={isMagic ? '#ffffff' : '#ffffff'} />

      {/* The Content Layer */}
      <MainText 
        isMagic={isMagic} 
        onMagicClick={() => setIsMagic(!isMagic)} 
        onCallClick={() => setIsCalling(true)}
      />

      {/* Calling Overlay */}
      <AnimatePresence>
        {isCalling && (
            <CallingOverlay onEndCall={() => setIsCalling(false)} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;