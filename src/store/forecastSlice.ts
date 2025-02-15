import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ForecastData } from "@/api/types";

const initialState: ForecastData = {
  city: {
    id: 0,
    name: "",
    country: "",
    population: 0,
    timezone: 0,
    sunrise: 0,
    sunset: 0,
  },
  list: [],
};
const foreCastSlice = createSlice({
  name: "forecast",
  initialState,
  reducers: {
    setForecastInfo: (state, action: PayloadAction<ForecastData>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setForecastInfo } = foreCastSlice.actions;
export default foreCastSlice.reducer;
