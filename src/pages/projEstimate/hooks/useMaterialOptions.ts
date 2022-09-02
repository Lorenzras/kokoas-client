import { useFormikContext } from 'formik';
import { TypeOfForm, getItemFieldName, unitChoices } from '../form';
import { TMaterialOptions } from './useMaterials';
import { produce } from 'immer';



export const useMaterialsOptions = (
  rowIdx: number,
  materialsOptions: TMaterialOptions,
) => {
  const { majorItems, middleItems, materials } = materialsOptions;

  const { values, setFieldValue, setValues } = useFormikContext<TypeOfForm>();
  const { items } = values;
  const { majorItem, middleItem } = items[rowIdx];



  /* Change handlers */

  const handleMajorItemChange = () => {
    setValues((prev) => produce(prev, (draft) => {
      draft.items[rowIdx].element = '';
      draft.items[rowIdx].middleItem = '';
    }));
  };

  const handleMiddleItemChange = (newVal: string) => {
    setFieldValue(getItemFieldName(rowIdx, 'element'), '');
    if (newVal) {
      const selectedMiddleItem = middleItems.find(({ 中項目名 }) => 中項目名.value === newVal);
      setFieldValue(getItemFieldName(rowIdx, 'majorItem'), selectedMiddleItem?.大項目名.value);
    }
  };

  const handleMaterialChange = (newVal: string) => {
    if (newVal) {
      const selectedMaterial = materials.find(({ 部材名 }) => 部材名.value === newVal);
      if (selectedMaterial) {

        setValues(
          (prev) => produce(prev, (draft) => {
            draft.items[rowIdx].majorItem = selectedMaterial.大項目名.value;
            draft.items[rowIdx].middleItem = selectedMaterial.中項目名.value;
            draft.items[rowIdx].costPrice = +selectedMaterial.原価.value;
            draft.items[rowIdx].unit = selectedMaterial.単位.value as typeof unitChoices[number];
          }),
        );

      }

    }
  };

  /**
   * Options filters
   */

  const majorItemOpts = majorItems.map<Option>(({ 大項目名 }) => ({
    label: 大項目名.value,
    value: 大項目名.value,
  }));

  const middleItemOpts = middleItems.reduce((accu, { 大項目名, 中項目名 }) => {
    if (!majorItem || 大項目名?.value === majorItem) {
      accu.push({
        label: 中項目名.value,
        value: 中項目名.value,
      });
    }
    return accu;
  }, [] as Options);

  const materialOpts = materials.reduce((accu, { 大項目名, 中項目名, 部材名 }) => {
    // console.log('大項目名?.value', 大項目名?.value);
    if (majorItem && 大項目名?.value === majorItem) {
      accu.push({
        label: 部材名?.value,
        value: 部材名?.value,
      });
    } else if (!majorItem && (!middleItem || 中項目名?.value === middleItem)) {
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
    handleMajorItemChange,
    handleMiddleItemChange,
    handleMaterialChange,
  };


};