const DIRECTIONS: Array<string> = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

const SUNRISE = "Sunrise";
const SUNSET = "Sunset";
const WIND_DIRECTION_SPEED = "Wind direction & Speed";
const PRESSURE = "Pressure";
const METRIC = "metric";
const IMPERIAL = "imperial";
const TEMP_CATEGORIES = [METRIC, IMPERIAL];
const NO_DATA_FOUND = "No data found";
const SEARCH_BY_OPTIONS = ["cityName", "zip and Countycode"];
const OFFLINE_MESSAGE = "Hey, Your'e Offline";
const DARK_MODE = "dark";
const LIGHT_MODE = "light";
const SOMETHING_WRONG = "Something wrong";

export {
  DIRECTIONS,
  SUNRISE,
  SUNSET,
  WIND_DIRECTION_SPEED,
  PRESSURE,
  TEMP_CATEGORIES,
  NO_DATA_FOUND,
  SEARCH_BY_OPTIONS,
  OFFLINE_MESSAGE,
  DARK_MODE,
  LIGHT_MODE,
  SOMETHING_WRONG
};
