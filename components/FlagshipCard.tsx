"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";
import { domainLabels } from "@/lib/projects";

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

export function FlagshipCard({
  project,
  layout = "half",
  index = 0,
  stagger = false,
}: {
  project: Project;
  layout?: "full" | "half";
  index?: number;
  stagger?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const variants = prefersReducedMotion ? reducedItemVariants : itemVariants;
  const num = String(index + 1).padStart(2, "0");

  if (layout === "full") {
    return (
      <motion.div variants={variants} className="group grid md:grid-cols-12 gap-12 items-center">
        <Link
          href={`/projects/${project.slug}`}
          data-cursor-card
          className="md:col-span-8 overflow-hidden block"
          aria-label={`${project.name} case study`}
        >
          <div className="bg-surface-high aspect-[16/9] flex items-end p-8 overflow-hidden">
            <span className="font-display italic text-6xl sm:text-7xl text-text-subtle/20 flagship-img leading-none">
              {project.name}
            </span>
          </div>
        </Link>
        <div className="md:col-span-4 md:-ml-24 z-10">
          <span className="font-label text-[0.65rem] uppercase tracking-widest text-text-muted mb-4 block">
            {num} / {domainLabels[project.domain]}
          </span>
          <h3
            className="text-4xl md:text-5xl font-display italic mb-6"
            style={{ letterSpacing: "-0.02em" }}
          >
            {project.name}
          </h3>
          <p className="text-text-muted text-base mb-8 leading-relaxed">
            {project.tagline}
          </p>
          <Link
            href={`/projects/${project.slug}`}
            className="font-display text-xl italic text-accent border-b-2 border-accent pb-1 hover:text-accent-hover transition-colors"
          >
            Read case study
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={variants} className={`group ${stagger ? "mt-24" : ""}`}>
      <Link
        href={`/projects/${project.slug}`}
        data-cursor-card
        className="block"
        aria-label={`${project.name} case study`}
      >
        <div className="mb-10 overflow-hidden">
          <div className="bg-surface-high aspect-[4/5] flex items-end p-6 overflow-hidden">
            <span className="font-display italic text-5xl text-text-subtle/20 flagship-img leading-none">
              {project.name}
            </span>
          </div>
        </div>
      </Link>
      <span className="font-label text-[0.65rem] uppercase tracking-widest text-text-muted mb-4 block">
        {num} / {domainLabels[project.domain]}
      </span>
      <h3
        className="text-3xl font-display italic mb-4"
        style={{ letterSpacing: "-0.02em" }}
      >
        {project.name}
      </h3>
      <p className="text-text-muted text-base mb-8 max-w-md leading-relaxed">
        {project.tagline}
      </p>
      <Link
        href={`/projects/${project.slug}`}
        className="font-display text-lg italic text-accent border-b-2 border-accent pb-1 hover:text-accent-hover transition-colors"
      >
        Read case study
      </Link>
    </motion.div>
  );
}
