"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/projects";

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
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
        className="group block"
        aria-label={`${project.name} case study`}
      >
        {/* Image placeholder */}
        <div className="overflow-hidden bg-surface mb-4 aspect-[16/10] flex items-end p-6">
          <span className="font-display italic text-4xl text-text-subtle/30">
            {project.name}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display italic text-2xl leading-none mb-2">
              {project.name}
            </h3>
            <p className="text-text-muted text-sm max-w-md">
              {project.tagline}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[11px] text-text-muted tracking-[0.02em] px-2 py-0.5 rounded-md leading-none"
                  style={{
                    fontFamily: "var(--font-mono)",
                    boxShadow: "0 0 0 1px rgba(120,100,80,0.1)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          <span
            aria-hidden="true"
            className="text-text-subtle group-hover:text-accent group-focus-visible:text-accent transition-colors text-sm mt-1"
          >
            &#8599;
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
