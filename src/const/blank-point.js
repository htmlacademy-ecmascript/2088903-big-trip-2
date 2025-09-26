import { nanoid } from 'nanoid';
import dayjs from 'dayjs';

const DefaultValue = {
  DATE_FROM: dayjs().toISOString(),
  DATE_TO: dayjs().add(1, 'hour').toISOString(),
  TYPE: 'taxi',
};

export const BLANK_POINT = {
  'base_price': '',
  'date_from': DefaultValue.DATE_FROM,
  'date_to': DefaultValue.DATE_TO,
  'destination': '',
  'is_favorite': false,
  'offers': [],
  'type': DefaultValue.TYPE,
  'id': nanoid()
};
