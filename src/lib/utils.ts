import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes conditionally with proper conflict resolution.
 *
 * Usage:
 *  cn("px-2", condition && "px-4", ["text-sm", isActive ? "text-primary" : "text-muted-foreground"])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
