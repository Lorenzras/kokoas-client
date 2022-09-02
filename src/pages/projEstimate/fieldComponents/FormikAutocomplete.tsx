import { debounce, FormControl, FormHelperText, TextField } from '@mui/material';
import { useField } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';

export const FormikAutocomplete = (
  { name, options, handleChange }:
  {
    name: string,
    options: Options
    handleChange?: (newVal?: string) => void
  },
) => {
  const [field, meta, helpers] = useField(name);
  const { touched, error } = meta;

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size='small'>
      <Autocomplete {...field}
        freeSolo
        options={options.map(({ value }) => value)}
        renderInput={(params) =>
          <TextField {...params}
            type="search"
            variant="standard"
          />
        }
        onInputChange={
          debounce((event, value) => {
            if (handleChange) handleChange(value);
            helpers.setValue(value);
          }, 1000)
        }
      />
      {(!!error && touched) &&
        <FormHelperText error={!!error && touched}>
          {error}
        </FormHelperText>}
    </FormControl>
  );
};