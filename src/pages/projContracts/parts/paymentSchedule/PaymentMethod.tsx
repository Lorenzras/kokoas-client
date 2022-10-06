import { FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useField } from 'formik';
import { getFieldName, payMethods, TypeOfForm } from '../../form';
import { PayDestination } from './PayDestination';

export const PaymentMethod = () => {
  const [field, meta] = useField<TypeOfForm['payMethod']>(getFieldName('payMethod'));
  const { error, touched } = meta;
  const { value } = field;
  const isShowError = touched && !!error;

  return (

    <FormControl error={isShowError}>
      <FormLabel>
        {'支払い方法'}
      </FormLabel>
      {
        isShowError &&
        <FormHelperText>
          {error}
        </FormHelperText>
      }
      <RadioGroup
        {...field}
        row
      >
        {payMethods.map(pM => (
          <FormControlLabel
            key={pM}
            value={pM}
            control={<Radio />}
            label={pM}
          />
        ))}
        <PayDestination disabled={value !== '振込'} />
      </RadioGroup>


    </FormControl>

  );
};