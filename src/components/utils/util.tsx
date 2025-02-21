import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DIRECTIONS } from './constants';

dayjs.extend(localizedFormat);

const getWindDirection = (deg: number, speed: number): string => {
  const index = Math.floor((deg + 11.25) / 22.5);
  return `${DIRECTIONS[index % 16]} at ${speed} m/s`;
};

const formatDateTime = (date: number) => dayjs.unix(date).format('LT');
const formatDate = (date: number) => dayjs.unix(date).format('L');
const formatTemp = (temp: number) => `${Math.round(temp)}°`;
const formatwithDate = (date: number) => dayjs.unix(date).format('L');

export { getWindDirection, formatDateTime, formatTemp, formatDate, formatwithDate };
