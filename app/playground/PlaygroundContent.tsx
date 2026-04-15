"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const categories = [
  {
    label: "Music & Sound",
    description: "Instruments and rhythm games that run in your browser.",
    items: [
      {
        name: "Air Composer",
        tagline:
          "Play a theremin with your hands using just a webcam. Wave to make music.",
        stack: ["TypeScript", "MediaPipe", "Web Audio API"],
        url: "https://air-composer.vercel.app",
        status: "live" as const,
        desktopOnly: true,
        desktopNote: "Requires webcam",
      },
      {
        name: "Keyboard Drummer",
        tagline:
          "Turn your keyboard into a drum kit. Five songs. Rhythm scoring. Full session playback.",
        stack: ["JavaScript", "Web Audio API"],
        url: "https://keyboard-drummer.vercel.app",
        status: "live" as const,
        desktopOnly: true,
        desktopNote: "Desktop recommended",
      },
      {
        name: "Popup Beat Panic",
        tagline:
          "Hit the pads before they vanish. Rhythm meets reflex in a beat-based browser game.",
        stack: ["JavaScript", "Web Audio API", "Canvas"],
        url: "https://michaelpyon.github.io/popup-beat-panic/",
        status: "live" as const,
        desktopOnly: false,
      },
      {
        name: "Jazz Guitar Solo",
        tagline:
          "Improvise jazz guitar lines over chord changes. AI-assisted scale suggestions.",
        stack: ["JavaScript", "Web Audio API", "Tone.js"],
        url: null,
        status: "coming-soon" as const,
        desktopOnly: false,
      },
    ],
  },
  {
    label: "Games",
    description: "Browser-based games. No installs, no accounts.",
    items: [
      {
        name: "Bomb Council",
        tagline:
          "Multiplayer deduction game. Find the bomber before time runs out. Bluffing required.",
        stack: ["JavaScript", "WebSocket", "Canvas"],
        url: null,
        status: "coming-soon" as const,
        desktopOnly: false,
      },
      {
        name: "Freeze Frame",
        tagline:
          "Spot-the-difference meets speed run. Freeze the frame, find what changed.",
        stack: ["JavaScript", "Canvas", "React"],
        url: null,
        status: "coming-soon" as const,
        desktopOnly: false,
      },
    ],
  },
  {
    label: "Data Viz",
    description: "Interactive visualizations and data experiments.",
    items: [
      {
        name: "The Low Line",
        tagline:
          "Real-time severity scores for every NYC subway line. Updated continuously.",
        stack: ["React", "MTA API", "Node.js"],
        url: "https://subway-shame.vercel.app",
        status: "live" as const,
        desktopOnly: false,
      },
      {
        name: "Kinetic Grid",
        tagline:
          "Physics-based particle grid that reacts to your cursor. Satisfying emergent patterns.",
        stack: ["JavaScript", "Canvas", "Physics Engine"],
        url: null,
        status: "coming-soon" as const,
        desktopOnly: true,
        desktopNote: "Desktop only",
      },
      {
        name: "Political Kinetic Grid",
        tagline:
          "Kinetic Grid meets election data. Watch voting patterns ripple through a force-directed field.",
        stack: ["JavaScript", "Canvas", "D3.js"],
        url: null,
        status: "coming-soon" as const,
        desktopOnly: true,
        desktopNote: "Desktop only",
      },
    ],
  },
];

interface PlaygroundItem {
  name: string;
  tagline: string;
  stack: string[];
  url: string | null;
  status: "live" | "coming-soon";
  desktopOnly: boolean;
  desktopNote?: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedCardVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const headingVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

const reducedHeadingVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

function PlaygroundCard({
  item,
  prefersReducedMotion,
}: {
  item: PlaygroundItem;
  prefersReducedMotion: boolean | null;
}) {
  const isLive = item.status === "live";

  return (
    <motion.a
      href={isLive ? (item.url ?? undefined) : undefined}
      target={isLive ? "_blank" : undefined}
      rel={isLive ? "noopener noreferrer" : undefined}
      data-cursor-card={isLive ? true : undefined}
      aria-label={`${item.name} — ${isLive ? "Live" : "Coming soon"}`}
      variants={prefersReducedMotion ? reducedCardVariants : cardVariants}
      whileHover={
        isLive && !prefersReducedMotion
          ? { y: -3 }
          : undefined
      }
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative block rounded-lg border overflow-hidden ${
        isLive
          ? "border-border bg-surface hover:bg-surface-hover hover:border-border-hover"
          : "border-border bg-surface opacity-50 cursor-default"
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-sm font-medium text-text tracking-tight sm:text-base">
            {item.name}
          </h3>
          <div className="flex items-center gap-2 shrink-0 ml-3">
            {item.desktopOnly && isLive && (
              <span
                className="text-[9px] text-text-subtle tracking-wide px-1.5 py-0.5 rounded border border-border bg-bg"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {item.desktopNote || "Desktop"}
              </span>
            )}
            {isLive ? (
              <span className="flex items-center gap-1">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-accent/70"
                />
                <span
                  className="text-[10px] font-medium tracking-wide uppercase text-accent"
                  style={{ fontFamily: "var(--font-mono)" }}
                >
                  Play
                </span>
              </span>
            ) : (
              <span
                className="text-[10px] text-text-subtle font-medium tracking-wide uppercase"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                Soon
              </span>
            )}
          </div>
        </div>

        <p
          className={`text-xs leading-relaxed mb-4 ${isLive ? "text-text-muted" : "text-text-subtle"}`}
        >
          {item.tagline}
        </p>

        <div className="flex flex-wrap gap-1.5">
          {item.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] text-text-subtle tracking-wide px-1.5 py-0.5 rounded bg-bg/50 border border-border"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export function PlaygroundContent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
    >
      <header className="px-6 pt-16 pb-16 max-w-5xl mx-auto sm:pt-20 sm:pb-20">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-subtle text-xs tracking-wide hover:text-accent transition-colors duration-200 mb-10 group"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden="true"
            className="group-hover:-translate-x-1 transition-transform duration-200"
          >
            &larr;
          </span>
          pyon.dev
        </Link>

        <motion.div
          initial={
            prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
          }
          animate={
            prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }
          }
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1,
          }}
        >
          <h1
            className="font-display italic text-4xl sm:text-5xl lg:text-6xl text-text leading-[0.92] mb-5"
            style={{ letterSpacing: "-0.03em" }}
          >
            Playground
          </h1>
          <p className="text-text-muted text-sm sm:text-base leading-relaxed max-w-md">
            Browser games, instruments, and interactive experiments. Everything
            runs client-side. No accounts, no installs.
          </p>
        </motion.div>
      </header>

      <main id="main-content" className="px-6 max-w-5xl mx-auto pb-24">
        <div className="space-y-24 sm:space-y-32">
          {categories.map((category) => (
            <section
              key={category.label}
              role="region"
              aria-label={category.label}
            >
              <motion.div
                variants={
                  prefersReducedMotion
                    ? reducedHeadingVariants
                    : headingVariants
                }
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="mb-6 border-b border-border pb-3"
              >
                <h2
                  className="font-label text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted"
                >
                  {category.label}
                </h2>
                <p className="text-text-muted text-xs mt-1">
                  {category.description}
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {category.items.map((item) => (
                  <PlaygroundCard
                    key={item.name}
                    item={item}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                ))}
              </motion.div>
            </section>
          ))}
        </div>
      </main>
    </motion.div>
  );
}
