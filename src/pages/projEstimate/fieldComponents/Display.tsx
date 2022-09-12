import { Typography } from '@mui/material';
import { useField } from 'formik';


export const Display = ({
  name, suffix,
}: {
  name: string,
  suffix?: string
}) => {
  const [field] = useField(name);

  return (
    <Typography variant='body2'>
      {field.value}
      {suffix}
    </Typography>
  );
};