import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { TMaterialOptions } from './useMaterials';



export const useMaterialsOptions = (
  rowIdx,
  materialsOptions: TMaterialOptions,
) => {
  const { majorItems, middleItems, materials } = materialsOptions;

  const { values } = useFormikContext<TypeOfForm>();
  const { items } = values;
  const { majorItem, middleItem } = items[rowIdx];

  const majorItemOpts = majorItems.map<Option>(({ 大項目名 }) => ({
    label: 大項目名.value,
    value: 大項目名.value,
  })) ;


  const middleItemOpts = middleItems.reduce((accu, { 大項目名, 中項目名 }) => {
    if (!majorItem || 大項目名?.value === majorItem) {
      accu.push({
        label: 中項目名.value,
        value: 中項目名.value,
      });
    }
    return accu;
  }, [] as Options);


  console.log('materials', materials);
  const materialOpts = materials.reduce((accu, {  中項目名, 部材名 }) => {
    if (!middleItem || 中項目名?.value === middleItem) {
      accu.push({
        label: 部材名?.value,
        value: 部材名?.value,
      });
    }
    return accu;
  }, [] as Options);


  return {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
  };


};