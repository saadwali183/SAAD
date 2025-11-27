
import React, { useState } from 'react';
import FireCursor from './components/FireCursor';
import MainText from './components/MainText';
import AmbientParticles from './components/AmbientParticles';
import CallingOverlay from './components/CallingOverlay';
import HeartRain from './components/HeartRain';
import ComplimentOverlay from './components/ComplimentOverlay';
import MidnightThoughts from './components/MidnightThoughts';
import BSODOverlay from './components/BSODOverlay';
import AuraScannerOverlay from './components/AuraScannerOverlay';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [isMagic, setIsMagic] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [showCompliment, setShowCompliment] = useState(false);
  const [isBSOD, setIsBSOD] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  return (
    <main 
      className={`relative w-screen h-[100dvh] overflow-hidden flex items-center justify-center transition-colors duration-1000 ease-in-out ${isMagic ? 'bg-pink-500' : 'bg-black'}`}
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
      
      {/* Raining Hearts in Magic Mode */}
      <AnimatePresence>
        {isMagic && <HeartRain />}
      </AnimatePresence>

      {/* The Particle System Layer (Cursor) */}
      <FireCursor color={isMagic ? '#ffffff' : '#ffffff'} />

      {/* The Content Layer */}
      <MainText 
        isMagic={isMagic} 
        onMagicClick={() => setIsMagic(!isMagic)} 
        onCallClick={() => setIsCalling(true)}
        onHypeClick={() => setShowCompliment(true)}
        onDeleteSystem={() => setIsBSOD(true)}
        onScanClick={() => setIsScanning(true)}
      />

      {/* Ticker Tape - Midnight Thoughts */}
      <MidnightThoughts />

      {/* Calling Overlay */}
      <AnimatePresence>
        {isCalling && (
            <CallingOverlay onEndCall={() => setIsCalling(false)} />
        )}
      </AnimatePresence>

      {/* Compliment Overlay */}
      <AnimatePresence>
        {showCompliment && (
            <ComplimentOverlay onClose={() => setShowCompliment(false)} />
        )}
      </AnimatePresence>

      {/* BSOD Overlay */}
      <AnimatePresence>
        {isBSOD && (
            <BSODOverlay onClose={() => setIsBSOD(false)} />
        )}
      </AnimatePresence>

      {/* Aura Scanner Overlay */}
      <AnimatePresence>
        {isScanning && (
            <AuraScannerOverlay onClose={() => setIsScanning(false)} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;
