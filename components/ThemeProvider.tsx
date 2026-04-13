"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextValue {
  night: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  night: false,
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [night, setNight] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "night") {
      setNight(true);
      document.documentElement.setAttribute("data-theme", "night");
    }
  }, []);

  const toggle = useCallback(() => {
    setNight((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.setAttribute("data-theme", "night");
        localStorage.setItem("theme", "night");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "day");
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ night, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
