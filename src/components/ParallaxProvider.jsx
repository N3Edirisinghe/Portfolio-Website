import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// Global mouse-driven 3D tilt applied to the whole page
const ParallaxProvider = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Super smooth spring follow
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Convert mouse pos into subtle rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], ['3deg', '-3deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-3deg', '3deg']);

  // Ambient light blob that follows cursor
  const blobX = useTransform(springX, [-0.5, 0.5], ['-10%', '110%']);
  const blobY = useTransform(springY, [-0.5, 0.5], ['-10%', '110%']);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize to -0.5 → 0.5
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Ambient light that follows cursor */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.04) 0%, transparent 70%)',
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          pointerEvents: 'none',
          zIndex: 1,
          mixBlendMode: 'screen',
        }}
      />

      {/* Cinematic horizontal light streaks */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            x: ['-120%', '120%'],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 18 + i * 4,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 5,
          }}
          style={{
            position: 'fixed',
            top: `${12 + i * 16}%`,
            left: 0,
            width: '40vw',
            height: '1px',
            background: `linear-gradient(90deg, transparent, rgba(0, 245, 212, ${0.1 + i * 0.02}), transparent)`,
            filter: 'blur(1px)',
            transform: `rotate(-${4 + i * 2}deg)`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* Corner vignette accent blobs */}
      <div
        style={{
          position: 'fixed',
          top: '-20%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.015) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'bgPulse 20s ease-in-out infinite alternate',
        }}
      />
      <div
        style={{
          position: 'fixed',
          bottom: '-20%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 165, 255, 0.012) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          animation: 'bgPulse 25s ease-in-out infinite alternate-reverse',
        }}
      />
    </>
  );
};

export default ParallaxProvider;
