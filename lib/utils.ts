import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  // Format price in Indian format (e.g., 1,00,00,000)
  const formatter = new Intl.NumberFormat("en-IN")
  return formatter.format(price)
}
