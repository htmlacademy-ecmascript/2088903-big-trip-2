export const capitalize = (text) => {
  if (typeof text !== 'string' || text.length === 0) {
    return '';
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const isEscapeKey = (evt) => evt.key === 'Escape';
