import { isNumber } from 'lodash';


export function descendingComparator<T>(x: T, y: T, orderBy: keyof T) {
  const a = x[orderBy];
  const b = y[orderBy];

  if (!isNumber(a) || !isNumber(b) ) {

    if (!a) return -1;
    if (!b) return 1;
    if (a === b) return 0;

    return (b < a) ? -1 : 1;

  } else {
    return (b) - (a);
  }



}

type Order = 'asc' | 'desc';

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}