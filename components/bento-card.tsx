import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface BentoCardProps {
  title: string
  description?: string
  icon?: React.ReactNode
  href?: string
  className?: string
  children?: React.ReactNode
}

export function BentoCard({
  title,
  description,
  icon,
  href = "#",
  className,
  children,
}: BentoCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl bg-card p-6 transition-all duration-300 hover:bg-accent border border-border",
        className
      )}
    >
      <div className="flex items-start justify-between">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
            {icon}
          </div>
        )}
        <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <div className="mt-auto pt-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {children && <div className="mt-4">{children}</div>}
    </Link>
  )
}
