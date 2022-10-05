import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { useState } from 'react';
import { ContractDialog } from './Preview/ContractDialog';
import { isEmpty } from 'lodash';
import { useSnackBar } from '../../../hooks';

export const ContractFormActions = () => {
  const [openPreview, setOpenPreview] = useState(false);
  const { setSnackState } = useSnackBar();
  const {
    submitForm,
    isSubmitting,
    isValidating,
    isValid,
    dirty,
    errors,
  } = useFormikContext<TypeOfForm>();

  const handleSubmit = async (submitMethod: TypeOfForm['submitMethod']) => {

    if (dirty) {
      await submitForm();
    } else if (submitMethod === 'normal') {
      setSnackState({
        open: true,
        severity: 'info',
        message: 'フォームに変更がありません。',
      });
    }

    if (submitMethod === 'contract' && isEmpty(errors)) {
      setOpenPreview(true);
    }

  };


  const isOpenDialog = openPreview && isValid;

  return (
    <Stack>
      <Stack
        direction="row"
        justifyContent={'center'}
        spacing={2}
        pt={2}
      >
        <Button
          variant="outlined"
          size="large"
          startIcon={<SaveIcon />}
          onClick={() => handleSubmit('normal')}
          disabled={isSubmitting || isValidating}
        >
          保存
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<PreviewIcon />}
          onClick={() => handleSubmit('contract')}
          disabled={isSubmitting || isValidating}
        >
          プレビュー
        </Button>
      </Stack>
      <ContractDialog
        open={isOpenDialog}
        handleClose={()=>setOpenPreview(false)}
      />
    </Stack>
  );
};