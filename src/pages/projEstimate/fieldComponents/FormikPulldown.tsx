import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';

export const FormikPulldown = (
  { name, options, handleChange } :
  {
    name: string,
    options: Options
    handleChange?: (newVal?: string)=>void
  },
) => {
  const [field, meta] = useField(name);
  const { touched, error } = meta;

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size='small'>
      <Select {...field} onChange={(event)=>{

        if (handleChange) handleChange(event.target.value);
        field.onChange(event);
      }}>
        <MenuItem value="">
          <em>-</em>
        </MenuItem>
        {options.map(({ label, value }) => {
          return (<MenuItem value={value} key={value}>{label}</MenuItem>);
        })
          }
      </Select>
      {(!!error && touched) &&
      <FormHelperText error={!!error && touched}>
        {error}
      </FormHelperText>}
    </FormControl>
  );
};