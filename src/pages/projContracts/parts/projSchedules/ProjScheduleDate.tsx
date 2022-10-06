import { TextField } from '@mui/material';
import { useField } from 'formik';
import { ComponentProps } from 'react';
import { JADatePicker } from '../../../../components/ui/datetimepickers/JADatePicker';
import { KeyOfForm } from '../../form';


export const ProjScheduleDate = ({
  fieldName,
  variant = 'standard',
  label,
} : {
  fieldName: KeyOfForm,
  variant?: ComponentProps<typeof TextField>['variant'],
  label?: string
}) => {
  const [field, meta, helpers] = useField(fieldName);
  const { value, name } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  const isShowError = touched && !!error;

  return (
    <JADatePicker
      /* Need to use null as empty string wont work when clearing the field.
      This is different with other fields where they
      become uncontrolled component when value becomes null. ~ ras 2022.10.03 */
      value={value || null}
      disablePast
      views={['year', 'month', 'day' ]}
      onChange={(v)=>{
        setValue(v ?? '', true);
        setTouched(true);
      }}
      renderInput={(params) =>(
        <TextField
          {...params}
          name={name}
          label={label}
          onBlur={() => {
            setTouched(true);
          }}
          variant={variant}
          error={isShowError}
          helperText={isShowError ? error : ' '}
        />)}
    />
  );
};