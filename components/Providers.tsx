"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface ProvidersProps {
  children: ReactNode;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

export function Providers({
  children,
}: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient} >
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider >
    </ThemeProvider>
  )
}
