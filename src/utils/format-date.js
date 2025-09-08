import dayjs from 'dayjs';
import { DateFormat } from '../const/date-format.js';

const formatDate = (date, dateFormat) => dayjs(date).format(dateFormat);

export const formatDateTime = (date) =>formatDate(date, DateFormat.DAY_MONTH_YEAR_HOUR_MINUTE);

export const formatMonthDay = (date) => formatDate(date, DateFormat.MONTH_DAY);

export const formatTime = (date) => formatDate(date, DateFormat.HOUR_MINUTE);
