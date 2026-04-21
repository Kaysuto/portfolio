export const SECTIONS = ["accueil", "apropos", "projets", "contact"] as const
export type SectionId = typeof SECTIONS[number]
