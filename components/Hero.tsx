"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="px-6 pt-32 pb-24 max-w-screen-2xl mx-auto sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-36">
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
        className="font-display italic text-5xl sm:text-7xl lg:text-8xl xl:text-9xl text-text font-normal leading-[0.92] max-w-4xl"
        style={{ letterSpacing: "-0.03em" }}
      >
        Builder who ships
        <br />
        <span className="text-text-muted">constantly.</span>
      </motion.h1>
      <motion.p
        initial={
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }
        }
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.35,
        }}
        className="text-text-muted text-base sm:text-lg mt-8 max-w-lg leading-relaxed"
      >
        43 projects across finance, NYC, music, and games. Turning curiosity
        into working software.
      </motion.p>
    </header>
  );
}
