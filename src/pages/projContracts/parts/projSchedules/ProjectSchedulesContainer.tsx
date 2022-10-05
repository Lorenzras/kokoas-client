import { Grid } from '@mui/material';
import { ReactNode } from 'react';

export const ProjectSchedulesContainer = ({
  children,
}: {
  children: ReactNode
}) => {
  return (
    <Grid container justifyContent={'center'}
      item
      xs={12}
    >
      {children}
    </Grid>
  );
};