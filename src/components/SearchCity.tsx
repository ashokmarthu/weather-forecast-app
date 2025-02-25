import { GeocodingResponse } from "@/api/types";
import { weatherAPI } from "@/api/Weather";
import { RootState } from "@/store/store";
import { setCityName } from "@/store/userSelectionSlice";
import {
  setWeatherData,
  setForecastData,
  setLoading,
  setError,
} from "@/store/weatherDataSlice";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NO_DATA_FOUND } from "./utils/constants";

const SearchCity = () => {
  const dispatch = useDispatch();
  const searchBy = useSelector(
    (store: RootState) => store.userSelection.searchBy
  );
  const [searchText, setSearchText] = useState<string>("");

  const handleError = (err: unknown) => {
    if (err instanceof Error) {
      dispatch(setError(err.message));
    } else {
      dispatch(setError("An unknown error occurred"));
    }
  };

  const fetchWeatherData = (coords: { lat: number; lon: number }) => {
    Promise.all([
      weatherAPI.getCurrentWeather(coords),
      weatherAPI.getForecast(coords),
    ])
      .then(([weatherRes, forecastRes]) => {
        dispatch(setWeatherData(weatherRes));
        dispatch(setForecastData(forecastRes));
      })
      .catch(handleError);
    dispatch(setLoading(false));
  };

  const getGeoCode = (search: string) => {
    if (searchBy === "cityName") {
      return weatherAPI.getGeoCodeByCityName(search);
    } else {
      return weatherAPI.getGeoCodeByPinCode(search);
    }
  };

  const getResponse = async (): Promise<void> => {
    dispatch(setLoading(true));
    dispatch(setError(""));
    try {
      const data: GeocodingResponse | GeocodingResponse[] = await getGeoCode(
        searchText
      );
      if (Array.isArray(data) && data.length > 0) {
        const { lat, lon } = data[0];
        fetchWeatherData({ lat, lon });
      } else if (!Array.isArray(data) && data) {
        const { lat, lon } = data;
        fetchWeatherData({ lat, lon });
      } else {
        dispatch(setError(NO_DATA_FOUND));
      }
    } catch (err) {
      handleError(err);
    }
    dispatch(setLoading(false));
  };

  const handleCityName = () => {
    dispatch(setCityName(searchText));
    getResponse();
  };

  return (
    <>
      <div className="relative flex justify-end items-center w-full">
        <input
          placeholder={`${
            searchBy === "cityName"
              ? "Please search by cityName (Ex:- Bengaluru)"
              : "Search By comma separated pincode and countrycod (Ex:- 560001,IN)"
          }`}
          value={searchText}
          className="h-10 text-xs outline-none border px-2 shadow bg-gray-400/20 rounded w-full pr-8"
          maxLength={40}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCityName()}
        />
        <button
          className="h-full bg-blue-400/20 rounded w-7 disabled:bg-gray-400/20 absolute cursor-pointer"
          disabled={searchText.trim().length === 0}
          onClick={handleCityName}
        >
          <IoSearchOutline className="w-8 h-8 px-2" />
        </button>
      </div>
    </>
  );
};

export default SearchCity;
