import { cn } from "@/lib/utils"

interface TechBadgeProps {
  name: string
  className?: string
}

export function TechBadge({ name, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-transparent px-3 py-1 text-xs font-medium text-foreground",
        className
      )}
    >
      {name}
    </span>
  )
}
