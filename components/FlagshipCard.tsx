"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export function FlagshipCard({ project }: { project: Project }) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedItemVariants : itemVariants;

  return (
    <motion.div variants={variants}>
      <Link
        href={`/projects/${project.slug}`}
        data-cursor-card
        className="group block flagship-card rounded-lg overflow-hidden"
        aria-label={`${project.name} case study`}
      >
        {/* Image preview area */}
        <div className="overflow-hidden bg-surface rounded-lg mb-5 aspect-[16/10] flex items-end p-6 border border-border group-hover:border-accent/40 transition-colors duration-300">
          <span className="font-display italic text-4xl sm:text-5xl text-text-subtle/20 flagship-img leading-none">
            {project.name}
          </span>
        </div>

        <div>
          <h3
            className="font-display italic text-2xl sm:text-[1.75rem] text-text leading-tight mb-2"
            style={{ letterSpacing: "-0.02em" }}
          >
            {project.name}
          </h3>
          <p className="text-text-muted text-sm leading-relaxed max-w-sm mb-4">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[11px] text-text-subtle tracking-[0.02em] px-2 py-0.5 rounded-md leading-none bg-surface"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t}
              </span>
            ))}
          </div>
          <span
            className="text-xs text-accent group-hover:text-accent-hover transition-colors duration-200 tracking-wide"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Read case study &rarr;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
