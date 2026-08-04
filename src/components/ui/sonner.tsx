import { CSSProperties } from "react"
import { Toaster as Sonner, ToasterProps } from "sonner"
import { useTheme } from "@/hooks/use-theme"

/**
 * Toaster habillé aux couleurs du site : reprend les tokens `--popover`,
 * `--accent` et `--destructive` plutôt que le thème par défaut de sonner.
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{ className: "rounded-lg font-medium" }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--success-bg": "var(--popover)",
          "--success-text": "var(--success)",
          "--success-border": "color-mix(in oklch, var(--success) 35%, transparent)",
          "--error-bg": "var(--popover)",
          "--error-text": "var(--destructive)",
          "--error-border": "color-mix(in oklch, var(--destructive) 35%, transparent)",
        } as CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
