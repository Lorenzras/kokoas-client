import { InputAdornment, TextField, TextFieldProps, Tooltip } from '@mui/material';
import { useField } from 'formik';
import { numerals } from 'jp-numerals';
import {  getPayFieldNameByIdx } from '../../form';
import { ChangeEvent, ComponentProps, useMemo, useState } from 'react';
import { useLazyEffect } from '../../../../hooks';
import { debounce } from 'lodash';


export const PaymentFieldAmt = (
  {
    disabled,
    idx,
  } : {
    disabled: boolean
    idx: number,
  },
) => {
  const [field, meta, helpers] = useField(getPayFieldNameByIdx('amount', idx));
  
  const { value, onChange } = field;
  const { touched, error } = meta;
  const [inputVal, setInputVal] = useState<string | null>(null);

  const changeHandlerInput: TextFieldProps['onChange'] = 
    useMemo(
      () => debounce(
        (el) => { 
          onChange(el);
          setInputVal(null);
        }, 1000), 
      [onChange],
    );




  const isShowError  = touched && !!error;
  const jaValue = numerals(+value || 0).toString();

  return (
    <Tooltip title={!error ? jaValue : ''}>
      <TextField
        {...field}
        value={inputVal === null ? value : inputVal}
        onInput={(el) => {
          if (!touched) helpers.setTouched(true);
          setInputVal((el as ChangeEvent<HTMLInputElement>).target.value);
        }}
        onChange={changeHandlerInput}
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