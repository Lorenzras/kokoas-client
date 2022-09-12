import { Stack } from '@mui/material';
import { FormikSearchProjField } from '../../../components/ui/textfield/FormikSearchProjField';
import { getFieldName } from '../form';
import { NoCustomerWarning } from './NoCustomerWarning';

export const SearchProject = ({
  projName, isLoading, projId, customerName,
}: {
  projName: string,
  isLoading: boolean,
  customerName: string,
  projId: string,
}) => {
  return (
    <Stack spacing={1}>
      <FormikSearchProjField
        label='工事情報の検索'
        name={getFieldName('projId')}
        projName={projName}
        isLoading={isLoading}
        disabled={isLoading}
      />
      {!!projId && !customerName &&
      <NoCustomerWarning projId={projId} />}
    </Stack>
  );
};