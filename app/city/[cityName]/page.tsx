"use client";

import CurrentWeather from "@/components/CurrentWeather";
import { FavButton } from "@/components/FavButton";
import HourlyTemperature from "@/components/HourlyTemperature";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherError from "@/components/WeatherError";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useForecastQuery, useWeatherQuery } from "@/hooks/weatherHook";
import { useParams, useSearchParams } from "next/navigation";

export default function page() {
  const params = useParams<{ cityName: string }>();
  const searchParams = useSearchParams();

  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  const coordinates =
    Number.isFinite(lat) && Number.isFinite(lon)
      ? { lat, lon }
      : null;

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <WeatherError
        title={"Something Went Wrong"}
        error={"Failed to load weather data.Please try again."}
      >
      </WeatherError>
    );
  }

  if (
    !coordinates ||
    !weatherQuery.data ||
    !forecastQuery.data ||
    !params.cityName
  ) {
    return <WeatherSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">
          {params.cityName}, {weatherQuery.data.sys.country}
        </h1>

        <FavButton
          data={{ ...weatherQuery.data, name: params.cityName }}
        />
      </div>

      <div className="grid gap-6">
        <div className="grid lg:grid-cols-2 gap-6">
          <CurrentWeather
            data={weatherQuery.data}
          />
          <WeatherDetails data={weatherQuery.data} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2 items-start">
          <HourlyTemperature data={forecastQuery.data} />
          <WeatherForecast data={forecastQuery.data} />
        </div>
      </div>
    </div >
  )
}
