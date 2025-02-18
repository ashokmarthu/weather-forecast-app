import { GeocodingResponse } from "@/api/types";
import { weatherAPI } from "@/api/Weather";
import {
  setForecastData,
  setForecastDataError,
} from "@/store/forecastDataSlice";
import { RootState } from "@/store/store";
import {
  setCityName,
  setSearchError,
  setSearchLoading,
} from "@/store/userSelectionSlice";
import { setWeatherData, setWeatherDataError } from "@/store/weatherDataSlice";
import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { NO_DATA_FOUND } from "./utils/constants";

const SearchCity = () => {
  const dispatch = useDispatch();
  const { units, searchBy } = useSelector(
    (store: RootState) => store.userSelection
  );
  const [searchText, setSearchText] = useState<string>("");

  const handleError = (err: unknown) => {
    dispatch(setSearchError(`${err}`));
    dispatch(setWeatherDataError(`${err}`));
    dispatch(setForecastDataError(`${err}`));
    dispatch(setSearchLoading(false));
  };

  const fetchWeatherData = (coords: { lat: number; lon: number }) => {
    Promise.all([
      weatherAPI.getCurrentWeather(coords, units),
      weatherAPI.getForecast(coords, units),
    ])
      .then(([weatherRes, forecastRes]) => {
        dispatch(setWeatherData(weatherRes));
        dispatch(setForecastData(forecastRes));
        dispatch(setSearchLoading(false));
      })
      .catch(handleError);
  };

  const getGeoCode = (search: string) => {
    if (searchBy === "city name") {
      return weatherAPI.getGeoCodeByCityName(search, units);
    } else {
      return weatherAPI.getGeoCodeByPinCode(search, units);
    }
  };

  const getResponse = async (): Promise<void> => {
    dispatch(setSearchLoading(true));
    dispatch(setSearchError(""));
    dispatch(setWeatherDataError(""));
    dispatch(setForecastDataError(""));
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
        dispatch(setSearchError(NO_DATA_FOUND));
      }
      dispatch(setSearchLoading(false));
    } catch (err) {
      handleError(err);
    }
  };

  const handleCityName = () => {
    dispatch(setCityName(searchText));
    getResponse();
  };

  return (
    <>
      <div>
        <div className="relative flex justify-end items-center w-full">
          <input
            placeholder={`${
              searchBy === "city name"
                ? "Please search by city name (Ex:- Bengaluru)"
                : "Search By comma separated pincode and countrycode (Ex:- Newyork,US)"
            }`}
            value={searchText}
            className="h-10 text-xs outline-none border px-2 shadow bg-gray-400/20 rounded w-full pr-8"
            maxLength={40}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="h-full bg-blue-400/20 rounded w-7 disabled:bg-gray-400/20 absolute"
            disabled={searchText.trim().length === 0}
            onClick={handleCityName}
          >
            <IoSearchOutline className="w-8 h-8 px-2" />
          </button>
        </div>
        <small
          className={`text-muted-foreground ${
            searchText.length === 40 ? "text-red-500/90" : ""
          }`}
        >
          Maximum 40 Characters Allowed
        </small>
      </div>
    </>
  );
};

export default SearchCity;
