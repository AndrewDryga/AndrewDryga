import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}"],
  safelist: [
    // Gradients, shadows, and prose variants that might be generated dynamically
    "bg-gradient-primary",
    "bg-gradient-card",
    "shadow-glow",
    "shadow-card",
    "prose",
    "prose-invert",
    // Terminal palette utilities used across components
    "text-terminal-cyan",
    "text-terminal-green",
    "text-terminal-yellow",
    "border-terminal-cyan",
    "border-terminal-green",
    "border-terminal-yellow",
    // Common animations that may be toggled conditionally
    "animate-fade-in",
    "animate-terminal-typing",
    "animate-border-glow-pulse",
    "animate-terminal-scanline-dot",
    // Gradient utilities used by dataset-driven blog cards
    "from-terminal-cyan",
    "to-terminal-green",
    "from-terminal-yellow",
    "to-terminal-cyan",
    "from-terminal-green",
    "to-terminal-yellow",
    "from-primary",
    "to-primary",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        terminal: {
          cyan: "hsl(var(--terminal-cyan))",
          green: "hsl(var(--terminal-green))",
          yellow: "hsl(var(--terminal-yellow))",
          bg: "hsl(var(--terminal-bg))",
          surface: "hsl(var(--terminal-surface))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-card": "var(--gradient-card)",
      },
      boxShadow: {
        glow: "var(--shadow-glow)",
        card: "var(--shadow-card)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "terminal-scanline": {
          "0%": { transform: "translateY(-100%)", opacity: "0.3" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        "terminal-scanline-dot": {
          "0%": {
            transform: "translateY(-10%)",
            opacity: "0.9",
            boxShadow:
              "0 0 8px hsl(var(--terminal-cyan) / 0.6), 0 0 2px hsl(var(--terminal-cyan) / 0.9)",
          },
          "60%": {
            opacity: "0.9",
          },
          "100%": {
            transform: "translateY(110%)",
            opacity: "0",
          },
        },
        "terminal-load": {
          "0%": { opacity: "0", transform: "translateY(10px) scale(0.98)" },
          "50%": { opacity: "0.5", transform: "translateY(5px) scale(0.99)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "border-glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px hsl(var(--terminal-cyan) / 0.3)" },
          "50%": { boxShadow: "0 0 20px hsl(var(--terminal-cyan) / 0.6)" },
        },
        "text-cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "terminal-typing": {
          "0%": { width: "0", opacity: "0" },
          "1%": { opacity: "1" },
          "100%": { width: "100%", opacity: "1" },
        },
        "border-draw": {
          "0%": { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          "25%": { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
          "50%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 100% 100%)" },
          "75%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
          "100%": { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        },
        "log-stream-in": {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
            filter: "blur(2px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
            filter: "blur(0)",
          },
        },
        "git-branch-draw": {
          "0%": { height: "0", opacity: "0" },
          "100%": { height: "100%", opacity: "1" },
        },
        "commit-slide-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "terminal-scanline": "terminal-scanline 0.8s ease-out",
        "terminal-scanline-dot": "terminal-scanline-dot 1.2s linear infinite",
        "terminal-load": "terminal-load 0.5s ease-out forwards",
        "border-glow-pulse": "border-glow-pulse 1s ease-in-out",
        "text-cursor-blink": "text-cursor-blink 1s step-end infinite",
        "terminal-typing": "terminal-typing 2s steps(50) forwards",
        "border-draw": "border-draw 1s ease-out forwards",
        "log-stream-in": "log-stream-in 0.4s ease-out forwards",
        "git-branch-draw": "git-branch-draw 0.5s ease-out forwards",
        "commit-slide-up": "commit-slide-up 0.5s ease-out forwards",
      },
    },
  },
  plugins: [animate, typography],
} satisfies Config;
