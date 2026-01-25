import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { DevisProvider } from '@/context/devis-context'
import Navigation from '@/components/navigation'
import Footer from '@/components/footer'
import AuthProvider from '@/components/auth-provider' // Import AuthProvider

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Maintenance.com.tn - Services & Produits de Maintenance',
  description: 'Plateforme professionnelle de maintenance, vente de matériel et services spécialisés (plomberie, électricité, chauffage, chaudières)',
  keywords: ['maintenance', 'plomberie', 'électricité', 'chauffage', 'chaudière', 'services', 'produits'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="fr" suppressHydrationWarning>
        <body className={`font-sans antialiased`}>
          <DevisProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <div className="flex flex-col min-h-screen bg-background text-foreground">
                <Navigation />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </ThemeProvider>
          </DevisProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
