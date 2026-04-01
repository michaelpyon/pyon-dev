import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/lib/projects";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CaseStudyContent } from "./CaseStudyContent";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.flagship)
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Not Found" };
  }

  return {
    title: `${project.name} Case Study`,
    description: project.tagline,
    openGraph: {
      title: `${project.name} | Michael Pyon`,
      description: project.tagline,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || !project.flagship) {
    notFound();
  }

  return (
    <>
      <ThemeToggle />
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-subtle text-xs tracking-wide hover:text-text transition-colors duration-200 mb-10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78736A] focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:rounded"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden="true"
            className="group-hover:-translate-x-1 group-focus-visible:-translate-x-1 transition-transform duration-200"
          >
            &larr;
          </span>
          Back
        </Link>

        <header className="mb-12">
          <h1
            className="font-display italic text-4xl sm:text-5xl text-text tracking-tight leading-[0.92] mb-4"
            style={{ letterSpacing: "-1.5px" }}
          >
            {project.name}
          </h1>
          <p className="text-text-muted text-base leading-relaxed mb-6">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((t) => (
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
          <div className="flex gap-4">
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs tracking-wide text-text-muted hover:text-accent transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              Source &rarr;
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-wide text-accent hover:text-text transition-colors"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Live Demo &rarr;
              </a>
            )}
          </div>
        </header>

        <div id="main-content" className="mdx-content">
          <CaseStudyContent slug={slug} />
        </div>
      </article>
    </>
  );
}
