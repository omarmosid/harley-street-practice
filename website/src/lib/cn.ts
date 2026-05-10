/**
 * cn — class name merge helper.
 * Wraps tailwind-merge so we can intelligently dedupe Tailwind classes
 * (e.g. variant `bg-brand-700` overridden by caller `bg-accent-400`).
 *
 * Usage:
 *   const classes = cn(base, variants[v], sizes[s], className);
 */
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: Array<string | undefined | null | false>): string {
  return twMerge(inputs.filter(Boolean).join(' '));
}
