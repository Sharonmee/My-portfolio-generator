'use client'

import Image from 'next/image'
import { UserData } from '@/types/portfolio'
import { Github, Mail, MapPin, ExternalLink, Calendar, Users, GitBranch, GitFork } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'

interface AboutProps {
  userData: UserData
}

export function About({ userData }: AboutProps) {
  return (
    <section id="section_2" className="py-20 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeIn direction="left" delay={0.2}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent dark:from-primary/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-lg group-hover:shadow-xl transition-all duration-500">
                {userData.AvatarUrl ? (
                  <Image
                    src={userData.AvatarUrl}
                    alt={userData.Name || 'Profile'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>

          <div className="space-y-8">
            <FadeIn delay={0.3}>
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  About Me
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {userData.About || userData.Bio || 'No description available'}
                </p>
              </div>
            </FadeIn>

            <div className="grid grid-cols-2 gap-4">
              <FadeIn delay={0.4}>
                <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userData.YearsOfExperience || 0}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Years of Experience</div>
                </div>
              </FadeIn>

              <FadeIn delay={0.5}>
                <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                      <GitBranch className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userData.PublicRepos || 0}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Public Repositories</div>
                </div>
              </FadeIn>

              <FadeIn delay={0.6}>
                <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userData.Followers || 0}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">GitHub Followers</div>
                </div>
              </FadeIn>

              <FadeIn delay={0.7}>
                <div className="p-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                      <GitFork className="w-5 h-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {userData.Following || 0}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
                </div>
              </FadeIn>
            </div>

            <div className="space-y-3">
              {userData.Email && (
                <FadeIn delay={0.8}>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <a href={`mailto:${userData.Email}`} className="hover:text-primary transition-colors">
                      {userData.Email}
                    </a>
                  </div>
                </FadeIn>
              )}
              
              {userData.Location && (
                <FadeIn delay={0.9}>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 group">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span>{userData.Location}</span>
                  </div>
                </FadeIn>
              )}
              
              {userData.URL && (
                <FadeIn delay={1}>
                  <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group">
                    <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                      <Github className="w-4 h-4" />
                    </div>
                    <a 
                      href={userData.URL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors flex items-center gap-1"
                    >
                      GitHub Profile
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 