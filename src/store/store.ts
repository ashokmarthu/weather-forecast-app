import { configureStore } from "@reduxjs/toolkit";
import weatherInfoSlice from "./weatherInfoSlice";
import foreCastSlice from "./forecastSlice";

export const store = configureStore({
  reducer: {
    weatherInfo: weatherInfoSlice,
    forecast: foreCastSlice,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
