"use client";

import { useEffect, useState } from "react";
import { Github, ExternalLink, Loader2 } from "lucide-react";

type ContributionDay = {
  contributionCount: number;
  date: string;
};

type Week = {
  contributionDays: ContributionDay[];
};

type Calendar = {
  totalContributions: number;
  weeks: Week[];
};

type Props = {
  username?: string;
};

function getColor(count: number, isFuture: boolean) {
  if (isFuture) return "bg-[#161b22]";
  if (count === 0) return "bg-[#21262d]";
  if (count <= 3) return "bg-emerald-900";
  if (count <= 6) return "bg-emerald-700";
  if (count <= 9) return "bg-emerald-500";
  return "bg-emerald-400";
}

export function GithubActivityCard({ username = "JoseGu1llardi" }: Props) {
  const [calendar, setCalendar] = useState<Calendar | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCalendar = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/github?username=${username}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "Failed to load contributions");
        }
        setCalendar(await res.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unexpected error");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, [username]);

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div className="h-full rounded-2xl bg-card p-5 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Github className="h-5 w-5" />
          <span className="text-sm font-medium tracking-wide uppercase">
            GitHub Activity
          </span>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading...
        </div>
      ) : error ? (
        <p className="text-sm text-destructive">{error}</p>
      ) : calendar ? (
        <div className="flex w-full gap-[3px]">
          {calendar.weeks.map((week, wi) => (
            <div key={wi} className="flex flex-1 flex-col gap-[3px]">
              {week.contributionDays.map((day) => {
                const isFuture = day.date > today;
                return (
                  <div
                    key={day.date}
                    title={
                      isFuture
                        ? day.date
                        : `${day.date}: ${day.contributionCount} contributions`
                    }
                    className={`h-[10px] w-full rounded-sm ${getColor(day.contributionCount, isFuture)}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
