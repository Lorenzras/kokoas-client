import { Divider, Grid } from '@mui/material';
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
import { SearchProject } from './fieldComponents/SearchProject';


export default function FormProjEstimate() {
  const { submitForm, values } = useFormikContext<TypeOfForm>();
  const { projName, customerName, projId } = values;

  const { isLoading } = useUpdateProjectId();

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label='見積もり登録' />

        <Grid item xs={12} md={5}>

          {/* 工事情報の検索 */}
          <SearchProject {...{ customerName, projId, isLoading, projName }} />
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
        <Grid item md={3} />

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



        <FabSave onClick={submitForm} />
      </MainContainer>
    </Form>
  );
}
