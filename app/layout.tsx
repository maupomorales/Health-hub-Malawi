import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blantyre Health Hub - Your Complete Health Directory',
  description: 'Find and connect with verified healthcare providers in Blantyre, Malawi. Browse pharmacies, dentists, opticians, gyms, and skincare services.',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
