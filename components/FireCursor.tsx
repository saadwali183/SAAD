import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  decay: number;
}

interface FireCursorProps {
    color?: string;
}

const FireCursor: React.FC<FireCursorProps> = ({ color = 'white' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const lastMouse = useRef({ x: -100, y: -100 });
  
  // Use a ref for color to access it inside the animation loop without stale closures
  const colorRef = useRef(color);

  useEffect(() => {
      colorRef.current = color;
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    resize();

    // Animation Loop
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const currentColor = colorRef.current;
      
      // Interpolate mouse movement to create smooth trails even on fast moves
      const dx = mouse.current.x - lastMouse.current.x;
      const dy = mouse.current.y - lastMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Add particles based on movement
      if (dist > 0) {
        const steps = Math.min(dist, 10); // Interpolation steps
        for (let i = 0; i < steps; i++) {
            if (Math.random() > 0.5) continue; // optimization
            const t = i / steps;
            const x = lastMouse.current.x + dx * t;
            const y = lastMouse.current.y + dy * t;
            
            // Randomize spawn slightly
            const spread = 2;
            particles.current.push({
                x: x + (Math.random() - 0.5) * spread,
                y: y + (Math.random() - 0.5) * spread,
                vx: (Math.random() - 0.5) * 0.5, // Slight horizontal drift
                vy: (Math.random() * -1) - 0.2, // Upward float
                life: 1.0,
                size: Math.random() * 3 + 1,
                decay: Math.random() * 0.03 + 0.01
            });
        }
      }
      
      // Update last mouse position
      lastMouse.current = { ...mouse.current };

      // Render Particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life -= p.decay;
        p.x += p.vx;
        p.y += p.vy;
        p.size *= 0.95; // Shrink

        if (p.life <= 0 || p.size < 0.1) {
          particles.current.splice(i, 1);
          continue;
        }

        // Draw basic particle (soft white/glow)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        ctx.fillStyle = currentColor;
        ctx.globalAlpha = p.life;
        ctx.fill();
        ctx.globalAlpha = 1.0;
        
        // Optional: Very subtle glow ring
        if (p.life > 0.5) {
             ctx.shadowBlur = 10;
             ctx.shadowColor = currentColor;
        } else {
             ctx.shadowBlur = 0;
        }
      }

      // Draw Cursor Core (The "Finger")
      ctx.beginPath();
      ctx.arc(mouse.current.x, mouse.current.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = currentColor;
      ctx.shadowBlur = 15;
      ctx.shadowColor = currentColor;
      ctx.fill();
      ctx.shadowBlur = 0; // Reset for next frame

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ background: 'transparent' }}
      className="fixed inset-0 pointer-events-none z-50 mix-blend-screen"
    />
  );
};

export default FireCursor;