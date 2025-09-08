import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DateFormat } from '../const/date-format';


dayjs.extend(duration);


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
