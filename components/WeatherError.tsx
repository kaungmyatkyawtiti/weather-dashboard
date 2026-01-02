import { AlertTriangle, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { ReactNode } from "react";

interface WeatherErrorProps {
  title: string;
  error: string;
  children: ReactNode;
}

export default function WeatherError({
  title,
  error,
  children,
}: WeatherErrorProps) {
  return (
    <div
      role="alert" className="
        relative w-full overflow-hidden
        rounded-md border border-red-500/20
        bg-destructive/5 backdrop-blur-sm p-4"
    >
      <div className="absolute left-0 top-0 h-full w-1 bg-red-500/80" />

      <div className="flex w-full items-start gap-4">
        <div className="shrink-0 rounded-full bg-red-500/10 p-2">
          <AlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <div className="flex w-full flex-col gap-2 min-w-0 space-y-3">
          <h3 className="font-medium text-destructive">
            {title}
          </h3>

          <p className="text-sm text-muted-foreground">
            {error}
          </p>
          {children}
        </div>
      </div>
    </div>
  );
}
