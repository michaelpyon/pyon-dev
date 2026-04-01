"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let lenis: Lenis | null = null;
    let frameId: number | null = null;

    const stop = () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
      lenis?.destroy();
      lenis = null;
      root.classList.remove("lenis", "lenis-smooth");
    };

    const tick = (time: number) => {
      lenis?.raf(time);
      if (lenis) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    const start = () => {
      if (lenis || reducedMotionQuery.matches) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      root.classList.add("lenis", "lenis-smooth");
      frameId = window.requestAnimationFrame(tick);
    };

    const sync = () => {
      if (reducedMotionQuery.matches) {
        stop();
        return;
      }
      start();
    };

    sync();

    const handleMotionChange = () => sync();
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    return () => {
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      stop();
    };
  }, []);

  return <>{children}</>;
}
