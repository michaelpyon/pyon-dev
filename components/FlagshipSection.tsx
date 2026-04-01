"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getFlagshipProjects } from "@/lib/projects";
import { FlagshipCard } from "./FlagshipCard";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export function FlagshipSection() {
  const prefersReducedMotion = useReducedMotion();
  const flagships = getFlagshipProjects();

  return (
    <section
      className="mb-32 px-8 md:px-24 py-24 bg-surface"
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
        className="mb-16"
      >
        <span className="font-label uppercase tracking-[0.2em] text-[0.7rem] text-accent">
          Selected Works
        </span>
      </motion.div>

      <motion.div
        className="space-y-48"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* First flagship: full-width editorial layout */}
        {flagships[0] && (
          <FlagshipCard
            key={flagships[0].slug}
            project={flagships[0]}
            layout="full"
            index={0}
          />
        )}

        {/* Remaining flagships: 2-column staggered */}
        {flagships.length > 1 && (
          <div className="grid md:grid-cols-2 gap-24">
            {flagships.slice(1).map((project, i) => (
              <FlagshipCard
                key={project.slug}
                project={project}
                layout="half"
                index={i + 1}
                stagger={i === 1}
              />
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
