import { NextResponse } from "next/server";

const CONTRIBUTIONS_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") ?? "JoseGu1llardi";

  if (!process.env.GITHUB_TOKEN) {
    return NextResponse.json({ error: "Missing GITHUB_TOKEN" }, { status: 500 });
  }

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: {
        username,
        from: `${new Date().getFullYear()}-01-01T00:00:00Z`,
        to: `${new Date().getFullYear()}-12-31T23:59:59Z`,
      },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to load contributions" }, { status: res.status });
  }

  const json = await res.json();
  const calendar = json.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(calendar);
}
