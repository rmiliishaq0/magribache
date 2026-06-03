import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizeKeys = (obj: Record<string, any>) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key.charAt(0).toUpperCase() + key.slice(1),
      value,
    ])
  )
}
