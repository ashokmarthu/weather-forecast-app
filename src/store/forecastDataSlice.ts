import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ForecastData } from "@/api/types";
interface State {
  forecastData: ForecastData | null;
  isForecastDataLoading: boolean;
  isForecastDataError: string;
}
const initialState: State = {
  forecastData: null,
  isForecastDataLoading: false,
  isForecastDataError: "",
};
const forecastData = createSlice({
  name: "forecastData",
  initialState,
  reducers: {
    setForecastData: (state, action: PayloadAction<ForecastData>) => {
      state.forecastData = action.payload;
    },
    setForecastInfoLoading: (state, action: PayloadAction<boolean>) => {
      state.isForecastDataLoading = action.payload;
    },
    setForecastDataError: (state, action: PayloadAction<string>) => {
      state.isForecastDataError = action.payload;
    },
  },
});

export const { setForecastData, setForecastInfoLoading, setForecastDataError } =
forecastData.actions;
export default forecastData.reducer;
