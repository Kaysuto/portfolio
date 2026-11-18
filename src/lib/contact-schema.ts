import { z } from "zod"
import { langueCourante } from "@/lib/langue"

/** Message choisi au moment de la validation, pas à l'import : il suit la langue courante. */
const message = (fr: string, en: string) => ({ error: () => (langueCourante() === "fr" ? fr : en) })

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, message("Minimum 2 caractères", "At least 2 characters"))
    .max(50, message("Maximum 50 caractères", "50 characters max")),
  email: z.email(message("Adresse email invalide", "Invalid email address")),
  message: z
    .string()
    .min(10, message("Minimum 10 caractères", "At least 10 characters"))
    .max(500, message("Maximum 500 caractères", "500 characters max")),
})

export type ContactFormValues = z.infer<typeof contactSchema>
