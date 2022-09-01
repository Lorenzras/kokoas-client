import { debounce, FormControl, FormHelperText, Input } from '@mui/material';
import { useField } from 'formik';

export const FormikInput = (
  { name, type = 'string' }:
  {
    name: string,
    type?: 'string' | 'number'
  },
) => {
  const [field, meta, helpers] = useField(name);
  const { error, touched } = meta;
  const changeHandlerInput
  : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    = debounce((el) => {      
      const newVal = type === 'number' ? +el.target.value : el.target.value;
      helpers.setValue(newVal, true);
    }, 2000);

  return (
    <FormControl variant="standard">
      <Input {...field} error={!!error && touched} onChange={changeHandlerInput} value={undefined} />
      {(!!error && touched) &&
        <FormHelperText error={!!error && touched}>
          {error}
        </FormHelperText>}
    </FormControl>
  );
};