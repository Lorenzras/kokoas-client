import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useRef } from 'react';
import { TypeOfForm } from '../../form';
import { FilterDialogContent } from './FilterDialogContent';

export const FilterDialog = (props: {
  open: boolean,
  onClose: () => void,
}) => {
  const { submitForm, values, resetForm, setValues } = useFormikContext<TypeOfForm>();
  const currentFormValue = useRef<TypeOfForm>(values);
  const { open, onClose } = props;

  useEffect(()=>{
    if (open) {
      currentFormValue.current = values;
    }

  }, [open]);

  const handleClear = () => {
    resetForm();
    onClose();
  };

  const handleFilter = () => {
    submitForm();
    onClose();
  };

  const handleClose = () => {
    setValues(currentFormValue.current);
    onClose();
  };

  return (
    <Dialog
      open={open}

      onClose={handleClose}
      maxWidth={'sm'}
      fullWidth
    >
      <DialogTitle>絞り込む</DialogTitle>
      <DialogContent dividers >
        <FilterDialogContent />
      </DialogContent>

      <DialogActions>
        <Button
          onClick={handleClear}
          variant={'outlined'}
        >
          解除
        </Button>
        <Button
          onClick={handleFilter}
          variant={'contained'}
        >
          絞り込む
        </Button>
      </DialogActions>
    </Dialog>
  );
};