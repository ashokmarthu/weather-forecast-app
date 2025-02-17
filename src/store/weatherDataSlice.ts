import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "@/api/types";

interface State {
  weatherData: WeatherData | null;
  isWeatherDataLoading: boolean;
  isWeatherDataError: string;
}

const initialState: State = {
  weatherData: null,
  isWeatherDataLoading: false,
  isWeatherDataError: "",
};

const weatherData = createSlice({
  name: "weatherData",
  initialState,
  reducers: {
    setWeatherData: (state, action: PayloadAction<WeatherData>) => {
      console.log(action.payload)
      state.weatherData = action.payload;
    },
    setWeatherInfoLoading: (state, action: PayloadAction<boolean>) => {
      state.isWeatherDataLoading = action.payload;
    },
    setWeatherDataError: (state, action: PayloadAction<string>) => {
      state.isWeatherDataError = action.payload;
    },
  },
});

export const { setWeatherData, setWeatherInfoLoading, setWeatherDataError } =
  weatherData.actions;
export default weatherData.reducer;
