"use client";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { useIsMobile } from "@/hooks/useMobile";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useLocationSearch } from "@/hooks/weatherHook";
import { Eraser, Loader2, MapPinCheck, Search, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { Button } from "./ui/button";
import { format } from "date-fns";
import { useFavorites } from "@/hooks/useFavourite";

export default function CitySearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const { data: locations, isLoading } = useLocationSearch(query);
  const router = useRouter();
  const { history, clearHistory, addToHistory } = useSearchHistory();
  const { favorites } = useFavorites();

  console.log("search locations", locations);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setOpen(false);
    router.push(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  const handleOpen = () => setOpen(true);
  const isMobile = useIsMobile();

  return (
    <>
      {
        isMobile
          ? (
            <button onClick={handleOpen} className="p-1 rounded-full hover:bg-input">
              <Search size={26} className="text-pink-500" />
            </button>
          ) : (
            <button
              onClick={handleOpen}
              className="flex items-center gap-2 rounded-lg border border-border py-2 px-3 text-sm hover:bg-accent"
            >
              <Search size={20} className="text-pink-500" />
              <span className="font-medium">Search</span>
              <span className="inline-flex">
                <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-6 items-center gap-1 rounded border px-1.5 text-[10px] font-medium opacity-100 select-none">
                  <span className="text-xs">Ctrl</span>+ K
                </kbd>
              </span>
            </button>
          )
      }

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search Cities..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {
            query.length > 2 && !isLoading && (
              <CommandEmpty>No cities found.</CommandEmpty>
            )
          }
          {
            favorites.length > 0 && (
              <CommandGroup heading="Favorites">
                {favorites.map((city) => (
                  <CommandItem
                    key={city.id}
                    value={`${city.lat}|${city.lon}|${city.name}|${city.country}`}
                    onSelect={handleSelect}
                  >
                    <Star className="text-yellow-500 fill-yellow-500" />
                    <span>{city.name}</span>
                    {city.state && (
                      <span className="text-sm text-muted-foreground">
                        , {city.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      , {city.country}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          }
          {
            history.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <div className="flex items-center justify-between px-2 my-2">
                    <p className="text-xs text-muted-foreground">
                      Recent Searches
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearHistory.mutate()}
                      className="text-red-400 hover:text-red-500"
                    >
                      <Eraser size={18} />
                      Clear
                    </Button>
                  </div>
                  {history.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={`${item.lat}|${item.lon}|${item.name}|${item.country}`}
                      onSelect={handleSelect}
                    >
                      <MapPinCheck />
                      <span>{item.name}</span>
                      {item.state && (
                        <span className="text-sm text-muted-foreground">
                          , {item.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {item.country}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground">
                        {format(item.searchedAt, "MMM d, h:mm a")}
                      </span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </>
            )
          }

          {
            locations && locations.length > 0 && (
              <CommandGroup heading="Suggestions">
                {isLoading && (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                )}
                {
                  locations.map(location => (
                    <CommandItem
                      key={`${location.lat} - ${location.lon}`}
                      value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                      onSelect={handleSelect}
                    >
                      <MapPinCheck />
                      <span>{location.name}</span>
                      {location.state && (
                        <span className="text-sm text-muted-foreground">
                          , {location.state}
                        </span>
                      )}
                      <span className="text-sm text-muted-foreground">
                        , {location.country}
                      </span>
                    </CommandItem>
                  ))
                }
              </CommandGroup>
            )
          }
        </CommandList>
      </CommandDialog>
    </>
  )
}
