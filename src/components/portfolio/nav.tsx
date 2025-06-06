'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu } from 'lucide-react'

const navItems = [
  { href: '#section_1', label: 'Home' },
  { href: '#section_2', label: 'About' },
  { href: '#section_3', label: 'Skills' },
  { href: '#section_4', label: 'Projects' },
  { href: '#section_5', label: 'Contact' },
]

export function PortfolioNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            Portfolio
          </Link>

          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors dark:text-gray-50 "
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors dark:text-gray-50 "
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 