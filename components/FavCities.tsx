import { toast } from "sonner";
import { Button } from "./ui/button";
import { ArrowRight, Loader2, X } from "lucide-react";
import { useWeatherQuery } from "@/hooks/weatherHook";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavourite";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

interface FavCityTabletProps {
  id: string;
  name: string;
  lat: number;
  lon: number;
  onRemove: (id: string) => void;
}

export default function FavCityTablet({
  id,
  name,
  lat,
  lon,
  onRemove,
}: FavCityTabletProps) {
  const router = useRouter();
  const { data: weather, isLoading } = useWeatherQuery({ lat, lon });

  const handleGo = () => {
    router.push(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <div className="relative min-w-[320px] rounded-lg border border-border/70 bg-card p-4 pr-10 space-y-4 hover:border-border">
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0 text-foreground/80 hover:text-foreground"
        onClick={() => {
          onRemove(id);
          toast.error(`Removed ${decodeURIComponent(name)} from Favorites.`);
        }}
      >
        <X size={16} />
      </Button>

      {isLoading ? (
        <div className="flex h-8 items-center justify-center">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      ) : weather ? (
        <>
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
                className="h-8 w-8"
              />
              <div>
                <p className="font-medium">{decodeURIComponent(name)}</p>
                <p className="text-xs text-muted-foreground">
                  {weather.sys.country}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xl font-bold">
                {Math.round(weather.main.temp)}°
              </p>
              <p className="text-xs capitalize text-muted-foreground">
                {weather.weather[0].description}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              size="sm"
              onClick={handleGo}
            >
              Go
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function FavoriteCities() {
  const { favorites, removeFavorite } = useFavorites();

  if (!favorites.length) {
    return null;
  }

  return (
    <>
      <h1 className="text-xl font-bold tracking-tight">Favorites</h1>
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-4">
          {
            favorites.map((city) => (
              <FavCityTablet
                key={city.id}
                {...city}
                onRemove={() => removeFavorite.mutate(city.id)}
              />
            ))
          }
        </div>
        <ScrollBar orientation="horizontal" className="mt-2" />
      </ScrollArea>
    </>
  );
}
