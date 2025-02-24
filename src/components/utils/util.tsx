import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { DIRECTIONS } from "./constants";

dayjs.extend(localizedFormat);

const getWindDirection = (deg: number, speed: number): string => {
  const index = Math.floor((deg + 11.25) / 22.5);
  return `${DIRECTIONS[index % 16]} at ${speed} m/s`;
};

const formatDateTime = (date: number) => dayjs.unix(date).format("LT");

const formatDate = (date: number) => dayjs.unix(date).format("L");

const formatTemp = (
  kelvin: number,
  unit: string,
  isNumberFormat: boolean = false
): string | number => {
  const temp =
    unit === "imperial" ? ((kelvin - 273.15) * 9) / 5 + 32 : kelvin - 273.15;
  return isNumberFormat ? Math.round(temp).toString() : `${Math.round(temp)}°`;
};

const formatwithDate = (date: number) => dayjs.unix(date).format("L");

export {
  getWindDirection,
  formatDateTime,
  formatTemp,
  formatDate,
  formatwithDate,
};
