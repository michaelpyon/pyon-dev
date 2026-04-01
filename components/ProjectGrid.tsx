"use client";

import { useState, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects, domains, domainLabels, type Domain } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

type SortKey = "date" | "name";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035 } },
};

export function ProjectGrid() {
  const prefersReducedMotion = useReducedMotion();
  const [activeDomain, setActiveDomain] = useState<Domain | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("date");
  const [filtersOpen, setFiltersOpen] = useState(false);

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

  const pillClass = (active: boolean) =>
    `filter-pill text-[0.7rem] tracking-[0.15em] uppercase px-8 py-3 font-label ${
      active
        ? "filter-pill-active"
        : "bg-surface-high text-text-muted hover:bg-surface-hover"
    }`;

  return (
    <section
      className="mb-32 px-8 md:px-24 py-48"
      role="region"
      aria-label="All Projects"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
        <div>
          <h2
            className="text-5xl md:text-7xl font-display italic mb-4"
            style={{ letterSpacing: "-0.02em" }}
          >
            The Archive
          </h2>
          <p className="text-text-muted text-lg">
            {projects.length} projects across finance, data, games, and music.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <span className="font-label text-[0.7rem] uppercase tracking-widest text-text-muted">
            Sort by:
          </span>
          <button
            onClick={() => setSortBy("date")}
            className={`font-label text-[0.7rem] uppercase tracking-widest ${
              sortBy === "date"
                ? "font-semibold border-b border-text"
                : "text-text-subtle hover:text-text transition-colors"
            }`}
          >
            Recent
          </button>
          <button
            onClick={() => setSortBy("name")}
            className={`font-label text-[0.7rem] uppercase tracking-widest ${
              sortBy === "name"
                ? "font-semibold border-b border-text"
                : "text-text-subtle hover:text-text transition-colors"
            }`}
          >
            Alphabetical
          </button>
        </div>
      </div>

      {/* Filters: desktop */}
      <div className="hidden md:flex flex-wrap gap-4 mb-20">
        <button
          onClick={() => setActiveDomain(null)}
          className={pillClass(activeDomain === null)}
        >
          All
        </button>
        {domains.map((d) => (
          <button
            key={d}
            onClick={() => setActiveDomain(activeDomain === d ? null : d)}
            className={pillClass(activeDomain === d)}
          >
            {domainLabels[d]}
          </button>
        ))}
      </div>

      {/* Filters: mobile collapsible */}
      <div className="md:hidden mb-8">
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="flex items-center gap-2 text-[0.7rem] tracking-[0.15em] uppercase text-text-muted font-label mb-4"
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
          <div className="flex flex-wrap gap-3 mb-5">
            <button
              onClick={() => setActiveDomain(null)}
              className={pillClass(activeDomain === null)}
            >
              All
            </button>
            {domains.map((d) => (
              <button
                key={d}
                onClick={() =>
                  setActiveDomain(activeDomain === d ? null : d)
                }
                className={pillClass(activeDomain === d)}
              >
                {domainLabels[d]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid or empty state */}
      {gridProjects.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-text-muted text-sm mb-4">
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
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16"
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
