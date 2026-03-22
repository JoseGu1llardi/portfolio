"use client"

import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"

interface ForecastDay {
  day: string
  temp: number
}

export function WeatherCard() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "America/Sao_Paulo",
      }
      setTime(now.toLocaleTimeString("en-US", options))
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const forecast: ForecastDay[] = [
    { day: "SUN", temp: 29 },
    { day: "MON", temp: 24 },
    { day: "TUE", temp: 22 },
    { day: "WED", temp: 21 },
    { day: "THU", temp: 22 },
    { day: "FRI", temp: 21 },
  ]

  return (
    <div className="h-full rounded-2xl bg-card border border-border p-5 flex flex-col">
      {/* Time */}
      <p className="text-xs font-medium text-foreground">{time}</p>

      {/* Location */}
      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" />
        <span>São Paulo, Brazil</span>
      </div>

      {/* Current Temperature */}
      <div className="mt-3 flex items-start">
        <span className="text-4xl font-light text-foreground">30</span>
        <span className="text-sm text-muted-foreground ml-1">°C</span>
      </div>

      {/* Weather Condition */}
      <p className="text-xs text-muted-foreground">Clear Sky</p>

      {/* Weekly Forecast */}
      <div className="mt-auto pt-3">
        <div className="grid grid-cols-6 gap-2 text-center">
          {forecast.map((day) => (
            <div key={day.day} className="flex flex-col items-center gap-1">
              <span className="text-[10px] text-muted-foreground">{day.day}</span>
              <span className="text-xs text-foreground">{day.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
