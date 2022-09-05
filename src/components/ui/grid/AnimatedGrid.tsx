import { Grid, Grow } from '@mui/material';
import { ComponentProps } from 'react';

interface IAnimatedGrid extends ComponentProps<typeof Grid> {
  isIn: boolean
}

export const AnimatedGrid = (props: IAnimatedGrid ) => {
  const { isIn, ...gridProps } = props;
  console.log(isIn);

  return (
    <Grow timeout={800} in={isIn} mountOnEnter unmountOnExit>
      <Grid {...gridProps} />
    </Grow>

  );

};