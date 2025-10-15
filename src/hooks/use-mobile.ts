import { useEffect, useState } from "react";

/**
 * useIsMobile
 * Detects whether the current viewport matches a given media query.
 *
 * Default query targets mobile screens up to 768px wide.
 *
 * Usage:
 *   const isMobile = useIsMobile(); // uses default "(max-width: 768px)"
 *   const isTabletOrSmaller = useIsMobile("(max-width: 1024px)");
 */
export function useIsMobile(query: string = "(max-width: 768px)"): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      // SSR or unsupported environment: keep default value
      return;
    }

    const media = window.matchMedia(query);

    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    // Initialize state on mount
    setIsMobile(media.matches);

    // Add event listener (support older browsers)
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", listener);
    } else {
      media.addListener(listener);
    }

    return () => {
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", listener);
      } else {
        media.removeListener(listener);
      }
    };
  }, [query]);

  return isMobile;
}
