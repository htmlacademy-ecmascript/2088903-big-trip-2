const DefaultValue = {
  DATE_FROM: null,
  DATE_TO: null,
  TYPE: 'flight',
  PRICE: 0,
};

export const BLANK_POINT = {
  basePrice: DefaultValue.PRICE,
  dateFrom: DefaultValue.DATE_FROM,
  dateTo: DefaultValue.DATE_TO,
  destination: '',
  isFavorite: false,
  offers: [],
  type: DefaultValue.TYPE,
};
