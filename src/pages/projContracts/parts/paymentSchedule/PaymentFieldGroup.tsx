import {  Checkbox, FormControlLabel, Stack } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { produce } from 'immer';
import { ComponentProps } from 'react';
import { getPayFieldNameByIdx, TPaymentLabels, TypeOfForm } from '../../form';
import { PaymentFieldAmt } from './PaymentFieldAmt';
import { PaymentFieldDate } from './PaymentFieldDate';

export const PaymentFieldGroup = (
  {
    label,
    idx,
  } : {
    label: TPaymentLabels,
    idx: number
  },

) => {
  const { setValues, values } = useFormikContext<TypeOfForm>();
  const [chkField, , helpers] = useField(getPayFieldNameByIdx('checked', idx));
  const { remainingAmt } = values;
  const { value: chkValue } = chkField;
  const { setTouched } = helpers;

  const handleChange: ComponentProps<typeof Checkbox>['onChange'] = (_, checked) => {

    setValues((prev) =>  {
      const newState = produce(prev, ({ paymentFields: pF }) => {
        pF[idx].amount = checked ? remainingAmt || 0 : 0;
        pF[idx].checked = checked;
      });
      return newState;
    });
    setTouched(true);

  };

  return (
    <Stack direction={'row'} spacing={1}>
      <FormControlLabel
        label={label}
        control={(
          <Checkbox
            onChange={handleChange}
            checked={!!chkValue}
            sx={{
              transform: 'scale(1.5)',
            }}
          />)}
      />
      <PaymentFieldAmt
        disabled={!chkValue}
        idx={idx}
      />
      <PaymentFieldDate idx={idx} disabled={!chkValue} />
    </Stack>
  );
};