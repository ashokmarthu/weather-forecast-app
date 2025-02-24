"use client";
import WeatherDetails from "./WeatherDetails";
import HourlyTemp from "./HourlyTemp";
import CurrentWeather from "./CurrentWeather";
import Skeleton from "./Skeleton";
import { Snackbar } from "./SnackBar";
import ForecastData from "./ForecastData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { WeatherData, ForecastData as FCast } from "@/api/types";
import { setForecastData, setWeatherData } from "@/store/weatherDataSlice";
import { RootState } from "@/store/store";
import Offline from "./Offline";
import useStatus from "@/hooks/useStatus";
import FavouriteLocations from "./FavouriteLocations";
import MarkFavourite from "./MarkFavourite";

interface Props {
  weatherRes: WeatherData | null;
  foreCastRes: FCast | null;
  hasError: string;
}

const WeatherDashboard = ({ weatherRes, foreCastRes, hasError }: Props) => {
  const dispatch = useDispatch();
  const { weatherData, forecastData, isLoading, isError } = useSelector(
    (store: RootState) => store.weatherData
  );
  const userStatus = useStatus();

  useEffect(() => {
    if (weatherRes && foreCastRes) {
      dispatch(setWeatherData(weatherRes));
      dispatch(setForecastData(foreCastRes));
    }
  }, [weatherRes, foreCastRes, dispatch]);

  if (!userStatus) {
    return <Offline />;
  }

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError || hasError) {
    return <Snackbar errMsg={isError || hasError} />;
  }

  return (
    <div>
      <div className="py-2">
        <FavouriteLocations />
      </div>
      {weatherData && forecastData ? (
        <div className="space-y-2">
          <MarkFavourite coordinates={weatherData.coord} />
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <CurrentWeather
                weatherInfo={weatherData}
              />
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
      ;
    </div>
  );
};

export default WeatherDashboard;
