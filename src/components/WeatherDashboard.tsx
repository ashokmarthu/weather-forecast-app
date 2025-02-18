"use client";
import WeatherDetails from "./WeatherDetails";
import HourlyTemp from "./HourlyTemp";
import CurrentWeather from "./CurrentWeather";
import Skeleton from "./Skeleton";
import { Snackbar } from "./SnackBar";
import ForecastData from "./ForecastData";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { WeatherData, ForecastData as FCast } from "@/api/types";
import { setWeatherData } from "@/store/weatherDataSlice";
import { RootState } from "@/store/store";
import { setForecastData } from "@/store/forecastDataSlice";
import { setUnitConversion } from "@/store/userSelectionSlice";
import SearchCity from "./SearchCity";
import SearchByOptions from "./SearchByOptions";
import Offline from "./Offline";

interface Props {
  weatherRes: WeatherData | null;
  foreCastRes: FCast | null;
  hasError: string;
  units: string;
}

const WeatherDashboard = ({
  weatherRes,
  foreCastRes,
  hasError,
  units,
}: Props) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const dispatch = useDispatch();
  const { weatherData, isWeatherDataLoading, isWeatherDataError } = useSelector(
    (store: RootState) => store.weatherData
  );
  const { forecastData, isForecastDataError, isForecastDataLoading } =
    useSelector((store: RootState) => store.forecastData);
  const {
    isGeoLocationLoading,
    isGeoLocationError,
    isSearchLoading,
    isSearchError,
  } = useSelector((store: RootState) => store.userSelection);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [isOnline]);

  useEffect(() => {
    if (weatherRes && foreCastRes) {
      dispatch(setWeatherData(weatherRes));
      dispatch(setForecastData(foreCastRes));
      dispatch(setUnitConversion(units));
    }
  }, [weatherRes, foreCastRes, hasError, dispatch, units]);


  if (!isOnline) {
    return <Offline />;
  }

  if (
    isWeatherDataLoading ||
    isForecastDataLoading ||
    isGeoLocationLoading ||
    isSearchLoading
  ) {
    return <Skeleton />;
  }

  
  if (isSearchError) {
    return <Snackbar errMsg={isSearchError} />;
  } else if (isWeatherDataError) {
    return <Snackbar errMsg={isWeatherDataError} />;
  } else if (isForecastDataError) {
    return <Snackbar errMsg={isForecastDataError} />;
  } else if (isGeoLocationError) {
    return <Snackbar errMsg={isGeoLocationError} />;
  } else if (hasError) {
    return <Snackbar errMsg={hasError} />;
  }

  return weatherData && forecastData ? (
    <div className="space-y-2">
      <div className="grid gap-6 md:grid-cols-2">
        <SearchCity />
        <SearchByOptions />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <CurrentWeather
            weatherInfo={weatherData}
            location={weatherData.name}
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
  );
};

export default WeatherDashboard;
