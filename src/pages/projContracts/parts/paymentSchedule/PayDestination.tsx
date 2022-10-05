import { TextField } from '@mui/material';
import { useField } from 'formik';
import { getFieldName } from '../../form';

export const PayDestination = ({
  disabled,
} : {
  disabled: boolean
}) => {

  const [field, meta] = useField(getFieldName('payDestination'));

  const { error, touched } = meta;

  return (
    <TextField
      {...field}
      disabled={disabled}
      label={'振込先'}
      variant={'standard'}
      placeholder={'○○銀行'}
      InputLabelProps={{
        shrink: true,
      }}
      error={touched && !!error}
      helperText={touched && !!error ? error : ' '}
    />
  );
};