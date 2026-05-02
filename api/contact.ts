import type { VercelRequest, VercelResponse } from "@vercel/node"
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.portfolio_KV_REST_API_URL!,
  token: process.env.portfolio_KV_REST_API_TOKEN!,
})

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10 m"),
  prefix: "kaysuto:contact",
})

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).end()

  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ?? "anonymous"

  const { success } = await ratelimit.limit(ip)
  if (!success) {
    return res.status(429).json({ error: "Trop de tentatives. Réessaie dans quelques minutes." })
  }

  const { name, email, message } = req.body ?? {}

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ error: "Tous les champs sont requis." })
  }

  const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.BREVO_API_KEY!,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Portfolio Kaysuto",
        email: process.env.CONTACT_FROM_EMAIL,
      },
      to: [{ email: process.env.CONTACT_TO_EMAIL, name: "Kimiya" }],
      replyTo: { email: email.trim(), name: name.trim() },
      subject: `[Portfolio] Message de ${name.trim()}`,
      htmlContent: `
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Message :</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    }),
  })

  if (!brevoRes.ok) {
    console.error("Brevo error:", await brevoRes.text())
    return res.status(500).json({ error: "Erreur lors de l'envoi. Réessaie plus tard." })
  }

  return res.status(200).json({ success: true })
}
