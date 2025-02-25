import { weatherAPI } from "@/api/Weather";
import {
  setError,
  setForecastData,
  setLoading,
  setWeatherData,
} from "@/store/weatherDataSlice";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();
  const userLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const lat = coords.latitude;
        const lon = coords.longitude;
        try {
          const [weatherRes, foreCastRes] = await Promise.all([
            weatherAPI.getCurrentWeather({ lat, lon }),
            weatherAPI.getForecast({ lat, lon }),
          ]);
          dispatch(setWeatherData(weatherRes));
          dispatch(setForecastData(foreCastRes));
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "An unknown error occurred";
          dispatch(setError(errorMessage));
        }
        dispatch(setLoading(false));
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }
        dispatch(setError(errorMessage));
        dispatch(setLoading(false));
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };

  const handleChange = () => {
    setLoading(true);
    setError("");
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
