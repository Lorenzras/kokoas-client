import { FormLabel, Stack, Typography } from '@mui/material';

export interface LabeledInfoProps {
  label: string,
  data?: string
}

export const LabeledInfo = ({ label, data = '' }: LabeledInfoProps) =>{


  return (

    <Stack direction={'column'}>
      <FormLabel  >{label} </FormLabel>
      <Typography fontSize={16} >{!!data ? data : '-'} </Typography>
    </Stack>

  );
};

export default LabeledInfo;