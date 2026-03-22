import { HeroSection } from "@/components/hero-section"
import { WeatherCard } from "@/components/weather-card"
import { BentoGrid } from "@/components/bento-grid"

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <HeroSection />
          </div>
          <div className="lg:col-span-1">
            <WeatherCard />
          </div>
        </div>
        
        <BentoGrid />
      </div>
    </main>
  )
}
