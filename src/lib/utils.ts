import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as bcrypt from "bcryptjs";

/**
 * Combines class names using clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Hashes a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  // For mock implementation, we'll use a simple hash
  // In a real app, you would use a proper bcrypt implementation
  return `hashed_${password}`;
}

/**
 * Verifies a password against a hash
 */
export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  // For mock implementation, we'll do a simple comparison
  // In a real app, you would use bcrypt.compare
  return hash === `hashed_${password}`;
}
