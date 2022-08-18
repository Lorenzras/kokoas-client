import { Button, Divider, FormControl, Grid, Input } from '@mui/material';
import { FieldArray, Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { PageTitle } from '../../components/ui/labels';
import { FormikTextField } from '../../components/ui/textfield';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { buzaiListInit } from './constantDefinition';
import { getFieldName, TypeOfForm } from './form';
import QuoteTable from './Tables/QuoteTable';

const renderFunc = (arrayHelpers) => {
  const { form } = arrayHelpers;
  const { values } = form;
  console.log('arrayHelpers::main', arrayHelpers);
  console.log('renderFunc', values);

  return (
    <div>
      <div>
        <QuoteTable arrayHelpers={arrayHelpers} values={values} />
      </div>
      <Button
      variant="outlined"
      onClick={() => arrayHelpers.push(buzaiListInit)}
      sx={{
        textAlign: 'right',
      }}
    >
        追加
      </Button>
    </div>
  );
};

export default function FormProjEstimate() {
  const { values, submitForm } = useFormikContext<TypeOfForm>();

  console.log('values', values.items);

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer>
        <PageTitle label='見積もり登録' />

        <Grid container item xl={8} spacing={2} mb={12}>
          <Grid item xs={12} md={4}>



            {/* 工事情報の検索 */}
            <div>
              工事情報の検索：未対応
              <FormControl variant="standard">
                {/* <InputLabel htmlFor="component-simple">テスト</InputLabel> */}
                <Input id="component-simple" value={name}/*  onChange={handleChange} */ />
              </FormControl>
            </div>


          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('constructionType')} label="工事種別名" />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('profitRate')} label="利益率" />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormikTextField name={getFieldName('taxRate')} label="税率" />
          </Grid>
          <Grid item md={3} />


          <Grid item xs={12} md={12}>
            {/* 見積もり用のテーブル */}
            <FieldArray
              name={getFieldName('items')}
              render={renderFunc}
            />
          </Grid>


        </Grid>
        <FabSave onClick={submitForm} />
      </MainContainer>
    </Form>
  );
}