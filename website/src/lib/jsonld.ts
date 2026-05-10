/**
 * JSON-LD builders for SEO.
 * Each function returns a plain object that gets serialized in <script type="application/ld+json">.
 */
import { SITE_NAME, SITE_URL, PRACTICE } from '../consts';

const ORG_ID = `${SITE_URL}/#organization`;

export function medicalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_URL,
    telephone: PRACTICE.phone.display,
    email: PRACTICE.email.display,
    address: {
      '@type': 'PostalAddress',
      streetAddress: PRACTICE.address.line1,
      addressLocality: PRACTICE.address.locality,
      postalCode: PRACTICE.address.postalCode,
      addressCountry: 'GB',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: PRACTICE.address.geo.latitude,
      longitude: PRACTICE.address.geo.longitude,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:30',
      },
    ],
    sameAs: [
      PRACTICE.social.instagram,
      PRACTICE.social.twitter,
      PRACTICE.social.facebook,
    ],
    medicalSpecialty: ['Primary Care', 'Occupational Medicine', 'Musculoskeletal Care', 'Mental Health'],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.href.startsWith('http') ? item.href : `${SITE_URL}${item.href}`,
    })),
  };
}

export function articleSchema(article: {
  title: string;
  description?: string;
  url: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author: article.author ? { '@type': 'Person', name: article.author } : { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  };
}

export function physicianSchema(p: {
  name: string;
  jobTitle?: string;
  qualifications?: string;
  description?: string;
  image?: string;
  url?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: p.name,
    jobTitle: p.jobTitle,
    description: p.description,
    image: p.image,
    url: p.url,
    hasCredential: p.qualifications,
    worksFor: { '@id': ORG_ID },
  };
}

export function medicalServiceSchema(s: {
  name: string;
  description?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalService',
    name: s.name,
    description: s.description,
    url: s.url,
    provider: { '@id': ORG_ID },
  };
}
