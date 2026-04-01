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
    <motion.div
      variants={variants}
      className="group project-row bg-surface hover:bg-surface-hover px-5 py-4 sm:px-7 sm:py-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
        {/* Left: index + name */}
        <div className="flex items-center gap-3 sm:w-56 shrink-0">
          <span
            className="text-text-subtle text-[11px] tabular-nums w-5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-[15px] font-medium text-text tracking-tight leading-snug">
            {project.name}
          </h3>
        </div>

        {/* Middle: tagline */}
        <p className="text-text-muted text-sm leading-relaxed flex-1 sm:pl-0 pl-8">
          {project.tagline}
        </p>

        {/* Right: domain pill + tech tags + links */}
        <div className="flex items-center gap-3 shrink-0 sm:pl-0 pl-8">
          {/* Domain pill */}
          <span
            className="text-[10px] text-text-muted tracking-[0.06em] uppercase px-2.5 py-1 rounded-full bg-surface border border-border leading-none whitespace-nowrap"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {domainLabels[project.domain]}
          </span>

          {/* Tech tags (desktop only) */}
          <div className="hidden lg:flex gap-1.5">
            {project.tech.slice(0, 2).map((tech) => (
              <span
                key={tech}
                className="text-[10px] text-text-subtle tracking-[0.02em] px-1.5 py-0.5 rounded leading-none bg-bg/50"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-2.5">
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
        </div>
      </div>
    </motion.div>
  );
}
