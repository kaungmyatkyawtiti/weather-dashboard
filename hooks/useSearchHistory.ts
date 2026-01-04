import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";
import { queryClient } from "@/components/Providers";

interface SearchHistoryItem {
  id: string;
  query: string;
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  searchedAt: number;
}

type NewSearchHistory = Omit<SearchHistoryItem, "id" | "searchedAt">

export function useSearchHistory() {
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
    "search-history",
    []
  );

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => history,
    initialData: history,
  });

  const addToHistory = useMutation({
    mutationFn: async (search: NewSearchHistory) => {
      const newSearch: SearchHistoryItem = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };

      const filteredHistory = history.filter(h =>
        !(h.lat === search.lat && h.lon === search.lon)
      )
      const newHistory = [newSearch, ...filteredHistory].slice(0, 10);
      setHistory(newHistory);
      return newHistory;
    },
    onSuccess: (newHistory) => {
      queryClient.setQueryData(["search-history"], newHistory);
    }
  })

  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      queryClient.setQueryData(["search-history"], []);
    },
  });

  return {
    history: historyQuery.data ?? [],
    addToHistory,
    clearHistory
  }
}
