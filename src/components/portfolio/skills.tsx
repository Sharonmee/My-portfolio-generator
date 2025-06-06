'use client'

import { UserData } from '@/types/portfolio'
import { Code2 } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'

interface SkillsProps {
  userData: UserData
}

export function Skills({ userData }: SkillsProps) {
  if (!userData.Languages || userData.Languages.length === 0) {
    return (
      <section id="section_3" className="py-20 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Skills</h2>
              <p className="text-gray-500 dark:text-gray-400">No language data available</p>
            </div>
          </FadeIn>
        </div>
      </section>
    )
  }

  const maxCount = Math.max(...userData.Languages.map(lang => lang.count))

  return (
    <section id="section_3" className="py-20 bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 dark:bg-primary/20 mb-4">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Technical Skills</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">Languages and technologies I work with</p>
            </div>
          </FadeIn>
          
          <div className="space-y-8">
            {userData.Languages.map((lang, index) => (
              <FadeIn key={index} delay={0.1 * (index + 1)}>
                <div className="group">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-gray-900 dark:text-white text-lg">{lang.name}</span>
                      <span className="text-sm bg-primary/10 dark:bg-primary/20 text-primary px-3 py-1 rounded-full font-medium">
                        {lang.count} {lang.count === 1 ? 'project' : 'projects'}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.round((lang.count / maxCount) * 100)}% of total
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden group-hover:bg-gray-200 dark:group-hover:bg-zinc-700 transition-colors">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full relative"
                      style={{ width: `${(lang.count / maxCount) * 100}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 