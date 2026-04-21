import { z } from "zod"

export const contactSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères").max(50, "Maximum 50 caractères"),
  email: z.string().email("Adresse email invalide"),
  message: z.string().min(10, "Minimum 10 caractères").max(500, "Maximum 500 caractères"),
})

export type ContactFormValues = z.infer<typeof contactSchema>
