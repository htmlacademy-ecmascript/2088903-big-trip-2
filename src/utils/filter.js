import { FilterType } from '../const/filter-type.js';
import { isAfterToday, isBeforeToday, isToday } from './date-time.js';

const filter = {
  [FilterType.EVERYTHING]: (tasks) => tasks,
  [FilterType.FUTURE]: (tasks) => tasks.filter((task) => isAfterToday(task.date_from)),
  [FilterType.PRESENT]: (tasks) => tasks.filter((task) => isToday(task.date_from, task.date_to)),
  [FilterType.PAST]: (tasks) => tasks.filter((task) => isBeforeToday(task.date_to)),
};

export const generateFilter = (points) => Object.entries(filter).map(
  ([filterType, filterPoints]) => ({
    type: filterType,
    count: filterPoints(points).length,
  }),
);
