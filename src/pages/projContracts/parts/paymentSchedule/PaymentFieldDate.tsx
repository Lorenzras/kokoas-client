import { TextField } from '@mui/material';
import { useField } from 'formik';
import { JADatePicker } from '../../../../components/ui/datetimepickers/JADatePicker';
import { getPayFieldNameByIdx } from '../../form';

export const PaymentFieldDate = ({
  disabled,
  idx,
} : {
  disabled: boolean,
  idx: number
}) => {
  const [field, meta, helpers] = useField(getPayFieldNameByIdx('payDate', idx));
  const { value, name } = field;
  const { error, touched } = meta;
  const { setValue, setTouched } = helpers;

  const isShowError = touched && !!error;

  return (
    <JADatePicker
      disabled={disabled}
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
      InputProps={{
        label: 'hello',
      }}
      renderInput={(params) =>(
        <TextField
          {...params}
          name={name}
          onBlur={() => setTouched(true, true)}
          variant={'standard'}
          error={isShowError}
          helperText={isShowError ? error : ''}
        />)}
    />
  );
};