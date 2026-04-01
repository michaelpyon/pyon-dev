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
      <article className="max-w-3xl mx-auto px-6 pt-16 pb-24 sm:pt-20 sm:pb-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-subtle text-xs tracking-wide hover:text-accent transition-colors duration-200 mb-12 group"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden="true"
            className="group-hover:-translate-x-1 transition-transform duration-200"
          >
            &larr;
          </span>
          Back
        </Link>

        <header className="mb-16">
          <h1
            className="font-display italic text-4xl sm:text-5xl lg:text-6xl text-text leading-[0.92] mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            {project.name}
          </h1>
          <p className="text-text-muted text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[11px] text-text-subtle tracking-[0.02em] px-2.5 py-1 rounded-full bg-surface border border-border leading-none"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-5">
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
                className="text-xs tracking-wide text-accent hover:text-accent-hover transition-colors"
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
