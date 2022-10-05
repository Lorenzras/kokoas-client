import { InputAdornment, TextField } from '@mui/material';
import { useField } from 'formik';

export const ProjScheduleDays = ({
  fieldName,
} : {
  fieldName: string,
}) => {

  const [field, meta] = useField(fieldName);
  const { value } = field;
  const { touched, error } = meta;

  const isShowError  = touched && !!error;


  return (
    <TextField
      {...field}
      value={value || ''}
      variant={'standard'}
      margin="normal"
      inputProps={{
        sx: {
          textAlign: 'right',
        },
      }}
      error={touched && !!error}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            契約の日から
          </InputAdornment>),
        endAdornment: (
          <InputAdornment position="end">
            日以内
          </InputAdornment>),
      }}
      FormHelperTextProps={{
        sx: {
          textAlign: 'right',
        },
      }}
      helperText={isShowError ? error : ' '}
    />
  );
};