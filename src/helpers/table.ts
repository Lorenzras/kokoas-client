import { isNumber } from './utils';


export function descendingComparator<T>(x: T, y: T, orderBy: keyof T) {
  const a = x[orderBy] as any;
  const b = y[orderBy] as any;

  if (!isNumber(a[orderBy]) || !isNumber(b[orderBy]) ) {

    if (a === '' || a === null) return -1;
    if (b === '' || b === null) return 1;
    if (a === b) return 0;

    return (b < a) ? -1 : 1;

  } else {
    return (b as any) - (a as any);
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