import dayjs from 'dayjs';

export const sortFromMaxPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

export const sortFromMaxDuration = (pointA, pointB) => dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom)) - dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));

export const sortByDate = (pointA, pointB) => dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
