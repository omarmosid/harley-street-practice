/**
 * JSON-LD builders for SEO.
 * Each function returns a plain object that gets serialized in <script type="application/ld+json">.
 */
import { SITE_NAME, SITE_URL, PRACTICE, OPERATOR } from '../consts';

const ORG_ID = `${SITE_URL}/#organization`;
const CLINIC_ID = `${SITE_URL}/#clinic`;

type OfferItem = {
  name: string;
  url: string;
  description?: string;
  price?: string;
  priceValue?: number;
};

export function medicalBusinessSchema() {
  return medicalClinicSchema();
}

export function medicalClinicSchema(offers: OfferItem[] = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': CLINIC_ID,
    name: SITE_NAME,
    alternateName: [
      'London Harley Street Practice',
      'Private Health Check London',
      'Harley Street Health Check',
      'Health Screening London',
      'Private Health Screening London',
      'Full Body MOT London',
      'Health Screening London Harley Street',
      'Health Check Harley Street',
    ],
    url: SITE_URL,
    telephone: PRACTICE.phone.display,
    email: PRACTICE.email.display,
    foundingDate: '2003',
    priceRange: '££-£££',
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
      OPERATOR.url,
      PRACTICE.social.instagram,
      PRACTICE.social.twitter,
      PRACTICE.social.facebook,
    ],
    parentOrganization: {
      '@type': 'MedicalOrganization',
      name: OPERATOR.name,
      url: OPERATOR.url,
    },
    medicalSpecialty: ['Preventive Medicine', 'Primary Care'],
    knowsAbout: [
      'Health check London',
      'Private health check London',
      'Health screening London',
      'Well man check London',
      'Well woman check London',
      'Executive health check London',
      'Full body health check London',
      'Cancer screening',
      'Cardiovascular risk assessment',
      'Preventative medicine',
      'Full Body MOT London',
      'Cancer screening London',
      'Well Man check over 40',
      'Well Woman check over 50',
    ],
    ...(offers.length > 0 && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Private health check packages',
        itemListElement: offers.map((offer) => ({
          '@type': 'Offer',
          url: offer.url,
          price: offer.priceValue,
          priceCurrency: 'GBP',
          availability: 'https://schema.org/InStock',
          description: offer.price ?? offer.description,
          itemOffered: {
            '@type': 'MedicalProcedure',
            name: offer.name,
            description: offer.description,
            url: offer.url,
            procedureType: 'Diagnostic',
          },
          ...(offer.priceValue && {
            priceSpecification: {
              '@type': 'PriceSpecification',
              price: offer.priceValue,
              priceCurrency: 'GBP',
            },
          }),
        })),
      },
    }),
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { '@id': CLINIC_ID },
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
    publisher: { '@id': CLINIC_ID },
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
    worksFor: { '@id': CLINIC_ID },
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
    provider: { '@id': CLINIC_ID },
  };
}

export function medicalProcedureSchema(p: {
  name: string;
  description: string;
  url: string;
  price?: string;
  priceValue?: number;
  duration?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: p.name,
    description: p.description,
    url: p.url,
    procedureType: 'Diagnostic',
    bodyLocation: 'General health',
    provider: { '@id': CLINIC_ID },
    ...(p.duration && { howPerformed: p.duration }),
    ...(p.price && {
      offers: {
        '@type': 'Offer',
        url: p.url,
        price: p.priceValue,
        priceCurrency: 'GBP',
        availability: 'https://schema.org/InStock',
        description: p.price,
        ...(p.priceValue && {
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: p.priceValue,
            priceCurrency: 'GBP',
          },
        }),
      },
    }),
  };
}

export function medicalWebPageSchema(page: {
  name: string;
  description: string;
  url: string;
  speakableSelectors?: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: page.name,
    description: page.description,
    url: page.url,
    reviewedBy: {
      '@type': 'MedicalOrganization',
      name: OPERATOR.name,
      url: OPERATOR.url,
    },
    about: { '@id': CLINIC_ID },
    mainContentOfPage: {
      '@type': 'WebPageElement',
      cssSelector: 'main',
    },
    ...(page.speakableSelectors && {
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: page.speakableSelectors,
      },
    }),
  };
}

export function itemListSchema(items: Array<{ name: string; url: string; description?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'MedicalProcedure',
        name: item.name,
        url: item.url,
        description: item.description,
      },
    })),
  };
}

export function howToSchema(howTo: {
  name: string;
  description: string;
  steps: Array<{ name: string; text: string; url?: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      url: step.url,
    })),
  };
}
