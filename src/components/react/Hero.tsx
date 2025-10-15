import { Github, Linkedin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-16 md:py-24">
      <div className="max-w-4xl w-full">
        <div className="space-y-8 md:space-y-10 animate-fade-in">
          {/* Terminal-style header */}
          <div className="font-mono text-sm text-terminal-green">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-terminal-cyan">~</span>
              <span className="animate-pulse">▊</span>
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold font-sans">
              <span className="text-foreground">Andrew</span>{" "}
              <span className="text-terminal-cyan">Dryga</span>
            </h1>
            <p className="text-2xl md:text-3xl text-muted-foreground font-mono">
              {'>'} Founding Engineer
            </p>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            I lead engineering and bring value to the business by turning fragile systems into reliable, 
            observable, cost-sane platforms—shipping what matters, measuring results, and cutting waste 
            without slowing teams.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4">
            <Button 
              asChild
              size="lg"
              className="font-mono border-2 border-terminal-cyan bg-transparent text-terminal-cyan hover:bg-terminal-cyan hover:text-background transition-all shadow-glow w-full sm:w-auto"
            >
              <a href="https://github.com/andrewDryga" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
            
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="font-mono border-2 border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-background transition-all w-full sm:w-auto"
            >
              <a href="https://www.linkedin.com/in/andrew-dryga-bb382557/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>

            <Button 
              asChild
              size="lg"
              variant="outline"
              className="font-mono border-2 border-terminal-yellow text-terminal-yellow hover:bg-terminal-yellow hover:text-background transition-all w-full sm:w-auto"
            >
              <a href="/blog">
                <FileText className="mr-2 h-5 w-5" />
                Blog
              </a>
            </Button>
          </div>

          {/* Decorative element */}
          <div className="pt-4 font-mono text-terminal-cyan/50 text-sm">
            <span className="animate-pulse">&gt;_</span> Building the future, one commit at a time
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
