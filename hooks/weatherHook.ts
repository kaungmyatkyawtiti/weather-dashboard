import { useQuery } from "@tanstack/react-query"
import { Coordinates } from "@/types/config";
import { getCurrentWeather, getForecast, reverseGeocode, searchLocations } from "@/api/weather.api";

export const WEATHER_KEYS = {
  weather: (coords: Coordinates) => ["weather", coords] as const,
  forecast: (coords: Coordinates) => ["forecast", coords] as const,
  location: (coords: Coordinates) => ["location", coords] as const,
  search: (query: string) => ["location-search", query] as const,
} as const;

export const useWeatherQuery = (
  coordinates: Coordinates | null
) => useQuery({
  queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
  queryFn: () =>
    coordinates ? getCurrentWeather(coordinates) : null,
  enabled: !!coordinates,
})

export const useForecastQuery = (
  coordinates: Coordinates | null
) => useQuery({
  queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
  queryFn: () =>
    coordinates ? getForecast(coordinates) : null,
  enabled: !!coordinates,
})

export const useReverseGeocodeQuery = (
  coordinates: Coordinates | null
) => useQuery({
  queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
  queryFn: () =>
    coordinates ? reverseGeocode(coordinates) : null,
  enabled: !!coordinates,
})

export const useLocationSearch = (
  query: string
) => useQuery({
  queryKey: WEATHER_KEYS.search(query),
  queryFn: () => searchLocations(query),
  enabled: query.length >= 3,
})
