import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserSeletions = {
  searchBy: string;
  units: string;
  favourites: [];
};

const initialState: UserSeletions = {
  searchBy: localStorage.getItem("searchBy") || "cityName",
  units: localStorage.getItem("units") || "metric",
  favourites: [],
};
const userPrefernce = createSlice({
  name: "userPrefernce",
  initialState,
  reducers: {
    setSearchByOption: (state, action: PayloadAction<string>) => {
      state.searchBy = action.payload;
    },
    setUnitConversion: (state, action: PayloadAction<string>) => {
      state.units = action.payload;
    },
    setUserFavourites: (state, action: PayloadAction<[]>) => {
      state.favourites = action.payload;
    },
  },
});

export const { setSearchByOption, setUnitConversion, setUserFavourites } =
  userPrefernce.actions;
export default userPrefernce.reducer;
