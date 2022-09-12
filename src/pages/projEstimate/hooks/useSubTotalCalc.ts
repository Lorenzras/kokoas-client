import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';

export const useSubTotalCalc = (): Array<[string, number]> => {
  const { values } = useFormikContext<TypeOfForm>();
  const { items } = values;

  const result = items.reduce((acc, { majorItem, price })=> {
    const target = acc.find(([key]) => key === majorItem);
    if (target) {
      target[1] += +price;
    } else {
      acc.push([majorItem, price]);
    }
    return acc;
  }, [] as Array<[string, number]>);

  return result;
};