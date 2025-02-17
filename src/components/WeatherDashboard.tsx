"use client";
import WeatherDetails from "./WeatherDetails";
import HourlyTemp from "./HourlyTemp";
import CurrentWeather from "./CurrentWeather";
import Skeleton from "./Skeleton";
import { Snackbar } from "./SnackBar";
import ForecastData from "./ForecastData";
import SearchType from "./SearchType";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { WeatherData, ForecastData as FCast } from "@/api/types";
import { setWeatherData } from "@/store/weatherDataSlice";
import { RootState } from "@/store/store";
import { setForecastData } from "@/store/forecastDataSlice";
import { setUnitConversion } from "@/store/userSelectionSlice";
import SearchCity from "./SearchCity";
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
  const dispatch = useDispatch();
  const { weatherData, isWeatherDataLoading, isWeatherDataError } = useSelector(
    (store: RootState) => store.weatherData
  );
  const { forecastData, isForecastDataError, isForecastDataLoading } =
    useSelector((store: RootState) => store.forecastData);
  const { isGeoLocationLoading, isGeoLocationError } = useSelector(
    (store: RootState) => store.userSelection
  );

  useEffect(() => {
    if (weatherRes && foreCastRes) {
      dispatch(setWeatherData(weatherRes));
      dispatch(setForecastData(foreCastRes));
      dispatch(setUnitConversion(units));
    }
  }, [weatherRes, foreCastRes, hasError, dispatch, units]);

  if (isWeatherDataLoading || isForecastDataLoading || isGeoLocationLoading) {
    return <Skeleton />;
  }

  if (
    isWeatherDataError ||
    isForecastDataError ||
    isGeoLocationError ||
    hasError
  ) {
    return <Snackbar errMsg={isForecastDataError} />;
  }
  return weatherData && forecastData ? (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <SearchType />
        <SearchCity />
        <CurrentWeather weatherInfo={weatherData} location={weatherData.name} />
        <WeatherDetails weatherInfo={weatherData} />
      </div>
      <div className="space-y-4">
        <HourlyTemp forecastInfo={forecastData} />
        <ForecastData forecastInfo={forecastData} />
      </div>
    </div>
  ) : (
    <Skeleton />
  );
};

export default WeatherDashboard;
