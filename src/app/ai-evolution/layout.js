export const metadata = {
  title: 'The Tool Changed. The Expertise Didn\'t. | Cain Menard',
  description: 'How AI coding tools are transforming construction analytics — rebuilding Tableau dashboards as full web apps in hours. A case study on domain expertise, AI productivity, and why construction professionals are sitting on the biggest opportunity in the room.',
  keywords: ['AI construction', 'AI coding tools', 'construction technology', 'domain expertise', 'vibe coding', 'Claude Code', 'Tableau alternative', 'construction analytics', 'AI productivity', 'digital transformation construction', 'construction software', 'AI adoption'],
  openGraph: {
    title: 'The Tool Changed. The Expertise Didn\'t. | Cain Menard',
    description: 'AI coding tools rebuilt a Tableau dashboard as a full React web app in hours. A case study on domain expertise, construction technology, and the biggest shift in who gets to build software.',
    url: 'https://cainmenard.com/ai-evolution',
    type: 'article',
    publishedTime: '2024-06-01T00:00:00.000Z',
    modifiedTime: '2026-02-26T00:00:00.000Z',
    authors: ['https://cainmenard.com'],
    section: 'AI & Construction Technology',
    tags: ['AI', 'Construction', 'Domain Expertise', 'Vibe Coding', 'Claude Code', 'Construction Analytics', 'Digital Transformation'],
    images: [{ url: 'https://cainmenard.com/article-hero.jpg', width: 1200, height: 630, alt: 'Construction crane against the sky — AI and construction technology case study' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Tool Changed. The Expertise Didn\'t. | Cain Menard',
    description: 'AI coding tools rebuilt a Tableau dashboard as a full React web app in hours. Here\'s what that means for construction.',
    images: ['https://cainmenard.com/article-hero.jpg'],
  },
  alternates: {
    canonical: 'https://cainmenard.com/ai-evolution',
  },
}

const articleJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Tool Changed. The Expertise Didn\'t.',
  description: 'How AI coding tools are transforming construction analytics — rebuilding Tableau dashboards as full web apps in hours. A case study on domain expertise, AI productivity, and construction technology adoption.',
  author: {
    '@type': 'Person',
    name: 'Cain Menard',
    url: 'https://cainmenard.com',
    jobTitle: 'Director of Consulting & Operations',
    worksFor: {
      '@type': 'Organization',
      name: 'Automized Solutions',
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
  wordCount: 5000,
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
      name: 'The Tool Changed. The Expertise Didn\'t.',
      item: 'https://cainmenard.com/ai-evolution',
    },
  ],
}

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can AI replace tools like Tableau for construction analytics?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI coding tools can rebuild Tableau dashboards as full production web applications in hours rather than weeks. The resulting apps are free to deploy, require no special software licenses, and are accessible to anyone with a browser. However, AI excels at building new applications from domain knowledge — a 2025 METR study found experienced developers were actually 19% slower with AI on complex legacy maintenance tasks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a web app with AI coding tools?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Build times vary by complexity, but the case study documents a complete project performance analytics dashboard — with 5 interactive views, KPI cards, cross-dimensional filters, and executive insights — rebuilt as a deployed React web app in hours using Claude Code and voice-to-code tools. GitHub\'s controlled experiment found developers using AI coding tools completed tasks 55.8% faster overall.',
      },
    },
    {
      '@type': 'Question',
      name: 'What skills do construction professionals need to use AI effectively?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Domain expertise is the most critical skill. MIT labor economist David Autor argues AI\'s unique opportunity is to extend the relevance and value of human expertise. Stanford research found AI creates the greatest value when domain experts themselves apply it, not when filtered through IT specialists. Construction professionals who understand project performance, cost drivers, and operational workflows are uniquely positioned — the barrier is now describing what to build, not knowing how to code.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is the construction industry ready for AI adoption?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most construction companies need foundational work before capturing AI value. Research shows less than 10% of technology implementation failures are technical — 80% depend on people and process. A readiness framework should address four pillars: Talent (domain experts willing to learn), Process (standardized workflows, not chaos), Data (clean, integrated, and accessible — 96% of construction data currently goes unused), and Integration (connected systems, not islands). Organizations with structured change management are 7x more likely to succeed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the ROI of AI in construction?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The AI-in-construction market is projected to grow from $3.9 billion to $22.7 billion by 2032. However, an MIT study found 95% of organizations achieved zero ROI from generative AI investments — largely due to readiness gaps, not the technology itself. Construction loses an estimated $177 billion annually to operational inefficiencies, and field teams lose 14+ hours per week searching for project information. Companies that address process, data, and change management foundations first stand to capture significant returns.',
      },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
