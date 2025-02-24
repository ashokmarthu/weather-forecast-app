import { Coordinates } from "@/api/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type Favourite = {
  id?: number;
  lat: number;
  lon: number;
};

type UserSelections = {
  searchBy: string;
  units: string;
  favourites: Favourite[];
  city: string;
};

const initialState: UserSelections = {
  searchBy: "cityName",
  units: "metric",
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
    setUserFavourites: (state, action: PayloadAction<Favourite>) => {
      state.favourites = [
        ...state.favourites,
        { id: Date.now(), ...action.payload },
      ];
    },
    setCityName: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    removeFromFavourites: (state, action: PayloadAction<Coordinates>) => {
      state.favourites = state.favourites.filter(
        (city) =>
          city.lat !== action.payload.lat && city.lon !== action.payload.lon
      );
    },
  },
});

export const {
  setSearchByOption,
  setUnitConversion,
  setUserFavourites,
  setCityName,
  removeFromFavourites,
} = userSelection.actions;

export default userSelection.reducer;
