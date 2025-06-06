'use client'

import { useState } from 'react'
import { UserData } from '@/types/portfolio'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FadeIn } from '@/components/ui/fade-in'

interface ContactProps {
  userData: UserData
}

export function Contact({ userData }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userData.Email) {
      const mailtoLink = `mailto:${userData.Email}?subject=Message from ${formData.name}&body=${encodeURIComponent(formData.message)}`
      window.location.href = mailtoLink
    }
  }

  return (
    <section id="section_5" className="py-20 bg-muted/50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">Contact</h2>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-12">
            <FadeIn delay={0.2}>
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Let's talk about everything.</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Don't like forms? Send me an email directly.
                  </p>
                </div>

                <div className="space-y-4">
                  {userData.Name && (
                    <FadeIn delay={0.3}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary">👤</span>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Name</div>
                          <div className="font-medium text-gray-900 dark:text-white">{userData.Name}</div>
                        </div>
                      </div>
                    </FadeIn>
                  )}

                  {userData.Email && (
                    <FadeIn delay={0.4}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Email</div>
                          <a 
                            href={`mailto:${userData.Email}`}
                            className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors"
                          >
                            {userData.Email}
                          </a>
                        </div>
                      </div>
                    </FadeIn>
                  )}

                  {userData.Location && (
                    <FadeIn delay={0.5}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Location</div>
                          <div className="font-medium text-gray-900 dark:text-white">{userData.Location}</div>
                        </div>
                      </div>
                    </FadeIn>
                  )}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.6}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-900 dark:text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-2 rounded-lg border bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[150px]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
} 