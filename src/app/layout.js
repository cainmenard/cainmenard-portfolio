import '@/app/globals.css'

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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
