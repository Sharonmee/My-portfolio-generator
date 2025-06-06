'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, signInWithRedirect, signOut, GithubAuthProvider, getRedirectResult, signInWithPopup } from 'firebase/auth'
import { auth, githubProvider } from '@/lib/firebase'
import { useRouter } from 'next/navigation'
import { fetchGitHubUserData, generatePortfolio } from '@/lib/api'

// Custom hook to detect mobile screens
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    setIsMobile(mediaQuery.matches);

    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  return isMobile;
};

interface AuthContextType {
  user: User | null
  loading: boolean
  signInWithGithub: () => Promise<void>
  logout: () => Promise<void>
  getIdToken: () => Promise<string | null>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signInWithGithub: async () => {},
  logout: async () => {},
  getIdToken: async () => null,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const isMobile = useIsMobile()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      setUser(user)
      setLoading(false)
    })

    // Handle redirect result
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const credential = GithubAuthProvider.credentialFromResult(result);
          const token = credential?.accessToken;

          if (!token) {
            throw new Error('Failed to get GitHub access token');
          }

          try {
            // Fetch GitHub user data
            console.log('Fetching GitHub user data...');
            const githubUser = await fetchGitHubUserData(token);
            console.log('Got GitHub user data:', githubUser);

            const username = githubUser.login;
            console.log('Extracted username:', username);

            // Generate portfolio
            console.log('Generating portfolio...');
            await generatePortfolio(username);
            console.log('Portfolio generated successfully');

            // Store auth state
            sessionStorage.setItem('authenticated', 'true');
            sessionStorage.setItem('github_username', username);

            // Redirect to portfolio page
            router.push(`/myportfolio/${username}`);
          } catch (error) {
            console.error('Error in GitHub flow:', error);
            if (error instanceof Error && error.message.includes('token is invalid or revoked')) {
              // Clear auth state
              sessionStorage.removeItem('authenticated');
              sessionStorage.removeItem('github_username');
              sessionStorage.removeItem('auth_pending');
              throw new Error('GitHub session expired. Please sign in again.');
            }
            throw error;
          }
        }
      } catch (error) {
        console.error('Redirect result error:', error);
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('Failed to sign in with GitHub. Please try again.');
        }
      }
    };

    handleRedirectResult();
    return () => unsubscribe();
  }, [router]);

  const signInWithGithub = async () => {
    console.log('signInWithGithub called');
    try {
      setLoading(true);
      
      if (isMobile) {
        // Use redirect for mobile screens
        try {
          await signInWithRedirect(auth, githubProvider);
        } catch (error) {
          console.error('Redirect sign-in error:', error);
          // If redirect fails, try popup as fallback
          const result = await signInWithPopup(auth, githubProvider);
          await handleAuthResult(result);
        }
      } else {
        // Use popup for desktop screens
        const result = await signInWithPopup(auth, githubProvider);
        await handleAuthResult(result);
      }
    } catch (error) {
      console.error('GitHub sign-in error:', error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('Failed to sign in with GitHub. Please try again.');
      }
      setLoading(false);
    }
  }

  // Helper function to handle authentication result
  const handleAuthResult = async (result: any) => {
    if (result?.user) {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      if (!token) {
        throw new Error('Failed to get GitHub access token');
      }

      try {
        // Fetch GitHub user data
        console.log('Fetching GitHub user data...');
        const githubUser = await fetchGitHubUserData(token);
        console.log('Got GitHub user data:', githubUser);

        const username = githubUser.login;
        console.log('Extracted username:', username);

        // Generate portfolio
        console.log('Generating portfolio...');
        await generatePortfolio(username);
        console.log('Portfolio generated successfully');

        // Store auth state
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('github_username', username);

        // Redirect to portfolio page
        router.push(`/myportfolio/${username}`);
      } catch (error) {
        console.error('Error in GitHub flow:', error);
        if (error instanceof Error && error.message.includes('token is invalid or revoked')) {
          // Clear auth state
          sessionStorage.removeItem('authenticated');
          sessionStorage.removeItem('github_username');
          sessionStorage.removeItem('auth_pending');
          throw new Error('GitHub session expired. Please sign in again.');
        }
        throw error;
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      // Clear session storage
      sessionStorage.removeItem('authenticated');
      sessionStorage.removeItem('github_username');
      sessionStorage.removeItem('auth_pending');
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  const getIdToken = async () => {
    if (!user) return null;
    try {
      return await user.getIdToken();
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signInWithGithub, logout, getIdToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)