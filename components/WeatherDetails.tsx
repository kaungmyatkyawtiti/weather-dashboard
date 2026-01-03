import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { WeatherData } from "@/types/config";
import { format } from "date-fns";

interface WeatherDetailsProps {
  data: WeatherData;
}

export default function WeatherDetails({ data }: WeatherDetailsProps) {
  console.log("weather detail data", data);
  const { wind, main, sys } = data;

  const formatTime = (timestamp: number) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  // Convert wind degree to direction
  const getWindDirection = (degree: number) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: <Sunrise className="text-orange-500" size={24} />,
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: <Sunset className="text-blue-500" size={24} />,
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} ( ${wind.deg}° )`,
      icon: <Compass className="text-green-500" size={24} />,
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: <Gauge className="text-pink-500" size={24} />,
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              {detail.icon}
              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
