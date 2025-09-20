import dayjs from 'dayjs';

export const sortFromMaxPrice = (a, b) => b.base_price - a.base_price;

export const sortFromMaxDuration = (a, b) => {
  const timeA = dayjs(a.date_to).diff(dayjs(a.date_from));
  const timeB = dayjs(b.date_to).diff(dayjs(b.date_from));

  return timeB - timeA;
};

export const sortByDate = (pointA, pointB) => dayjs(pointA.date_from).diff(dayjs(pointB.date_from));
