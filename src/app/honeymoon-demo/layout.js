export const metadata = {
  title: 'Honeymoon Trip Planner — Croatia & Montenegro | Cain Menard',
  description: 'Interactive trip planner demo for a Croatia and Montenegro honeymoon. Built with React and Next.js.',
  openGraph: {
    title: 'Honeymoon Trip Planner — Croatia & Montenegro | Cain Menard',
    description: 'Interactive trip planner demo built with React and Next.js.',
    url: 'https://cainmenard.com/honeymoon-demo',
    images: [{ url: 'https://cainmenard.com/og-image.png', width: 1200, height: 630, alt: 'Honeymoon Trip Planner Demo' }],
  },
  alternates: {
    canonical: 'https://cainmenard.com/honeymoon-demo',
  },
}

export default function HoneymoonDemoLayout({ children }) {
  return children
}
