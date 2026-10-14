import PersonalityExplorer from './PersonalityExplorer'

export const metadata = {
  title: 'Personality Profile | Cain Menard',
  description: 'Six personality assessments mapped into one interactive profile, from leadership style and communication to decision-making and what happens under pressure.',
  openGraph: {
    title: 'How I Operate | Cain Menard',
    description: 'Six personality assessments mapped into one interactive profile.',
    url: 'https://cainmenard.com/personality',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personality Profile | Cain Menard',
    description: 'Six personality assessments mapped into one interactive profile, from leadership style and communication to decision-making and what happens under pressure.',
    images: ['https://cainmenard.com/og-image.png'],
  },
}

export default function PersonalityPage() {
  return <PersonalityExplorer />
}
