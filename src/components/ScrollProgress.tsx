import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[10000] h-1.5 origin-left bg-gradient-to-r from-royal-gold via-white to-royal-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
      style={{ scaleX }}
    />
  );
}
