import React, { useEffect, useMemo, useRef, useState } from "react";
import { featuredTestimonials } from "../../data/testimonials";

type SVGProps = React.SVGProps<SVGSVGElement>;

const IconExternalLink: React.FC<SVGProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <path d="M15 3h6v6" />
    <path d="M10 14L21 3" />
  </svg>
);

const IconArrowDown: React.FC<SVGProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const IconArrowUp: React.FC<SVGProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path d="M18 15l-6-6-6 6" />
  </svg>
);

const Testimonials: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCommitIndex, setCurrentCommitIndex] = useState(0);
  const [commandTyped, setCommandTyped] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLParagraphElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const testimonialRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Observe section visibility to trigger typing animation and keyboard navigation
  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sec);
    return () => observer.disconnect();
  }, [isVisible]);

  // Enable keyboard navigation when header near top and command typed
  useEffect(() => {
    if (!isVisible || !commandTyped) return;
    const onKeyDown = (e: KeyboardEvent) => {
      // Ignore when user is typing into an input/textarea
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }
      // Allow global handler even when focus is inside the content container

      // Only when header is near the top (within 150px)
      if (!headerRef.current) return;
      const rect = headerRef.current.getBoundingClientRect();
      const headerNearTop = rect.top >= 0 && rect.top <= 150;
      if (!headerNearTop) return;

      if (e.key === "ArrowDown" || e.key === "j") {
        if (currentCommitIndex < featuredTestimonials.length - 1) {
          e.preventDefault();
          setCurrentCommitIndex((i) =>
            Math.min(i + 1, featuredTestimonials.length - 1),
          );
        }
      } else if (e.key === "ArrowUp" || e.key === "k") {
        if (currentCommitIndex > 0) {
          e.preventDefault();
          setCurrentCommitIndex((i) => Math.max(i - 1, 0));
        }
      } else if (e.key === "Home" || e.key === "g") {
        e.preventDefault();
        setCurrentCommitIndex(0);
      } else if (e.key === "End" || e.key === "G") {
        e.preventDefault();
        setCurrentCommitIndex(featuredTestimonials.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isVisible, commandTyped, currentCommitIndex]);

  // Scroll current testimonial into view (centered) within container
  useEffect(() => {
    const container = contentRef.current;
    const node = testimonialRefs.current[currentCommitIndex];
    if (!commandTyped || !container || !node) return;

    const elementOffsetTop = node.offsetTop;
    const elementHeight = node.offsetHeight;
    const containerHeight = container.offsetHeight;
    const scrollPosition =
      elementOffsetTop - containerHeight / 2 + elementHeight / 2;

    container.scrollTo({ top: scrollPosition, behavior: "smooth" });
  }, [currentCommitIndex, commandTyped]);

  // Removed internal arrow-key prevention so global handler works even when content is focused

  // Type command as soon as the section becomes visible
  useEffect(() => {
    if (isVisible && !commandTyped) {
      setCommandTyped(true);
    }
  }, [isVisible, commandTyped]);

  const visibleCommits = currentCommitIndex + 1;
  const currentTestimonial = featuredTestimonials[currentCommitIndex];

  const getBranchLabel = useMemo(
    () => (idx: number) => {
      if (idx === 0) return "(HEAD -> main, origin/main)";
      if (idx === 1) return "(origin/main)";
      return "";
    },
    [],
  );

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p
            ref={headerRef}
            className="font-mono text-terminal-green mb-2 overflow-hidden whitespace-nowrap"
          >
            <span className={isVisible ? "inline-block" : "opacity-0"}>
              $ testimonials --list --format=detailed
            </span>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-terminal-cyan">Testimonials</span>
          </h2>
        </div>

        {/* Terminal Window */}
        <div className="bg-terminal-surface border border-terminal-cyan/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.1)] mb-8">
          {/* Terminal Header */}
          <div className="bg-terminal-bg border-b border-terminal-cyan/30 px-3 md:px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5" aria-hidden="true">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-destructive/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-secondary/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-accent/80"></div>
            </div>
            <span className="font-mono text-[10px] md:text-xs text-muted-foreground ml-2 truncate">
              testimonials --output=terminal
            </span>
          </div>

          {/* Terminal Content */}
          <div
            ref={contentRef}
            className="p-4 md:p-6 lg:p-8 font-mono text-xs md:text-sm lg:text-base relative h-[400px] md:h-[500px] overflow-y-auto md:overflow-hidden select-none"
            tabIndex={0}
          >
            {commandTyped && (
              <div className="space-y-8">
                {featuredTestimonials.map((t, index) => {
                  const branchLabel = getBranchLabel(index);
                  const isCommitVisible = index <= currentCommitIndex;

                  return (
                    <div
                      key={t.id}
                      ref={(el) => (testimonialRefs.current[index] = el)}
                      className={`relative transition-all duration-300 ${
                        !isCommitVisible
                          ? "opacity-0 pointer-events-none"
                          : index === currentCommitIndex
                            ? "opacity-100 scale-[1.02]"
                            : "opacity-70"
                      }`}
                    >
                      {/* Branch marker and line */}
                      <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col items-center">
                        <div className="text-terminal-cyan">*</div>
                        {index < featuredTestimonials.length - 1 && (
                          <div className="flex-1 w-px bg-terminal-cyan/50 mt-1"></div>
                        )}
                      </div>

                      {/* Commit content */}
                      <div className="ml-4 md:ml-6 space-y-1">
                        {/* Commit hash + branch */}
                        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap text-xs md:text-sm">
                          <a
                            href={t.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-terminal-green hover:text-terminal-cyan transition-colors hover:underline break-all"
                            title="View on LinkedIn"
                          >
                            {t.commitHash}
                          </a>
                          {branchLabel && (
                            <span className="text-terminal-cyan text-[10px] md:text-xs">
                              {branchLabel}
                            </span>
                          )}
                          <span className="text-terminal-yellow text-xs md:text-sm">
                            {t.branchName}
                          </span>
                        </div>

                        {/* Author line */}
                        <div className="text-muted-foreground flex items-start md:items-center gap-1.5 md:gap-2 flex-wrap text-xs md:text-sm">
                          <span className="text-foreground/80 whitespace-nowrap">
                            Author:
                          </span>
                          <span className="break-all">
                            {t.name} &lt;{t.authorEmail}&gt;
                          </span>
                        </div>

                        {/* Date line */}
                        <div className="text-muted-foreground flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                          <span className="text-foreground/80">Date:</span>
                          <span className="text-xs md:text-sm">
                            {t.commitDate}
                          </span>
                        </div>

                        {/* Spacer */}
                        <div className="h-2"></div>

                        {/* Commit message (quote) */}
                        <div className="pl-2 md:pl-4 space-y-2">
                          <p className="text-foreground italic text-xs md:text-sm leading-relaxed">
                            &quot;{t.quote}&quot;
                          </p>
                          <div className="text-terminal-cyan text-xs md:text-sm">
                            <p>
                              — {t.name}, {t.title}
                            </p>
                            <p className="ml-2 md:ml-3">{t.company}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Navigation hint */}
            {commandTyped &&
              currentCommitIndex < featuredTestimonials.length - 1 && (
                <div className="flex items-center justify-center gap-1.5 md:gap-2 text-muted-foreground text-xs md:text-sm py-4 animate-pulse">
                  <span className="hidden md:inline">Press</span>
                  <IconArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                  <IconArrowDown className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden md:inline">to see more</span>
                  <span className="md:hidden">Scroll for more</span>
                </div>
              )}
          </div>

          {/* Terminal Footer */}
          <div className="bg-terminal-bg border-t border-terminal-cyan/30 px-3 md:px-4 py-2">
            <div className="flex items-center justify-between text-[10px] md:text-xs font-mono flex-wrap gap-2">
              <span className="text-muted-foreground">
                {visibleCommits}/{featuredTestimonials.length} commits
              </span>
              <div className="flex items-center gap-2 md:gap-4">
                <span className="text-terminal-cyan hidden md:inline">
                  ↑↓ navigate • g/G jump • j/k vim
                </span>
                <span className="text-terminal-cyan md:hidden">scroll</span>
                <span className="text-terminal-green text-[10px] md:text-xs">
                  ●{" "}
                  {currentCommitIndex < featuredTestimonials.length - 1
                    ? "MORE"
                    : "END"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* External link */}
        <div className="text-center">
          <a
            href="https://www.linkedin.com/in/andrew-dryga-bb382557/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-terminal-cyan hover:text-terminal-green transition-colors"
          >
            View all recommendations on LinkedIn
            <IconExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
