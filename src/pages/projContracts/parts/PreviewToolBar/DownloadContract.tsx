import LoadingButton from '@mui/lab/LoadingButton';
import { Tooltip } from '@mui/material';
import { yumecocoDocusign } from '../../../../config/settings';
import { RiFileExcel2Fill } from '@react-icons/all-files/ri/RiFileExcel2Fill';


export const DownloadContract = ({
  projId,
} : {
  projId: string
}) => {

  const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/download?projId=${projId}&fileType=xlsx`;

  return (
    <Tooltip title="契約書をダウンロードする" arrow>
      <LoadingButton
        href={endpoint}
        disabled={!projId}
        loadingPosition="center"
      >
        <RiFileExcel2Fill color='green' size={24} />
      </LoadingButton>
    </Tooltip>
  );
};