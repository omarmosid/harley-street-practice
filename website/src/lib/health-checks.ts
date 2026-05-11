import type { CollectionEntry } from 'astro:content';

export type HealthCheck = CollectionEntry<'healthChecks'>;

export const HEALTH_CHECK_GROUPS = {
  quick: {
    label: 'Quick screens',
    href: '/health-checks#quick-screens',
    lede: 'Short, focused appointments for a first private health baseline or annual review.',
  },
  comprehensive: {
    label: 'Comprehensive checks',
    href: '/health-checks#comprehensive-checks',
    lede: 'Fuller 60-75 minute assessments with broader panels and follow-up where included.',
  },
  specialist: {
    label: 'Specialist checks',
    href: '/health-checks#specialist-checks',
    lede: 'In-depth packages for heart health, menopause, sport, and focused clinical priorities.',
  },
  executive: {
    label: 'Executive checks',
    href: '/health-checks#executive-checks',
    lede: 'The most comprehensive assessments, including whole-body MRI in executive packages.',
  },
} as const;

export const GROUP_ORDER = ['quick', 'comprehensive', 'specialist', 'executive'] as const;

export function healthCheckSlug(check: HealthCheck) {
  return check.id.replace(/\.mdx?$/, '');
}

export function healthCheckUrl(check: HealthCheck) {
  return `/health-checks/${healthCheckSlug(check)}`;
}

export function sortHealthChecks(checks: HealthCheck[]) {
  return checks.sort((a, b) => a.data.order - b.data.order);
}

export function groupHealthChecks(checks: HealthCheck[]) {
  const sorted = sortHealthChecks([...checks]);
  return GROUP_ORDER.map((key) => ({
    key,
    ...HEALTH_CHECK_GROUPS[key],
    checks: sorted.filter((check) => check.data.group === key),
  }));
}
