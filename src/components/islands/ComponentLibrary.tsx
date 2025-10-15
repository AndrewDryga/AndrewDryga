import React, { useState, useEffect } from "react";
import {
  SequenceDiagram,
  Participant,
  Participants,
  Messages,
  Message,
  SelfCall,
  Note,
  ActivationBox,
} from "@/components/react/SequenceDiagram";
import { TerminalPrompt } from "@/components/react/TerminalPrompt";
import { SectionHeader } from "@/components/react/SectionHeader";
import { CodeExample } from "@/components/react/CodeExample";
import { DoAndDont } from "@/components/react/DoAndDont";
import { TerminalSpinner } from "@/components/react/TerminalSpinner";
import { TerminalProgressBar } from "@/components/react/TerminalProgressBar";
import { EmptyState } from "@/components/react/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  AlertCircle,
  Search,
  FileX,
  WifiOff,
  Shield,
  Database,
} from "lucide-react";
type AnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { to?: string };
const Link = ({ to, href, ...rest }: AnchorProps) => (
  <a href={to ?? href} {...rest} />
);
const Navigation: React.FC = () => null;

const TypingAnimation = ({ texts }: { texts: string[] }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < text.length) {
            setCurrentText(text.substring(0, currentText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(text.substring(0, currentText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((currentTextIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts]);

  return (
    <span className="font-mono text-terminal-green">
      {currentText}
      <span className="animate-pulse">_</span>
    </span>
  );
};

const ComponentLibrary = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    framework: "react",
    newsletter: false,
    experience: "intermediate",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select an option");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-24">
          <TerminalPrompt command="ls -la ~/components/" className="mb-4" />
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            Component Library
          </h1>
          <p className="text-muted-foreground font-mono mb-6 max-w-3xl">
            A comprehensive terminal-themed UI component collection. All
            components use semantic tokens and Tailwind CSS.
          </p>
          <div className="inline-block border border-border rounded-lg p-6 bg-card">
            <div className="font-mono text-sm space-y-1">
              <div>
                <span className="text-terminal-cyan">drwxr-xr-x</span>{" "}
                <span className="text-terminal-green">typography/</span>
              </div>
              <div>
                <span className="text-terminal-cyan">drwxr-xr-x</span>{" "}
                <span className="text-terminal-green">buttons/</span>
              </div>
              <div>
                <span className="text-terminal-cyan">drwxr-xr-x</span>{" "}
                <span className="text-terminal-green">cards/</span>
              </div>
              <div>
                <span className="text-terminal-cyan">drwxr-xr-x</span>{" "}
                <span className="text-terminal-green">forms/</span>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Identity Section */}
        <section className="mb-24">
          <SectionHeader
            title="Brand Identity"
            command="cat brand/identity.md"
          />

          {/* Logo Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Logo & Brand Mark
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-primary rounded-lg p-8 bg-card">
                <div className="font-mono text-3xl text-primary mb-4">$ _</div>
                <p className="text-sm text-muted-foreground">
                  Primary logo mark - Terminal cursor
                </p>
                <code className="text-xs text-terminal-cyan mt-2 block">
                  Usage: Headers, navigation
                </code>
              </div>
              <div className="border border-border rounded-lg p-8 bg-card">
                <div className="font-mono text-2xl text-foreground">
                  ~/andrewdryga<span className="text-primary">_</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Full brand wordmark
                </p>
                <code className="text-xs text-terminal-cyan mt-2 block">
                  Usage: Footer, marketing
                </code>
              </div>
            </div>
          </div>

          {/* Design Principles */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Design Principles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-primary font-mono text-xl">▸</span>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      Clarity through Minimalism
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Remove unnecessary elements. Every pixel serves a purpose.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-accent font-mono text-xl">▸</span>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      Terminal Authenticity
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Stay true to CLI aesthetics. Monospace fonts, command
                      prompts, cursor.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-secondary font-mono text-xl">▸</span>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      Functional Aesthetics
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Beautiful because it works. Form follows function.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-terminal-cyan font-mono text-xl">
                    ▸
                  </span>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">
                      Consistent Rhythm
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Spacing, timing, and typography create visual harmony.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Voice & Tone */}
          <div className="border border-border rounded-lg p-6 bg-card">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Voice & Tone
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <div className="inline-block px-3 py-1 rounded bg-accent/10 text-accent text-sm font-mono mb-2">
                    ✓ Do
                  </div>
                  <p className="text-sm text-foreground font-mono">
                    $ deploy --production
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Concise, technical, actionable
                  </p>
                </div>
                <div className="w-1/2">
                  <div className="inline-block px-3 py-1 rounded bg-destructive/10 text-destructive text-sm font-mono mb-2">
                    × Don't
                  </div>
                  <p className="text-sm text-foreground font-mono">
                    Please click here to deploy to production!
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Verbose, overly friendly, unclear
                  </p>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">
                    Terminal-inspired:
                  </span>{" "}
                  Brief, precise, developer-focused.
                  <span className="font-bold text-foreground ml-4">
                    Technical yet friendly:
                  </span>{" "}
                  Helpful without being condescending.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Spacing System Section */}
        <section className="mb-24">
          <SectionHeader
            title="Spacing System"
            command="cat design/spacing.config"
          />

          {/* Spacing Scale */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Spacing Scale
            </h3>
            <div className="space-y-3 bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-4">
                <code className="text-sm font-mono text-terminal-cyan w-20">
                  xs (4px)
                </code>
                <div className="h-4 bg-primary" style={{ width: "4px" }}></div>
                <code className="text-xs text-muted-foreground">
                  0.25rem - Tight spacing, icon gaps
                </code>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-sm font-mono text-terminal-cyan w-20">
                  sm (8px)
                </code>
                <div className="h-4 bg-primary" style={{ width: "8px" }}></div>
                <code className="text-xs text-muted-foreground">
                  0.5rem - Small gaps, inline elements
                </code>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-sm font-mono text-terminal-cyan w-20">
                  base (16px)
                </code>
                <div className="h-4 bg-primary" style={{ width: "16px" }}></div>
                <code className="text-xs text-muted-foreground">
                  1rem - Default spacing unit
                </code>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-sm font-mono text-terminal-cyan w-20">
                  md (24px)
                </code>
                <div className="h-4 bg-primary" style={{ width: "24px" }}></div>
                <code className="text-xs text-muted-foreground">
                  1.5rem - Component spacing
                </code>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-sm font-mono text-terminal-cyan w-20">
                  lg (32px)
                </code>
                <div className="h-4 bg-primary" style={{ width: "32px" }}></div>
                <code className="text-xs text-muted-foreground">
                  2rem - Section internal spacing
                </code>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-sm font-mono text-terminal-cyan w-20">
                  xl (48px)
                </code>
                <div className="h-4 bg-primary" style={{ width: "48px" }}></div>
                <code className="text-xs text-muted-foreground">
                  3rem - Large component gaps
                </code>
              </div>
              <div className="flex items-center gap-4">
                <code className="text-sm font-mono text-terminal-cyan w-20">
                  2xl (64px)
                </code>
                <div className="h-4 bg-primary" style={{ width: "64px" }}></div>
                <code className="text-xs text-muted-foreground">
                  4rem - Section dividers
                </code>
              </div>
            </div>
          </div>

          {/* Vertical Rhythm */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Vertical Rhythm Guide
            </h3>
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="space-y-8">
                <div>
                  <div className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-mono mb-4">
                    Section Spacing
                  </div>
                  <div className="border-l-2 border-primary pl-4 space-y-4">
                    <code className="block text-sm font-mono text-foreground">
                      mb-16 (4rem) - Between major sections
                    </code>
                    <code className="block text-sm font-mono text-foreground">
                      mb-24 (6rem) - Between content areas
                    </code>
                    <div className="h-24 bg-primary/10 rounded border-2 border-dashed border-primary/30 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-mono">
                        96px vertical space
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-block px-3 py-1 rounded bg-accent/10 text-accent text-xs font-mono mb-4">
                    Component Spacing
                  </div>
                  <div className="border-l-2 border-accent pl-4 space-y-3">
                    <code className="block text-sm font-mono text-foreground">
                      mb-6 (1.5rem) - Between related components
                    </code>
                    <code className="block text-sm font-mono text-foreground">
                      mb-8 (2rem) - Component groups
                    </code>
                    <div className="h-12 bg-accent/10 rounded border-2 border-dashed border-accent/30 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-mono">
                        48px vertical space
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="inline-block px-3 py-1 rounded bg-secondary/10 text-secondary text-xs font-mono mb-4">
                    Element Spacing
                  </div>
                  <div className="border-l-2 border-secondary pl-4 space-y-2">
                    <code className="block text-sm font-mono text-foreground">
                      mb-2 (0.5rem) - Tight element spacing
                    </code>
                    <code className="block text-sm font-mono text-foreground">
                      mb-4 (1rem) - Standard element spacing
                    </code>
                    <div className="h-6 bg-secondary/10 rounded border-2 border-dashed border-secondary/30 flex items-center justify-center">
                      <span className="text-xs text-muted-foreground font-mono">
                        24px vertical space
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Container & Layout */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Container & Layout Spacing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-border rounded-lg p-4 bg-card">
                <code className="text-sm font-mono text-primary block mb-2">
                  max-w-6xl
                </code>
                <p className="text-xs text-muted-foreground">
                  Large content (1152px)
                </p>
                <p className="text-xs text-foreground mt-2">
                  Use for: Main layouts
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <code className="text-sm font-mono text-primary block mb-2">
                  max-w-4xl
                </code>
                <p className="text-xs text-muted-foreground">
                  Reading width (896px)
                </p>
                <p className="text-xs text-foreground mt-2">
                  Use for: Blog posts, text
                </p>
              </div>
              <div className="border border-border rounded-lg p-4 bg-card">
                <code className="text-sm font-mono text-primary block mb-2">
                  max-w-2xl
                </code>
                <p className="text-xs text-muted-foreground">
                  Narrow content (672px)
                </p>
                <p className="text-xs text-foreground mt-2">
                  Use for: Forms, cards
                </p>
              </div>
            </div>
            <div className="mt-4 bg-card border border-border rounded-lg p-6">
              <h4 className="font-bold text-foreground mb-3">
                Padding Guidelines
              </h4>
              <div className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <code className="text-terminal-cyan">px-4</code>
                  <code className="text-muted-foreground">
                    Mobile containers
                  </code>
                </div>
                <div className="flex justify-between">
                  <code className="text-terminal-cyan">px-6</code>
                  <code className="text-muted-foreground">
                    Tablet containers
                  </code>
                </div>
                <div className="flex justify-between">
                  <code className="text-terminal-cyan">px-8</code>
                  <code className="text-muted-foreground">
                    Desktop containers
                  </code>
                </div>
                <div className="flex justify-between">
                  <code className="text-terminal-cyan">
                    gap-4, gap-6, gap-8
                  </code>
                  <code className="text-muted-foreground">
                    Grid/flex spacing
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Typography Section */}
        <section className="mb-24">
          <SectionHeader
            title="Typography System"
            command="cat typography/system.md"
          />

          {/* Type Scale */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Type Scale & Hierarchy
            </h3>
            <div className="space-y-6 bg-card border border-border rounded-lg p-6">
              <div className="border-b border-border pb-4">
                <p className="text-6xl font-bold text-foreground mb-2">
                  Display XL
                </p>
                <code className="text-xs text-muted-foreground">
                  text-6xl font-bold - Hero sections, landing pages
                </code>
              </div>
              <div className="border-b border-border pb-4">
                <h1 className="text-5xl font-bold text-foreground mb-2">
                  Display Large
                </h1>
                <code className="text-xs text-muted-foreground">
                  text-5xl font-bold - Page titles, main headings
                </code>
              </div>
              <div className="border-b border-border pb-4">
                <h2 className="text-4xl font-bold text-foreground mb-2">
                  Heading 1
                </h2>
                <code className="text-xs text-muted-foreground">
                  text-4xl font-bold - Section headings
                </code>
              </div>
              <div className="border-b border-border pb-4">
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  Heading 2
                </h3>
                <code className="text-xs text-muted-foreground">
                  text-3xl font-bold - Subsection headings
                </code>
              </div>
              <div className="border-b border-border pb-4">
                <h4 className="text-2xl font-semibold text-foreground mb-2">
                  Heading 3
                </h4>
                <code className="text-xs text-muted-foreground">
                  text-2xl font-semibold - Component titles
                </code>
              </div>
              <div className="border-b border-border pb-4">
                <h5 className="text-xl font-semibold text-foreground mb-2">
                  Heading 4
                </h5>
                <code className="text-xs text-muted-foreground">
                  text-xl font-semibold - Card titles
                </code>
              </div>
              <div className="border-b border-border pb-4">
                <p className="text-lg text-foreground mb-2">
                  Large body text for introductory paragraphs and emphasis
                </p>
                <code className="text-xs text-muted-foreground">
                  text-lg - Lead text, intros
                </code>
              </div>
              <div className="border-b border-border pb-4">
                <p className="text-base text-foreground mb-2">
                  Base body text with optimal readability for long-form content
                  and descriptions
                </p>
                <code className="text-xs text-muted-foreground">
                  text-base - Default body text
                </code>
              </div>
              <div className="border-b border-border pb-4">
                <p className="text-sm text-foreground mb-2">
                  Small text for secondary information and helper text
                </p>
                <code className="text-xs text-muted-foreground">
                  text-sm - Secondary text, labels
                </code>
              </div>
              <div>
                <p className="text-xs text-foreground mb-2">
                  Extra small text for captions, timestamps, and metadata
                </p>
                <code className="text-xs text-muted-foreground">
                  text-xs - Captions, metadata
                </code>
              </div>
            </div>
          </div>

          {/* Font Pairing */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Font Pairing Rules
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-primary rounded-lg p-6 bg-card">
                <div className="inline-block px-3 py-1 rounded bg-primary/10 text-primary text-xs font-mono mb-4">
                  Monospace (JetBrains Mono)
                </div>
                <div className="space-y-3 font-mono">
                  <p className="text-terminal-cyan">$ command --flag</p>
                  <p className="text-terminal-green">&gt; output.log</p>
                  <p className="text-foreground">const code = true;</p>
                  <p className="text-sm">123.45 | 2025-10-14</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Use for: Commands, code, data, numbers, dates, terminal UI
                  </p>
                </div>
              </div>
              <div className="border border-accent rounded-lg p-6 bg-card">
                <div className="inline-block px-3 py-1 rounded bg-accent/10 text-accent text-xs font-mono mb-4">
                  Sans-serif (Inter)
                </div>
                <div className="space-y-3">
                  <p className="text-lg font-bold text-foreground">
                    Section Heading
                  </p>
                  <p className="text-base text-foreground">
                    Body text with excellent readability for long-form content.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Secondary descriptive text and labels
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Use for: Headings, body text, descriptions, UI labels
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Line Height & Letter Spacing */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Line Height & Letter Spacing
            </h3>
            <div className="space-y-4 bg-card border border-border rounded-lg p-6">
              <div>
                <code className="text-sm font-mono text-primary block mb-2">
                  leading-tight (1.25)
                </code>
                <h3 className="text-3xl font-bold leading-tight text-foreground">
                  Tight line height for large headings and display text where
                  space is premium
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Use for: Headlines, display text, hero sections
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <code className="text-sm font-mono text-primary block mb-2">
                  leading-normal (1.5)
                </code>
                <p className="text-base leading-normal text-foreground">
                  Normal line height provides balanced readability for body
                  text. This is the default spacing that works well for most
                  content types including descriptions, paragraphs, and UI text.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Use for: Body text, UI text, standard paragraphs
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <code className="text-sm font-mono text-primary block mb-2">
                  leading-relaxed (1.75)
                </code>
                <p className="text-base leading-relaxed text-foreground">
                  Relaxed line height enhances readability for long-form content
                  like blog posts and articles. The extra spacing reduces eye
                  strain and improves comprehension during extended reading
                  sessions.
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Use for: Blog posts, articles, documentation
                </p>
              </div>
            </div>
          </div>

          {/* Text Styling */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Text Styling & Weights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3 bg-card border border-border rounded-lg p-6">
                <div>
                  <p className="font-normal text-foreground mb-1">
                    Normal (400)
                  </p>
                  <code className="text-xs text-muted-foreground">
                    font-normal - Body text
                  </code>
                </div>
                <div>
                  <p className="font-medium text-foreground mb-1">
                    Medium (500)
                  </p>
                  <code className="text-xs text-muted-foreground">
                    font-medium - Emphasis, labels
                  </code>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">
                    Semibold (600)
                  </p>
                  <code className="text-xs text-muted-foreground">
                    font-semibold - Subheadings
                  </code>
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">Bold (700)</p>
                  <code className="text-xs text-muted-foreground">
                    font-bold - Headings, strong
                  </code>
                </div>
              </div>
              <div className="space-y-3 bg-card border border-border rounded-lg p-6">
                <div>
                  <p className="text-foreground mb-1">Default foreground</p>
                  <code className="text-xs text-muted-foreground">
                    text-foreground - Primary text
                  </code>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Muted foreground</p>
                  <code className="text-xs text-muted-foreground">
                    text-muted-foreground - Secondary
                  </code>
                </div>
                <div>
                  <p className="text-primary mb-1">Primary accent</p>
                  <code className="text-xs text-muted-foreground">
                    text-primary - Links, highlights
                  </code>
                </div>
                <div>
                  <p className="underline text-foreground mb-1">
                    Underlined text
                  </p>
                  <code className="text-xs text-muted-foreground">
                    underline - Links, emphasis
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Colors & Theme */}
        <section className="mb-16">
          <div className="font-mono text-terminal-green mb-2">
            $ echo $THEME_COLORS
          </div>
          <h2 className="text-3xl font-bold mb-8 text-foreground">
            Color Palette
          </h2>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Primary Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-primary mb-2"></div>
              <div className="font-mono text-sm text-foreground">
                Primary (Cyan)
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(180 100% 50%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Main actions, links
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-secondary mb-2"></div>
              <div className="font-mono text-sm text-foreground">
                Secondary (Yellow)
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(60 100% 50%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Secondary actions
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-accent mb-2"></div>
              <div className="font-mono text-sm text-foreground">
                Accent (Green)
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(120 100% 50%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Highlights, success
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-muted mb-2"></div>
              <div className="font-mono text-sm text-foreground">Muted</div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(220 15% 15%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Subtle backgrounds
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Terminal Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-terminal-cyan mb-2"></div>
              <div className="font-mono text-sm text-foreground">
                Terminal Cyan
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(180 100% 50%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Commands, info
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-terminal-green mb-2"></div>
              <div className="font-mono text-sm text-foreground">
                Terminal Green
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(120 100% 50%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Success, prompts
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-terminal-yellow mb-2"></div>
              <div className="font-mono text-sm text-foreground">
                Terminal Yellow
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(60 100% 50%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Warnings, highlights
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-destructive mb-2"></div>
              <div className="font-mono text-sm text-foreground">
                Destructive (Red)
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(0 84.2% 60.2%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Errors, deletion
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Surface Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-terminal-bg mb-2 border border-border"></div>
              <div className="font-mono text-sm text-foreground">
                Terminal BG
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(220 15% 8%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Main background
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-terminal-surface mb-2"></div>
              <div className="font-mono text-sm text-foreground">
                Terminal Surface
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(220 15% 12%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Cards, containers
              </div>
            </div>
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="w-full h-20 rounded bg-foreground mb-2"></div>
              <div className="font-mono text-sm text-foreground">
                Foreground
              </div>
              <div className="text-xs text-muted-foreground font-mono">
                hsl(180 100% 90%)
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Text color
              </div>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <div className="font-mono text-terminal-green mb-2">
            $ ls buttons/
          </div>
          <h2 className="text-3xl font-bold mb-6 text-foreground">Buttons</h2>

          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <div>
              <div className="flex flex-wrap gap-4 mb-2">
                <button className="px-6 py-2 rounded border border-primary bg-primary text-primary-foreground font-mono hover:bg-primary/90 transition-colors">
                  Primary Button
                </button>
                <button className="px-6 py-2 rounded border border-secondary bg-secondary text-secondary-foreground font-mono hover:bg-secondary/80 transition-colors">
                  Secondary Button
                </button>
                <button className="px-6 py-2 rounded border border-accent bg-accent text-accent-foreground font-mono hover:bg-accent/80 transition-colors">
                  Accent Button
                </button>
              </div>
              <code className="text-xs text-muted-foreground">
                Standard button variants
              </code>
            </div>

            <div>
              <div className="flex flex-wrap gap-4 mb-2">
                <button className="px-6 py-2 rounded border border-primary text-primary font-mono hover:bg-primary/10 transition-colors">
                  Outline Primary
                </button>
                <button className="px-6 py-2 rounded border border-secondary text-secondary font-mono hover:bg-secondary/10 transition-colors">
                  Outline Secondary
                </button>
                <button className="px-6 py-2 rounded border border-accent text-accent font-mono hover:bg-accent/10 transition-colors">
                  Outline Accent
                </button>
              </div>
              <code className="text-xs text-muted-foreground">
                Outline variants
              </code>
            </div>

            <div>
              <div className="flex flex-wrap gap-4 mb-2">
                <button className="px-6 py-2 rounded text-primary font-mono hover:bg-primary/10 transition-colors">
                  Ghost Primary
                </button>
                <button className="px-6 py-2 rounded text-secondary font-mono hover:bg-secondary/10 transition-colors">
                  Ghost Secondary
                </button>
              </div>
              <code className="text-xs text-muted-foreground">
                Ghost variants (no border)
              </code>
            </div>

            <div>
              <div className="flex flex-wrap gap-4 mb-2">
                <button className="px-6 py-2 rounded border border-primary bg-primary text-primary-foreground font-mono shadow-[0_0_20px_hsl(var(--terminal-cyan)/0.3)] hover:shadow-[0_0_30px_hsl(var(--terminal-cyan)/0.5)] transition-all">
                  Glow Effect
                </button>
                <button className="px-6 py-2 rounded border border-primary text-primary font-mono hover:scale-105 transition-transform">
                  Scale Hover
                </button>
              </div>
              <code className="text-xs text-muted-foreground">
                Special effects
              </code>
            </div>

            <div>
              <div className="flex flex-wrap gap-4 mb-2">
                <button className="w-10 h-10 rounded border border-primary text-primary font-mono hover:bg-primary/10 transition-colors flex items-center justify-center">
                  →
                </button>
                <button className="w-10 h-10 rounded border border-secondary text-secondary font-mono hover:bg-secondary/10 transition-colors flex items-center justify-center">
                  ✓
                </button>
                <button className="w-10 h-10 rounded border border-accent text-accent font-mono hover:bg-accent/10 transition-colors flex items-center justify-center">
                  ✗
                </button>
              </div>
              <code className="text-xs text-muted-foreground">
                Icon buttons
              </code>
            </div>
          </div>

          <CodeExample
            code={`import { Button } from '@/components/ui/button';

// Primary button
<Button variant="default">Primary Action</Button>

// Outline button
<Button variant="outline">Secondary Action</Button>

// With icon
<Button>
  <ArrowRight className="h-4 w-4 mr-2" />
  Continue
</Button>`}
            className="mb-8"
          />

          <DoAndDont
            doText="Use primary buttons for main actions, one per screen"
            dontText="Don't use multiple primary buttons competing for attention"
          />
        </section>

        {/* Cards */}
        <section className="mb-24">
          <SectionHeader
            title="Cards"
            command="cat cards.html"
            description="Flexible containers with hover states and variants"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-border rounded-lg p-6 bg-card hover:border-primary hover:scale-[1.02] hover:shadow-[0_0_20px_hsl(var(--terminal-cyan)/0.2)] transition-all duration-200">
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Enhanced Hover Card
              </h3>
              <p className="text-muted-foreground mb-4">
                Card with hover state including border color, scale, and glow.
              </p>
              <code className="text-xs text-muted-foreground">
                hover:border-primary hover:scale-[1.02]
              </code>
            </div>

            <div className="border border-primary rounded-lg p-6 bg-card shadow-[0_0_20px_hsl(var(--terminal-cyan)/0.2)]">
              <div className="font-mono text-primary mb-2">Selected State</div>
              <h3 className="text-xl font-bold mb-2 text-foreground flex items-center gap-2">
                <span className="text-primary font-mono">{">"}</span>
                Active Card
              </h3>
              <p className="text-muted-foreground mb-4">
                Card with {">"} symbol next to title, primary border and glow
                effect.
              </p>
              <code className="text-xs text-muted-foreground">
                Active/Selected state
              </code>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card transition-all duration-200 hover:border-accent">
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Simple Card
              </h3>
              <p className="text-muted-foreground mb-4">
                Card with clean background and hover transition.
              </p>
              <code className="text-xs text-muted-foreground">
                bg-card hover:border-accent
              </code>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card opacity-50 cursor-not-allowed">
              <h3 className="text-xl font-bold mb-2 text-foreground">
                Disabled Card
              </h3>
              <p className="text-muted-foreground mb-4">
                Card with disabled/loading state.
              </p>
              <code className="text-xs text-muted-foreground">
                opacity-50 cursor-not-allowed
              </code>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Blog Article Card */}
            <div className="border border-border rounded-lg overflow-hidden bg-card hover:border-secondary transition-all duration-200 group">
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-mono rounded">
                    Tutorial
                  </span>
                  <span className="text-muted-foreground text-xs font-mono">
                    Oct 14, 2025
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-secondary transition-colors">
                  Building a Terminal UI
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Learn how to create beautiful terminal-themed interfaces using
                  React and Tailwind CSS.
                </p>
                <Link
                  to="/blog"
                  className="text-secondary font-mono text-sm hover:underline inline-flex items-center gap-1"
                >
                  Read more →
                </Link>
              </div>
            </div>

            {/* Project Card */}
            <div className="border border-border rounded-lg p-6 bg-card hover:border-accent transition-all duration-200 group">
              <h3 className="text-lg font-bold text-foreground mb-3">
                Portfolio Website
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                A modern portfolio built with React, TypeScript, and terminal
                aesthetics.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono">
                  React
                </span>
                <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono">
                  TypeScript
                </span>
              </div>
              <Link
                to="/projects"
                className="text-accent font-mono text-sm hover:underline inline-flex items-center gap-1"
              >
                View project →
              </Link>
            </div>

            {/* Project Card - Active Status */}
            <div className="relative border-l-4 border-l-terminal-green border-t border-r border-b border-border rounded-lg p-6 bg-card hover:border-accent transition-all duration-200 group shadow-[0_0_15px_rgba(0,255,0,0.1)]">
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 rounded-full bg-terminal-green/20 text-terminal-green text-xs font-mono border border-terminal-green">
                  ● Active
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-3">
                E-Commerce Platform
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                Full-stack shopping platform with payment integration and
                real-time inventory.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono">
                  Next.js
                </span>
                <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono">
                  Stripe
                </span>
              </div>
              <Link
                to="/projects"
                className="text-accent font-mono text-sm hover:underline inline-flex items-center gap-1"
              >
                View project →
              </Link>
            </div>
          </div>
        </section>

        {/* Badges & Tags */}
        <section className="mb-24">
          <SectionHeader
            title="Badges & Tags"
            command="grep -r 'badges' ."
            description="Labels, tags, and status indicators"
          />

          <div className="bg-card border border-border rounded-lg p-6 space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-full border border-primary text-primary text-xs font-mono">
                  React
                </span>
                <span className="px-3 py-1 rounded-full border border-secondary text-secondary text-xs font-mono">
                  TypeScript
                </span>
                <span className="px-3 py-1 rounded-full border border-accent text-accent text-xs font-mono">
                  Tailwind
                </span>
              </div>
              <code className="text-xs text-muted-foreground">
                Outline badges
              </code>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-mono">
                  Primary
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-mono">
                  Secondary
                </span>
                <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-mono">
                  Accent
                </span>
              </div>
              <code className="text-xs text-muted-foreground">
                Filled badges
              </code>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono">
                  React
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-mono">
                  TypeScript
                </span>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-mono">
                  Tailwind
                </span>
              </div>
              <code className="text-xs text-muted-foreground">
                No border variants (subtle)
              </code>
            </div>

            <div>
              <div className="flex flex-wrap gap-3 mb-2">
                <span className="flex items-center gap-1 text-terminal-green font-mono text-sm">
                  ✓ Success
                </span>
                <span className="flex items-center gap-1 text-terminal-yellow font-mono text-sm">
                  ! Warning
                </span>
                <span className="flex items-center gap-1 text-destructive font-mono text-sm">
                  ✗ Error
                </span>
                <span className="flex items-center gap-1 text-primary font-mono text-sm">
                  • Info
                </span>
              </div>
              <code className="text-xs text-muted-foreground">
                Status indicators (centered)
              </code>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <span className="px-3 py-1 rounded-full border border-primary text-primary text-xs font-mono hover:bg-primary/20 hover:border-primary/70 active:scale-95 transition-all duration-200 cursor-pointer">
                  Hoverable
                </span>
                <span className="px-3 py-1 rounded-full border border-secondary text-secondary text-xs font-mono hover:bg-secondary/20 hover:border-secondary/70 active:scale-95 transition-all duration-200 cursor-pointer">
                  Clickable
                </span>
                <span className="px-3 py-1 rounded-full border border-accent text-accent text-xs font-mono hover:bg-accent/20 hover:border-accent/70 active:scale-95 transition-all duration-200 cursor-pointer">
                  Interactive
                </span>
              </div>
              <code className="text-xs text-muted-foreground">
                Interactive badges with hover/active states
              </code>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-mono rounded">
                  Small
                </span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-mono rounded">
                  Medium
                </span>
                <span className="px-4 py-1.5 bg-primary/10 text-primary text-base font-mono rounded">
                  Large
                </span>
              </div>
              <code className="text-xs text-muted-foreground">
                Size variants
              </code>
            </div>
          </div>
        </section>

        {/* Terminal Elements */}
        <section className="mb-24">
          <SectionHeader
            title="Terminal Elements"
            command="pwd"
            description="CLI-inspired components and displays"
          />

          <div className="space-y-6">
            <div className="border border-border rounded-lg p-6 bg-terminal-surface font-mono">
              <div className="text-terminal-cyan mb-2">$ npm run dev</div>
              <div className="text-terminal-green">
                <span className="inline-block w-2 h-4 bg-terminal-green animate-pulse mr-1">
                  _
                </span>
                Server running at http://localhost:5173
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm space-y-1">
                <div className="text-muted-foreground">
                  ~/projects/portfolio
                </div>
                <div className="text-terminal-cyan">├── src/</div>
                <div className="text-terminal-cyan">│ ├── components/</div>
                <div className="text-terminal-green">│ │ ├── Hero.tsx</div>
                <div className="text-terminal-green">│ │ ├── About.tsx</div>
                <div className="text-terminal-green">│ │ └── Contact.tsx</div>
                <div className="text-terminal-cyan">│ └── pages/</div>
                <div className="text-terminal-green">│ └── Index.tsx</div>
                <div className="text-terminal-cyan">└── package.json</div>
              </div>
            </div>

            <div className="border border-primary rounded-lg p-6 bg-card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-destructive"></div>
                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
                <span className="text-muted-foreground text-sm font-mono ml-2">
                  terminal.sh
                </span>
              </div>
              <div className="font-mono text-sm space-y-2">
                <div className="text-primary">$ whoami</div>
                <div className="text-foreground">andrew_dryga</div>
                <div className="text-primary flex items-center">
                  ${" "}
                  <TypingAnimation
                    texts={[
                      "initializing...",
                      "npm install",
                      "building project...",
                      "ready!",
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Loading States */}
        <section className="mb-24">
          <SectionHeader
            title="Loading States"
            command="cat loading-states.tsx"
            description="Comprehensive loading patterns for different use cases"
          />

          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Skeleton Loaders
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Use for known layouts to reduce perceived loading time
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Card Skeleton */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Card Skeleton
              </div>
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-32 w-full mt-4" />
                <div className="flex gap-2 mt-4">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            </div>

            {/* Text Skeleton */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Text Skeleton
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-11/12" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>

          <CodeExample
            code={`import { Skeleton } from '@/components/ui/skeleton';

<div className="space-y-3">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-full" />
  <Skeleton className="h-32 w-full" />
</div>`}
            className="mb-8"
          />

          <h3 className="text-2xl font-bold mb-4 text-foreground">
            Spinners & Progress
          </h3>
          <p className="text-muted-foreground mb-6 text-sm">
            Terminal-inspired loading indicators and progress bars
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Terminal Dot Spinner */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Terminal Spinner
              </div>
              <TerminalSpinner type="blocks" text="Loading..." />
            </div>

            {/* Button Loading */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Button Loading
              </div>
              <Button disabled className="gap-2">
                <span className="inline-block animate-spin">⣾</span>
                Processing...
              </Button>
            </div>

            {/* Full-page Loading */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Full-page
              </div>
              <div className="flex flex-col items-center justify-center h-32 bg-terminal-surface rounded">
                <TerminalSpinner type="blocks" />
                <span className="text-sm text-muted-foreground font-mono mt-2">
                  Initializing...
                </span>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Progress Bars
          </h3>
          <div className="grid gap-6 mb-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Terminal ASCII Progress
              </div>
              <TerminalProgressBar value={67} label="Uploading files..." />
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Multi-file Upload Progress
              </div>
              <div className="space-y-1 font-mono text-xs">
                <div className="text-foreground">
                  <span className="text-terminal-cyan">$</span> uploading{" "}
                  <span className="text-primary">app.js</span>{" "}
                  <span className="text-terminal-green">[OK]</span>
                </div>
                <div className="text-foreground">
                  <span className="text-terminal-cyan">$</span> uploading{" "}
                  <span className="text-primary">styles.css</span>{" "}
                  <span className="text-secondary animate-pulse">...</span>
                </div>
                <div className="text-foreground">
                  <span className="text-terminal-cyan">$</span> uploading{" "}
                  <span className="text-muted-foreground">images/</span>{" "}
                  <span className="text-muted-foreground">[pending]</span>
                </div>
              </div>
            </div>
          </div>

          <DoAndDont
            doText="Use skeleton loaders when the layout is known and predictable"
            dontText="Don't use skeleton loaders for unpredictable or dynamic content lengths"
            className="mb-8"
          />

          <div className="bg-terminal-surface/50 border border-primary/30 rounded-lg p-4">
            <div className="font-mono text-xs text-primary mb-2">
              ⚡ Performance Tip
            </div>
            <p className="text-sm text-muted-foreground">
              Skeleton loaders improve perceived performance by ~20%. Use for
              content that takes {">"} 500ms to load. For instant loads, skip
              the skeleton and show content directly.
            </p>
          </div>
        </section>

        {/* Terminal Spinners & Loading States */}
        <section className="mb-16">
          <div className="font-mono text-terminal-cyan mb-2">
            $ cat spinners.sh
          </div>
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Terminal Spinners
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Dot Spinner */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-foreground mb-2">
                Loading<span className="animate-pulse">...</span>
              </div>
              <code className="text-xs text-muted-foreground">
                Animated dots
              </code>
            </div>

            {/* Block Spinner */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-foreground mb-2 flex items-center gap-2">
                <span className="animate-pulse">█</span>
                <span className="animate-pulse delay-75">▓</span>
                <span className="animate-pulse delay-150">▒</span>
                <span className="animate-pulse delay-300">░</span>
                Processing...
              </div>
              <code className="text-xs text-muted-foreground">
                Block characters
              </code>
            </div>

            {/* Progress Bar */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-foreground mb-2">
                [████████░░░░░░░░] 50%
              </div>
              <code className="text-xs text-muted-foreground">
                Terminal progress bar
              </code>
            </div>

            {/* Spinning Cursor */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-foreground mb-2 flex items-center gap-2">
                <span className="animate-spin">|</span>
                Loading data...
              </div>
              <code className="text-xs text-muted-foreground">
                Rotating cursor
              </code>
            </div>

            {/* Pulsing Indicator */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                <span className="font-mono text-foreground">Syncing...</span>
              </div>
              <code className="text-xs text-muted-foreground">Pulsing dot</code>
            </div>

            {/* Multi-step Progress */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="space-y-2 font-mono text-sm">
                <div className="text-terminal-green">
                  ✓ Dependencies installed
                </div>
                <div className="text-primary flex items-center gap-2">
                  <span className="animate-pulse">▸</span>
                  Building project...
                </div>
                <div className="text-muted-foreground">
                  ○ Deploy to production
                </div>
              </div>
              <code className="text-xs text-muted-foreground mt-2 block">
                Multi-step indicator
              </code>
            </div>
          </div>
        </section>

        {/* Empty States */}
        <section className="mb-16">
          <SectionHeader
            title="Empty States"
            command="ls -la | grep 'no results'"
            description="Terminal-themed empty state patterns"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Empty List */}
            <EmptyState
              icon={<Database className="h-12 w-12 text-muted-foreground" />}
              command="ls -la"
              output="total 0"
              message="No items found"
              action={<Button>Create First Item</Button>}
            />

            {/* No Search Results */}
            <EmptyState
              icon={<Search className="h-12 w-12 text-muted-foreground" />}
              command='grep "search term"'
              output="0 matches found"
              message="Try adjusting your search"
            />

            {/* Command Not Found */}
            <EmptyState
              icon={<FileX className="h-12 w-12 text-destructive" />}
              command="./unknown-command"
              output="bash: command not found"
              message="Page does not exist"
              className="border-destructive/50"
            />

            {/* Get Started */}
            <EmptyState
              command="./setup.sh"
              message="Ready to get started? Initialize your first project"
              action={<Button>Start Now</Button>}
            />
          </div>

          <CodeExample
            code={`<div className="text-center p-8">
  <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
  <div className="font-mono text-terminal-cyan mb-2">$ ls -la</div>
  <p className="text-muted-foreground mb-4">No items found</p>
  <Button>Create First Item</Button>
</div>`}
            className="mb-8"
          />

          <DoAndDont
            doText="Provide clear next actions in empty states (CTAs)"
            dontText="Don't show empty states without context or actionable steps"
          />
        </section>

        {/* Error States */}
        <section className="mb-16">
          <SectionHeader
            title="Error States"
            command="cat /var/log/errors.log"
            description="Error handling patterns and error boundaries"
          />

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Full-page Error (500) */}
            <div className="border border-destructive rounded-lg p-8 bg-destructive/5 text-center">
              <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <div className="font-mono text-sm text-destructive mb-2">
                ERROR 500
              </div>
              <p className="text-foreground mb-2 font-bold">
                Internal Server Error
              </p>
              <pre className="font-mono text-xs text-muted-foreground mb-4">
                {`Stack trace:
  at handleRequest (server.js:42)
  at processTicksAndRejections`}
              </pre>
              <Button variant="destructive" size="sm">
                Reload Page
              </Button>
            </div>

            {/* Connection Error */}
            <div className="border border-destructive rounded-lg p-8 bg-destructive/5 text-center">
              <WifiOff className="h-12 w-12 text-destructive mx-auto mb-4" />
              <div className="font-mono text-sm text-destructive mb-2">
                CONNECTION ERROR
              </div>
              <p className="text-foreground mb-2 font-bold">
                No Internet Connection
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Check your network and try again
              </p>
              <Button variant="destructive" size="sm">
                Retry Connection
              </Button>
            </div>

            {/* Permission Denied (403) */}
            <div className="border border-destructive rounded-lg p-8 bg-destructive/5 text-center">
              <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
              <div className="font-mono text-sm text-destructive mb-2">
                ERROR 403
              </div>
              <p className="text-foreground mb-2 font-bold">
                Permission Denied
              </p>
              <pre className="font-mono text-xs text-muted-foreground mb-4">
                {`$ sudo access-resource
  Permission denied (user)`}
              </pre>
              <Button size="sm">Request Access</Button>
            </div>

            {/* Form Validation Error */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Form Validation
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 bg-input border border-destructive rounded-md focus:outline-none focus:ring-2 focus:ring-destructive"
                    defaultValue="invalid-email"
                  />
                  <p className="text-xs text-destructive mt-1 font-mono">
                    ✗ Invalid email format
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 bg-input border border-destructive rounded-md focus:outline-none focus:ring-2 focus:ring-destructive"
                    defaultValue="123"
                  />
                  <p className="text-xs text-destructive mt-1 font-mono">
                    ✗ Must be at least 8 characters
                  </p>
                </div>
              </div>
            </div>
          </div>

          <CodeExample
            code={`<div className="border border-destructive rounded-lg p-8 bg-destructive/5 text-center">
  <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
  <div className="font-mono text-destructive mb-2">ERROR 500</div>
  <p className="font-bold mb-2">Internal Server Error</p>
  <Button variant="destructive">Reload Page</Button>
</div>`}
            className="mb-8"
          />

          <DoAndDont
            doText="Provide clear error messages with actionable recovery steps"
            dontText="Don't show technical jargon without user-friendly explanations"
          />
        </section>

        {/* Accessibility */}
        <section className="mb-16">
          <SectionHeader
            title="Accessibility"
            command="cat accessibility.md"
            description="WCAG compliant patterns for inclusive design"
          />

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Focus States
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Default Focus
              </div>
              <Button>Focus Me</Button>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Input Focus
              </div>
              <input
                type="text"
                placeholder="Type here..."
                className="w-full px-3 py-2 bg-input border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
              />
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Link Focus
              </div>
              <a
                href="#"
                className="text-primary underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1 transition-all duration-200"
              >
                Focusable Link
              </a>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            ARIA Labels & Screen Reader Support
          </h3>
          <div className="grid gap-6 mb-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Icon Button with aria-label
              </div>
              <button
                aria-label="Close dialog"
                className="p-2 hover:bg-accent rounded-md transition-colors duration-200"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <CodeExample
                code={`<button aria-label="Close dialog">
  <X className="h-5 w-5" />
</button>`}
              />
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Screen Reader Only Text
              </div>
              <Button>
                <span className="sr-only">Navigate to next page</span>
                <span aria-hidden="true">→</span>
              </Button>
              <CodeExample
                code={`<button>
  <span className="sr-only">Navigate to next page</span>
  <span aria-hidden="true">→</span>
</button>`}
              />
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Keyboard Navigation
          </h3>
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <div className="font-mono text-sm text-muted-foreground mb-4">
              Tab Navigation Example
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button>Button 1</Button>
              <Button>Button 2</Button>
              <Button>Button 3</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4 font-mono">
              Press Tab to navigate, Enter to activate
            </p>
          </div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Color Contrast
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="border border-terminal-green rounded-lg p-6 bg-terminal-green/5">
              <div className="flex items-center gap-2 text-terminal-green mb-2 font-mono text-sm">
                <span>✓ WCAG AA</span>
              </div>
              <div className="space-y-2">
                <div className="text-foreground bg-background p-3 rounded">
                  Normal text: 4.5:1 ratio
                </div>
                <div className="text-xl font-bold text-foreground bg-background p-3 rounded">
                  Large text: 3:1 ratio
                </div>
              </div>
            </div>

            <div className="border border-destructive rounded-lg p-6 bg-destructive/5">
              <div className="flex items-center gap-2 text-destructive mb-2 font-mono text-sm">
                <span>✗ Insufficient Contrast</span>
              </div>
              <div className="space-y-2">
                <div className="text-muted-foreground/50 bg-background p-3 rounded">
                  Poor contrast (2:1 ratio)
                </div>
              </div>
            </div>
          </div>

          <DoAndDont
            doText="Always provide keyboard navigation and screen reader support"
            dontText="Don't rely solely on color to convey information"
            className="mb-8"
          />

          <div className="bg-terminal-surface/50 border border-primary/30 rounded-lg p-4">
            <div className="font-mono text-xs text-primary mb-2">
              ♿ Accessibility Checklist
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="font-mono">
                ✓ All interactive elements are keyboard accessible
              </li>
              <li className="font-mono">
                ✓ Focus indicators are visible (2px minimum)
              </li>
              <li className="font-mono">
                ✓ Color contrast meets WCAG AA standards (4.5:1)
              </li>
              <li className="font-mono">✓ Images have descriptive alt text</li>
              <li className="font-mono">
                ✓ Form inputs have associated labels
              </li>
              <li className="font-mono">✓ ARIA labels for icon-only buttons</li>
            </ul>
          </div>
        </section>

        {/* Terminal Art & Decorations */}
        <section className="mb-16">
          <SectionHeader
            title="Terminal Art & Decorations"
            command="cat art/decorations.txt"
          />

          <div className="space-y-6">
            {/* Box Drawing */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Box Drawing Characters
              </h3>
              <div className="font-mono text-sm">
                <pre className="text-primary whitespace-pre">{`┌─────────────────────┐
│ Terminal Window     │
├─────────────────────┤
│ Content area        │
│ With borders        │
└─────────────────────┘`}</pre>
                <code className="text-xs text-muted-foreground block mt-3">
                  Box drawing for containers
                </code>
              </div>
            </div>

            {/* Section Separators */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Section Separators
              </h3>
              <div className="font-mono text-sm space-y-3">
                <div className="text-muted-foreground">
                  ───────────────────────
                </div>
                <div className="text-primary">═══════════════════════</div>
                <div className="text-accent">━━━━━━━━━━━━━━━━━━━━━━━</div>
                <div className="text-secondary">▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬</div>
                <code className="text-xs text-muted-foreground block">
                  Horizontal dividers
                </code>
              </div>
            </div>

            {/* Corner Decorations */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Corner Brackets & Decorations
              </h3>
              <div className="font-mono text-sm space-y-3">
                <div className="text-primary">┌─ Component Title ─┐</div>
                <div className="text-accent">╭── Section Header ──╮</div>
                <div className="text-secondary">┏━━ Important Note ━━┓</div>
                <div className="text-foreground">[ Wrapped Content ]</div>
                <div className="text-primary">⟨ Angular Brackets ⟩</div>
                <code className="text-xs text-muted-foreground block">
                  Decorative brackets
                </code>
              </div>
            </div>

            {/* Bullet Points & Indicators */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Bullet Points & Status
              </h3>
              <div className="font-mono text-sm space-y-2">
                <div className="text-foreground">• Standard bullet point</div>
                <div className="text-primary">▸ Arrow bullet point</div>
                <div className="text-accent">▹ Hollow arrow</div>
                <div className="text-secondary">◆ Diamond marker</div>
                <div className="text-terminal-green">[✓] Completed task</div>
                <div className="text-secondary">[!] Warning indicator</div>
                <div className="text-destructive">[×] Error state</div>
                <div className="text-muted-foreground">[…] In progress</div>
                <code className="text-xs text-muted-foreground block mt-3">
                  Status markers & bullets
                </code>
              </div>
            </div>

            {/* ASCII Art Elements */}
            <div className="border border-border rounded-lg p-6 bg-terminal-surface">
              <h3 className="text-lg font-bold text-foreground mb-4">
                ASCII Art Elements
              </h3>
              <div className="font-mono text-xs">
                <pre className="text-primary whitespace-pre">{`     _    ____ ____ ___ ___
    / \\  / ___/ ___|_ _|_ _|
   / _ \\ \\___ \\___ \\| | | |
  / ___ \\ ___) |__) | | | |
 /_/   \\_\\____/____/___|___|`}</pre>
                <code className="text-xs text-muted-foreground block mt-3">
                  ASCII text art
                </code>
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Progress & Fill Indicators
              </h3>
              <div className="font-mono text-sm space-y-2">
                <div className="text-primary">████████████████████ 100%</div>
                <div className="text-accent">█████████████░░░░░░░ 65%</div>
                <div className="text-secondary">███████░░░░░░░░░░░░░ 35%</div>
                <div className="text-muted-foreground">
                  ░░░░░░░░░░░░░░░░░░░░ 0%
                </div>
                <div className="text-primary mt-3">▰▰▰▰▰▰▰▰▰▰▰▱▱▱▱▱▱▱▱▱</div>
                <code className="text-xs text-muted-foreground block mt-3">
                  Block progress bars
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Forms */}
        <section className="mb-16">
          <SectionHeader title="Form Elements" command="vim forms.html" />

          <form
            onSubmit={handleFormSubmit}
            className="bg-card border border-border rounded-lg p-6 space-y-6 max-w-2xl"
          >
            <div>
              <label className="block text-sm font-mono text-foreground mb-2">
                $ Name
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 bg-input border border-border rounded text-foreground font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-foreground mb-2">
                $ Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 bg-input border border-border rounded text-foreground font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-mono text-foreground mb-2">
                $ Message
              </label>
              <textarea
                rows={4}
                placeholder="Your message here..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full px-4 py-2 bg-input border border-border rounded text-foreground font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() =>
                    setFormData({
                      ...formData,
                      newsletter: !formData.newsletter,
                    })
                  }
                  className="w-5 h-5 border-2 border-border rounded flex items-center justify-center group-hover:border-primary transition-colors"
                >
                  {formData.newsletter && (
                    <div className="w-3 h-3 bg-primary rounded-sm"></div>
                  )}
                </div>
                <span className="text-foreground font-mono text-sm">
                  Subscribe to newsletter
                </span>
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-mono text-foreground mb-2">
                $ Experience Level
              </p>
              {["beginner", "intermediate", "advanced"].map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div
                    onClick={() =>
                      setFormData({ ...formData, experience: level })
                    }
                    className="w-5 h-5 border-2 border-border rounded-full flex items-center justify-center group-hover:border-primary transition-colors"
                  >
                    {formData.experience === level && (
                      <div className="w-3 h-3 bg-primary rounded-full"></div>
                    )}
                  </div>
                  <span className="text-foreground font-mono text-sm capitalize">
                    {level}
                  </span>
                </label>
              ))}
            </div>

            {/* FZF-style Dropdown */}
            <div>
              <label className="block text-sm font-mono text-foreground mb-2">
                $ Framework
              </label>
              <div className="relative font-mono">
                <div className="border border-primary rounded bg-terminal-surface p-2">
                  <div className="text-primary mb-1 flex items-center gap-1">
                    <span>{">"}</span>
                    <span>Select framework:</span>
                  </div>
                  <input
                    type="text"
                    value={selectedOption}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="w-full bg-transparent text-foreground outline-none border-b border-border pb-1"
                    placeholder="Type to filter..."
                  />
                </div>
                {dropdownOpen && (
                  <div className="absolute z-50 w-full mt-1 border border-primary rounded bg-terminal-surface shadow-lg max-h-48 overflow-y-auto">
                    {["React", "Vue", "Angular", "Svelte"].map(
                      (option, idx) => (
                        <div
                          key={option}
                          onClick={() => {
                            setSelectedOption(option);
                            setDropdownOpen(false);
                          }}
                          className={`px-3 py-1.5 cursor-pointer flex items-center gap-2 ${
                            option === selectedOption
                              ? "bg-primary/20 text-primary"
                              : "text-foreground hover:bg-primary/10"
                          }`}
                        >
                          {option === selectedOption && <span>{">"}</span>}
                          <span>{option}</span>
                        </div>
                      ),
                    )}
                  </div>
                )}
                <div className="text-xs text-muted-foreground mt-1">
                  4 matches
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2 rounded border border-primary bg-primary text-primary-foreground font-mono hover:bg-primary/90 transition-colors"
            >
              Submit Form
            </button>
          </form>

          {formSubmitted && (
            <div className="mt-6 border border-accent rounded-lg p-6 bg-card max-w-2xl">
              <div className="font-mono text-accent mb-2">
                $ Form submitted successfully!
              </div>
              <div className="font-mono text-sm space-y-1 text-foreground">
                <div>Name: {formData.name}</div>
                <div>Email: {formData.email}</div>
                <div>Message: {formData.message}</div>
                <div>Framework: {selectedOption}</div>
                <div>Newsletter: {formData.newsletter ? "Yes" : "No"}</div>
                <div>Experience: {formData.experience}</div>
              </div>
            </div>
          )}
        </section>

        {/* Animations */}
        <section className="mb-16">
          <div className="font-mono text-terminal-green mb-2">
            $ grep "animation" *.css
          </div>
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Animations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-sm font-mono text-foreground mb-4">
                Fade In
              </h3>
              <div className="h-20 bg-primary/20 rounded flex items-center justify-center animate-fade-in">
                <span className="text-primary font-mono">animate-fade-in</span>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-sm font-mono text-foreground mb-4">Pulse</h3>
              <div className="h-20 bg-secondary/20 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-secondary rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-sm font-mono text-foreground mb-4">
                Scale on Hover
              </h3>
              <div className="h-20 bg-accent/20 rounded flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <span className="text-accent font-mono">Hover me</span>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-sm font-mono text-foreground mb-4">
                Border Glow
              </h3>
              <div className="h-20 border-2 border-primary rounded flex items-center justify-center shadow-[0_0_20px_hsl(var(--terminal-cyan)/0.3)] hover:shadow-[0_0_40px_hsl(var(--terminal-cyan)/0.5)] transition-shadow cursor-pointer">
                <span className="text-primary font-mono">Glow effect</span>
              </div>
            </div>
          </div>
        </section>

        {/* Project Metrics */}
        <section className="mb-16">
          <div className="font-mono text-terminal-green mb-2">
            $ ./project --stats
          </div>
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Project Metrics
          </h2>

          <div className="bg-card border border-border rounded-lg p-6">
            <div className="font-mono text-sm">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary tabular-nums">
                    10.2K
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    Total Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-terminal-green tabular-nums">
                    99.9%
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    Uptime
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary tabular-nums">
                    45ms
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    Response Time
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent tabular-nums">
                    98.5%
                  </div>
                  <div className="text-muted-foreground text-xs mt-1">
                    Success Rate
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="grid grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">Metric:</span>{" "}
                    <span className="text-foreground">Value</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>{" "}
                    <span className="text-terminal-green">✓ Healthy</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Last Updated:</span>{" "}
                    <span className="text-foreground">2min ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Summary Table */}
        <section className="mb-16">
          <div className="font-mono text-terminal-green mb-2">
            $ cat table.md
          </div>
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Summary Table
          </h2>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <table className="w-full font-mono text-sm">
              <thead className="bg-terminal-surface border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-primary uppercase text-xs">
                    Technology
                  </th>
                  <th className="px-4 py-3 text-left text-primary uppercase text-xs">
                    Experience
                  </th>
                  <th className="px-4 py-3 text-left text-primary uppercase text-xs hidden md:table-cell">
                    Projects
                  </th>
                  <th className="px-4 py-3 text-right text-primary uppercase text-xs">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr className="hover:bg-terminal-surface/50 transition-colors">
                  <td className="px-4 py-3 text-foreground">React</td>
                  <td className="px-4 py-3 text-muted-foreground">5 years</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    20+
                  </td>
                  <td className="px-4 py-3 text-right text-terminal-green tabular-nums">
                    9.5/10
                  </td>
                </tr>
                <tr className="hover:bg-terminal-surface/50 transition-colors">
                  <td className="px-4 py-3 text-foreground">TypeScript</td>
                  <td className="px-4 py-3 text-muted-foreground">4 years</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    15+
                  </td>
                  <td className="px-4 py-3 text-right text-terminal-green tabular-nums">
                    9.0/10
                  </td>
                </tr>
                <tr className="hover:bg-terminal-surface/50 transition-colors">
                  <td className="px-4 py-3 text-foreground">Tailwind CSS</td>
                  <td className="px-4 py-3 text-muted-foreground">3 years</td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    18+
                  </td>
                  <td className="px-4 py-3 text-right text-terminal-green tabular-nums">
                    8.5/10
                  </td>
                </tr>
                <tr className="bg-terminal-surface/30 border-t-2 border-primary">
                  <td className="px-4 py-3 text-primary font-bold" colSpan={3}>
                    TOTAL
                  </td>
                  <td className="px-4 py-3 text-right text-primary font-bold tabular-nums">
                    27.0/30
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Code Syntax Highlighting */}
        <section className="mb-16">
          <div className="font-mono text-terminal-green mb-2">
            $ cat code-example.tsx
          </div>
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Code Blocks
          </h2>

          <div className="space-y-6">
            {/* Code Block with Copy Button */}
            <div className="relative border border-border rounded-lg overflow-hidden bg-terminal-surface">
              <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
                <span className="text-xs font-mono text-muted-foreground">
                  TypeScript
                </span>
                <button className="text-xs font-mono text-primary hover:text-primary/80 transition-colors">
                  Copy
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="font-mono text-sm">
                  <div>
                    <span className="text-secondary">const</span>{" "}
                    <span className="text-primary">greeting</span>{" "}
                    <span className="text-foreground">=</span>{" "}
                    <span className="text-accent">"Hello, World!"</span>
                    <span className="text-foreground">;</span>
                  </div>
                  <div>
                    <span className="text-secondary">console</span>
                    <span className="text-foreground">.</span>
                    <span className="text-primary">log</span>
                    <span className="text-foreground">(</span>
                    <span className="text-primary">greeting</span>
                    <span className="text-foreground">);</span>
                  </div>
                </code>
              </pre>
            </div>

            {/* Inline Code */}
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-foreground mb-2">
                Use the{" "}
                <code className="px-2 py-1 bg-terminal-surface text-primary font-mono text-sm rounded">
                  useState
                </code>{" "}
                hook to manage state in React components.
              </p>
              <code className="text-xs text-muted-foreground">
                Inline code styling
              </code>
            </div>

            {/* Terminal Command Block */}
            <div className="bg-terminal-surface border border-primary rounded-lg p-4 font-mono text-sm">
              <div className="text-primary">$ npm install react-router-dom</div>
              <div className="text-terminal-green mt-2">
                ✓ Package installed successfully
              </div>
            </div>

            {/* Diff Display */}
            <div className="bg-card border border-border rounded-lg p-4 font-mono text-sm">
              <div className="text-destructive">- const oldValue = 100;</div>
              <div className="text-terminal-green">+ const newValue = 200;</div>
            </div>
          </div>
        </section>

        {/* Blog Components */}
        <section className="mb-16">
          <div className="font-mono text-terminal-green mb-2">
            $ ls blog-components/
          </div>
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Blog Components
          </h2>

          <div className="space-y-6">
            {/* Article Content */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Getting Started with Terminal UI
              </h3>

              <p className="text-foreground mb-4 leading-relaxed">
                Terminal user interfaces provide a unique aesthetic that
                combines minimalism with functionality. In this guide, we'll
                explore how to build beautiful terminal-themed interfaces using
                modern web technologies.
              </p>

              <p className="text-foreground mb-4 leading-relaxed">
                The key to creating effective terminal UIs lies in understanding
                the core principles of command-line interfaces. By using the{" "}
                <code className="px-2 py-1 bg-terminal-surface text-primary font-mono text-sm rounded">
                  monospace
                </code>{" "}
                font family and semantic color schemes, we can create interfaces
                that feel both familiar and modern.
              </p>

              <h4 className="text-lg font-bold text-foreground mb-3 mt-6">
                Key Design Principles
              </h4>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono">▸</span>
                  <span className="text-foreground">
                    Use monospace fonts consistently throughout the interface
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono">▸</span>
                  <span className="text-foreground">
                    Implement semantic color tokens for theming flexibility
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono">▸</span>
                  <span className="text-foreground">
                    Keep animations subtle and purposeful
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-mono">▸</span>
                  <span className="text-foreground">
                    Maintain proper spacing and rhythm for readability
                  </span>
                </li>
              </ul>

              <p className="text-foreground leading-relaxed">
                When implementing these components, remember to use the{" "}
                <code className="px-2 py-1 bg-terminal-surface text-primary font-mono text-sm rounded">
                  cn()
                </code>{" "}
                utility function for class merging and always reference your
                design tokens from{" "}
                <code className="px-2 py-1 bg-terminal-surface text-primary font-mono text-sm rounded">
                  index.css
                </code>
                .
              </p>
            </div>

            {/* Pull Quote */}
            <div className="border-l-4 border-primary pl-6 py-4 bg-card">
              <blockquote className="text-2xl font-bold text-foreground italic mb-2">
                "Terminal aesthetics bring clarity and focus to modern
                interfaces."
              </blockquote>
              <cite className="text-sm text-muted-foreground font-mono">
                — Design Principles
              </cite>
            </div>

            {/* Callout Boxes */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-primary rounded-lg p-4 bg-primary/5">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-mono font-bold">i</span>
                  <div>
                    <div className="font-mono text-sm font-bold text-primary mb-1">
                      Info
                    </div>
                    <p className="text-sm text-foreground">
                      This is an informational callout box.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-secondary rounded-lg p-4 bg-secondary/5">
                <div className="flex items-start gap-3">
                  <span className="text-secondary font-mono font-bold">!</span>
                  <div>
                    <div className="font-mono text-sm font-bold text-secondary mb-1">
                      Warning
                    </div>
                    <p className="text-sm text-foreground">
                      This is a warning callout box.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-terminal-green rounded-lg p-4 bg-terminal-green/5">
                <div className="flex items-start gap-3">
                  <span className="text-terminal-green font-mono font-bold">
                    ✓
                  </span>
                  <div>
                    <div className="font-mono text-sm font-bold text-terminal-green mb-1">
                      Success
                    </div>
                    <p className="text-sm text-foreground">
                      This is a success callout box.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-destructive rounded-lg p-4 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <span className="text-destructive font-mono font-bold">
                    ✗
                  </span>
                  <div>
                    <div className="font-mono text-sm font-bold text-destructive mb-1">
                      Error
                    </div>
                    <p className="text-sm text-foreground">
                      This is an error callout box.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Keyboard Shortcut */}
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-foreground mb-3">
                Press{" "}
                <kbd className="px-2 py-1 bg-muted border border-border rounded font-mono text-sm">
                  Ctrl
                </kbd>{" "}
                +{" "}
                <kbd className="px-2 py-1 bg-muted border border-border rounded font-mono text-sm">
                  C
                </kbd>{" "}
                to copy
              </p>
              <code className="text-xs text-muted-foreground">
                Keyboard shortcut styling
              </code>
            </div>

            {/* Step-by-step List */}
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="space-y-3">
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono">
                    1
                  </span>
                  <p className="text-foreground pt-0.5">Clone the repository</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono">
                    2
                  </span>
                  <p className="text-foreground pt-0.5">
                    Install dependencies with npm install
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-mono">
                    3
                  </span>
                  <p className="text-foreground pt-0.5">
                    Start the development server
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Charts & Data Visualization */}
        <section className="mb-16">
          <SectionHeader
            title="Charts & Data Visualization"
            command="./visualize --data"
          />

          {/* Flow Diagrams */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Flow Diagrams
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Vertical Flow */}
              <div className="border border-border rounded-lg p-6 bg-card font-mono text-sm">
                <div className="space-y-1">
                  <div className="text-center p-3 border border-primary bg-primary/10 rounded">
                    <div className="text-primary">Start Process</div>
                  </div>
                  <div className="text-center text-primary">│</div>
                  <div className="text-center text-primary">▼</div>
                  <div className="text-center p-3 border border-accent bg-accent/10 rounded">
                    <div className="text-accent">Validate Input</div>
                  </div>
                  <div className="text-center text-accent">│</div>
                  <div className="text-center text-accent">▼</div>
                  <div className="text-center p-3 border border-secondary bg-secondary/10 rounded">
                    <div className="text-secondary">Process Data</div>
                  </div>
                  <div className="text-center text-secondary">│</div>
                  <div className="text-center text-secondary">▼</div>
                  <div className="text-center p-3 border border-terminal-green bg-terminal-green/10 rounded">
                    <div className="text-terminal-green">Complete</div>
                  </div>
                </div>
                <code className="text-xs text-muted-foreground block mt-4">
                  Vertical flow diagram
                </code>
              </div>

              {/* Decision Flow */}
              <div className="border border-border rounded-lg p-6 bg-terminal-surface font-mono text-xs">
                <pre className="text-foreground">
                  {`   ┌─────────────┐
   │   Input     │
   └──────┬──────┘
          │
          ▼
   ┌─────────────┐
   │  Valid?     │
   └──┬────────┬─┘
      │Yes     │No
      ▼        ▼
  ┌────────┐  ┌────────┐
  │Process │  │ Error  │
  └────────┘  └────────┘`}
                </pre>
                <code className="text-xs text-muted-foreground block mt-2">
                  Decision tree flow
                </code>
              </div>

              {/* Horizontal Pipeline with Loop Back */}
              <div className="border border-border rounded-lg p-6 bg-card font-mono text-sm md:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="text-center p-3 border border-primary bg-primary/10 rounded whitespace-nowrap flex-1">
                      <div className="text-primary">Build</div>
                    </div>
                    <div className="text-primary flex-shrink-0 w-6 text-center">
                      →
                    </div>
                    <div className="text-center p-3 border border-accent bg-accent/10 rounded whitespace-nowrap flex-1">
                      <div className="text-accent">Test</div>
                    </div>
                    <div className="text-accent flex-shrink-0 w-6 text-center">
                      →
                    </div>
                    <div className="text-center p-3 border border-secondary bg-secondary/10 rounded whitespace-nowrap flex-1">
                      <div className="text-secondary">Stage</div>
                    </div>
                    <div className="text-secondary flex-shrink-0 w-6 text-center">
                      →
                    </div>
                    <div className="text-center p-3 border border-terminal-green bg-terminal-green/10 rounded whitespace-nowrap flex-1">
                      <div className="text-terminal-green">Deploy</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-destructive">↓</div>
                    <div className="text-xs text-muted-foreground">
                      On failure
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-center p-3 border border-destructive bg-destructive/10 rounded whitespace-nowrap flex-1">
                      <div className="text-destructive">Rollback</div>
                    </div>
                    <div className="text-destructive flex-shrink-0 w-6 text-center">
                      ←
                    </div>
                    <div className="text-center p-3 border border-border bg-muted/10 rounded whitespace-nowrap flex-1">
                      <div className="text-muted-foreground">Notify</div>
                    </div>
                    <div className="text-muted-foreground flex-shrink-0 w-6 text-center">
                      ←
                    </div>
                    <div className="text-center p-3 border border-border bg-muted/10 rounded whitespace-nowrap flex-1">
                      <div className="text-muted-foreground">Alert</div>
                    </div>
                  </div>
                </div>
                <code className="text-xs text-muted-foreground block mt-4">
                  CI/CD pipeline with rollback flow
                </code>
              </div>
            </div>
          </div>

          {/* Saga Pattern Diagram */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Saga Pattern (Two-Lane Flow)
            </h3>
            <div className="border border-border rounded-lg p-6 bg-card font-mono text-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-4 pb-2 border-b border-border">
                  <div className="w-32 font-bold text-primary">
                    Transactions:
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 text-center p-2 border border-terminal-green bg-terminal-green/10 rounded">
                      Fetch rates
                    </div>
                    <span className="text-foreground">→</span>
                    <div className="flex-1 text-center p-2 border border-terminal-green bg-terminal-green/10 rounded">
                      Auth card
                    </div>
                    <span className="text-foreground">→</span>
                    <div className="flex-1 text-center p-2 border border-terminal-green bg-terminal-green/10 rounded">
                      Book hotel
                    </div>
                    <span className="text-foreground">→</span>
                    <div className="flex-1 text-center p-2 border border-terminal-green bg-terminal-green/10 rounded">
                      Book car
                    </div>
                    <span className="text-foreground">→</span>
                    <div className="flex-1 text-center p-2 border border-destructive bg-destructive/10 rounded">
                      Book flight
                    </div>
                    <span className="text-foreground">→</span>
                    <div className="flex-1 text-center p-2 border border-border bg-muted/10 rounded text-muted-foreground">
                      Email
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-2 text-destructive text-xs">
                  <span>Failure at step 5</span>
                  <span>↓</span>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t border-border">
                  <div className="w-32 font-bold text-destructive">
                    Compensations:
                  </div>
                  <div className="flex-1 flex items-center gap-2 flex-row-reverse">
                    <div className="flex-1 text-center p-2 border border-muted bg-muted/10 rounded text-muted-foreground">
                      Refund
                    </div>
                    <span className="text-foreground">←</span>
                    <div className="flex-1 text-center p-2 border border-secondary bg-secondary/10 rounded text-secondary">
                      Send excuse
                    </div>
                    <span className="text-foreground">←</span>
                    <div className="flex-1 text-center p-2 border border-secondary bg-secondary/10 rounded text-secondary">
                      Ensure not booked
                    </div>
                    <span className="text-foreground">←</span>
                    <div className="flex-1 text-center p-2 border border-secondary bg-secondary/10 rounded text-secondary">
                      Cancel car
                    </div>
                    <span className="text-foreground">←</span>
                    <div className="flex-1 text-center p-2 border border-secondary bg-secondary/10 rounded text-secondary">
                      Cancel hotel
                    </div>
                    <span className="text-foreground">←</span>
                    <div className="flex-1 text-center p-2 border border-secondary bg-secondary/10 rounded text-secondary">
                      Cancel auth
                    </div>
                  </div>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block mt-4">
                Saga pattern with compensating transactions
              </code>
            </div>
          </div>

          {/* Sequence Diagrams */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                Sequence Diagrams
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                Build sequence diagrams using reusable components for
                request/response patterns, async communication, and error
                handling.
              </p>
            </div>

            {/* Example 1: Basic Request/Response */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Basic Request/Response
              </h4>
              <SequenceDiagram>
                <Participants>
                  <Participant name="Client" color="primary" position="left" />
                  <Participant name="Server" color="accent" position="right" />
                </Participants>
                <Messages>
                  <Message
                    label="GET /api/users"
                    type="request"
                    direction="right"
                  />
                  <Message
                    label="200 OK + data"
                    type="response"
                    direction="left"
                  />
                </Messages>
              </SequenceDiagram>
              <code className="text-xs text-muted-foreground block mt-2">
                Simple synchronous request and response
              </code>
            </div>

            {/* Example 2: Error Handling */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Error Handling
              </h4>
              <SequenceDiagram>
                <Participants>
                  <Participant name="Client" color="primary" position="left" />
                  <Participant name="API" color="accent" position="right" />
                </Participants>
                <Messages>
                  <Message
                    label="POST /login (invalid)"
                    type="request"
                    direction="right"
                  />
                  <Message
                    label="401 Unauthorized"
                    type="error"
                    direction="left"
                  />
                  <Message
                    label="POST /login (valid)"
                    type="request"
                    direction="right"
                  />
                  <Message
                    label="200 OK + token"
                    type="success"
                    direction="left"
                  />
                </Messages>
              </SequenceDiagram>
              <code className="text-xs text-muted-foreground block mt-2">
                Authentication flow with error and retry
              </code>
            </div>

            {/* Example 3: Async Communication */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Async Communication
              </h4>
              <SequenceDiagram>
                <Participants>
                  <Participant name="Client" color="primary" position="left" />
                  <Participant name="Queue" color="accent" position="right" />
                </Participants>
                <Messages>
                  <Message
                    label="Submit job"
                    type="request"
                    direction="right"
                  />
                  <Message
                    label="Job ID: 12345"
                    type="response"
                    direction="left"
                  />
                  <Message label="Poll status" type="async" direction="right" />
                  <Message
                    label="Status: complete"
                    type="success"
                    direction="left"
                  />
                </Messages>
              </SequenceDiagram>
              <code className="text-xs text-muted-foreground block mt-2">
                Asynchronous job processing with polling
              </code>
            </div>

            {/* Example 4: Self-Call Pattern */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Self-Call Pattern
              </h4>
              <SequenceDiagram>
                <Participants>
                  <Participant name="Service" color="primary" position="left" />
                  <Participant
                    name="Database"
                    color="accent"
                    position="right"
                  />
                </Participants>
                <Messages>
                  <Message
                    label="Query data"
                    type="request"
                    direction="right"
                  />
                  <SelfCall label="Validate & cache" position="left" />
                  <Message label="Results" type="response" direction="left" />
                </Messages>
              </SequenceDiagram>
              <code className="text-xs text-muted-foreground block mt-2">
                Internal processing before returning response
              </code>
            </div>

            {/* Example 5: Complex Flow with Notes */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Complex Multi-Step Flow
              </h4>
              <SequenceDiagram>
                <Participants>
                  <Participant
                    name="Consumer"
                    color="primary"
                    position="left"
                  />
                  <Participant name="MPI" color="accent" position="right" />
                </Participants>
                <Messages>
                  <Message
                    label="Query: John Smith, Kiev"
                    type="request"
                    direction="right"
                  />
                  <Message
                    label="Error: too many matches"
                    type="error"
                    direction="left"
                  />
                  <Note text="Refines search criteria" position="left" />
                  <Message
                    label="John Smith, Kiev, born 13 years ago"
                    type="request"
                    direction="right"
                  />
                  <Message
                    label="3 matches: Kiev, Kharkiv, Lviv"
                    type="response"
                    direction="left"
                  />
                  <Note text="Adds more details" position="left" />
                  <Message
                    label="John Smith, Kiev, born 13 years ago in Lviv"
                    type="request"
                    direction="right"
                  />
                  <Message
                    label="Match found"
                    type="success"
                    direction="left"
                  />
                </Messages>
              </SequenceDiagram>
              <code className="text-xs text-muted-foreground block mt-2">
                Iterative refinement with annotations
              </code>
            </div>

            {/* Example 6: Activation Box */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-3">
                Activation Box Example
              </h4>
              <SequenceDiagram>
                <Participants>
                  <Participant name="Client" color="primary" position="left" />
                  <Participant name="Service" color="accent" position="right" />
                </Participants>
                <Messages>
                  <Message
                    label="Start transaction"
                    type="request"
                    direction="right"
                  />
                  <ActivationBox position="right">
                    <Message
                      label="Processing..."
                      type="async"
                      direction="right"
                    />
                    <SelfCall label="Validate data" position="right" />
                    <Message
                      label="Save to DB"
                      type="async"
                      direction="right"
                    />
                  </ActivationBox>
                  <Message
                    label="Transaction complete"
                    type="success"
                    direction="left"
                  />
                </Messages>
              </SequenceDiagram>
              <code className="text-xs text-muted-foreground block mt-2">
                Shows processing period with activation box
              </code>
            </div>

            {/* Builder Documentation */}
            <div className="mt-8 border border-border rounded-lg p-6 bg-card">
              <h4 className="text-lg font-semibold text-foreground mb-3">
                How to Build Sequence Diagrams
              </h4>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Use the reusable components to create custom sequence
                  diagrams:
                </p>
                <pre className="bg-terminal-surface border border-border rounded p-4 text-xs overflow-x-auto">
                  {`import { SequenceDiagram, Participant, Lifelines, Message } from '@/components/SequenceDiagram';

<SequenceDiagram>
  {/* Define participants */}
  <div className="flex justify-around mb-4">
    <Participant name="Client" color="primary" />
    <Participant name="Server" color="accent" />
  </div>

  {/* Add lifelines and messages */}
  <Lifelines count={2} colors={['primary', 'accent']}>
    <Message label="Request" type="request" />
    <Message label="Response" type="success" />
  </Lifelines>
</SequenceDiagram>`}
                </pre>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">
                      Message Types:
                    </h5>
                    <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                      <li>
                        <span className="text-primary">request</span> - Solid
                        line, right arrow
                      </li>
                      <li>
                        <span className="text-secondary">response</span> -
                        Dashed line, left arrow
                      </li>
                      <li>
                        <span className="text-accent">async</span> - Dashed
                        line, right arrow
                      </li>
                      <li>
                        <span className="text-destructive">error</span> - Dashed
                        line, left arrow, red
                      </li>
                      <li>
                        <span className="text-terminal-green">success</span> -
                        Dashed line, left arrow, green
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-2">
                      Additional Components:
                    </h5>
                    <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                      <li>
                        <span className="text-accent">SelfCall</span> - Internal
                        processing
                      </li>
                      <li>
                        <span className="text-secondary">Note</span> - Add
                        annotations
                      </li>
                      <li>
                        <span className="text-primary">ActivationBox</span> -
                        Show active periods
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-mono text-sm text-foreground mb-4">
                Project Completion
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-muted-foreground">React</span>
                    <span className="text-primary">90%</span>
                  </div>
                  <div className="h-2 bg-terminal-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-muted-foreground">TypeScript</span>
                    <span className="text-secondary">75%</span>
                  </div>
                  <div className="h-2 bg-terminal-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-muted-foreground">Tailwind</span>
                    <span className="text-accent">60%</span>
                  </div>
                  <div className="h-2 bg-terminal-surface rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* ASCII Bar Chart */}
            <div className="bg-terminal-surface border border-border rounded-lg p-6 font-mono text-sm">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-foreground">Frontend</span>
                  <span className="text-primary">████████████░░░░ 75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Backend </span>
                  <span className="text-secondary">██████████░░░░░░ 60%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">DevOps </span>
                  <span className="text-accent">████████░░░░░░░░ 50%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground">Design </span>
                  <span className="text-terminal-green">
                    ██████████████░░ 85%
                  </span>
                </div>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-5xl font-bold text-primary tabular-nums mb-2">
                156
              </div>
              <div className="text-sm text-muted-foreground font-mono mb-2">
                Total Projects
              </div>
              <div className="text-xs text-terminal-green font-mono">
                ↑ 12% from last month
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-5xl font-bold text-secondary tabular-nums mb-2">
                4.8
              </div>
              <div className="text-sm text-muted-foreground font-mono mb-2">
                Average Rating
              </div>
              <div className="text-xs text-terminal-green font-mono">
                ↑ 0.3 improvement
              </div>
            </div>
          </div>
        </section>

        {/* Terminal Navigation Components */}
        <section className="mb-16">
          <div className="font-mono text-terminal-green mb-2">
            $ ls navigation/
          </div>
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Terminal Navigation
          </h2>

          <div className="space-y-6">
            {/* Horizontal Tab Navigation */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Tab Navigation
              </h3>
              <div className="flex gap-1 border-b border-border">
                <button className="px-4 py-2 font-mono text-sm border-b-2 border-primary text-primary bg-primary/10">
                  $ home
                </button>
                <button className="px-4 py-2 font-mono text-sm border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  $ about
                </button>
                <button className="px-4 py-2 font-mono text-sm border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  $ projects
                </button>
                <button className="px-4 py-2 font-mono text-sm border-b-2 border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                  $ contact
                </button>
              </div>
              <code className="text-xs text-muted-foreground block mt-3">
                Terminal-style tabs
              </code>
            </div>

            {/* Breadcrumb Navigation */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Breadcrumb Navigation
              </h3>
              <div className="font-mono text-sm space-y-2">
                <div className="flex items-center gap-2 text-foreground">
                  <span className="text-primary">~</span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-primary hover:underline cursor-pointer">
                    projects
                  </span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-primary hover:underline cursor-pointer">
                    portfolio
                  </span>
                  <span className="text-muted-foreground">/</span>
                  <span className="text-foreground">index.tsx</span>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block mt-3">
                File path style breadcrumbs
              </code>
            </div>

            {/* Vertical Menu */}
            <div className="border border-border rounded-lg p-6 bg-terminal-surface">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Vertical Menu
              </h3>
              <div className="font-mono text-sm space-y-1">
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/20 text-primary rounded cursor-pointer">
                  <span>{">"}</span>
                  <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary rounded cursor-pointer transition-colors">
                  <span className="invisible">{">"}</span>
                  <span>Projects</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary rounded cursor-pointer transition-colors">
                  <span className="invisible">{">"}</span>
                  <span>Settings</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 text-foreground hover:bg-primary/10 hover:text-primary rounded cursor-pointer transition-colors">
                  <span className="invisible">{">"}</span>
                  <span>Help</span>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block mt-3">
                Sidebar-style menu
              </code>
            </div>

            {/* Pagination */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Pagination
              </h3>
              <div className="flex items-center justify-center gap-2 font-mono text-sm">
                <button className="px-3 py-1 border border-border rounded text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  {"<"}
                </button>
                <button className="px-3 py-1 border border-border rounded text-foreground hover:border-primary hover:text-primary transition-colors">
                  1
                </button>
                <button className="px-3 py-1 border border-primary bg-primary/20 text-primary rounded">
                  2
                </button>
                <button className="px-3 py-1 border border-border rounded text-foreground hover:border-primary hover:text-primary transition-colors">
                  3
                </button>
                <span className="px-2 text-muted-foreground">...</span>
                <button className="px-3 py-1 border border-border rounded text-foreground hover:border-primary hover:text-primary transition-colors">
                  10
                </button>
                <button className="px-3 py-1 border border-border rounded text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  {">"}
                </button>
              </div>
              <code className="text-xs text-muted-foreground block mt-3 text-center">
                Page navigation
              </code>
            </div>
          </div>
        </section>

        {/* Footer Components */}
        <section className="mb-16">
          <div className="font-mono text-terminal-green mb-2">
            $ cat footer.tsx
          </div>
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Footer Components
          </h2>

          <div className="space-y-6">
            {/* Minimal Footer */}
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="border-t border-border p-6 bg-terminal-surface">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-sm">
                  <div className="text-muted-foreground">
                    © 2025 <span className="text-primary">~/andrewdryga</span>
                  </div>
                  <div className="flex gap-4">
                    <Link to="#" className="text-primary hover:underline">
                      GitHub
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link to="#" className="text-primary hover:underline">
                      Twitter
                    </Link>
                    <span className="text-muted-foreground">|</span>
                    <Link to="#" className="text-primary hover:underline">
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block px-6 pb-4">
                Minimal single-line footer
              </code>
            </div>

            {/* Detailed Footer */}
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="border-t-2 border-primary p-8 bg-terminal-surface">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-sm mb-6">
                  <div>
                    <div className="text-primary font-bold mb-3">
                      $ Navigation
                    </div>
                    <div className="space-y-2">
                      <div className="text-foreground hover:text-primary cursor-pointer transition-colors">
                        → Home
                      </div>
                      <div className="text-foreground hover:text-primary cursor-pointer transition-colors">
                        → About
                      </div>
                      <div className="text-foreground hover:text-primary cursor-pointer transition-colors">
                        → Projects
                      </div>
                      <div className="text-foreground hover:text-primary cursor-pointer transition-colors">
                        → Blog
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-secondary font-bold mb-3">
                      $ Connect
                    </div>
                    <div className="space-y-2">
                      <div className="text-foreground hover:text-secondary cursor-pointer transition-colors">
                        → GitHub
                      </div>
                      <div className="text-foreground hover:text-secondary cursor-pointer transition-colors">
                        → Twitter
                      </div>
                      <div className="text-foreground hover:text-secondary cursor-pointer transition-colors">
                        → LinkedIn
                      </div>
                      <div className="text-foreground hover:text-secondary cursor-pointer transition-colors">
                        → Email
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-accent font-bold mb-3">$ Legal</div>
                    <div className="space-y-2">
                      <div className="text-foreground hover:text-accent cursor-pointer transition-colors">
                        → Privacy
                      </div>
                      <div className="text-foreground hover:text-accent cursor-pointer transition-colors">
                        → Terms
                      </div>
                      <div className="text-foreground hover:text-accent cursor-pointer transition-colors">
                        → License
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-6">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <div className="text-muted-foreground">
                      Made with <span className="text-destructive">❤</span>{" "}
                      using React + TypeScript
                    </div>
                    <div className="text-muted-foreground">
                      © 2025 All rights reserved
                    </div>
                  </div>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block px-6 pb-4">
                Multi-column footer with sections
              </code>
            </div>

            {/* Terminal-style Footer */}
            <div className="border border-primary rounded-lg overflow-hidden bg-terminal-surface">
              <div className="p-6 font-mono text-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">$</span>
                    <span className="text-foreground">
                      Built with React 18.3.1
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-secondary">$</span>
                    <span className="text-foreground">
                      Last updated: Oct 14, 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-accent">$</span>
                    <span className="text-foreground">
                      Status:{" "}
                      <span className="text-terminal-green">✓ Online</span>
                    </span>
                  </div>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block px-6 pb-4">
                Command-line style footer
              </code>
            </div>

            {/* Current Website Footer */}
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <div className="py-12 px-4 border-t border-border bg-terminal-surface">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="font-mono text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Andrii Dryga
                  </p>
                  <p className="font-mono text-sm text-terminal-cyan">
                    {">"} Powered by code and curiosity
                  </p>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block px-6 pb-4">
                Actual website footer
              </code>
            </div>
          </div>
        </section>

        {/* Responsive Behavior */}
        <section className="mb-16">
          <SectionHeader
            title="Responsive Design"
            command="cat responsive-patterns.md"
            description="Mobile-first responsive patterns and breakpoints"
          />

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Breakpoints
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-terminal-cyan mb-2">
                sm: 640px
              </div>
              <p className="text-sm text-muted-foreground">
                Small tablets, large phones
              </p>
            </div>
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-terminal-green mb-2">
                md: 768px
              </div>
              <p className="text-sm text-muted-foreground">
                Tablets, small laptops
              </p>
            </div>
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-terminal-yellow mb-2">
                lg: 1024px
              </div>
              <p className="text-sm text-muted-foreground">Laptops, desktops</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Mobile Navigation
          </h3>
          <div className="grid gap-6 mb-8">
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Hamburger Menu Pattern
              </div>
              <div className="flex items-center justify-between p-4 bg-terminal-surface rounded border border-border">
                <div className="font-mono text-primary">Logo</div>
                <button className="md:hidden flex flex-col gap-1.5 p-2">
                  <span className="block w-6 h-0.5 bg-foreground"></span>
                  <span className="block w-6 h-0.5 bg-foreground"></span>
                  <span className="block w-6 h-0.5 bg-foreground"></span>
                </button>
                <nav className="hidden md:flex gap-4 font-mono text-sm">
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 transition-colors duration-200"
                  >
                    Home
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-primary transition-colors duration-200"
                  >
                    About
                  </a>
                  <a
                    href="#"
                    className="text-foreground hover:text-primary transition-colors duration-200"
                  >
                    Projects
                  </a>
                </nav>
              </div>
              <CodeExample
                code={`{/* Mobile: Show hamburger, Desktop: Show full menu */}
<button className="md:hidden">☰</button>
<nav className="hidden md:flex gap-4">
  <a href="#">Home</a>
  <a href="#">About</a>
</nav>`}
                className="mt-4"
              />
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Responsive Grid Patterns
          </h3>
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <div className="font-mono text-sm text-muted-foreground mb-4">
              Auto-responsive Grid
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="h-20 bg-primary/20 border border-primary rounded flex items-center justify-center font-mono text-sm">
                1 col → 2 → 4
              </div>
              <div className="h-20 bg-primary/20 border border-primary rounded flex items-center justify-center font-mono text-sm">
                Mobile first
              </div>
              <div className="h-20 bg-primary/20 border border-primary rounded flex items-center justify-center font-mono text-sm">
                Tablet
              </div>
              <div className="h-20 bg-primary/20 border border-primary rounded flex items-center justify-center font-mono text-sm">
                Desktop
              </div>
            </div>
            <CodeExample
              code={`{/* Mobile: 1 column, Tablet: 2 columns, Desktop: 4 columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>`}
            />
          </div>

          <h3 className="text-xl font-bold mb-4 text-foreground">
            Touch Targets
          </h3>
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <div className="font-mono text-sm text-muted-foreground mb-4">
              Minimum 44×44px for mobile
            </div>
            <div className="flex gap-4 items-center">
              <button className="w-11 h-11 bg-primary text-primary-foreground rounded flex items-center justify-center hover:bg-primary/90 transition-colors duration-200">
                ✓
              </button>
              <span className="text-terminal-green font-mono text-sm">
                ✓ Proper size (44×44px)
              </span>
            </div>
            <div className="flex gap-4 items-center mt-4">
              <button className="w-6 h-6 bg-destructive text-destructive-foreground rounded flex items-center justify-center text-xs hover:bg-destructive/90 transition-colors duration-200">
                ✗
              </button>
              <span className="text-destructive font-mono text-sm">
                ✗ Too small (24×24px)
              </span>
            </div>
          </div>

          <DoAndDont
            doText="Use mobile-first approach: base styles for mobile, md: for tablet+"
            dontText="Don't create separate mobile and desktop versions - use responsive utilities"
            className="mb-8"
          />

          <div className="bg-terminal-surface/50 border border-primary/30 rounded-lg p-4">
            <div className="font-mono text-xs text-primary mb-2">
              📱 Responsive Best Practices
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="font-mono">
                ✓ Test on real devices, not just browser resize
              </li>
              <li className="font-mono">✓ Touch targets ≥44×44px for mobile</li>
              <li className="font-mono">
                ✓ Use relative units (rem, %, vw) over fixed pixels
              </li>
              <li className="font-mono">
                ✓ Hide/show content with hidden/block utilities
              </li>
              <li className="font-mono">
                ✓ Stack layouts vertically on mobile (flex-col → flex-row)
              </li>
            </ul>
          </div>
        </section>

        {/* Modern TUI Elements */}
        <section className="mb-16">
          <SectionHeader
            title="Modern TUI Elements"
            command="cat tui-elements.tsx"
          />

          <div className="space-y-6">
            {/* Status Bar */}
            <div className="border border-border rounded-lg overflow-hidden bg-card">
              <h3 className="text-lg font-bold text-foreground px-6 pt-6 pb-4">
                Status Bar
              </h3>
              <div className="bg-terminal-surface border-y border-border p-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
                      <span className="text-foreground">Connected</span>
                    </span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-primary">Branch: main</span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-accent">Files: 42</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-muted-foreground">Line 156:12</span>
                    <span className="text-muted-foreground">|</span>
                    <span className="text-foreground">UTF-8</span>
                  </div>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block px-6 py-4">
                Bottom status bar with context info
              </code>
            </div>

            {/* Command Palette */}
            <div className="border border-primary rounded-lg overflow-hidden bg-card">
              <h3 className="text-lg font-bold text-foreground px-6 pt-6 pb-4">
                Command Palette
              </h3>
              <div className="bg-terminal-surface p-4">
                <div className="border border-primary rounded-lg bg-card/50 backdrop-blur">
                  <div className="border-b border-border p-3">
                    <div className="flex items-center gap-2 text-sm font-mono">
                      <span className="text-primary">{">"}</span>
                      <input
                        type="text"
                        placeholder="Type a command..."
                        className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div className="p-2 space-y-1 text-sm font-mono max-h-64 overflow-y-auto">
                    <div className="px-3 py-2 bg-primary/20 text-primary rounded cursor-pointer flex items-center gap-2">
                      <span>{">"}</span>
                      <span>Open Settings</span>
                      <span className="ml-auto text-xs opacity-70">Ctrl+,</span>
                    </div>
                    <div className="px-3 py-2 text-foreground hover:bg-primary/10 rounded cursor-pointer transition-colors">
                      Create New File
                    </div>
                    <div className="px-3 py-2 text-foreground hover:bg-primary/10 rounded cursor-pointer transition-colors">
                      Search Files
                    </div>
                    <div className="px-3 py-2 text-foreground hover:bg-primary/10 rounded cursor-pointer transition-colors">
                      Run Build
                    </div>
                  </div>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block px-6 pb-4">
                Quick command search palette
              </code>
            </div>

            {/* Toast Notifications */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Toast Notifications
              </h3>
              <div className="space-y-3">
                <div className="border border-terminal-green rounded-lg p-4 bg-terminal-green/5 font-mono text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-terminal-green font-bold">✓</span>
                    <div className="flex-1">
                      <div className="text-terminal-green font-bold mb-1">
                        Success
                      </div>
                      <div className="text-foreground">
                        File saved successfully
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-primary rounded-lg p-4 bg-primary/5 font-mono text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-primary font-bold">i</span>
                    <div className="flex-1">
                      <div className="text-primary font-bold mb-1">Info</div>
                      <div className="text-foreground">
                        5 new updates available
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-secondary rounded-lg p-4 bg-secondary/5 font-mono text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-secondary font-bold">!</span>
                    <div className="flex-1">
                      <div className="text-secondary font-bold mb-1">
                        Warning
                      </div>
                      <div className="text-foreground">
                        Low disk space detected
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border border-destructive rounded-lg p-4 bg-destructive/5 font-mono text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-destructive font-bold">✗</span>
                    <div className="flex-1">
                      <div className="text-destructive font-bold mb-1">
                        Error
                      </div>
                      <div className="text-foreground">
                        Connection failed. Retrying...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block mt-3">
                Terminal-style notification toasts
              </code>
            </div>

            {/* Search Bar */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Search Interface
              </h3>
              <div className="space-y-4">
                <div className="border border-primary rounded-lg p-3 bg-primary/5">
                  <div className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-primary">$</span>
                    <input
                      type="text"
                      placeholder="grep -r 'search term' ."
                      className="flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
                    />
                    <kbd className="px-2 py-1 bg-muted border border-border rounded text-xs">
                      ⌘K
                    </kbd>
                  </div>
                </div>

                <div className="border border-border rounded-lg">
                  <div className="p-2 space-y-1 font-mono text-sm max-h-48 overflow-y-auto">
                    <div className="px-3 py-2 hover:bg-muted/50 rounded cursor-pointer transition-colors">
                      <div className="text-foreground mb-1">
                        src/components/Hero.tsx
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Line 42: const hero = ...
                      </div>
                    </div>
                    <div className="px-3 py-2 hover:bg-muted/50 rounded cursor-pointer transition-colors">
                      <div className="text-foreground mb-1">
                        src/pages/Index.tsx
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Line 18: import Hero from ...
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block mt-3">
                File/content search with results
              </code>
            </div>

            {/* Modal/Dialog */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-bold text-foreground mb-4">
                Modal Dialog
              </h3>
              <div className="border-2 border-primary rounded-lg bg-terminal-surface max-w-md mx-auto">
                <div className="border-b border-primary p-4 flex items-center justify-between">
                  <div className="font-mono text-primary font-bold">
                    $ Confirm Action
                  </div>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    ✕
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-foreground mb-6">
                    Are you sure you want to delete this file? This action
                    cannot be undone.
                  </p>
                  <div className="flex gap-3 justify-end">
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Delete</Button>
                  </div>
                </div>
              </div>
              <code className="text-xs text-muted-foreground block mt-4 text-center">
                Confirmation dialog with actions
              </code>
            </div>
          </div>
        </section>

        {/* Layout & Spacing */}
        <section className="mb-16">
          <SectionHeader title="Layout & Grid" command="man grid" />

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-mono text-muted-foreground mb-4">
                2 Column Grid
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-border rounded-lg p-4 bg-card text-center font-mono text-muted-foreground">
                  Column 1
                </div>
                <div className="border border-border rounded-lg p-4 bg-card text-center font-mono text-muted-foreground">
                  Column 2
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-mono text-muted-foreground mb-4">
                3 Column Grid
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="border border-border rounded-lg p-4 bg-card text-center font-mono text-muted-foreground">
                  Col 1
                </div>
                <div className="border border-border rounded-lg p-4 bg-card text-center font-mono text-muted-foreground">
                  Col 2
                </div>
                <div className="border border-border rounded-lg p-4 bg-card text-center font-mono text-muted-foreground">
                  Col 3
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-mono text-muted-foreground mb-4">
                Responsive Grid (4 cols → 2 → 1)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="border border-border rounded-lg p-4 bg-card text-center font-mono text-muted-foreground"
                  >
                    Item {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Back to Top */}
        <div className="text-center pt-8 border-t border-border">
          <Link
            to="/"
            className="inline-block px-6 py-3 border border-primary text-primary font-mono hover:bg-primary/10 rounded transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ComponentLibrary;
