import { nanoid } from 'nanoid';

const DefaultValue = {
  DATE_FROM: '',
  DATE_TO: '',
  TYPE: 'taxi',
};

export const BLANK_POINT = {
  'base_price': '',
  'date_from': '2025-09-26T00:10:25.881Z',
  'date_to': '2025-09-27T09:37:25.881Z',
  'destination': '',
  'is_favorite': false,
  'offers': [],
  'type': DefaultValue.TYPE,
  'id': nanoid()
};
