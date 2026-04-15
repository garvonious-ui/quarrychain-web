import TocSidebar from "./TocSidebar";
import MobileTocDrawer from "./MobileTocDrawer";

/**
 * Two-column layout for the litepaper:
 *   [ TOC sidebar (220px, sticky) ] [ content (1fr) ]
 *
 * On mobile (<lg) the sticky sidebar is hidden; MobileTocDrawer renders
 * a floating Contents button + slide-out sheet instead.
 */
export default function LitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-[220px_1fr] gap-8 lg:gap-16">
        <TocSidebar />
        {/* min-w-0 lets the content cell shrink properly inside the grid */}
        <div className="min-w-0">{children}</div>
      </div>
      <MobileTocDrawer />
    </div>
  );
}
