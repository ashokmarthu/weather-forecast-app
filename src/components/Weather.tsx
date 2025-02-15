import React, { JSX } from "react";
import moment from "moment";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
} from "react-icons/fa";

// Define constants for weather descriptions
const CLEAR_SKY = "clear sky";
const FEW_CLOUDS = "few clouds";
const SCATTERED_CLOUDS = "scattered clouds";
const BROKEN_CLOUDS = "broken clouds";
const SHOWER_RAIN = "shower rain";
const RAIN = "rain";
const SNOW = "snow";
const MIST = "mist";
const SMOKE = "smoke";
const HAZE = "haze";
const DUST = "dust";
const FOG = "fog";
const SAND = "sand";
const ASH = "ash";
const SQUALL = "squall";
const TORNADO = "tornado";

// Map weather descriptions to icons
type WeatherDescription =
  | "clear sky"
  | "few clouds"
  | "scattered clouds"
  | "broken clouds"
  | "shower rain"
  | "rain"
  | "snow"
  | "mist"
  | "smoke"
  | "haze"
  | "dust"
  | "fog"
  | "sand"
  | "ash"
  | "squall"
  | "tornado";

// Map weather descriptions to icons with a defined type
type WeatherIconMap = {
  [key in WeatherDescription]: JSX.Element;
};

const weatherIconMap: WeatherIconMap = {
  [CLEAR_SKY]: <FaSun />,
  [FEW_CLOUDS]: <FaCloud />,
  [SCATTERED_CLOUDS]: <FaCloud />,
  [BROKEN_CLOUDS]: <FaCloud />,
  [SHOWER_RAIN]: <FaCloudRain />,
  [RAIN]: <FaCloudRain />,
  [SNOW]: <FaSnowflake />,
  [MIST]: <FaSmog />,
  [SMOKE]: <FaSmog />,
  [HAZE]: <FaSmog />,
  [DUST]: <FaSmog />,
  [FOG]: <FaSmog />,
  [SAND]: <FaSmog />,
  [ASH]: <FaSmog />,
  [SQUALL]: <FaSmog />,
  [TORNADO]: <FaSmog />,
};

// Define the prop types for Weather component
interface WeatherProps {
  currentWeather: {
    weather: { description: string }[];
    dt: number;
  };
}

const Weather: React.FC<WeatherProps> = ({ currentWeather }) => {
  const formatDateTime = (timeStamp: number): string => {
    return moment.unix(timeStamp).format("MMMM D, ddd HH:mm");
  };

  const getWeatherIcon = (weatherDes: string): JSX.Element | null => {
    return (
      weatherIconMap[weatherDes.toLowerCase() as WeatherDescription] || null
    );
  };

  const weatherDescription = currentWeather.weather[0].description;

  return (
    <div className="bg-gray-900 p-8 rounded-lg mb-3">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">{currentWeather.name}</h2>
          <p className="text-lg mb-2">
            {moment.unix(currentWeather.dt).format("dddd")}
          </p>
        </div>
        <p className="text-lg mb-2">{formatDateTime(currentWeather.dt)}</p>
      </div>
      <p className="text-5xl mb-4 font-bold"> {currentWeather.main.temp}°C</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {getWeatherIcon(currentWeather.weather[0].description)}
          <p className="text-lg ml-2">
            {currentWeather.weather[0].description}
          </p>
        </div>
      </div>
      <p className="text-sm">High :{currentWeather.main.temp_max}°C</p>
      <p className="text-sm">Low :{currentWeather.main.min}°C</p>
    </div>
  );
};

export default Weather;
