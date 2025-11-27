import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  depth: number;
  phase: number;
}

interface AmbientParticlesProps {
    isMagic?: boolean;
}

const AmbientParticles: React.FC<AmbientParticlesProps> = ({ isMagic = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Configuration
    const particleCount = 120; // Enough to feel "ambient" but not crowded
    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const depth = Math.random(); // 0 (far) to 1 (near)
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3 * (depth * 0.5 + 0.5),
        vy: (Math.random() - 0.5) * 0.3 * (depth * 0.5 + 0.5),
        size: (Math.random() * 2 + 0.5) * (depth * 0.8 + 0.3),
        alpha: Math.random() * 0.4 + 0.1,
        targetAlpha: Math.random() * 0.4 + 0.1,
        depth: depth,
        phase: Math.random() * Math.PI * 2
      });
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    let animationFrameId: number;
    let time = 0;

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      particles.forEach(p => {
        // Organic movement: Base velocity + Sine wave drift
        p.x += p.vx + Math.sin(time + p.phase) * 0.15 * p.depth;
        p.y += p.vy + Math.cos(time + p.phase * 0.7) * 0.15 * p.depth;

        // Wrap around screen boundaries with buffer
        const buffer = 50;
        if (p.x < -buffer) p.x = width + buffer;
        if (p.x > width + buffer) p.x = -buffer;
        if (p.y < -buffer) p.y = height + buffer;
        if (p.y > height + buffer) p.y = -buffer;

        // Twinkle/Pulse opacity
        if (Math.abs(p.alpha - p.targetAlpha) < 0.01) {
            p.targetAlpha = Math.random() * 0.4 + 0.1;
        }
        p.alpha += (p.targetAlpha - p.alpha) * 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Render Color
        // If magic mode, slightly brighter/sharper. Default mode: soft white.
        const opacity = p.alpha * (isMagic ? 0.9 : 0.6) * p.depth; 
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        
        // Glow effect for "near" particles
        if (p.depth > 0.7) {
             ctx.shadowBlur = p.size * 2;
             ctx.shadowColor = "rgba(255,255,255,0.4)";
        } else {
             ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMagic]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default AmbientParticles;