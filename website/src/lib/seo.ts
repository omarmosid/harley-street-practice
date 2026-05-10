import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '../consts';

/** Build a page <title>: "Page name | Site name" — keep ≤60 chars where possible. */
export function pageTitle(title?: string): string {
  if (!title) return SITE_NAME;
  if (title === SITE_NAME) return SITE_NAME;
  return `${title} | ${SITE_NAME}`;
}

/** Resolve a relative path to a full URL using the configured site origin. */
export function absoluteUrl(path: string, origin = SITE_URL): string {
  if (/^https?:\/\//.test(path)) return path;
  const slash = path.startsWith('/') ? '' : '/';
  return `${origin.replace(/\/$/, '')}${slash}${path}`;
}

export const DEFAULT_DESCRIPTION = SITE_DESCRIPTION;
