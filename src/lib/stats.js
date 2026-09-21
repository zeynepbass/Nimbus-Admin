export const sumBy = (items, getValue) =>
  items.reduce((total, item) => total + getValue(item), 0);

export const averageBy = (items, getValue) =>
  items.length ? sumBy(items, getValue) / items.length : 0;
