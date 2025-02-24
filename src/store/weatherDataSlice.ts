import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ForecastData, WeatherData } from "@/api/types";

interface State {
  weatherData: WeatherData | null;
  forecastData: ForecastData | null;
  isLoading: boolean;
  isError: string;
}

const initialState: State = {
  isLoading: false,
  isError: "",
  weatherData: null,
  forecastData: null,
};

const weatherData = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherData>) => {
      state.weatherData = action.payload;
    },
    setForecastData: (state, action: PayloadAction<ForecastData>) => {
      state.forecastData = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.isError = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setWeatherData, setForecastData, setLoading, setError } =
  weatherData.actions;
export default weatherData.reducer;
