export const capitalize = (string) => {
  if (typeof string !== 'string' || string.length === 0) {
    return '';
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];
