export const metadata = {
  title: 'The Tool Changed. The Expertise Didn\'t. | Cain Menard',
  description: 'A case study on AI, domain expertise, and why construction professionals may be sitting on the biggest opportunity in the room. Deep dive into rebuilding analytics with AI.',
  openGraph: {
    title: 'The Tool Changed. The Expertise Didn\'t. | Cain Menard',
    description: 'AI is reshaping construction analytics. This case study explores what changed, what didn\'t, and why domain expertise matters more than ever.',
    url: 'https://cainmenard.com/ai-evolution',
    images: [{ url: 'https://cainmenard.com/article-hero.jpg', width: 1200, height: 630, alt: 'Construction crane against the sky' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Tool Changed. The Expertise Didn\'t. | Cain Menard',
    description: 'AI is reshaping construction analytics. A deep dive into what changed and what didn\'t.',
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
  description: 'A case study on AI, domain expertise, and construction technology.',
  author: { '@type': 'Person', name: 'Cain Menard', url: 'https://cainmenard.com' },
  publisher: { '@type': 'Person', name: 'Cain Menard' },
  datePublished: '2024-06-01',
  image: 'https://cainmenard.com/article-hero.jpg',
  url: 'https://cainmenard.com/ai-evolution',
}

export default function AIEvolutionLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {children}
    </>
  )
}
