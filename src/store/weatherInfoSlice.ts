import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "@/api/types";

const initialState: WeatherData = {
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
};

const weatherInfoSlice = createSlice({
  name: "weatherInfo",
  initialState,
  reducers: {
    setWeatherInfo: (state, action: PayloadAction<WeatherData>) => {
      console.log(action.payload);
      state.coord = action.payload.coord;
      state.weather = action.payload.weather;
      state.main = action.payload.main;
      state.wind = action.payload.wind;
      state.sys = action.payload.sys;
      state.name = action.payload.name;
      state.dt = action.payload.dt;
    },
  },
});

export const { setWeatherInfo } = weatherInfoSlice.actions;
export default weatherInfoSlice.reducer;
