"use client"

import { MapPin } from "lucide-react"
import { useEffect, useState } from "react"

interface ForecastDay {
  day: string
  temp: number
}

interface WeatherData {
  temp: number
  condition: string
  forecast: ForecastDay[]
}

const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

function getCondition(code: number): string {
  if (code === 0) return "Clear Sky"
  if (code <= 2) return "Partly Cloudy"
  if (code === 3) return "Overcast"
  if (code <= 49) return "Foggy"
  if (code <= 59) return "Drizzle"
  if (code <= 69) return "Rain"
  if (code <= 79) return "Snow"
  if (code <= 82) return "Rain Showers"
  if (code <= 99) return "Thunderstorm"
  return "Unknown"
}

export function WeatherCard() {
  const [time, setTime] = useState<string>("")
  const [weather, setWeather] = useState<WeatherData | null>(null)

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Europe/Dublin",
        })
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=53.3498&longitude=-6.2603&current=temperature_2m,weathercode&daily=temperature_2m_max,weathercode&timezone=Europe%2FDublin&forecast_days=6"
        )
        const data = await res.json()

        const forecastDays: ForecastDay[] = data.daily.time.map(
          (dateStr: string, i: number) => ({
            day: DAYS[new Date(dateStr).getDay()],
            temp: Math.round(data.daily.temperature_2m_max[i]),
          })
        )

        setWeather({
          temp: Math.round(data.current.temperature_2m),
          condition: getCondition(data.current.weathercode),
          forecast: forecastDays,
        })
      } catch {
        // silently fail, UI stays empty
      }
    }

    fetchWeather()
  }, [])

  return (
    <div className="h-full rounded-2xl bg-card border border-border p-5 flex flex-col">
      <p className="text-xs font-medium text-foreground">{time}</p>

      <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" />
        <span>Dublin, Ireland</span>
      </div>

      <div className="mt-3 flex items-start">
        <span className="text-4xl font-light text-foreground">
          {weather?.temp ?? "—"}
        </span>
        <span className="text-sm text-muted-foreground ml-1">°C</span>
      </div>

      <p className="text-xs text-muted-foreground">{weather?.condition ?? ""}</p>

      <div className="mt-auto pt-3">
        <div className="grid grid-cols-6 gap-2 text-center">
          {(weather?.forecast ?? []).map((day) => (
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
