export const metadata = {
  title: 'Lagniappe — Personal Interests & Recipes | Cain Menard',
  description: 'A little something extra — personal interests, Cajun family recipes, and side projects from Cain Menard.',
  openGraph: {
    title: 'Lagniappe — Personal Interests & Recipes | Cain Menard',
    description: 'A little something extra — personal interests, Cajun family recipes, and side projects.',
    url: 'https://cainmenard.com/lagniappe',
    images: [{ url: 'https://cainmenard.com/og-image.png', width: 1200, height: 630, alt: 'Cain Menard — Lagniappe' }],
  },
  alternates: {
    canonical: 'https://cainmenard.com/lagniappe',
  },
}

export default function LagniappeLayout({ children }) {
  return children
}
