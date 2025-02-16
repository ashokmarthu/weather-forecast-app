import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "@/api/types";

interface State extends WeatherData {
  weatherInfoLoading: boolean;
  weatherInfoError: boolean;
}

const initialState: State = {
  coord: {
    lat: 0,
    lon: 0,
  },
  weather: [],
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
  },
  wind: {
    speed: 0,
    deg: 0,
  },
  sys: {
    sunrise: 0,
    sunset: 0,
    country: "",
  },
  name: "",
  dt: 0,
  weatherInfoLoading: false,
  weatherInfoError: false,
};

const weatherInfoSlice = createSlice({
  name: "weatherInfo",
  initialState,
  reducers: {
    setWeatherInfo: (state, action: PayloadAction<WeatherData>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setWeatherInfoLoading: (state, action: PayloadAction<boolean>) => {
      state.weatherInfoLoading = action.payload;
    },
    setWeatherInfoError: (state, action: PayloadAction<boolean>) => {
      state.weatherInfoError = action.payload;
    },
  },
});

export const { setWeatherInfo, setWeatherInfoLoading, setWeatherInfoError } =
  weatherInfoSlice.actions;
export default weatherInfoSlice.reducer;
