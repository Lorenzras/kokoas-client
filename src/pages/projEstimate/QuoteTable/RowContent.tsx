
import { Button, TableCell, TableRow } from '@mui/material';
import { Display } from '../fieldComponents/Display';
import { FormikAutocomplete } from '../fieldComponents/FormikAutocomplete';
import { FormikInput } from '../fieldComponents/FormikInput';
import { FormikPulldown } from '../fieldComponents/FormikPulldown';
import { getFieldName, taxChoices, TKMaterials, unitChoices } from '../form';
import { useCalculate } from '../hooks/useCalculate';
import { useMaterialsOptions } from '../hooks/useMaterialOptions';
import { TMaterialOptions } from '../hooks/useMaterials';

const itemsName = getFieldName('items');

const getItemFieldName = (
  rowIdx: number, fieldName: TKMaterials,
) => `${itemsName}[${rowIdx}].${fieldName}`;

export const RowContent = (
  {
    rowIdx,
    removeRow,
    materialOptions,
  }: {
    rowIdx: number,
    removeRow: (rowIdx: number) => void,
    materialOptions: TMaterialOptions,
  }) => {

  useCalculate(rowIdx);

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
    handleMajorItemChange,
    handleMiddleItemChange,
    handleMaterialChange,
  } = useMaterialsOptions(rowIdx, materialOptions);


  return (
    <TableRow >

      <TableCell>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'majorItem')}
          handleChange={handleMajorItemChange}
          options={majorItemOpts}
          />
      </TableCell>

      <TableCell>
        <FormikPulldown
        name={getItemFieldName(rowIdx, 'middleItem')}
        handleChange={handleMiddleItemChange}
        options={middleItemOpts} />
      </TableCell>

      <TableCell>
        <FormikAutocomplete
        name={getItemFieldName(rowIdx, 'element')}
        handleChange={handleMaterialChange}
        options={materialOpts} />
      </TableCell>

      <TableCell>
        <FormikInput name={getItemFieldName(rowIdx, 'costPrice')} />
      </TableCell>

      <TableCell>
        <FormikInput name={getItemFieldName(rowIdx, 'quantity')} />
      </TableCell>

      <TableCell>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'unit')}
          options={unitChoices.map((c) => ({ label: c, value: c }))}
        />
      </TableCell>

      <TableCell>
        <FormikInput name={getItemFieldName(rowIdx, 'elemProfRate')} />
      </TableCell>

      <TableCell>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'tax')}
          options={taxChoices.map((c) => ({ label: c, value: c }))}
        />
      </TableCell>

      <TableCell>
        <Display name={getItemFieldName(rowIdx, 'unitPrice')} suffix={'円'} />
      </TableCell>

      <TableCell>
        <Display name={getItemFieldName(rowIdx, 'price')} suffix={'円'} />
      </TableCell>


      <TableCell >
        <Button
          variant="outlined"
          onClick={() => removeRow(rowIdx)}
        >
          -
        </Button>
      </TableCell>

    </TableRow>
  );
};