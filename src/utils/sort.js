import dayjs from 'dayjs';

export const sortFromMaxPrice = (a, b) => b.base_price - a.base_price;

export const sortFromMaxDuration = (a, b) => dayjs(b.date_to).diff(dayjs(b.date_from)) - dayjs(a.date_to).diff(dayjs(a.date_from));

export const sortByDate = (a, b) => dayjs(a.date_from).diff(dayjs(b.date_from));
