import moment from "moment";
import { DIRECTIONS } from "./constants";

const getWindDirection = (deg: number, speed: number): string => {
  const index = Math.floor((deg + 11.25) / 22.5);
  return `${DIRECTIONS[index % 16]} at ${speed} m/s`;
};

const formatDateTime = (date: number) => moment.unix(date).format("LT");
const formatDate = (date: number) => moment.unix(date).format("MMM Do YY");
const formatTemp = (temp: number) => `${Math.round(temp)}°`;
const formatwithDate = (date: number) => moment.unix(date).format("L");

export { getWindDirection, formatDateTime, formatTemp, formatDate,formatwithDate };
