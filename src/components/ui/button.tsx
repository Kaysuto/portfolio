import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/*
  Mira — la plus dense des déclinaisons shadcn/ui : coins courts (rounded-md,
  soit 8 px via --radius), corps de texte en text-xs, anneau de focus de 2 px et
  enfoncement d'un pixel au clic. Aucune ombre portée : le relief vient du
  remplissage et de la bordure, pas d'un halo.

  Seul écart assumé avec la définition d'origine : l'échelle est décalée d'un
  cran vers le haut (h-8 au lieu de h-7 par défaut). Mira vise des tableaux de
  bord au pointeur, là où ce portfolio est d'abord consulté au doigt — les
  hauteurs d'origine passaient sous le seuil de confort tactile.
*/
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-transparent bg-clip-padding text-xs font-medium transition-[color,background-color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/30 focus-visible:ring-2 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive active:not-aria-[haspopup]:translate-y-px",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "border-border hover:bg-input/50 hover:text-foreground dark:bg-input/30 aria-expanded:bg-muted",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
        ghost:
          "hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 px-2.5 has-[>svg]:px-2",
        sm: "h-7 gap-1 px-2 has-[>svg]:px-1.5",
        lg: "h-9 px-3.5 text-sm has-[>svg]:px-3 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
