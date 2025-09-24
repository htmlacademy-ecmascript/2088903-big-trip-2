import { FilterType } from '../const/filter-type.js';
import { isAfterToday, isBeforeToday, isToday } from './date-time.js';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isAfterToday(point.date_from)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isToday(point.date_from, point.date_to)),
  [FilterType.PAST]: (points) => points.filter((point) => isBeforeToday(point.date_to)),
};

export const generateFilter = (points) => Object.entries(filter).map(
  ([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints(points).length,
  }),
);
