"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { night, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={night}
      aria-label={night ? "Switch to day mode" : "Switch to night mode"}
      className="fixed z-50 size-11 flex items-center justify-center rounded-full bg-surface hover:bg-surface-hover border border-border transition-colors duration-300"
      style={{
        top: "calc(env(safe-area-inset-top, 0px) + 1.5rem)",
        right: "calc(env(safe-area-inset-right, 0px) + 1.5rem)",
      }}
    >
      <span
        aria-hidden="true"
        className="text-text-muted text-sm transition-transform duration-300"
        style={{ transform: night ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        {night ? "\u2600" : "\u263D"}
      </span>
    </button>
  );
}
