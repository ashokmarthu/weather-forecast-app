import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import weatherData from "./weatherDataSlice";
import userSelection from "./userSelectionSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["weatherData"],
};
const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    weatherData,
    userSelection,
  })
);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["register"],
      },
    }),
});
export const persistor = persistStore(store);
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
