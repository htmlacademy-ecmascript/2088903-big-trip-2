import dayjs from 'dayjs';

export const sortFromMaxPrice = (a, b) => b.basePrice - a.basePrice;

export const sortFromMaxDuration = (a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom));

export const sortByDate = (a, b) => dayjs(a.dateFrom).diff(dayjs(b.dateFrom));
