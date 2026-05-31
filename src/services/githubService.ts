import { Octokit } from '@octokit/core'

export interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
}

const NOM_UTILISATEUR = 'Kaysuto'
const octokit = new Octokit()

/**
 * Récupère les statistiques publiques GitHub via Octokit :
 * dépôts publics, abonnés, abonnements et total d'étoiles cumulées.
 */
export async function fetchGitHubStats(): Promise<GitHubStats> {
  const { data: utilisateur } = await octokit.request('GET /users/{username}', {
    username: NOM_UTILISATEUR,
  })

  // Cumul des étoiles sur les dépôts publics (1re page, 100 dépôts max).
  let totalEtoiles: number
  try {
    const { data: depots } = await octokit.request('GET /users/{username}/repos', {
      username: NOM_UTILISATEUR,
      per_page: 100,
      type: 'owner',
      sort: 'updated',
    })
    totalEtoiles = depots.reduce((somme, depot) => somme + (depot.stargazers_count ?? 0), 0)
  } catch {
    totalEtoiles = 0
  }

  return {
    publicRepos: utilisateur.public_repos ?? 0,
    followers: utilisateur.followers ?? 0,
    following: utilisateur.following ?? 0,
    totalStars: totalEtoiles,
  }
}
