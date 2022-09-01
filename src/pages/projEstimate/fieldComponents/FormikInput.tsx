import { FormControl, FormHelperText, Input } from '@mui/material';
import { useField } from 'formik';
import { useState } from 'react';
import { useLazyEffect } from '../../../hooks';

export const FormikInput = (
  { name }:
  { name: string },
) => {
  const [field, meta, helpers] = useField(name);
  const [value, setValue] = useState<string>(field.value ?? '');
  const { error, touched } = meta;

  const changeHandlerInput : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
   = (el) => {

     setValue(el.target.value);
   };

  useLazyEffect(()=>{

    helpers.setValue(value);

  }, [value], 1000);


  return (
    <FormControl variant="standard">
      <Input
        {...field}
        error={!!error && touched}
        onChange={changeHandlerInput}
        value={value}
        />
      {(!!error && touched) &&
      <FormHelperText error={!!error && touched}>
        {error}
      </FormHelperText>}
    </FormControl>
  );
};