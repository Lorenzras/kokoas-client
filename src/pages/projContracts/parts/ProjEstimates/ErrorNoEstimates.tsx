import { Alert, AlertTitle, Button } from '@mui/material';
import { useConfirmDialog } from '../../../../hooks';

export const ErrorNoEstimates = () => {
  const { setDialogState } = useConfirmDialog();

  return (
    <Alert
      severity='info'
      action={
        <Button
          onClick={() => {
            setDialogState({
              open: true,
              title: 'お詫び',
              content: '見積もり画面はまだ作成中です。少々お待ちください',
              withNo: false,
            });
          }}
          size='large'
          color="inherit"
          variant="outlined"
        >
          見積登録
        </Button>
          }
    >
      <AlertTitle>
        見積は未ありません。
      </AlertTitle>
      契約を作成するのに、見積もりが必要です。右のボタンで新規登録出来ます。
    </Alert>
  );
};