import { DM_Sans } from 'next/font/google'
import type { Metadata } from 'next'

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export const metadata: Metadata = {
  title: 'Portfolio | GitHub Portfolio Generator',
  description: 'Personal portfolio generated from GitHub profile',
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${dmSans.className} min-h-screen bg-background text-foreground`}>
      {children}
    </div>
  )
} 