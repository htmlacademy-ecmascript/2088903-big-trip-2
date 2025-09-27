import dayjs from 'dayjs';
import {
  DateFormat,
  MILLISECONDS_IN_MINUTE,
  MINUTES_IN_DAY,
  MINUTES_IN_HOUR,
  PAD_LENGTH,
  PAD_SYMBOL,
  TIME_UNIT
} from '../const/date-format.js';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const dateTime = (date, dateFormat) => dayjs(date).format(dateFormat);

export const formatDateTime = (date) => dateTime(date, DateFormat.DAY_MONTH_YEAR_HOUR_MINUTE);

export const formatMonthDay = (date) => dateTime(date, DateFormat.MONTH_DAY);

export const formatTime = (date) => dateTime(date, DateFormat.HOUR_MINUTE);

export const isBeforeToday = (date) => dayjs(date).isBefore(dayjs(), 'day');

export const isAfterToday = (date) => dayjs(date).isAfter(dayjs(), 'day');

export const isToday = (dateFrom, dateTo) =>
  dayjs(dateFrom).isSameOrBefore(dayjs(), 'day') &&
  dayjs(dateTo).isSameOrAfter(dayjs(), 'day');

export const getTimeDifference = (dateFrom, dateTo) => {
  const startDate = dayjs(dateFrom);
  const endDate = dayjs(dateTo);

  if (!startDate.isValid() || !endDate.isValid()) {
    return '';
  }

  const diffMilliseconds = endDate.diff(startDate);
  const totalMinutes = Math.floor(diffMilliseconds / MILLISECONDS_IN_MINUTE);

  const days = Math.floor(totalMinutes / MINUTES_IN_DAY);
  const hours = Math.floor((totalMinutes % MINUTES_IN_DAY) / MINUTES_IN_HOUR);
  const minutes = totalMinutes % MINUTES_IN_HOUR;

  const pad = (value) => value.toString().padStart(PAD_LENGTH, PAD_SYMBOL);

  if (days > 0) {
    return `${pad(days)}${TIME_UNIT.DAY} ${pad(hours)}${TIME_UNIT.HOUR} ${pad(minutes)}${TIME_UNIT.MINUTE}`;
  }

  if (hours > 0) {
    return `${pad(hours)}${TIME_UNIT.HOUR} ${pad(minutes)}${TIME_UNIT.MINUTE}`;
  }

  return `${pad(minutes)}${TIME_UNIT.MINUTE}`;
};
