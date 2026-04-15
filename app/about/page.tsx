import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Michael Pyon. Builder, maker, and constant shipper.",
};

export default function AboutPage() {
  return (
    <>
      <ThemeToggle />
      <main id="main-content" className="max-w-3xl mx-auto px-6 pt-12 pb-20">
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

        <h1
          className="font-display italic text-4xl sm:text-5xl text-text tracking-tight leading-[0.92] mb-8"
          style={{ letterSpacing: "-1.5px" }}
        >
          About
        </h1>

        {/* Bio */}
        <section className="mb-12">
          <p className="text-text-muted text-base leading-relaxed mb-4">
            Michael Pyon is a builder based in Brooklyn, NY. He makes tools that
            turn messy data into something useful, and ships them as fast as
            possible. 44 projects across finance, city data, music, and games.
          </p>
          <p className="text-text-muted text-base leading-relaxed">
            Every project starts with the same question: why doesn't this exist
            yet? From macro risk simulators to subway delay trackers to browser
            rhythm games, the common thread is curiosity turned into working
            software.
          </p>
        </section>

        {/* What I'm building toward */}
        <section className="mb-12">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-4 pb-2 border-b border-border">
            Building Toward
          </h2>
          <p className="text-text-muted text-base leading-relaxed">
            Tools that make data legible for people who need to make decisions.
            Not dashboards for the sake of dashboards. Software that changes how
            you think about a problem, not just how you look at it.
          </p>
        </section>

        {/* Background */}
        <section className="mb-12">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-4 pb-2 border-b border-border">
            Background
          </h2>
          <p className="text-text-muted text-base leading-relaxed mb-4">
            Strategy and finance background. Spent time in consulting and
            operations before going full-time on building. The consulting years
            trained a specific skill: figuring out what question to ask before
            picking the tool to answer it.
          </p>
          <p className="text-text-muted text-base leading-relaxed">
            Now building full-stack, mostly with React, TypeScript, Next.js, and
            Node. Ships on Vercel, Railway, and GitHub Pages. Everything open
            source unless it involves proprietary data.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mb-4 pb-2 border-b border-border">
            Contact
          </h2>
          <p className="text-text-muted text-base leading-relaxed mb-4">
            Best way to reach me is email. I read everything and respond fast.
          </p>
          <a
            href="mailto:michaelpyon@gmail.com"
            className="inline-block font-label text-xs uppercase tracking-[0.15em] font-medium text-accent hover:text-text transition-colors duration-200 border border-accent hover:border-text px-6 py-3"
          >
            michaelpyon@gmail.com
          </a>
        </section>
      </main>
    </>
  );
}
