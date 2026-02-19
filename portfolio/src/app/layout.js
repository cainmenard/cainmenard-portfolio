import '@/app/globals.css'
import { Analytics } from '@vercel/analytics/react'
import Script from 'next/script'

export const metadata = {
  title: 'Cain Menard — Digital Operations Leader',
  description: 'Operations consulting, data analytics, and technology for construction, energy, and infrastructure. Director of Consulting at Automized Solutions.',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Cain Menard — Digital Operations Leader',
    description: 'Operations consulting, data analytics, and technology for construction, energy, and infrastructure.',
    type: 'website',
    url: 'https://cainmenard.com',
    images: [{ url: 'https://cainmenard.com/og-image.png', width: 1200, height: 630, alt: 'Cain Menard — Digital Operations Leader' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cain Menard — Digital Operations Leader',
    description: 'Operations consulting, data analytics, and technology for construction, energy, and infrastructure.',
    images: ['https://cainmenard.com/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Cain Menard',
  jobTitle: 'Director of Consulting & Operations',
  worksFor: { '@type': 'Organization', name: 'Automized Solutions' },
  url: 'https://cainmenard.com',
  sameAs: [
    'https://linkedin.com/in/cainmenard',
    'https://github.com/cainmenard',
    'https://public.tableau.com/app/profile/cain.menard',
  ],
  description: 'Digital operations leader specializing in operations consulting, data analytics, and technology implementation for construction, energy, and infrastructure companies.',
  knowsAbout: ['Construction Operations', 'Data Analytics', 'Operations Consulting', 'Digital Transformation', 'Change Management', 'Tableau', 'AWS', 'Python', 'SQL', 'Financial Benchmarking', 'Agile'],
  hasCredential: [
    { '@type': 'EducationalOccupationalCredential', name: 'MBA, Finance & Data Analytics', credentialCategory: 'degree', recognizedBy: { '@type': 'Organization', name: 'University of Denver' } },
    { '@type': 'EducationalOccupationalCredential', name: 'Prosci Certified Change Practitioner' },
    { '@type': 'EducationalOccupationalCredential', name: 'Tableau Desktop Specialist' },
    { '@type': 'EducationalOccupationalCredential', name: 'PCEP – Certified Python Programmer' },
  ],
  alumniOf: [
    { '@type': 'EducationalOrganization', name: 'University of Denver' },
    { '@type': 'EducationalOrganization', name: 'Louisiana State University' },
    { '@type': 'EducationalOrganization', name: 'University of Louisiana at Lafayette' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Script id="json-ld" type="application/ld+json" strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
