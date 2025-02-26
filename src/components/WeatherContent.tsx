"use client";
import { useSelector } from "react-redux";
import { Snackbar } from "./SnackBar";
import { RootState } from "@/store/store";
import Skeleton from "./Skeleton";
import CurrentWeather from "./CurrentWeather";
import WeatherDetails from "./WeatherDetails";
import HourlyTemp from "./HourlyTemp";
import ForecastData from "./ForecastData";
import MarkFavourite from "./MarkFavourite";

const WeatherContent = () => {
  const { weatherData, forecastData, isLoading, isError } = useSelector(
    (store: RootState) => store.weatherData
  );
  const dataAvailable = weatherData && forecastData;

  if (isLoading) return <Skeleton />;
  if (isError) return <Snackbar errMsg={isError} />;

  return (
    <div>
      {dataAvailable ? (
        <div className="space-y-3">
          <MarkFavourite coordinates={weatherData.coord} />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <CurrentWeather weatherInfo={weatherData} />
              <WeatherDetails weatherInfo={weatherData} />
            </div>
            <div className="space-y-4">
              <HourlyTemp forecastInfo={forecastData} />
              <ForecastData forecastInfo={forecastData} />
            </div>
          </div>
        </div>
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default WeatherContent;
