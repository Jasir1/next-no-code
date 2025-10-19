import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Export other utility functions if needed
export * from './utils/exportUtils';
export * from './utils/styleUtils';
