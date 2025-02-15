"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setWeatherInfo } from "@/store/weatherInfoSlice";
import { setForecastInfo } from "@/store/forecastSlice";
import WeatherDetails from "./WeatherDetails";
import HourlyTemp from "./HourlyTemp";
import CurrentWeather from "./CurrentWeather";
import useGeoLocation from "@/hooks/useGeoLocation";
import Skeleton from "./Skeleton";
import { Snackbar } from "./SnackBar";
import { weatherAPI } from "@/api/Weather";
import ForecastData from "./ForecastData";

const WeatherDashboard = () => {
  const weatherInfo = useSelector((store: RootState) => store.weatherInfo);
  const forecastInfo = useSelector((store: RootState) => store.forecast);
  const dispatch = useDispatch();
  const { coordinates, errorMsg, isLoading } = useGeoLocation();
  const fetchData = async () => {
    try {
      const [weatherRes, foreCastRes] = await Promise.all([
        weatherAPI.getCurrentWeather(coordinates),
        weatherAPI.getForecast(coordinates),
      ]);
      dispatch(setWeatherInfo(weatherRes));
      dispatch(setForecastInfo(foreCastRes));
    } catch (err) {
      console.log("Error fetching weather data:", err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }
  if (errorMsg) {
    return <Snackbar errMsg={errorMsg} />;
  }
  return (
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
  );
};

export default WeatherDashboard;
