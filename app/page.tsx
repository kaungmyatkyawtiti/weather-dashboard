"use client";

import { MapPin, RefreshCcw } from "lucide-react";
import WeatherError from "@/components/WeatherError";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/weatherHook";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const {
    coordinates,
    error,
    isLoading,
    getLocation,
  } = useGeolocation();
  console.log("coordinates", coordinates);

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const locationQuery = useReverseGeocodeQuery(coordinates);
  console.log("locationQuery", locationQuery.data);

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  if (isLoading) {
    return <WeatherSkeleton />;
  }

  if (error) {
    return (
      <WeatherError
        title={"Location Acess Needed"}
        error={error}
      >
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={getLocation}
          className="inline-flex w-fit"
        >
          <MapPin className="h-4 w-4" />
          Enable Location
        </Button>
      </WeatherError>
    )
  }

  if (!coordinates) {
    return (
      <WeatherError
        title={"Location Required"}
        error={"Please enable location access to see your local weather"}
      >
        <Button
          variant={"destructive"}
          size={"sm"}
          onClick={getLocation}
          className="inline-flex w-fit"
        >
          <MapPin className="h-4 w-4" />
          Enable Location
        </Button>
      </WeatherError>
    )
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <WeatherError
        title={"Error"}
        error={"Failed to fetch weather data.Please try again."}
      >
        <Button
          variant="destructive"
          size="sm"
          onClick={handleRefresh}
          className="inline-flex w-fit"
        >
          <MapPin className="h-4 w-4" />
          Retry
        </Button>
      </WeatherError>
    )
  }

  if (!weatherQuery.data || !forecastQuery.data) {
    return <WeatherSkeleton />;
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight">
          My Location
        </h1>
        <button
          className="
            group inline-flex h-10 w-10 
            items-center justify-center rounded-full border border-border 
            bg-card text-foreground/80 hover:bg-card/90"
          aria-label="Refresh location"
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          onClick={handleRefresh}
        >
          <RefreshCcw
            size={18}
            className={cn(
              "group-hover:text-foreground",
              weatherQuery.isFetching ?? "animate-spin"
            )}
          />
        </button>
      </div>
    </div >
  )
}
