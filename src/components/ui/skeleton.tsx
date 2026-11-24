import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("squelette rounded-md bg-primary/10", className)}
      {...props}
    />
  )
}

export { Skeleton }
