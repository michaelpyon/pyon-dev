"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getFlagshipProjects } from "@/lib/projects";
import { FlagshipCard } from "./FlagshipCard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function FlagshipSection() {
  const prefersReducedMotion = useReducedMotion();
  const flagships = getFlagshipProjects();

  return (
    <section
      className="mb-32 px-6 max-w-screen-2xl mx-auto"
      role="region"
      aria-label="Featured Projects"
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        whileInView={
          prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
        }
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-baseline justify-between mb-10 border-b border-border pb-3"
      >
        <h2 className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted">
          Featured Work
        </h2>
        <span className="font-label text-[10px] text-text-subtle">
          01 / Case Studies
        </span>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {flagships.map((project) => (
          <FlagshipCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </section>
  );
}
