import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sushant Patil | Full-Stack Developer & ISRO Research Intern',
  description:
    'Portfolio of Sushant Patil — Computer Science Engineer, Full-Stack Developer, and former ISRO Research Intern. Skilled in Python, Django, Flask, JavaScript, Machine Learning, and modern web technologies.',
  keywords: [
    'Sushant Patil',
    'Full-Stack Developer',
    'ISRO Research Intern',
    'Computer Science',
    'Portfolio',
    'Python',
    'Django',
    'Flask',
    'Machine Learning',
    'Web Developer',
  ],
  authors: [{ name: 'Sushant Patil', url: 'https://github.com/thesushpatil' }],
  openGraph: {
    title: 'Sushant Patil | Full-Stack Developer & ISRO Research Intern',
    description:
      'Computer Science Engineer specializing in full-stack development, machine learning, and backend systems.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sushant Patil | Full-Stack Developer',
    description: 'Computer Science Engineer & ISRO Research Intern',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
