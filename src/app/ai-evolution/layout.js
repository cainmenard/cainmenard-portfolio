export const metadata = {
  title: 'Weeks of Tableau Work, Rebuilt in Hours | Cain Menard',
  description: 'A weeks-long Tableau dashboard, rebuilt as a deployed React web app in hours. A case study on domain expertise, AI productivity, and why construction has the most ground to make up.',
  keywords: ['AI construction', 'AI coding tools', 'construction technology', 'domain expertise', 'vibe coding', 'Claude Code', 'Tableau alternative', 'construction analytics', 'AI productivity', 'digital transformation construction', 'construction software', 'AI adoption'],
  openGraph: {
    title: 'Weeks of Tableau Work, Rebuilt in Hours | Cain Menard',
    description: 'AI coding tools rebuilt a Tableau dashboard as a full React web app in hours. A case study on domain expertise, construction technology, and who gets to build software now.',
    url: 'https://cainmenard.com/ai-evolution',
    type: 'article',
    publishedTime: '2024-06-01T00:00:00.000Z',
    modifiedTime: '2026-02-26T00:00:00.000Z',
    authors: ['https://cainmenard.com'],
    section: 'AI & Construction Technology',
    tags: ['AI', 'Construction', 'Domain Expertise', 'Vibe Coding', 'Claude Code', 'Construction Analytics', 'Digital Transformation'],
    images: [{ url: 'https://cainmenard.com/article-hero.jpg', width: 1200, height: 630, alt: 'Construction crane against the sky, AI and construction technology case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Weeks of Tableau Work, Rebuilt in Hours | Cain Menard',
    description: 'AI coding tools rebuilt a Tableau dashboard as a full React web app in hours. What that means for construction.',
    images: ['https://cainmenard.com/article-hero.jpg'],
  },
  alternates: {
    canonical: 'https://cainmenard.com/ai-evolution',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Weeks of Tableau Work, Rebuilt in Hours',
  description: 'A weeks-long Tableau dashboard, rebuilt as a deployed React web app in hours. A case study on domain expertise, AI productivity, and construction technology adoption.',
  author: {
    '@type': 'Person',
    name: 'Cain Menard',
    url: 'https://cainmenard.com',
    jobTitle: 'Operations Strategy, Data Analytics & AI',
    worksFor: {
      '@type': 'Organization',
      name: 'CEI',
    },
  },
  publisher: {
    '@type': 'Organization',
    name: 'Cain Menard',
    url: 'https://cainmenard.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://cainmenard.com/og-image.png',
    },
  },
  datePublished: '2024-06-01',
  dateModified: '2026-02-26',
  image: 'https://cainmenard.com/article-hero.jpg',
  url: 'https://cainmenard.com/ai-evolution',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://cainmenard.com/ai-evolution',
  },
  wordCount: 2100,
  articleSection: 'AI & Construction Technology',
  keywords: 'AI construction, AI coding tools, construction technology, domain expertise, vibe coding, construction analytics, digital transformation',
  inLanguage: 'en-US',
}

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://cainmenard.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Case Studies',
      item: 'https://cainmenard.com/#projects',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Weeks of Tableau Work, Rebuilt in Hours',
      item: 'https://cainmenard.com/ai-evolution',
    },
  ],
}

export default function AIEvolutionLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
