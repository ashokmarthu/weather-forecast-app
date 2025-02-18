import { GeocodingResponse } from "@/api/types";
import { weatherAPI } from "@/api/Weather";
import { setForecastData } from "@/store/forecastDataSlice";
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
  const [cityname, setCityname] = useState<string>("");

  const getResponse = async (): Promise<void> => {
    weatherAPI
      .getGeoCode(cityname, units)
      .then((data: GeocodingResponse[]) => {
        if (data && data.length > 0) {
          const coords = {
            lat: data[0].lat,
            lon: data[0].lon,
          };
          Promise.all([
            weatherAPI.getCurrentWeather(coords, units),
            weatherAPI.getForecast(coords, units),
          ])
            .then(([weatherRes, forecastRes]) => {
              dispatch(setWeatherData(weatherRes));
              dispatch(setForecastData(forecastRes));
            })
            .catch((err) => {
              dispatch(setWeatherDataError(err));
              dispatch(setForecastData(err));
            });
          dispatch(setSearchLoading(false));
        } else {
          dispatch(setSearchError(NO_DATA_FOUND));
          dispatch(setSearchLoading(false));
        }
      })
      .catch((err) => {
        dispatch(setSearchError(`${err}`));
        dispatch(setSearchLoading(false));
      });
  };

  const handleCityName = () => {
    dispatch(setSearchError(""));
    dispatch(setSearchLoading(true));
    dispatch(setCityName(cityname));
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
            className="h-10 text-xs outline-none border px-2 shadow bg-gray-400/20 rounded w-full pr-8"
            maxLength={40}
            onChange={(e) => setCityname(e.target.value)}
          />
          <button
            className="h-full bg-blue-400/20 rounded w-7 disabled:bg-gray-400/20 absolute"
            disabled={cityname.trim().length === 0}
            onClick={handleCityName}
          >
            <IoSearchOutline className="w-8 h-8 px-2" />
          </button>
        </div>
        <small
          className={`text-muted-foreground ${
            cityname.length === 40 ? "text-red-500/90" : ""
          }`}
        >
          Maxmimum 40 Characters Allowed
        </small>
      </div>
    </>
  );
};

export default SearchCity;
