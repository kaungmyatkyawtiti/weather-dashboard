import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useFavorites } from "@/hooks/useFavourite";
import { WeatherData } from "@/types/config";
import { cn } from "@/lib/utils";

interface FavButtonProps {
  data: WeatherData;
}

export function FavButton({ data }: FavButtonProps) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const isCurrentlyFav = isFavorite(data.coord.lat, data.coord.lon);

  const handleToggleFavorite = () => {
    if (isCurrentlyFav) {
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Removed ${decodeURIComponent(data.name)} from Favorites.`);
    } else {
      addFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(`Added ${decodeURIComponent(data.name)} to Favorites.`);
    }
  };

  return (
    <Button
      variant={isCurrentlyFav ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
      className={cn(isCurrentlyFav && "bg-yellow-500 hover:bg-yellow-600")}
    >
      <Star
        size={22}
        className={cn(isCurrentlyFav && "fill-white")}
      />
    </Button>
  );
}
