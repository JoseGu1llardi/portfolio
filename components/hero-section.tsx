import { TechBadge } from "./tech-badge";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  const techStack = ["Java", "Spring Boot", "PostgreSQL", "Docker"];

  return (
    <div className="rounded-2xl bg-card border border-border p-5 md:p-6">
      {/* Tech Creator Badge */}
      <div className="mb-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-medium text-foreground">
          <Sparkles className="h-3 w-3" />
          Back-end Developer
        </span>
      </div>

      {/* Name */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
        Jose Wellington
      </h1>

      {/* Handle */}
      <p className="mt-1 text-sm text-muted-foreground">@joseguillard</p>

      {/* Description */}
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        Back-end Developer & Content Creator passionate about building great
        digital experiences.
      </p>

      {/* Tech Stack */}
      <div className="mt-4 flex flex-wrap gap-2">
        {techStack.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>
    </div>
  );
}
