'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Loader2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { PortfolioNav } from '@/components/portfolio/nav'
import { Hero } from '@/components/portfolio/hero'
import { About } from '@/components/portfolio/about'
import { Skills } from '@/components/portfolio/skills'
import { Projects } from '@/components/portfolio/projects'
import { Contact } from '@/components/portfolio/contact'
import { UserData } from '@/types/portfolio'
import { fetchUserData as fetchUserDataFromApi } from '@/lib/api'

// Helper function to extract values from DynamoDB-style or plain JSON
const getValue = (userData: any, field: string, type: string = 'S'): any => {
  if (userData.hasOwnProperty(field)) {
    return userData[field]
  } else if (userData[field]?.[type] !== undefined) {
    return userData[field][type]
  } else if (userData.body && typeof userData.body === 'string') {
    try {
      const bodyData = JSON.parse(userData.body)
      if (bodyData.hasOwnProperty(field)) {
        return bodyData[field]
      } else if (bodyData[field]?.[type] !== undefined) {
        return bodyData[field][type]
      }
    } catch (e) {
      // Ignore parsing errors
    }
  }
  return undefined
}

export default function PortfolioPage() {
  const params = useParams()
  const username = params.username as string
  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (username) {
      fetchUserData()
    }
  }, [username])

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await fetchUserDataFromApi(username);
      
      // Process the data using the getValue helper
      const processedData: UserData = {
        Name: getValue(data, 'Name'),
        About: getValue(data, 'About'),
        Bio: getValue(data, 'Bio'),
        Email: getValue(data, 'Email'),
        URL: getValue(data, 'URL'),
        AvatarUrl: getValue(data, 'AvatarUrl'),
        YearsOfExperience: getValue(data, 'YearsOfExperience', 'N'),
        PublicRepos: getValue(data, 'PublicRepos', 'N'),
        Followers: getValue(data, 'Followers', 'N'),
        Following: getValue(data, 'Following', 'N'),
        Location: getValue(data, 'Location'),
        Languages: getValue(data, 'Languages', 'L'),
        Projects: getValue(data, 'Projects', 'L'),
      }
      
      setUserData(processedData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error instanceof Error ? error.message : 'Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <div className="border-b">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="h-8 w-32 bg-muted animate-pulse rounded" />
            <div className="flex gap-4">
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
              <div className="h-8 w-24 bg-muted animate-pulse rounded" />
            </div>
          </div>
        </div>

        <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 rounded-full bg-muted animate-pulse" />
                  <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-1/2 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-12 w-32 bg-muted animate-pulse rounded" />
              </div>
              <div className="relative h-[400px] md:h-[600px]">
                <div className="absolute inset-0 bg-muted animate-pulse rounded-2xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
              <div className="space-y-6">
                <div className="h-8 w-48 bg-muted animate-pulse rounded" />
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-5/6 bg-muted animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-40 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-36 bg-muted animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (error || !userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-destructive"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Oops! Something went wrong</h2>
            <p className="text-muted-foreground">{error || 'Portfolio not found'}</p>
            <p className="text-sm text-muted-foreground">
              The portfolio for <span className="font-medium">{username}</span> could not be loaded.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/" 
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <button
              onClick={() => fetchUserData()}
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <PortfolioNav />
      <Hero userData={userData} />
      <About userData={userData} />
      <Skills userData={userData} />
      <Projects userData={userData} />
      <Contact userData={userData} />
      
      <footer className="py-8 bg-background border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Copyright © {new Date().getFullYear()} Sharon Yawlui. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}