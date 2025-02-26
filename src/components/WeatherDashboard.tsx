"use client";
import useStatus from "@/hooks/useStatus";
import Offline from "./Offline";
import Navbar from "./Navbar";
import WeatherContent from "./WeatherContent";
import { ForecastData, WeatherData } from "@/api/types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setError,
  setForecastData,
  setLoading,
  setWeatherData,
} from "@/store/weatherDataSlice";
import { weatherAPI } from "@/api/Weather";
import { useEffect } from "react";
import { Snackbar } from "./SnackBar";
import FavouriteLocations from "./FavouriteLocations";

interface Props {
  weatherRes: WeatherData | null;
  foreCastRes: ForecastData | null;
  hasError: string;
}

const WeatherDashboard = ({ weatherRes, foreCastRes, hasError }: Props) => {
  const dispatch = useDispatch();
  const userStatus = useStatus();
  const coordinates = useSelector(
    (store: RootState) => store.userSelection.coord
  );
  const fetchWeatherData = async () => {
    if (coordinates) {
      dispatch(setLoading(true));
      try {
        const [weatherRes, foreCastRes] = await Promise.all([
          weatherAPI.getCurrentWeather(coordinates),
          weatherAPI.getForecast(coordinates),
        ]);
        dispatch(setWeatherData(weatherRes));
        dispatch(setForecastData(foreCastRes));
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        dispatch(setError(errorMessage));
      }
      dispatch(setLoading(false));
    } else if (weatherRes && foreCastRes) {
      dispatch(setWeatherData(weatherRes));
      dispatch(setForecastData(foreCastRes));
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (!userStatus) return <Offline />;
  if (hasError) return <Snackbar errMsg={hasError} />;
  return (
    <div className="flex flex-col gap-2">
      <Navbar />
      <FavouriteLocations />
      <WeatherContent />
    </div>
  );
};

export default WeatherDashboard;
