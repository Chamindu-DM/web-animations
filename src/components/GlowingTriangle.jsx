import React, { useRef } from 'react';
import { motion, useSpring, useMotionTemplate } from 'framer-motion';

export default function GlowingTriangle() {
  const containerRef = useRef(null);
  
  // Smoothly animated mouse coordinates
  const bgX = useSpring(50, { stiffness: 50, damping: 20 });
  const bgY = useSpring(50, { stiffness: 50, damping: 20 });
  const lightIntensity = useSpring(0.3, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // We just track the raw mouse position inside the box for the mask
    bgX.set(x);
    bgY.set(y);
  };

  const handleMouseEnter = () => {
    lightIntensity.set(1);
  };

  const handleMouseLeave = () => {
    // Reset to center smoothly
    bgX.set(50);
    bgY.set(50);
    lightIntensity.set(0.3);
  };

  // The mask defines where the light beams are visible.
  // It creates a spotlight effect that reveals the pre-rendered box-shadow lines.
  const maskImage = useMotionTemplate`
    radial-gradient(
      circle at ${bgX}% ${bgY}%, 
      rgba(0, 0, 0, ${lightIntensity}) 0%, 
      rgba(0, 0, 0, 0.4) 15%, 
      transparent 50%
    )
  `;

  // A helper component for each edge of the triangle
  const Edge = ({ style }) => (
    <div 
      className="absolute bg-white"
      style={{
        height: '2px',
        transformOrigin: '0% 50%',
        boxShadow: `
          0 0 2px 1px rgba(255, 255, 255, 1),
          0 0 6px 2px rgba(255, 255, 255, 0.9),
          0 0 12px 4px rgba(255, 255, 255, 0.8),
          0 0 24px 8px rgba(255, 255, 255, 0.6),
          0 0 48px 16px rgba(255, 255, 255, 0.4),
          0 0 96px 32px rgba(255, 255, 255, 0.2),
          0 0 150px 64px rgba(255, 255, 255, 0.1)
        `,
        ...style
      }}
    />
  );

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center min-h-screen w-full bg-[#050505]"
    >
      {/* Decorative Text */}
      <div className="absolute top-1/2 left-8 md:left-16 -translate-y-1/2 text-white text-3xl md:text-5xl font-semibold opacity-80 select-none hidden md:block">
        Agentic
      </div>
      <div className="absolute top-1/2 right-8 md:right-16 -translate-y-1/2 text-white text-3xl md:text-5xl font-semibold opacity-80 select-none hidden md:block">
        Infrastructure
      </div>

      {/* Container for the triangle effect */}
      <div className="relative aspect-square w-[300px] md:w-[450px]">
        
        {/* Layer 1: The Volumetric Light Beams */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ 
            WebkitMaskImage: maskImage,
            maskImage: maskImage
          }}
        >
          {/* Bottom Edge */}
          <Edge style={{ left: '10%', top: '90%', width: '80%', transform: 'translateY(-50%) rotate(0deg)' }} />
          
          {/* Right Edge */}
          {/* Starts at Bottom Right (90%, 90%), goes to Top (50%, 10%) */}
          <Edge style={{ left: '90%', top: '90%', width: '89.4427%', transform: 'translateY(-50%) rotate(-116.565deg)' }} />
          
          {/* Left Edge */}
          {/* Starts at Top (50%, 10%), goes to Bottom Left (10%, 90%) */}
          <Edge style={{ left: '50%', top: '10%', width: '89.4427%', transform: 'translateY(-50%) rotate(116.565deg)' }} />
        </motion.div>

        {/* Layer 2: The Solid Black Triangle Mask */}
        <div 
          className="absolute inset-0 z-10 bg-[#050505]"
          style={{
            // perfectly matching the inner edge of our lines
            clipPath: 'polygon(50% 10%, 90% 90%, 10% 90%)'
          }}
        />

      </div>
    </section>
  );
}
