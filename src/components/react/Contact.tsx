import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-16 md:py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 animate-fade-in">
          <p className="font-mono text-terminal-green mb-2">
            $ cat contact.txt
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get in <span className="text-terminal-green">Touch</span>
          </h2>
        </div>

        {/* Terminal Console Box */}
        <div className="relative overflow-hidden p-6 rounded-lg bg-terminal-surface border border-terminal-cyan/30 font-mono text-sm">
          <div className="space-y-2">
            <div className="text-terminal-green">
              $ cat contacts.txt | grep email
            </div>
            <div className="text-foreground/90">
              Email:{" "}
              <a
                href="mailto:andrew@dryga.com"
                className="text-terminal-cyan hover:text-terminal-green transition-colors"
              >
                andrew@dryga.com
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="space-y-4 mt-12">
          <h3 className="font-mono text-sm text-muted-foreground">
            Find me online
          </h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/andrewdryga"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-terminal-cyan transition-all"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 text-muted-foreground hover:text-terminal-cyan transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/andrew-dryga-bb382557/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-terminal-green transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-terminal-green transition-colors" />
            </a>
            <a
              href="https://twitter.com/andrew_dryga"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-terminal-cyan transition-all"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-terminal-cyan transition-colors" />
            </a>
            <a
              href="https://facebook.com/andrew.dryga"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-terminal-green transition-all"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-terminal-green transition-colors" />
            </a>
            <a
              href="https://www.instagram.com/andrew_dryga/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-terminal-yellow transition-all"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-terminal-yellow transition-colors" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCIpDrdCfu9LscfqmVSUy43g"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-card border border-border hover:border-terminal-cyan transition-all"
              aria-label="YouTube"
            >
              <Youtube className="h-5 w-5 text-muted-foreground hover:text-terminal-cyan transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
