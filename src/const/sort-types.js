export const SortType = {
  DEFAULT: 'default',
  FROM_MAX_PRICE: 'from-max-price',
  FROM_MAX_DURATION: 'from-max-duration',
};

export const SORT_TYPES = [
  {type: 'day', name: 'Day', sortType: SortType.DEFAULT, disabled: false},
  {type: 'event', name: 'Event', sortType: '', disabled: true},
  {type: 'time', name: 'Time', sortType: SortType.FROM_MAX_DURATION, disabled: false},
  {type: 'price', name: 'Price', sortType: SortType.FROM_MAX_PRICE, disabled: false},
  {type: 'offer', name: 'Offers', sortType: '', disabled: true},
];
