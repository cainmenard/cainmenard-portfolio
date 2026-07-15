import './field-intelligence.css'

export const metadata = {
  title: 'A Day of Field Intelligence | Cain Menard',
  description:
    'Follow one labor hour from the jobsite to the income statement, and back. An interactive piece on construction field time, job cost, and the estimating leak, built by Cain Menard.',
  keywords: [
    'construction analytics',
    'field time tracking',
    'job cost',
    'earned value',
    'estimating',
    'completed-contracts analysis',
    'construction technology',
    'labor productivity',
    'bid selectivity',
    'construction operations',
  ],
  openGraph: {
    title: 'A Day of Field Intelligence | Cain Menard',
    description:
      'One labor hour, from the jobsite to the income statement, and back. Five interactive stations on construction field time, job cost, and the estimating leak.',
    url: 'https://cainmenard.com/field-intelligence',
    type: 'article',
    authors: ['https://cainmenard.com'],
    section: 'Construction & Data',
    images: [
      {
        url: 'https://cainmenard.com/field-intelligence-og.png',
        width: 1200,
        height: 630,
        alt: 'A Day of Field Intelligence, an interactive construction analytics piece by Cain Menard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Day of Field Intelligence | Cain Menard',
    description:
      'One labor hour, from the jobsite to the income statement, and back. An interactive construction analytics piece.',
    images: ['https://cainmenard.com/field-intelligence-og.png'],
  },
  alternates: {
    canonical: 'https://cainmenard.com/field-intelligence',
  },
}

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'A Day of Field Intelligence',
  headline: 'A Day of Field Intelligence',
  description:
    'An interactive piece that follows one labor hour from the jobsite to the income statement and back, across five stations: field, office, job cost, portfolio, and decisions.',
  author: {
    '@type': 'Person',
    name: 'Cain Menard',
    url: 'https://cainmenard.com',
    jobTitle: 'Management Consultant, ERP & Digital Transformation',
  },
  url: 'https://cainmenard.com/field-intelligence',
  inLanguage: 'en-US',
  about: ['Construction operations', 'Field time capture', 'Job cost', 'Estimating', 'Bid selectivity'],
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cainmenard.com' },
    { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://cainmenard.com/#projects' },
    { '@type': 'ListItem', position: 3, name: 'A Day of Field Intelligence', item: 'https://cainmenard.com/field-intelligence' },
  ],
}

export default function FieldIntelligenceLayout({ children }) {
  return (
    <>
      {/* Route-scoped mono face for figures (Fraunces + Plus Jakarta Sans load globally) */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&display=swap"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {children}
    </>
  )
}
