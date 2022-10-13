import { Button, ListItemIcon, ListItemText, MenuItem, TextField } from '@mui/material';
import { useConfirmDialog, useSnackBar } from '../../../../../hooks';
import { CustomDialogContent } from '../../../../../components/ui/dialogs/CustomDialogContent';
import { Box } from '@mui/system';
import { useRef } from 'react';
import { useBackdrop } from '../../../../../hooks/useBackdrop';
import { voidContract } from '../../../api/docusign/voidContract';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../../form';
import BlockIcon from '@mui/icons-material/Block';

const ReasonForm = ({
  handleSetReason,
}: {
  handleSetReason: (reason: string) => void
}) => {

  return (
    <Box pt={2}>
      <TextField
        label={'理由'}
        onChange={(event) => {
          handleSetReason(event.target.value);
        }}
        helperText="すでにエンベロープへの署名を完了した受信者には、エンベロープが無効になったことを示すメールが送信されます。"
        multiline fullWidth required
      />
    </Box>
  );
};


export const MenuVoidContract = (
  props: {
    handleClose: () => void
  },
) => {
  const {
    values,
    setValues,
  } = useFormikContext<TypeOfForm>();
  const { envelopeId } = values;
  const {
    setDialogState,
    handleClose: handleCloseDialog,
  } = useConfirmDialog();

  const { setBackdropState } = useBackdrop();
  const { setSnackState } = useSnackBar();

  const reasonRef = useRef('');
  const { handleClose } = props;


  const handleSubmitVoidReason = async () => {
    handleCloseDialog();
    try {

      setBackdropState({
        open: true,
      });

      await voidContract({
        envelopeId,
        voidedReason: reasonRef.current,
      });

      setSnackState({
        open: true,
        severity: 'success',
        message: `無効になりました。エンベロープ番号: ${envelopeId}`,
      });

      setValues({
        ...values,
        envDocFileKeys: [],
        envelopeId: '',
        envelopeStatus: '',
      });

    } catch (err) {

      setSnackState({
        open: true,
        severity: 'error',
        autoHideDuration: 10000,
        message: `エラーが発生しました。${err.message}`,
      });

    }

    setBackdropState({
      open: false,
    });

  };

  const handleCaptureVoidReason = () => {
    setDialogState({
      title: '無効にする理由を入力してください。',
      willCloseOnYes: false,
      yesText: '無効にする',
      noText: 'キャンセル',
      handleYes: handleSubmitVoidReason,
      content: <ReasonForm
        handleSetReason={(r)=> {
          reasonRef.current = r;
        }}
               />,
    });
  };


  const handleVoidContract = () => {
    setDialogState({
      title: 'エンベロープを無効にしますか。',
      cancellable: true,
      willCloseOnYes: false,
      handleYes: handleCaptureVoidReason,
      content: <CustomDialogContent
        severity='warning'
        message={
          <>
            エンベロープを無効にすると、受信者はそのエンベロープを表示したり署名したりできなくなります。
            <Button fullWidth target="_blank" href='https://support.docusign.com/s/articles/How-do-I-void-or-cancel-an-envelope?language=ja&rsc_301'>
              無効化についてもっと知りたい
            </Button>
          </>
        }
               />,

    });
    handleClose();
  };

  return (
    <MenuItem onClick={handleVoidContract}>
      <ListItemIcon>
        <BlockIcon color='error' />
      </ListItemIcon>
      <ListItemText>
        無効化する
      </ListItemText>
    </MenuItem>
  );
};