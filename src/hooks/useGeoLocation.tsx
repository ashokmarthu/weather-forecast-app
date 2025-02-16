import { useEffect, useState } from "react";
import { Coordinates } from "@/api/types";

interface GeolocationState {
  coordinates: Coordinates;
  errorMsg: string | null;
  isLoading: boolean;
}
const useGeoLocation = () => {
  const [locationData, setLocationData] = useState<GeolocationState>({
    coordinates: {
      lat: 12.9716,
      lon: 77.5946,
    },
    errorMsg: null,
    isLoading: false,
  });
  const userLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationData((prev) => ({
          ...prev,
          coordinates: {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          },
          errorMsg: null,
          isLoading: false,
        }));
        return;
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
        setLocationData((prev) => ({
          ...prev,
          errorMsg: errorMessage,
          isLoading: false,
        }));
        return;
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  };
  useEffect(() => {
    setLocationData((prev) => ({ ...prev, isLoading: true }));
    userLocation();
  }, []);
  return {
    coordinates: locationData.coordinates,
    errorMsg: locationData.errorMsg,
    isLoading: locationData.isLoading,
  };
};

export default useGeoLocation;
