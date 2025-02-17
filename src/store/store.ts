import { configureStore } from "@reduxjs/toolkit";
import weatherData from "./weatherDataSlice";
import forecastData from "./forecastDataSlice";
import userSelection from "./userSelectionSlice";
export const store = configureStore({
  reducer: {
    weatherData: weatherData,
    forecastData: forecastData,
    userSelection: userSelection,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
