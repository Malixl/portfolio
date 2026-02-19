import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes conditionally.
 * Combines clsx (conditional class joining) with tailwind-merge (deduplication).
 * Usage: cn('px-4 py-2', isActive && 'bg-purple-500', className)
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
