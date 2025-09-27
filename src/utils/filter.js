import { FilterType } from '../const/filter-type.js';
import { isAfterToday, isBeforeToday, isToday } from './date-time.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isAfterToday(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isToday(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isBeforeToday(point.dateTo)),
};
