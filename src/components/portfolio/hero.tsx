'use client'

import Image from 'next/image'
import { UserData } from '@/types/portfolio'
import { motion } from 'framer-motion'
import { ChevronDown, Github, Mail, MapPin } from 'lucide-react'

interface HeroProps {
  userData: UserData
}

export function Hero({ userData }: HeroProps) {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('section_2')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="section_1"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 dark:from-primary/5 dark:via-background dark:to-secondary/5 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-secondary/20 to-transparent rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 text-primary"
              >
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Available for work
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
              >
                Hi, I'm{' '}
                <span className="text-primary">{userData.Name || 'Developer'}</span>
                <br />
                {/* <span className="text-4xl md:text-5xl">Full Stack Developer</span> */}
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-300 max-w-xl"
            >
              {userData.Bio || 'Passionate about creating beautiful and functional web applications. Let\'s build something amazing together!'}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {userData.Location && (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{userData.Location}</span>
                </div>
              )}
              {userData.Email && (
                <a 
                  href={`mailto:${userData.Email}`}
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  <Mail className="w-5 h-5 text-primary" />
                  <span>{userData.Email}</span>
                </a>
              )}
              {userData.URL && (
                <a 
                  href={userData.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  <Github className="w-5 h-5 text-primary" />
                  <span>GitHub</span>
                </a>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4"
            >
              <motion.button 
                onClick={scrollToAbout}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors z-10"
              >
                Learn More
                <ChevronDown className="w-4 h-4" />
              </motion.button>
              {userData.URL && (
                <motion.a
                  href={userData.URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-100 dark:bg-zinc-800 text-gray-900 dark:text-white rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors z-10"
                >
                  <Github className="w-5 h-5" />
                  View Projects
                </motion.a>
              )}
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 dark:from-primary/10 dark:to-secondary/10 rounded-2xl transform rotate-6"></div>
              {userData.AvatarUrl ? (
                <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl transform -rotate-6">
                  <Image
                    src={userData.AvatarUrl}
                    alt={userData.Name || 'Profile'}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl transform -rotate-6 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 flex items-center justify-center">
                  <span className="text-6xl">👤</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 320" 
          className="text-background dark:text-zinc-900"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,160L24,160C48,160,96,160,144,138.7C192,117,240,75,288,64C336,53,384,75,432,106.7C480,139,528,181,576,208C624,235,672,245,720,240C768,235,816,213,864,186.7C912,160,960,128,1008,133.3C1056,139,1104,181,1152,202.7C1200,224,1248,224,1296,197.3C1344,171,1392,117,1416,90.7L1440,64L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
          />
        </svg>
      </div>
    </section>
  )
} 