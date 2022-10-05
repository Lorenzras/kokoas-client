import { InputAdornment, TextField, Tooltip } from '@mui/material';
import { useField } from 'formik';
import { numerals } from 'jp-numerals';
import {  getPayFieldNameByIdx } from '../../form';

export const PaymentFieldAmt = (
  {
    disabled,
    idx,
  } : {
    disabled: boolean
    idx: number,
  },
) => {

  const [field, meta] = useField(getPayFieldNameByIdx('amount', idx));
  const { value } = field;
  const { touched, error } = meta;

  const isShowError  = touched && !!error;
  const jaValue = numerals(+value || 0).toString();



  return (
    <Tooltip title={!error ? jaValue : ''}>
      <TextField
        {...field}
        disabled={disabled}
        variant={'standard'}
        inputProps={{
          style: { 
            textAlign: 'right',
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              円
            </InputAdornment>),
        }}
        FormHelperTextProps={{
          sx: {
            textAlign: 'right',
          },
        }}
        error={isShowError}
        helperText={isShowError ? error : ''}
      />
    </Tooltip>
  );
};