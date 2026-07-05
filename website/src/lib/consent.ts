import { COOKIE_CONSENT } from '../consts';

type ConsentStatus = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    openCookieSettings?: () => void;
  }
}

const cookieName = COOKIE_CONSENT.name;
const maxAge = COOKIE_CONSENT.maxAgeDays * 24 * 60 * 60;

function readCookie(name: string): string | undefined {
  const parts = document.cookie ? document.cookie.split('; ') : [];
  for (const part of parts) {
    const [key, ...rest] = part.split('=');
    if (decodeURIComponent(key) === name) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return undefined;
}

function writeCookie(name: string, value: string) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function expireCookie(name: string, domain?: string) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const domainPart = domain ? `; Domain=${domain}` : '';
  document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; Path=/${domainPart}; SameSite=Lax${secure}`;
}

function getCookieDomains(): string[] {
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname}`];
  const parts = hostname.split('.');

  if (parts.length > 2) {
    domains.push(`.${parts.slice(-2).join('.')}`);
  }

  return Array.from(new Set(domains));
}

function clearGoogleAnalyticsCookies() {
  const gaCookies = document.cookie
    .split('; ')
    .map((part) => decodeURIComponent(part.split('=')[0] || ''))
    .filter((name) => name === '_ga' || name === '_gid' || name.startsWith('_ga_'));

  for (const name of gaCookies) {
    expireCookie(name);
    for (const domain of getCookieDomains()) {
      expireCookie(name, domain);
    }
  }
}

function updateGoogleConsent(status: ConsentStatus) {
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: status === 'granted' ? 'granted' : 'denied',
  });
}

export function getConsent(): ConsentStatus | undefined {
  const value = readCookie(cookieName);
  return value === 'granted' || value === 'denied' ? value : undefined;
}

export function setConsent(status: ConsentStatus) {
  writeCookie(cookieName, status);
  updateGoogleConsent(status);

  if (status === 'denied') {
    clearGoogleAnalyticsCookies();
  }

  window.dispatchEvent(new CustomEvent('lhc:consent', { detail: { status } }));
}

export function openConsentBanner() {
  const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
  if (!banner) return;

  banner.hidden = false;
  banner.dataset.open = 'true';
  banner.querySelector<HTMLButtonElement>('[data-cookie-accept]')?.focus();
}

function closeConsentBanner() {
  const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
  if (!banner) return;

  banner.dataset.open = 'false';
  banner.hidden = true;
}

export function initCookieConsent() {
  const banner = document.querySelector<HTMLElement>('[data-cookie-banner]');
  if (!banner) return;

  window.openCookieSettings = openConsentBanner;

  banner.querySelector<HTMLButtonElement>('[data-cookie-accept]')?.addEventListener('click', () => {
    setConsent('granted');
    closeConsentBanner();
  });

  banner.querySelector<HTMLButtonElement>('[data-cookie-reject]')?.addEventListener('click', () => {
    setConsent('denied');
    closeConsentBanner();
  });

  if (!getConsent()) {
    openConsentBanner();
  }
}

if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookieConsent);
  } else {
    initCookieConsent();
  }
}
