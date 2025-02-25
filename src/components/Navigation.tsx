import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weatherAPI } from "@/api/Weather";
import { RootState } from "@/store/store";
import { setCoordinates } from "@/store/userSelectionSlice";
import {
  setError,
  setForecastData,
  setLoading,
  setWeatherData,
} from "@/store/weatherDataSlice";
import { CiLocationOn } from "react-icons/ci";

const Navigation = () => {
  const coord = useSelector((store: RootState) => store.userSelection.coord);
  const dispatch = useDispatch();

  const handleLocationError = useCallback((error: GeolocationPositionError) => {
    const errorMessages: Record<number, string> = {
      [error.PERMISSION_DENIED]:
        "Location permission denied. Please enable location access.",
      [error.POSITION_UNAVAILABLE]: "Location information is unavailable.",
      [error.TIMEOUT]: "Location request timed out.",
    };
    dispatch(
      setError(errorMessages[error.code] || "An unknown error occurred")
    );
    dispatch(setLoading(false));
  }, []);

  const handleLocationSuccess = useCallback(
    async ({ coords }: GeolocationPosition) => {
      const lat = coords.latitude;
      const lon = coords.longitude;
      if (coord?.lat === lat && coord?.lon === lon) return;
      try {
        dispatch(setLoading(true));
        const [weatherRes, foreCastRes] = await Promise.all([
          weatherAPI.getCurrentWeather({ lat, lon }),
          weatherAPI.getForecast({ lat, lon }),
        ]);
        dispatch(setWeatherData(weatherRes));
        dispatch(setForecastData(foreCastRes));
        dispatch(setCoordinates({ lat, lon }));
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "An unknown error occurred";
        dispatch(setError(errorMessage));
      }
      dispatch(setLoading(false));
    },
    [coord, dispatch]
  );

  const userLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      handleLocationError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
      }
    );
  }, [handleLocationSuccess, handleLocationError]);

  const handleChange = () => {
    dispatch(setError(""));
    userLocation();
  };

  return (
    <button
      onClick={handleChange}
      className="z-2 rounded-full p-1 ring-2 ring-offset-white"
    >
      <CiLocationOn className="w-6 h-6" />
    </button>
  );
};

export default Navigation;
