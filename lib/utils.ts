import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPdfLanguage(): "dutch" | "english" {
  if (typeof window === "undefined") return "dutch";
  return (localStorage.getItem("pdfLanguage") || "dutch") as "dutch" | "english";
}

export function parseEuroNumber(value: string): number {
  if (!value) return 0;
  // Replace comma with dot for calculation
  const normalized = value.replace(',', '.');
  return parseFloat(normalized);
}

export function formatEuroNumber(value: number): string {
  // Format number with comma as decimal separator and always 2 decimal places
  return value.toFixed(2).replace('.', ',');
}
