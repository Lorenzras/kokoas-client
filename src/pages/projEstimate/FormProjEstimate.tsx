import { Divider, Grid, Stack } from '@mui/material';
import { FieldArray, Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { PageTitle } from '../../components/ui/labels';
import { FormikTextField } from '../../components/ui/textfield';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { getFieldName, TypeOfForm } from './form';
import SummaryTable from './SummaryTable/SummaryTable';

import { RenderFunc } from './QuoteTable/RenderFunc';
import { SubTotalTable } from './SubTotalTable/SubTotalTable';
import { useUpdateProjectId } from './hooks/useUpdateProjectId';
import { NoCustomerWarning } from './fieldComponents/NoCustomerWarning';
import { FormikSearchProjField } from '../../components/ui/textfield/FormikSearchProjField';
// import { useCalculateTotals } from './hooks/useCalculateTotals';

export default function FormProjEstimate() {
  const { submitForm, values } = useFormikContext<TypeOfForm>();
  const { projName, customerName, projId } = values;

  const { isLoading } = useUpdateProjectId();

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label='見積もり登録' />

        <Grid container item xl={8}
          spacing={2} mb={12}
        >
          <Grid item xs={12} md={5}>

            {/* 工事情報の検索 */}
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
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('constructionType')} label="工事種別名" disabled />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('profitRate')} label="利益率" disabled />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('taxRate')} label="税率" />
          </Grid>
          <Grid item xs={12} md={3}>
            {/* ステータスフィールドを追加します。 */}
          </Grid>

          <Grid item xs={12} md={12}>
            {/* 合計欄テーブル */}
            <SummaryTable />
          </Grid>

          <Grid item xs={12} md={12}>
            {/* 見積もり用のテーブル */}
            <FieldArray
              name={getFieldName('items')}
              render={RenderFunc}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            {/* 大項目ごとの表示テーブル */}
            <SubTotalTable />
          </Grid>


        </Grid>
        <FabSave onClick={submitForm} />
      </MainContainer>
    </Form>
  );
}
