import { Alert, Button, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';

export const NoCustomerWarning = (
  { projId }:
  { projId: string },
) => {
  const navigate = useNavigate();
  return (
    <Alert
      severity='warning'
      action={
        <Tooltip title={'工事内容を編集する'}>
          <Button
            color="inherit"
            size="small"
            onClick={()=>navigate(`${pages.projEdit}?projId=${projId}`)}
          >
            <EditIcon />
          </Button>
        </Tooltip>
    }
    >
      選択した工事に顧客が設定されていません。
    </Alert>
  );
};