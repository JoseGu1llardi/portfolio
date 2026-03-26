import { NextResponse } from "next/server";

export async function GET() {
  const username = "JoseGu1llardi";

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=pushed&per_page=3&type=public`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch repositories" },
      { status: res.status }
    );
  }

  const repos: GitHubRepo[] = await res.json();

  const data = repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    pushed_at: repo.pushed_at,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
  }));

  return NextResponse.json(data);
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  pushed_at: string;
  language: string | null;
  stargazers_count: number;
}
