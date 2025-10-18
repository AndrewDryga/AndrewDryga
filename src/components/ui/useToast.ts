export type ToastVariant = "default" | "success" | "warning" | "destructive";

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

export function toast(options: ToastOptions) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("toast", { detail: options }));
}
