import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { featuredProjects } from "@/data/projects";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loadedProjects, setLoadedProjects] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Stagger project loading animations
          featuredProjects.forEach((_, idx) => {
            setTimeout(() => {
              setLoadedProjects((prev) => [...prev, idx]);
            }, idx * 200);
          });
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section id="projects" ref={sectionRef} className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="font-mono text-terminal-green mb-2 overflow-hidden whitespace-nowrap">
            <span className="inline-block">
              $ find ./projects -type f -name "*.project"
            </span>
            <span className="inline-block ml-1">_</span>
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-terminal-green">Projects</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map((project, idx) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <Card
                className={`
                  bg-card border-border p-6 transition-all duration-300 shadow-card hover:shadow-glow hover:border-terminal-green
                  ${loadedProjects.includes(idx) ? "animate-terminal-load" : "opacity-0"}
                  relative group h-full flex flex-col
                `}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                {/* Loading indicator */}
                {loadedProjects.includes(idx) && (
                  <div className="absolute top-2 right-2">
                    <span className="text-terminal-green text-xs font-mono">
                      ✓
                    </span>
                  </div>
                )}

                {/* Selected indicator on hover */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-terminal-cyan font-mono text-lg">
                    &gt;
                  </span>
                </div>

                <div className="mb-3">
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {project.name}
                  </h3>
                  {project.period && (
                    <p className="text-xs font-mono text-foreground/60 mb-2">
                      {project.period}
                    </p>
                  )}
                  <p className="text-foreground/80 mb-3">
                    {project.description}
                  </p>
                </div>

                <div className="flex-1">
                  <ul className="space-y-1 mb-4">
                    {project.impact.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-foreground/90 font-mono flex items-start"
                      >
                        <span className="text-terminal-green mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="text-xs bg-muted/80 text-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors border border-border/50"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {project.links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {project.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm font-mono text-terminal-cyan hover:text-terminal-green transition-colors"
                      >
                        {link.type === "github" ? (
                          <Github className="w-4 h-4" />
                        ) : (
                          <ExternalLink className="w-4 h-4" />
                        )}
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-terminal-cyan hover:text-terminal-green transition-colors"
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
