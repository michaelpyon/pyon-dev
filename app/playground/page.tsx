import { ThemeToggle } from "@/components/ThemeToggle";
import { PlaygroundContent } from "./PlaygroundContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description:
    "Browser games, instruments, and interactive experiments by Michael Pyon. Everything runs client-side.",
};

export default function PlaygroundPage() {
  return (
    <>
      <ThemeToggle />
      <PlaygroundContent />
    </>
  );
}
