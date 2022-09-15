import { Grid } from '@mui/material';

export const MainContainer = (props: {
  children: React.ReactNode
}) => {
  const { children } = props;
  return (
    <Grid container spacing={2} alignItems="flex-start"
      justifyContent="flex-start" mb={12}
    >
      {children}
    </Grid>
  );
};

export default MainContainer;


