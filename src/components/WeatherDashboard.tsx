"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setWeatherInfo } from "@/store/weatherInfoSlice";
import { setForecastInfo } from "@/store/forecastSlice";
import WeatherDetails from "./WeatherDetails";
import HourlyTemp from "./HourlyTemp";
import CurrentWeather from "./CurrentWeather";

const WeatherDashboard = () => {
  const dispatch = useDispatch();
  const weatherInfo = useSelector((store: RootState) => store.weatherInfo);
  // const forecastInfo = useSelector((store: RootState) => store.forecast);

  const fetchData = async () => {
    const COMMON_URL = `https://api.openweathermap.org/data/2.5`;
    const API_KEY = "ede7c27a2de20af4c4ea03d67bc6d5f4";
    const WEATHER_URL = `${COMMON_URL}/weather?q=${"pune"}&appid=${API_KEY}`;
    const FORECAST_URL = `${COMMON_URL}/forecast?q=${"pune"}&appid=${API_KEY}`;
    try {
      const [weatherRes, foreCastRes] = await Promise.all([
        fetch(WEATHER_URL),
        fetch(FORECAST_URL),
      ]);
      const weatherData = await weatherRes.json();
      const forecastData = await foreCastRes.json();
      dispatch(setWeatherInfo(weatherData));
      dispatch(setForecastInfo(forecastData));
    } catch (err) {
      console.log("Error fetching weather data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 bg-black">
      <div className="space-y-4">
        <CurrentWeather data={weatherInfo} location="Pune" />
        <WeatherDetails data={weatherInfo} />
      </div>
      <div className="space-y-4">
        <HourlyTemp />
        <WeatherDetails data={weatherInfo} />
      </div>
    </div>
  );
};

export default WeatherDashboard;
