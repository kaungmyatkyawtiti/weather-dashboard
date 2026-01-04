"use client";

import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";

export default function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer className="border-t border-border bg-background px-8 py-7 w-full">
      <div className={cn(
        "flex items-center justify-between gap-4 text-center",
        isMobile && "flex-col"
      )}>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Clima Weather App
        </p>

        <p className="text-sm text-muted-foreground">
          Made with ❤️ by{" "}
          <span className="font-medium text-foreground">
            Nott Nott
          </span>
        </p>

        <p className={cn("text-sm text-muted-foreground", isMobile && "hidden")}>
          Powered by OpenWeather
        </p>
      </div>
    </footer>
  );
}
