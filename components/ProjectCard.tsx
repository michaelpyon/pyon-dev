"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { domainLabels } from "@/lib/projects";

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedCardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedCardVariants : cardVariants;
  const hasLive = Boolean(project.liveUrl);

  return (
    <motion.div variants={variants} className="archive-card group">
      <span className="font-label text-[0.6rem] uppercase tracking-[0.15em] text-accent mb-2 block">
        {domainLabels[project.domain]}
      </span>
      <h4
        className="text-xl font-display italic mb-2 group-hover:text-accent transition-colors"
        style={{ letterSpacing: "-0.01em" }}
      >
        {project.name}
      </h4>
      <p className="text-sm text-text-muted font-light leading-relaxed line-clamp-2">
        {project.tagline}
      </p>
      {/* Links */}
      <div className="flex items-center gap-3 mt-4">
        {hasLive && (
          <a
            href={project.liveUrl!}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-card
            className="text-[10px] font-medium tracking-[0.08em] uppercase text-accent hover:text-accent-hover transition-colors"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Live
          </a>
        )}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-card
          className="text-text-subtle group-hover:text-accent transition-colors duration-200 text-xs"
          aria-label={`${project.name} on GitHub`}
        >
          &rarr;
        </a>
      </div>
    </motion.div>
  );
}
