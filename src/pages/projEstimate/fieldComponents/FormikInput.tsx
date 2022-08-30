import { debounce, FormControl, FormHelperText, Input } from '@mui/material';
import { useField } from 'formik';

export const FormikInput = (
  { name }:
  { name: string },
) => {
  const [field, meta, helpers] = useField(name);
  const { error, touched } = meta;
  const changeHandlerInput
  : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
   = debounce((el) => {
     console.log('2s after chk', el.target.value);

     helpers.setValue(el.target.value, true);
   }, 2000);

  return (
    <FormControl variant="standard">
      <Input {...field} error={!!error && touched} onChange={changeHandlerInput} />
      {(!!error && touched) &&
      <FormHelperText error={!!error && touched}>
        {error}
      </FormHelperText>}
    </FormControl>
  );
};