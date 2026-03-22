import { BentoCard } from "./bento-card"
import { GithubActivityCard } from "./github-activity-card"
import {
  Folder,
  User,
  Mail,
  Monitor,
  BookOpen,
  FileText,
  History,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react"

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Projects - Large card */}
      <BentoCard
        title="Projects"
        description="Explore my recent projects"
        icon={<Folder className="h-5 w-5" />}
        href="/projects"
        className="md:col-span-2"
      />

      {/* About */}
      <BentoCard
        title="About"
        description="Get to know my journey and story"
        icon={<User className="h-5 w-5" />}
        href="/about"
        className="md:col-span-2"
      />

      {/* Contact */}
      <BentoCard
        title="Contact"
        description="Let's talk"
        icon={<Mail className="h-5 w-5" />}
        href="/contact"
      />

      {/* Setup */}
      <BentoCard
        title="Setup"
        description="Tech stack & gear"
        icon={<Monitor className="h-5 w-5" />}
        href="/setup"
      />

      {/* Blog */}
      <BentoCard
        title="Blog"
        description="Articles & thoughts"
        icon={<BookOpen className="h-5 w-5" />}
        href="/blog"
      />

      {/* Media Kit */}
      <BentoCard
        title="Media Kit"
        description="Information for partners and collaborators"
        icon={<FileText className="h-5 w-5" />}
        href="/media-kit"
      />

      {/* Changelog */}
      <BentoCard
        title="Changelog"
        description="Updates and improvements"
        icon={<History className="h-5 w-5" />}
        href="/changelog"
      />

      {/* Social Links */}
      <div className="grid grid-cols-2 grid-rows-2 rounded-2xl bg-card border border-border overflow-hidden md:col-span-1">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
        >
          <Github className="h-7 w-7" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
        >
          <Linkedin className="h-7 w-7" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
        >
          <Instagram className="h-7 w-7" />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-4 text-muted-foreground transition-colors hover:text-foreground hover:bg-accent"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>

      {/* GitHub Activity */}
      <div className="col-span-1 md:col-span-2">
        <GithubActivityCard username="JoseGu1llardi" />
      </div>
    </div>
  )
}
