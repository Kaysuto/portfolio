export const SECTIONS = ["accueil", "apropos", "stack", "projets", "contact"] as const
export type SectionId = typeof SECTIONS[number]
