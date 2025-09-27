import dayjs from 'dayjs';

const DefaultValue = {
  DATE_FROM: dayjs().toISOString(),
  DATE_TO: dayjs().add(1, 'hour').toISOString(),
  TYPE: 'flight',
};

export const BLANK_POINT = {
  basePrice: '',
  dateFrom: DefaultValue.DATE_FROM,
  dateTo: DefaultValue.DATE_TO,
  destination: '',
  isFavorite: false,
  offers: [],
  type: DefaultValue.TYPE,
};
