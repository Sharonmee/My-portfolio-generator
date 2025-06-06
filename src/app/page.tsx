'use client'

import { useState, useEffect } from 'react'
import { Github, Loader2 } from 'lucide-react'
import { useAuth } from '@/components/auth-provider'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const { signInWithGithub } = useAuth()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleGithubSignIn = async () => {
    setIsLoading(true)
    try {
      await signInWithGithub()
    } catch (error) {
      console.error('GitHub sign-in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Prevent hydration issues by not rendering until client-side
  if (!isMounted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <div className="flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-green-500 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Portfolio Generator</h1>
          <p className="text-gray-600">Create your portfolio from your GitHub profile</p>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-gray-500">
            Sign in with GitHub to generate your portfolio
          </p>
          
          <button
            onClick={handleGithubSignIn}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Github className="w-5 h-5" />
            )}
            Continue with GitHub
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <p className="font-medium text-gray-900 text-sm">What you'll get:</p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Years of experience are estimated based on the age of your GitHub account</li>
            <li>• Future updates will include more cutomizable features</li>
            <li>• For accurate results please ensure your github is up to date </li>
            <li>• Only pinned projects are displayed due to the the potential large project count</li>
          </ul>
        </div>

        <p className="text-center text-xs text-gray-500">
          Copyright © {new Date().getFullYear()} Sharon Yawlui
        </p>
      </div>
    </main>
  )
}