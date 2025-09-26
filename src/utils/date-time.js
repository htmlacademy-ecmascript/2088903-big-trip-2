import dayjs from 'dayjs';
import { DateFormat } from '../const/date-format.js';
import duration from 'dayjs/plugin/duration';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

dayjs.extend(duration);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

const dateTime = (date, dateFormat) => dayjs(date).format(dateFormat);

export const formatDateTime = (date) => dateTime(date, DateFormat.DAY_MONTH_YEAR_HOUR_MINUTE);

export const formatMonthDay = (date) => dateTime(date, DateFormat.MONTH_DAY);

export const formatTime = (date) => dateTime(date, DateFormat.HOUR_MINUTE);

export const getTimeDifference = (dateFrom, dateTo) => {
  const start = dayjs(dateFrom);
  const end = dayjs(dateTo);
  const DEFAULT_VALUE = 0;

  if (!start.isValid() || !end.isValid()) {
    return DEFAULT_VALUE.format(DateFormat.DURATION_MINUTE);
  }

  const difference = end.diff(start);
  const diffDuration = dayjs.duration(difference);

  if (diffDuration.asHours() < 1) {
    return diffDuration.format(DateFormat.DURATION_MINUTE);
  }

  if (diffDuration.asDays() < 1) {
    return diffDuration.format(DateFormat.DURATION_HOUR_MINUTE);
  }

  return diffDuration.format(DateFormat.DURATION_DAY_HOUR_MINUTE);
};

export const isBeforeToday = (date) => dayjs(date).isBefore(dayjs(), 'day');

export const isAfterToday = (date) => dayjs(date).isAfter(dayjs(), 'day');

export const isToday = (dateFrom, dateTo) =>
  dayjs(dateFrom).isSameOrBefore(dayjs(), 'day') &&
    dayjs(dateTo).isSameOrAfter(dayjs(), 'day');

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
