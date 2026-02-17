import '@/app/globals.css'

export const metadata = {
  title: 'Cain Menard — Digital Operations Leader',
  description: 'Digital operations leader with 8+ years of experience in construction, energy, and infrastructure. Director of Consulting at Automized Solutions.',
  openGraph: {
    title: 'Cain Menard — Digital Operations Leader',
    description: 'Operations and strategy consultant specializing in digital transformation, data analytics, and performance improvement for construction and infrastructure.',
    type: 'website',
    url: 'https://cainmenard.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
