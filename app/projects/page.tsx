"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"
import { cn } from "@/lib/utils"

interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  pushed_at: string
  language: string | null
  stargazers_count: number
}

export default function ProjectsPage() {
  const { t } = useLanguage()
  const [repos, setRepos] = useState<Repo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch("/api/github/repos")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed")
        return res.json()
      })
      .then((data: Repo[]) => {
        setRepos(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t.projects.back}
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t.projects.title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.projects.subtitle}</p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-foreground" />
              <p className="text-sm text-muted-foreground">{t.projects.loading}</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex items-center justify-center py-24">
            <p className="text-sm text-muted-foreground">{t.projects.error}</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo, index) => (
              <ProjectCard
                key={repo.id}
                repo={repo}
                featured={index === 1}
                viewLabel={t.projects.viewProject}
                noDescriptionLabel={t.projects.noDescription}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

function ProjectCard({
  repo,
  featured,
  viewLabel,
  noDescriptionLabel,
}: {
  repo: Repo
  featured?: boolean
  viewLabel: string
  noDescriptionLabel: string
}) {
  const year = new Date(repo.pushed_at).getFullYear()
  const initial = repo.name.charAt(0).toUpperCase()

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border transition-all duration-300 hover:border-border/60",
        featured ? "bg-[oklch(0.08_0_0)]" : "bg-card"
      )}
    >
      {/* Preview area */}
      <div
        className={cn(
          "relative flex items-center justify-center",
          featured ? "min-h-[180px] bg-[oklch(0.06_0_0)]" : "min-h-[130px] bg-muted/20"
        )}
      >
        {featured ? (
          <div className="flex flex-col items-center gap-3 px-6 py-8 text-center">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              {repo.name}
            </span>
            {repo.language && (
              <span className="rounded-full bg-foreground/10 px-3 py-0.5 text-xs text-muted-foreground">
                {repo.language}
              </span>
            )}
          </div>
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted text-xl font-bold text-foreground">
            {initial}
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-semibold text-foreground leading-snug">
              {repo.name}
            </h2>
            <span className="shrink-0 rounded bg-muted/60 px-1.5 py-0.5 text-xs text-muted-foreground">
              {year}
            </span>
          </div>
          <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
            {repo.description ?? noDescriptionLabel}
          </p>
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 text-xs font-medium transition-all duration-200",
            featured
              ? "border-border/60 bg-transparent text-foreground hover:bg-white/5"
              : "border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
        >
          {viewLabel}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  )
}
