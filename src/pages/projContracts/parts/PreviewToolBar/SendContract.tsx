import { sendContract } from '../../api/docusign/sendContract';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useConfirmDialog, useSnackBar } from '../../../../hooks';
import { Button, Tooltip } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { useBackdrop } from '../../../../hooks/useBackdrop';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../../Router';
import { generateParams } from '../../../../helpers/url';



export const SendContract = ({
  projId,
  isBusy,
}: {
  projId: string,
  isBusy: boolean,
})=>{


  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { custGroupId } = values;
  const { setDialogState } = useConfirmDialog();
  const { setSnackState }  = useSnackBar();
  const { setBackdropState, backdropState: { open } } = useBackdrop();
  const navigate = useNavigate();


  const handleSendContract = async () => {
    try {
      setBackdropState({
        open: true,
      });

      const result = await sendContract(projId, custGroupId);

      setBackdropState({
        open: false,
      });

      setValues({
        ...values,
        envelopeId: result.envelopeId,
        envelopeStatus: result.envelopeStatus,
      });


      setSnackState({
        open: true,
        autoHideDuration: 20000,
        severity: 'success',
        message: '送信が成功しました。',
      });

    } catch (err) {

      setSnackState({
        open: true,
        autoHideDuration: 20000,
        severity: 'error',
        message: <>
          {err.message}
          <Button
            variant='contained'
            onClick={()=>navigate(`${pages.custGroupEdit}?${generateParams({
              projId,
              custGroupId,
            })}`)}
          >
            顧客
          </Button>
        </>,
      });
      setBackdropState({
        open: false,
      });

    }

  };


  const handleConfirmSend = () => {
    setDialogState({
      title: '契約を送信しますか。',
      content: '「送信済み」状態になり、ココアスで当プロジェクトの情報の修正が出来なくなります。',
      handleYes: handleSendContract,

    });
  };

  return (
    <Tooltip title="契約書を送信する" arrow>
      <div> {/* Tooltip doesn't like disabled element, so I added extra layer */}
        <LoadingButton

        disabled={!projId || isBusy}
        loading={open}
        onClick={handleConfirmSend}
        variant="contained"
        loadingPosition="center"
      >
          <SendIcon />
        </LoadingButton>
      </div>
    </Tooltip>
  );
};