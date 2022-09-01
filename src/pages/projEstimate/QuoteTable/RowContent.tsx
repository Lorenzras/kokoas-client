
import { Button, TableCell, TableRow } from '@mui/material';
import { Display } from '../fieldComponents/Display';
import { FormikInput } from '../fieldComponents/FormikInput';
import { FormikPulldown } from '../fieldComponents/FormikPulldown';
import { getFieldName, taxChoices, TKMaterials, unitChoices } from '../form';
import { useCalculateRow } from '../hooks/useCalculateRow';

const itemsName = getFieldName('items');

const getItemFieldName = (
  rowIdx: number, fieldName: TKMaterials,
) => `${itemsName}[${rowIdx}].${fieldName}`;

export const RowContent = (
  { rowIdx,
    removeRow,
  }: {
    rowIdx: number,
    removeRow: (rowIdx: number) => void
  }) => {

  useCalculateRow(rowIdx);

  return (
    <TableRow >

      <TableCell>
        <FormikPulldown name={getItemFieldName(rowIdx, 'majorItem')} options={[]} />
      </TableCell>

      <TableCell>
        <FormikPulldown name={getItemFieldName(rowIdx, 'middleItem')} options={[]} />
      </TableCell>

      <TableCell>
        <FormikPulldown name={getItemFieldName(rowIdx, 'element')} options={[]} />
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