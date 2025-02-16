"use client";

import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  setWeatherInfo,
  setWeatherInfoLoading,
} from "@/store/weatherInfoSlice";
import { setForecastInfo } from "@/store/forecastSlice";
import WeatherDetails from "./WeatherDetails";
import HourlyTemp from "./HourlyTemp";
import CurrentWeather from "./CurrentWeather";
import useGeoLocation from "@/hooks/useGeoLocation";
import Skeleton from "./Skeleton";
import { Snackbar } from "./SnackBar";
import { weatherAPI } from "@/api/Weather";
import ForecastData from "./ForecastData";
import { Coordinates } from "@/api/types";

const WeatherDashboard = () => {
  const [weatherLoading, setWeatherLoading] = useState(true);
  const weatherInfo = useSelector((store: RootState) => store.weatherInfo);
  const forecastInfo = useSelector((store: RootState) => store.forecast);
  const dispatch = useDispatch();
  const { coordinates, errorMsg, isLoading } = useGeoLocation();
  const fetchData = useCallback(async (coordinates: Coordinates) => {
    dispatch(setWeatherInfoLoading(true));
    try {
      const [weatherRes, foreCastRes] = await Promise.all([
        weatherAPI.getCurrentWeather(coordinates),
        weatherAPI.getForecast(coordinates),
      ]);
      dispatch(setWeatherInfo(weatherRes));
      dispatch(setForecastInfo(foreCastRes));
      setWeatherLoading(false);
    } catch (err: unknown) {
      // dispatch(setWeatherInfoError(err?.message || "Something went wrong"));
      console.error("Error fetching weather data:", err);
    }
    dispatch(setWeatherInfoLoading(false));
  }, []);

  useEffect(() => {
    fetchData(coordinates);
  }, [coordinates.lat, coordinates.lon]);

  if (isLoading || weatherInfo.weatherInfoLoading) {
    return <Skeleton />;
  }

  if (errorMsg || weatherInfo.weatherInfoError) {
    return <Snackbar errMsg={errorMsg || ""} />;
  }

  return !weatherLoading ? (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <CurrentWeather data={weatherInfo} location="Bangalore" />
        <WeatherDetails data={weatherInfo} />
      </div>
      <div className="space-y-4">
        <HourlyTemp data={forecastInfo} />
        <ForecastData data={forecastInfo} />
      </div>
    </div>
  ) : (
    <Skeleton />
  );
};

export default WeatherDashboard;
