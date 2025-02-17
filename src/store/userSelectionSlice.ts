import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type UserSeletions = {
  searchBy: string;
  units: string;
  favourites: [];
  city: string;
  isGeoLocationError: string;
  isGeoLocationLoading: boolean;
  isSearchLoading: boolean;
  isSearchError: string;
};

const initialState: UserSeletions = {
  isGeoLocationError: "",
  isGeoLocationLoading: false,
  isSearchLoading: false,
  isSearchError: "",
  searchBy: "city name",
  units: "",
  favourites: [],
  city: "",
};
const userSelection = createSlice({
  name: "userSelection",
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
    setCityName: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setGeoLocationError: (state, action: PayloadAction<string>) => {
      state.isGeoLocationError = action.payload;
    },
    setGeoLocationLoader: (state, action: PayloadAction<boolean>) => {
      state.isGeoLocationLoading = action.payload;
    },
    setSearchLoading: (state, action: PayloadAction<boolean>) => {
      state.isSearchLoading = action.payload;
    },
    setSearchError: (state, action: PayloadAction<string>) => {
      state.isSearchError = action.payload;
    },
  },
});

export const {
  setSearchByOption,
  setUnitConversion,
  setUserFavourites,
  setGeoLocationError,
  setGeoLocationLoader,
  setSearchLoading,
  setSearchError,
  setCityName,
} = userSelection.actions;
export default userSelection.reducer;
