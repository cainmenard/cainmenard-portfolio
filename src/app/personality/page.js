import PersonalityExplorer from './PersonalityExplorer'

export const metadata = {
  title: 'Personality Profile | Cain Menard',
  description: 'Five personality assessments mapped into one interactive profile — from leadership style and communication to decision-making and what happens under pressure.',
  openGraph: {
    title: 'How I Operate | Cain Menard',
    description: 'Five personality assessments mapped into one interactive profile.',
    url: 'https://cainmenard.com/personality',
  },
}

export default function PersonalityPage() {
  return <PersonalityExplorer />
}
