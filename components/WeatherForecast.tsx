import { ArrowDown, ArrowUp, Droplets, Wind } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ForecastData } from "@/types/config";
import { format } from "date-fns";

interface WeatherForecastProps {
  data: ForecastData;
}

interface DailyForecast {
  date: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
}

export default function WeatherForecast({ data }: WeatherForecastProps) {
  console.log("forecast data", data);

  const dailyForecasts = data.list.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {} as Record<string, DailyForecast>);

  console.log("dailyForecasts", dailyForecasts);

  const nextDays = Object.values(dailyForecasts);

  const formatTemp = (temp: number) => `${Math.round(temp)}°`;

  console.log("nextDays", nextDays);
  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="rounded-lg border p-4 space-y-4"
            >
              <div>
                <p className="font-medium">
                  {format(new Date(day.date * 1000), "EEE, MMM d")}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {day.weather.description}
                </p>
              </div>

              <div className="flex justify-between gap-4">
                <div className="flex gap-4">
                  <span className="flex items-center gap-1 text-weather-purple">
                    <ArrowDown size={20} />
                    {formatTemp(day.temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <ArrowUp size={20} />
                    {formatTemp(day.temp_max)}
                  </span>
                </div>

                <div className="flex gap-4">
                  <span className="flex items-center gap-1">
                    <Droplets size={20} className="text-weather-purple" />
                    <span className="text-sm">{day.humidity} %</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind size={20} className="text-weather-purple" />
                    <span className="text-sm">{day.wind} m/s</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

