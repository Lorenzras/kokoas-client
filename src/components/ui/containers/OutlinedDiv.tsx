
import { TextField } from '@mui/material';
import React from 'react';

interface OutlinedDivProps {
  children: React.ReactNode,
  label: string
  helperText?: string
  errorMessage?: string

}

const InputComponent =  React.forwardRef(
  function test(props, _ref ) {

    return <div  { ...props} />;
  },
);

export const OutlinedDiv = ({
  children,
  label,
  helperText,
  errorMessage,
} : OutlinedDivProps) => {
  return (
    <TextField
      size='small'
      
      error={!!errorMessage}
      helperText={errorMessage ?? helperText }
      margin='none'
      fullWidth
      variant="outlined"
      label={label}
      multiline
      InputLabelProps={{ shrink: true }}
      InputProps={{
        inputComponent: InputComponent,
        sx: { 'cursor': 'default' },
      }}
      inputProps={{ children: children }}
    />
  );
};
