import { Coordinates, WeatherData } from "@/api/types";
import { weatherAPI } from "@/api/Weather";
import { useEffect, useState } from "react";

const useWeather = ({ lat, lon }: Coordinates) => {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherData>();
  async function getWeather() {
    setIsLoading(true);
    try {
      const res = await weatherAPI.getCurrentWeather({ lat, lon });
      setIsLoading(false);
      setWeather(res);
    } catch (e) {
      console.log(e)
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getWeather();
  }, []);
  return {
    isLoading,
    weather,
  };
};

export default useWeather;
