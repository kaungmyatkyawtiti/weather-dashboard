import { ForecastData } from "@/types/config";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { format } from "date-fns";

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export default function HourlyTemperature({ data }: HourlyTemperatureProps) {
  console.log("forecast data", data);

  const chartData: ChartData[] = data.list
    .slice(0, 8)
    .map(item => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));

  console.log("chartData", chartData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Today's Temperature</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart
              data={chartData}
            >
              <XAxis
                dataKey="time"
                fontSize={12}
              />
              <YAxis
                fontSize={12}
                tickFormatter={(value) => `${value}°`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-[0.8rem]">
                          <span className="capitalize text-muted-foreground font-medium">
                            Temperature
                          </span>
                          <span className="font-semibold">{payload[0].value}°</span>
                        </div>
                        <div className="flex items-center gap-2 text-[0.8rem]">
                          <span className="capitalize text-muted-foreground font-medium">
                            Feels Like
                          </span>
                          <span className="font-semibold">{payload[1]?.value}°</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#652276"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="feels_like"
                stroke="#64748b"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
