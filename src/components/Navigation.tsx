import { weatherAPI } from "@/api/Weather";
import {
  setForecastData,
  setForecastDataError,
} from "@/store/forecastDataSlice";
import { RootState } from "@/store/store";
import {
  setGeoLocationError,
  setGeoLocationLoader,
  setSearchError,
} from "@/store/userSelectionSlice";
import { setWeatherData, setWeatherDataError } from "@/store/weatherDataSlice";
import React from "react";
import { MdMyLocation } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const unitType = useSelector((store: RootState) => store.userSelection.units);
  const dispatch = useDispatch();

  const userLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        try {
          const [weatherRes, foreCastRes] = await Promise.all([
            weatherAPI.getCurrentWeather({ lat, lon }, unitType),
            weatherAPI.getForecast({ lat, lon }, unitType),
          ]);
          dispatch(setWeatherData(weatherRes));
          dispatch(setForecastData(foreCastRes));
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          dispatch(setWeatherDataError(errorMessage));
          dispatch(setForecastDataError(errorMessage));
        }
        dispatch(setGeoLocationLoader(false));
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }
        dispatch(setGeoLocationError(errorMessage));
        dispatch(setGeoLocationLoader(false));
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const handleChange = () => {
    dispatch(setGeoLocationError(""));
    dispatch(setSearchError(""));
    dispatch(setGeoLocationLoader(true));
    userLocation();
  };

  return (
    <button onClick={handleChange}>
      <MdMyLocation className="w-8 h-8" />
    </button>
  );
};

export default Navigation;
