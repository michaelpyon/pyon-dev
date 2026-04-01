"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <header className="px-6 pt-20 pb-20 max-w-screen-2xl mx-auto sm:pt-28 sm:pb-28">
      <motion.h1
        initial={
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
        }
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.9,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        className="font-display italic text-6xl sm:text-8xl lg:text-9xl text-text leading-[0.9] font-normal lowercase"
        style={{ letterSpacing: "-0.03em" }}
      >
        michael pyon
      </motion.h1>
      <motion.p
        initial={
          prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }
        }
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{
          duration: prefersReducedMotion ? 0.3 : 0.7,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.3,
        }}
        className="text-text-muted text-base sm:text-lg mt-6 max-w-xl leading-relaxed"
      >
        Builder who ships constantly. From macro risk simulators to subway delay
        trackers, turning curiosity into working software.
      </motion.p>
    </header>
  );
}
