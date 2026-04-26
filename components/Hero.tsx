"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="px-8 md:px-24 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-48 max-w-7xl">
      <motion.h1
        initial={
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 }
        }
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        className="font-display italic text-5xl sm:text-7xl lg:text-8xl text-text font-normal leading-[1.1] max-w-5xl"
        style={{ letterSpacing: "-0.03em" }}
      >
        michael pyon
      </motion.h1>
    </header>
  );
}
