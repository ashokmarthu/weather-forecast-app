import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import useWeather from "@/hooks/useWeather";
import { RootState } from "@/store/store";
import { removeFromFavourites } from "@/store/userSelectionSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { formatTemp } from "./utils/util";

interface FavoriteCity {
  lat: number;
  lon: number;
}

const FavouriteCity = ({ lat, lon }: FavoriteCity) => {
  const { isLoading, weather } = useWeather({ lat, lon });
  const units = useSelector((store: RootState) => store.userSelection.units);
  const dispatch = useDispatch();
  return (
    <div
      className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
      role="button"
      tabIndex={0}
    >
      <button
        className="absolute right-1 top-1 h-6 w-6 rounded-full p-0  hover:text-red-300 group-hover:opacity-100"
        onClick={() => {
          dispatch(removeFromFavourites({ lat, lon }));
        }}
      >
        <RxCross1 className="h-4 w-4" />
      </button>

      {isLoading ? (
        <div className="flex h-7 items-center justify-center w-full">
          <AiOutlineLoading className="h-5 w-5 animate-spin text-gray-700" />
        </div>
      ) : weather ? (
        <>
          <div className="flex items-center gap-2">
            <Image
              width={100}
              height={100}
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description || "weather icon"}
              className="w-8 h-8"
            />
            <div>
              <p className="text-xs font-medium">{weather.name}</p>
              <p className="text-xs text-muted-foreground break-words">
                {weather.sys.country} <br />
              </p>
            </div>
          </div>
          <div className="ml-auto text-right">
            <p className="text-xl font-bold">
              {formatTemp(weather.main.temp, units)}
            </p>
            <p className="text-xs capitalize text-muted-foreground">
              {weather.weather[0].description}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FavouriteCity;
