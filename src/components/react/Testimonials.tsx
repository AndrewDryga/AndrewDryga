import { useState, useEffect, useRef } from "react";
import { featuredTestimonials } from "@/data/testimonials";
import { ExternalLink, ArrowDown, ArrowUp } from "lucide-react";

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentCommitIndex, setCurrentCommitIndex] = useState(0);
  const [commandTyped, setCommandTyped] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const testimonialRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Keyboard navigation
  useEffect(() => {
    if (!isVisible || !commandTyped) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing or focused on an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      // Don't intercept if the event target is inside the scrollable content
      if (contentRef.current?.contains(e.target as Node)) {
        return;
      }

      // Check if git command header is near the top of viewport
      if (!headerRef.current) return;

      const rect = headerRef.current.getBoundingClientRect();

      // Enable when header is near the top (within 150px from top)
      const isHeaderNearTop = rect.top >= 0 && rect.top <= 150;

      if (!isHeaderNearTop) return;

      if (e.key === "ArrowDown" || e.key === "j") {
        if (currentCommitIndex < featuredTestimonials.length - 1) {
          e.preventDefault();
          setCurrentCommitIndex((prev) =>
            Math.min(prev + 1, featuredTestimonials.length - 1),
          );
        }
      } else if (e.key === "ArrowUp" || e.key === "k") {
        if (currentCommitIndex > 0) {
          e.preventDefault();
          setCurrentCommitIndex((prev) => Math.max(prev - 1, 0));
        }
      } else if (e.key === "Home" || e.key === "g") {
        e.preventDefault();
        setCurrentCommitIndex(0);
      } else if (e.key === "End" || e.key === "G") {
        e.preventDefault();
        setCurrentCommitIndex(featuredTestimonials.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isVisible, commandTyped, currentCommitIndex]);

  // Scroll to current testimonial within container
  useEffect(() => {
    if (
      commandTyped &&
      testimonialRefs.current[currentCommitIndex] &&
      contentRef.current
    ) {
      const testimonialElement = testimonialRefs.current[currentCommitIndex];
      const containerElement = contentRef.current;

      if (testimonialElement && containerElement) {
        const elementOffsetTop = testimonialElement.offsetTop;
        const elementHeight = testimonialElement.offsetHeight;
        const containerHeight = containerElement.offsetHeight;

        // Center the testimonial in the viewport
        const scrollPosition =
          elementOffsetTop - containerHeight / 2 + elementHeight / 2;

        containerElement.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }
    }
  }, [currentCommitIndex, commandTyped]);

  // Prevent arrow keys only - allow scroll to pass through
  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const preventArrowScroll = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight"
      ) {
        e.preventDefault();
      }
    };

    container.addEventListener("keydown", preventArrowScroll);
    return () => container.removeEventListener("keydown", preventArrowScroll);
  }, []);

  // Type command immediately when visible
  useEffect(() => {
    if (isVisible && !commandTyped) {
      setCommandTyped(true);
    }
  }, [isVisible, commandTyped]);

  const visibleCommits = currentCommitIndex + 1;
  const currentTestimonial = featuredTestimonials[currentCommitIndex];

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <p
            ref={headerRef}
            className="font-mono text-terminal-green mb-2 overflow-hidden whitespace-nowrap"
          >
            <span className="inline-block">
              $ testimonials --list --format=detailed
            </span>
            <span className="inline-block ml-1">_</span>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-terminal-cyan">Testimonials</span>
          </h2>
        </div>

        {/* Terminal Window */}
        <div className="bg-terminal-surface border border-terminal-cyan/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.1)] mb-8">
          {/* Terminal Header */}
          <div className="bg-terminal-bg border-b border-terminal-cyan/30 px-3 md:px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
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
            className="p-4 md:p-6 lg:p-8 font-mono text-xs md:text-sm lg:text-base relative h-[400px] md:h-[500px] overflow-y-auto md:overflow-hidden select-none"
            ref={contentRef}
          >
            {commandTyped && (
              <div className="space-y-8">
                {featuredTestimonials.map((testimonial, index) => {
                  const getBranchLabel = (idx: number) => {
                    if (idx === 0) return "(HEAD -> main, origin/main)";
                    if (idx === 1) return "(origin/main)";
                    return "";
                  };

                  const isVisible = index <= currentCommitIndex;

                  return (
                    <div
                      key={testimonial.id}
                      ref={(el) => (testimonialRefs.current[index] = el)}
                      className={`relative transition-all duration-300 ${
                        !isVisible
                          ? "opacity-0 pointer-events-none"
                          : index === currentCommitIndex
                            ? "opacity-100 scale-[1.02]"
                            : "opacity-70"
                      }`}
                    >
                      {/* Branch line */}
                      <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col items-center">
                        <div className="text-terminal-cyan">*</div>
                        {index < featuredTestimonials.length - 1 && (
                          <div className="flex-1 w-px bg-terminal-cyan/50 mt-1"></div>
                        )}
                      </div>

                      {/* Commit content */}
                      <div className="ml-4 md:ml-6 space-y-1">
                        {/* Commit hash and branch */}
                        <div className="flex items-center gap-1.5 md:gap-2 flex-wrap text-xs md:text-sm">
                          <a
                            href={testimonial.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-terminal-green hover:text-terminal-cyan transition-colors hover:underline break-all"
                            title="View on LinkedIn"
                          >
                            {testimonial.commitHash}
                          </a>
                          {getBranchLabel(index) && (
                            <span className="text-terminal-cyan text-[10px] md:text-xs">
                              {getBranchLabel(index)}
                            </span>
                          )}
                          <span className="text-terminal-yellow text-xs md:text-sm">
                            {testimonial.branchName}
                          </span>
                        </div>

                        {/* Author line */}
                        <div className="text-muted-foreground flex items-start md:items-center gap-1.5 md:gap-2 flex-wrap text-xs md:text-sm">
                          <span className="text-foreground/80 whitespace-nowrap">
                            Author:
                          </span>
                          <span className="break-all">
                            {testimonial.name} &lt;{testimonial.authorEmail}&gt;
                          </span>
                        </div>

                        {/* Date line */}
                        <div className="text-muted-foreground flex items-center gap-1.5 md:gap-2 text-xs md:text-sm">
                          <span className="text-foreground/80">Date:</span>
                          <span className="text-xs md:text-sm">
                            {testimonial.commitDate}
                          </span>
                        </div>

                        {/* Empty line */}
                        <div className="h-2"></div>

                        {/* Commit message (quote) */}
                        <div className="pl-2 md:pl-4 space-y-2">
                          <p className="text-foreground italic text-xs md:text-sm leading-relaxed">
                            "{testimonial.quote}"
                          </p>
                          <div className="text-terminal-cyan text-xs md:text-sm">
                            <p>
                              — {testimonial.name}, {testimonial.title}
                            </p>
                            <p className="ml-2 md:ml-3">
                              {testimonial.company}
                            </p>
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
                  <ArrowUp className="w-3 h-3 md:w-4 md:h-4" />
                  <ArrowDown className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden md:inline">to see more</span>
                  <span className="md:hidden">Scroll for more</span>
                </div>
              )}
          </div>

          {/* Terminal Footer */}
          <div className="bg-terminal-bg border-t border-terminal-cyan/30 px-3 md:px-4 py-2">
            <div className="flex items-center justify-between text-[10px] md:text-xs font-mono flex-wrap gap-2">
              <span className="text-muted-foreground">
                {currentCommitIndex + 1}/{featuredTestimonials.length} commits
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

        <div className="text-center">
          <a
            href="https://www.linkedin.com/in/andrew-dryga-bb382557/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-mono text-terminal-cyan hover:text-terminal-green transition-colors"
          >
            View all recommendations on LinkedIn
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
