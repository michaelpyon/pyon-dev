"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { projects, domains, domainLabels, type Domain } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

type SortKey = "date" | "name";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

export function ProjectGrid() {
  const prefersReducedMotion = useReducedMotion();
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Exclude flagship projects from the grid (they have their own section)
  const gridProjects = useMemo(() => {
    let filtered = projects.filter((p) => !p.flagship);

    if (activeDomain) {
      filtered = filtered.filter((p) => p.domain === activeDomain);
    }

    if (sortBy === "date") {
      filtered.sort((a, b) => b.date.localeCompare(a.date));
    } else {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [activeDomain, sortBy]);

  return (
    <section
      className="mb-24 px-6 max-w-screen-2xl mx-auto"
      role="region"
      aria-label="All Projects"
    >
      <motion.div
        initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
        whileInView={
          prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
        }
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-baseline justify-between mb-8 border-b border-border pb-2"
      >
        <h2 className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted">
          All Projects
        </h2>
        <span className="font-label text-[10px] text-text-muted">
          02 / Index
        </span>
      </motion.div>

      {/* Filters: desktop */}
      <div className="hidden md:flex items-center gap-3 mb-6">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveDomain(null)}
            className={`text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full transition-colors duration-200 ${
              activeDomain === null
                ? "bg-text text-bg font-medium"
                : "bg-surface text-text-muted hover:bg-surface-hover"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            All
          </button>
          {domains.map((d) => (
            <button
              key={d}
              onClick={() => setActiveDomain(activeDomain === d ? null : d)}
              className={`text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full transition-colors duration-200 ${
                activeDomain === d
                  ? "bg-text text-bg font-medium"
                  : "bg-surface text-text-muted hover:bg-surface-hover"
              }`}
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {domainLabels[d]}
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-2">
          <button
            onClick={() => setSortBy("date")}
            className={`text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full transition-colors duration-200 ${
              sortBy === "date"
                ? "bg-text text-bg font-medium"
                : "bg-surface text-text-muted hover:bg-surface-hover"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("name")}
            className={`text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full transition-colors duration-200 ${
              sortBy === "name"
                ? "bg-text text-bg font-medium"
                : "bg-surface text-text-muted hover:bg-surface-hover"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            A-Z
          </button>
        </div>
      </div>

      {/* Filters: mobile collapsible */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 text-[11px] tracking-[0.06em] uppercase text-text-muted mb-3"
          style={{ fontFamily: "var(--font-mono)" }}
          aria-expanded={filtersOpen}
        >
          <span>Filters</span>
          <span
            className="transition-transform duration-200"
            style={{
              transform: filtersOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
          >
            &#9662;
          </span>
        </button>

        {filtersOpen && (
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveDomain(null)}
                className={`text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full transition-colors duration-200 ${
                  activeDomain === null
                    ? "bg-text text-bg font-medium"
                    : "bg-surface text-text-muted hover:bg-surface-hover"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                All
              </button>
              {domains.map((d) => (
                <button
                  key={d}
                  onClick={() =>
                    setActiveDomain(activeDomain === d ? null : d)
                  }
                  className={`text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full transition-colors duration-200 ${
                    activeDomain === d
                      ? "bg-text text-bg font-medium"
                      : "bg-surface text-text-muted hover:bg-surface-hover"
                  }`}
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  {domainLabels[d]}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy("date")}
                className={`text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full transition-colors duration-200 ${
                  sortBy === "date"
                    ? "bg-text text-bg font-medium"
                    : "bg-surface text-text-muted hover:bg-surface-hover"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Newest
              </button>
              <button
                onClick={() => setSortBy("name")}
                className={`text-[11px] tracking-[0.06em] uppercase px-3 py-1.5 rounded-full transition-colors duration-200 ${
                  sortBy === "name"
                    ? "bg-text text-bg font-medium"
                    : "bg-surface text-text-muted hover:bg-surface-hover"
                }`}
                style={{ fontFamily: "var(--font-mono)" }}
              >
                A-Z
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Grid or empty state */}
      {gridProjects.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-text-muted text-sm mb-3">
            No projects match this filter.
          </p>
          <button
            onClick={() => setActiveDomain(null)}
            className="text-accent text-sm hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <motion.div
          className="flex flex-col gap-px bg-border"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          key={`${activeDomain}-${sortBy}`}
        >
          {gridProjects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </motion.div>
      )}
    </section>
  );
}
