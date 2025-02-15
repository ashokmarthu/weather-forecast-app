import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { TbDroplets } from "react-icons/tb";
import { WiStrongWind } from "react-icons/wi";
import { RiArrowUpDownLine, RiArrowUpDownFill } from "react-icons/ri";
interface DailyForecast {
  temp_max: number;
  temp_min: number;
  humidity: number;
  wind: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  date: number;
}
import type { ForecastData } from "@/api/types";
import moment from "moment";

interface WeatherForecastProps {
  data: ForecastData;
}
const ForecastData = ({ data }: WeatherForecastProps) => {
  const dailyForecasts = data.list.reduce((acc, curr) => {
    const date: string = moment(curr.dt).format("LT");
    if (!acc[date]) {
      acc[date] = {
        temp_max: curr.main.temp_max,
        temp_min: curr.main.temp_min,
        humidity: curr.main.humidity,
        wind: curr.wind.speed,
        weather: curr.weather[0],
        date: curr.dt,
      };
    } else {
      acc[date].temp_max = Math.max(acc[date].temp_max, curr.main.temp_max)
      acc[date].temp_min = Math.max(acc[date].temp_min, curr.main.temp_min)
    }
    return acc;
  }, {} as Record<string, DailyForecast>);
  const nextDays = Object.values(dailyForecasts).slice(1, 6);

  // Format temperature
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {nextDays.map((day) => (
            <div
              key={day.date}
              className="grid lg:grid-cols-3 items-center gap-4 rounded-lg border p-4"
            >
              <div className="flex justify-center lg:justify-start gap-4">
                <p className="font-medium">
                  {moment.unix(day.date).format("L")}
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {day.weather.description}
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <span className="flex items-center gap-1 text-blue-500">
                  <RiArrowUpDownFill className="h-8 w-8" />
                  {formatTemp(day.temp_min)}
                </span>

                <span className="flex items-center gap-1 text-red-500">
                  <RiArrowUpDownLine className="h-8 w-8" />
                  {formatTemp(day.temp_max)}
                </span>
              </div>

              <div className="flex justify-center lg:justify-end gap-4">
                <span className="flex items-center gap-1">
                  <TbDroplets className="h-8 w-8" />
                  <span className="text-sm">{day.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <WiStrongWind className="h-8 w-8" />
                  <span className="text-sm">{day.wind}m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastData;
