export interface UserData {
  Name?: string
  About?: string
  Bio?: string
  Email?: string
  URL?: string
  AvatarUrl?: string
  YearsOfExperience?: number
  PublicRepos?: number
  Followers?: number
  Following?: number
  Location?: string
  Languages?: Array<{
    name: string
    count: number
  }>
  Projects?: Array<{
    RepoName: string
    Description: string
    URL: string
    Language: string
  }>
} 