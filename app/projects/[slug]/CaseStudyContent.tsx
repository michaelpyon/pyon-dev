import dynamic from "next/dynamic";

const mdxComponents: Record<string, React.ComponentType> = {
  "festival-optimizer": dynamic(
    () => import("@/content/projects/festival-optimizer.mdx")
  ),
  "menswear-market-pulse": dynamic(
    () => import("@/content/projects/menswear-market-pulse.mdx")
  ),
  "shock-cascade": dynamic(
    () => import("@/content/projects/shock-cascade.mdx")
  ),
};

export function CaseStudyContent({ slug }: { slug: string }) {
  const Component = mdxComponents[slug];

  if (!Component) {
    return (
      <p className="text-text-muted">Case study content coming soon.</p>
    );
  }

  return <Component />;
}
