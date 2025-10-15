import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type NavLink = {
  name: string;
  href: string;
  external?: boolean;
};

export interface MobileNavProps {
  links?: NavLink[];
  /**
   * Optional className applied to the root wrapper (which contains the button).
   */
  className?: string;
  /**
   * Controls whether to render the overlay behind the panel.
   * Defaults to true to match design semantics.
   */
  overlay?: boolean;
}

/**
 * MobileNav
 * - React island for Astro
 * - Matches existing design semantics (terminal aesthetic, tokens)
 * - Accessibility: aria-expanded, aria-controls, Esc to close, focus trap
 * - Smooth-scroll for same-page anchors
 * - Locks body scroll while menu open
 */
const MobileNav: React.FC<MobileNavProps> = ({
  className,
  overlay = true,
  links,
}) => {
  const defaultLinks = useMemo<NavLink[]>(
    () => [
      { name: "Home", href: "/" },
      // Keep About page as a first-class route (we ship /about)
      { name: "About", href: "/#about" },
      { name: "Projects", href: "/projects" },
      { name: "Blog", href: "/blog" },
      // Optional anchors for parity with previous site
      { name: "Contact", href: "/#contact" },
    ],
    [],
  );

  const navLinks = links && links.length ? links : defaultLinks;

  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>("/");
  const panelRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentPath(window.location.pathname);
  }, []);

  // Lock scroll when menu open
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (open) {
      root.classList.add("overflow-hidden");
    } else {
      root.classList.remove("overflow-hidden");
    }
    return () => {
      root.classList.remove("overflow-hidden");
    };
  }, [open, mounted]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey, { capture: true });
    return () =>
      document.removeEventListener("keydown", onKey, { capture: true as any });
  }, [open]);

  // Focus trap inside panel
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    const getFocusables = () =>
      Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"),
      );

    const focusables = getFocusables();
    // Focus first focusable when opening
    (focusables[0] ?? panel).focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const nodes = getFocusables();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first || active === panel) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    panel.addEventListener("keydown", handleTab);
    return () => panel.removeEventListener("keydown", handleTab);
  }, [open]);

  const isActive = useCallback(
    (href: string) => {
      if (!mounted) return false;
      if (href === "/") return currentPath === "/";
      if (href.startsWith("/blog")) return currentPath.startsWith("/blog");
      if (href.startsWith("/about")) return currentPath.startsWith("/about");
      if (href.startsWith("/#")) {
        // Section highlighting only on home
        const section = href.slice(2);
        if (currentPath !== "/") return false;
        // Best-effort: highlight if element is in viewport range
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.4 && rect.bottom > 80;
      }
      return currentPath === href;
    },
    [currentPath, mounted],
  );

  const smoothScrollToId = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    return true;
  };

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    external?: boolean,
  ) => {
    if (external) return; // allow default
    if (href.startsWith("#")) {
      e.preventDefault();
      smoothScrollToId(href.slice(1));
      setOpen(false);
      return;
    }
    if (href.startsWith("/#")) {
      e.preventDefault();
      const id = href.slice(2);
      if (window.location.pathname !== "/") {
        // Navigate to home, then smooth-scroll
        window.location.assign(`/${id ? `#${id}` : ""}`);
      } else {
        smoothScrollToId(id);
      }
      setOpen(false);
      return;
    }
    // For normal internal navigation, let browser handle it
    setOpen(false);
  };

  return (
    <div className={["md:hidden", className].filter(Boolean).join(" ")}>
      {/* Toggle button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:text-terminal-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-terminal-cyan transition-colors"
      >
        {/* Icon: Menu / Close */}
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        {!open ? (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        ) : (
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Overlay */}
      {overlay && (
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-down panel */}
      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        className={[
          "fixed z-50 left-0 right-0 top-0",
          "mt-16", // assumes header height ~64px; adjust if needed where used
          "origin-top border-t border-border",
          "bg-background/95 backdrop-blur-lg",
          "transition-transform duration-200 ease-out will-change-transform",
          open
            ? "translate-y-0"
            : "-translate-y-2 pointer-events-none opacity-0",
          "focus:outline-none",
        ].join(" ")}
        tabIndex={-1}
      >
        <nav className="px-4 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) =>
                      handleLinkClick(e, link.href, link.external)
                    }
                    className={[
                      "block py-2 px-2 rounded-md font-mono text-sm transition-colors",
                      active
                        ? "text-terminal-cyan bg-terminal-cyan/10 border border-terminal-cyan/30"
                        : "text-muted-foreground hover:text-terminal-green hover:border-terminal-green/60 border border-transparent",
                    ].join(" ")}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Decorative footer line */}
          <div className="mt-4 font-mono text-terminal-cyan/50 text-xs">
            <span className="animate-pulse">&gt;_</span> Navigate with
            confidence
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNav;
