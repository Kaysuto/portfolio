import { Octokit } from '@octokit/core'

export interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
}

const USERNAME = 'Kaysuto'
const octokit = new Octokit()

/**
 * Récupère les statistiques publiques GitHub via Octokit :
 * dépôts publics, abonnés, abonnements et total d'étoiles cumulées.
 */
export async function fetchGitHubStats(): Promise<GitHubStats> {
  const { data: user } = await octokit.request('GET /users/{username}', {
    username: USERNAME,
  })

  // Cumul des étoiles sur les dépôts publics (1re page, 100 dépôts max).
  let totalStars: number
  try {
    const { data: repos } = await octokit.request('GET /users/{username}/repos', {
      username: USERNAME,
      per_page: 100,
      type: 'owner',
      sort: 'updated',
    })
    totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count ?? 0), 0)
  } catch {
    totalStars = 0
  }

  return {
    publicRepos: user.public_repos ?? 0,
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    totalStars,
  }
}
