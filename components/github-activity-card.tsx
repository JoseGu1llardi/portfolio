"use client"

import { Github, ExternalLink } from "lucide-react"

// Generate contribution data for full year (52 weeks)
// Only days with commits get green colors, rest stays gray
function generateContributionData() {
  const weeks = 52
  const daysPerWeek = 7
  const data: number[][] = []
  
  for (let week = 0; week < weeks; week++) {
    const weekData: number[] = []
    for (let day = 0; day < daysPerWeek; day++) {
      const random = Math.random()
      // 60% chance of no commits (gray)
      if (random < 0.6) weekData.push(0)
      // 40% chance of commits with varying intensity
      else if (random < 0.75) weekData.push(1)
      else if (random < 0.85) weekData.push(2)
      else if (random < 0.95) weekData.push(3)
      else weekData.push(4)
    }
    data.push(weekData)
  }
  
  return data
}

const contributionData = generateContributionData()

const activityColors: Record<number, string> = {
  0: "bg-muted-foreground/20",
  1: "bg-emerald-900",
  2: "bg-emerald-700",
  3: "bg-emerald-500",
  4: "bg-emerald-400",
}

export function GithubActivityCard({ username = "yourusername" }: { username?: string }) {
  const totalActivities = 1325
  const currentYear = new Date().getFullYear()

  return (
    <a
      href={`https://github.com/${username}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full rounded-2xl bg-card p-5 border border-border transition-colors hover:bg-accent/50 group"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Github className="h-5 w-5" />
          <span className="text-sm font-medium tracking-wide uppercase">
            Github Activity • {currentYear}
          </span>
        </div>
        <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Contribution Graph - Full Year */}
      <div className="flex gap-[2px] w-full mb-3">
        {contributionData.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-[2px] flex-1">
            {week.map((level, dayIndex) => (
              <div
                key={dayIndex}
                className={`w-full aspect-square rounded-[2px] ${activityColors[level]}`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-emerald-400 font-medium">
          {totalActivities.toLocaleString()} activities in {currentYear}
        </span>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <span className="text-xs">Less</span>
          <div className="flex gap-[2px]">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-[10px] h-[10px] rounded-[2px] ${activityColors[level]}`}
              />
            ))}
          </div>
          <span className="text-xs">More</span>
        </div>
      </div>
    </a>
  )
}
