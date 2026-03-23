"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export function NewsletterCard() {
  const { t } = useLanguage()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStatus("success")
    setEmail("")
    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <div className="rounded-2xl bg-card p-6 border border-border">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
          <Mail className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-medium text-foreground">{t.newsletter.title}</h3>
          <p className="text-sm text-muted-foreground">{t.newsletter.subtitle}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder={t.newsletter.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 bg-secondary border-border"
          disabled={status === "loading"}
        />
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading"
            ? t.newsletter.button.loading
            : status === "success"
            ? t.newsletter.button.success
            : t.newsletter.button.idle}
        </Button>
      </form>
      {status === "success" && (
        <p className="mt-2 text-sm text-emerald-400">{t.newsletter.successMessage}</p>
      )}
    </div>
  )
}

