import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WeatherData } from "@/api/types";
import { LuSunrise, LuSunset, LuCompass, LuGauge } from "react-icons/lu";
import {
  SUNRISE,
  SUNSET,
  WIND_DIRECTION_SPEED,
  PRESSURE,
} from "./utils/constants";
import { getWindDirection, formatDateTime } from "./utils/util";

type weatherDetailsProps = {
  weatherInfo: WeatherData;
};

const WeatherDetails = ({ weatherInfo }: weatherDetailsProps) => {
  const { wind, sys, main } = weatherInfo;

  const FIELDS = [
    {
      title: SUNRISE,
      value: formatDateTime(sys.sunrise),
      icon: LuSunrise,
      color: "text-orange-500",
    },
    {
      title: SUNSET,
      value: formatDateTime(sys.sunset),
      icon: LuSunset,
      color: "text-blue-500",
    },
    {
      title: WIND_DIRECTION_SPEED,
      value: getWindDirection(wind.deg, wind.speed),
      icon: LuCompass,
      color: "text-green-500",
    },
    {
      title: PRESSURE,
      value: `${main.pressure} hpa`,
      icon: LuGauge,
      color: "text-purpule-500",
    },
  ];

  return (
    <Card className="justify-start">
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 sm:grid-cols-2">
        {FIELDS.map((field) => {
          return (
            <div
              className={`flex justify-start items-center gap-2.5 p-2 rounded`}
              key={field.title}
            >
              <field.icon className={`h-7 w-7 ${field.color}`} />
              <div className="flex flex-col gap-2">
                <p className="font-normal leading-none text-sm">
                  {field.title}
                </p>
                <p className="font-normal leading-none text-sm">
                  {field.value}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;
