'use client'

import { UserData } from '@/types/portfolio'
import { ExternalLink, Github } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'

interface ProjectsProps {
  userData: UserData
}

export function Projects({ userData }: ProjectsProps) {
  if (!userData.Projects || userData.Projects.length === 0) {
    return (
      <section id="section_4" className="relative py-20 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 relative">
          <FadeIn>
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Projects</h2>
              <p className="text-gray-500 dark:text-gray-400">No projects available</p>
            </div>
          </FadeIn>
        </div>
      </section>
    )
  }

  return (
    <section id="section_4" className="relative py-20 bg-white dark:bg-zinc-950">
      <div className="container mx-auto px-4 relative">
        <FadeIn>
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Projects
          </h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.Projects.map((project, index) => (
            <FadeIn key={index} delay={0.1 * (index + 1)}>
              <div className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="p-6 space-y-4 relative">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {project.RepoName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.Description || 'No description available'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {project.Language || 'Unknown'}
                    </span>
                    
                    <a
                      href={project.URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>View</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
} 