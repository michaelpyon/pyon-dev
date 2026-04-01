"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";

const cardVariants = {
  hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
    <motion.div
      variants={variants}
      whileHover={prefersReducedMotion ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="group block bg-surface px-6 py-5 sm:px-8 sm:py-6 hover:bg-surface-hover focus-within:ring-2 focus-within:ring-[#78736A] focus-within:ring-offset-2 focus-within:ring-offset-bg"
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-6">
        {/* Left: index + name */}
        <div className="flex items-baseline gap-3 sm:w-52 shrink-0">
          <span
            className="text-text-subtle text-[11px] tabular-nums"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-lg font-semibold text-text tracking-tight leading-snug">
            {project.name}
          </h3>
        </div>

        {/* Middle: tagline */}
        <p className="text-text-muted text-sm leading-relaxed flex-1 sm:pl-0 pl-8">
          {project.tagline}
        </p>

        {/* Right: tech stack + links */}
        <div className="flex items-center gap-3 shrink-0 sm:pl-0 pl-8">
          <div className="hidden lg:flex gap-1.5">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-[11px] text-text-muted tracking-[0.02em] px-2 py-0.5 rounded-md leading-none"
                style={{
                  fontFamily: "var(--font-mono)",
                  boxShadow: "0 0 0 1px rgba(120,100,80,0.1)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {hasLive && (
              <a
                href={project.liveUrl!}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-card
                className="text-[11px] font-medium tracking-[0.08em] uppercase text-accent hover:text-text transition-colors"
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
              className="text-text-subtle group-hover:text-text group-hover:translate-x-0.5 transition-all duration-200 text-xs"
              aria-label={`${project.name} on GitHub`}
            >
              &rarr;
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
