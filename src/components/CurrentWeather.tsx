import { Card, CardContent } from "@/components/ui/card";
import { WeatherData } from "@/api/types";
import { TbDroplets } from "react-icons/tb";
import { WiStrongWind } from "react-icons/wi";
import { RiArrowUpDownLine, RiArrowUpDownFill } from "react-icons/ri";
type weatherDetailsProps = {
  data: WeatherData;
  location: string;
};
const formatTemp = (temp: number) => `${Math.round(temp)}°`;
const CurrentWeather = ({ data, location }: weatherDetailsProps) => {
  const {
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
    sys: { country },
  } = data;
  return (
    <Card className="overflow-hidden bg-[#18181b] text-white justify-start">
      <CardContent className="p-6">
        <div className="grid gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold tracking-tight">
                  {location}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground">{country}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-5xl font-bold tracking-tighter">
                {formatTemp(temp)}
              </p>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="flex gap-2 text-sm font-medium">
                  <span className="flex items-center gap-1 text-blue-500">
                    <RiArrowUpDownFill className="h-8 w-8" />
                    {formatTemp(temp_min)}
                  </span>
                  <span className="flex items-center gap-1 text-red-500">
                    <RiArrowUpDownLine className="h-8 w-8" />
                    {formatTemp(temp_max)}
                  </span>
                </div>
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
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;
