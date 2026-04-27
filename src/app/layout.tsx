import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import Footer from '@/app/components/Footer'

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400'],
  variable: '--font-jost',
})

export const metadata: Metadata = {
  // This project is hosted at dyevert.com/postcodecolour
  // If deploying at that path, set basePath: '/postcodecolour' in next.config.ts
  title: 'Postcode Colour — dyevert',
  description:
    'A participatory natural dyeing project by Joanna Fowles. Participants collect plants from their own postcode and dye a small swatch of cloth. Part of dyevert — dyevert.com.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${jost.variable} h-full antialiased`}>
      <body className="min-h-full bg-white">
        {children}
        <Footer />
      </body>
    </html>
  )
}
