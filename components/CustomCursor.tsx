"use client";

import { useState, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

const CURSOR_SIZE = 64;

export function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = prefersReducedMotion
    ? { damping: 100, stiffness: 1000 }
    : { damping: 28, stiffness: 350 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const hasHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    setCanHover(hasHover);
    if (!hasHover) return;

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor-card]")) setHovered(true);
    };

    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      if (
        target.closest("[data-cursor-card]") &&
        !related?.closest("[data-cursor-card]")
      ) {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [cursorX, cursorY]);

  if (!canHover || !visible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full border border-white mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        scale: hovered ? 1 : 0.125,
        opacity: 1,
      }}
      transition={
        prefersReducedMotion
          ? { duration: 0 }
          : { type: "spring", damping: 28, stiffness: 350 }
      }
    >
      {hovered && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          aria-hidden="true"
          className="text-[10px] font-medium text-white"
        >
          View
        </motion.span>
      )}
    </motion.div>
  );
}
