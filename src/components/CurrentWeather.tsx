import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { WeatherData } from "@/api/types";
import { TbDroplets } from "react-icons/tb";
import { WiStrongWind } from "react-icons/wi";
import { RiArrowUpDownLine, RiArrowUpDownFill } from "react-icons/ri";
import { formatTemp } from "./utils/util";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type WeatherDetailsProps = {
  weatherInfo: WeatherData;
};

const CurrentWeather = ({ weatherInfo }: WeatherDetailsProps) => {
  const units = useSelector((store: RootState) => store.userSelection.units);
  const {
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    sys: { country },
    weather: [{ icon, description }] = [],
    name,
  } = weatherInfo;

  return (
    <Card className="overflow-hidden justify-start">
      <CardContent className="p-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
              </div>
              <p className="text-sm text-muted-foreground">{country}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-5xl font-bold tracking-tighter">
                {formatTemp(temp, units)}
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like, units)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <RiArrowUpDownFill className="h-8 w-8" />
                    {formatTemp(temp_min, units)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <RiArrowUpDownLine className="h-8 w-8" />
                    {formatTemp(temp_max, units)}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <TbDroplets className="h-8 w-8" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Humidity</p>
                  <p className="text-sm text-muted-foreground">{humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <WiStrongWind className="h-8 w-8" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium">Wind Speed</p>
                  <p className="text-sm text-muted-foreground">{speed} m/s</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="relative flex aspect-square w-full max-w-[200px] items-center justify-center bg-transparent">
              {icon && (
                <Image
                  width={100}
                  height={100}
                  src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                  alt={description || "Weather icon"}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              )}
              <div className="absolute bottom-0 text-center">
                <p className="text-sm font-medium capitalize">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
