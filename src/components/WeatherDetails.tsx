import moment from "moment";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WeatherData } from "@/api/types";
import { LuSunrise, LuSunset, LuCompass, LuGauge } from "react-icons/lu";

type weatherDetailsProps = {
  data: WeatherData;
};

const WeatherDetails = ({ data }: weatherDetailsProps) => {
  const { wind, sys, main } = data;

  function getWindDirection(deg: number, speed: number): string {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.floor((deg + 11.25) / 22.5);
    return `${directions[index % 16]} at ${speed} m/s`;
  }
  const FIELDS = [
    {
      title: "Sunrise",
      value: moment.unix(sys.sunrise).format("LT"),
      icon: LuSunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: moment.unix(sys.sunset).format("LT"),
      icon: LuSunset,
      color: "text-blue-500",
    },
    {
      title: "Wind direction & Speed",
      value: getWindDirection(wind.deg, wind.speed),
      icon: LuCompass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hpa`,
      icon: LuGauge,
      color: "text-purpule-500",
    },
  ];

  return (
    <Card className="bg-[#18181b] text-white justify-start">
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
