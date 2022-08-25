
import { Button, TableCell, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { TKMaterials, TypeOfForm } from '../form';
import InputCellContent from './InputCellContent';

export const RowContent = ({ taxRate, row, rowIdx, removeRow }: {
  taxRate: number,
  row: TypeOfForm['items'][number],
  rowIdx: number,
  removeRow: (rowIdx: number) => void
}) => {
  const { setFieldValue } = useFormikContext<TypeOfForm>();
  const { costPrice, quantity, elemProfRate, tax } = row;

  // 各行の単価・金額の算出処理
  useEffect(() => {
    // 単価の算出処理 : IF(原価 <= 0, 0 , 原価  * ( 1 + (内訳利益率/100)))
    const newUnitPrice = +(costPrice) <= 0 ? 0
      : +(costPrice) * (1 + (elemProfRate) / 100);
    setFieldValue(`items[${rowIdx}].unitPrice`, Math.round(newUnitPrice).toLocaleString());

    // 金額の算出処理 : IF(原価 <= 0, 原価, IF ( 税="課税", (単価*数量) * (1 + (税率/100)), (単価*数量)))
    const tentative = newUnitPrice * +quantity;

    const newPrice = +(costPrice) <= 0 ? costPrice
      : (tax === '課税') ?
        tentative * (1 + +(taxRate) / 100) : tentative;
    // 金額を四捨五入で表示(切り捨ての場合はMath.ceil(数値)、切り捨ての場合はMath.floor(数値))
    setFieldValue(`items[${rowIdx}].price`, Math.round(newPrice).toLocaleString());

  }, [costPrice, quantity, elemProfRate, tax]);
  return (<TableRow key={rowIdx}>
    {(Object.keys(row) as TKMaterials[]).map((rowitem) => {
      return (
        <TableCell
          key={`${rowitem}_header`}
          sx={{
            padding: 1,
            verticalAlign: 'top',
          }}
        >
          <InputCellContent fieldName={rowitem} rowIdx={rowIdx} />
        </TableCell>
      );
    })}
    <TableCell key={`${row}_delBtn`}>
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