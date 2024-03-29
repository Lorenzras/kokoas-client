import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageSubTitle, PageTitle } from '../../components/ui/labels';
import { ContractPageShortcuts } from './parts/ContractPageShortcuts';
import { getFieldName, TypeOfForm } from './form';
import {  Grid } from '@mui/material';
import { SearchProjField } from './parts/SearchProjField';
import { ContractInfo } from './parts/contractInfo/ContractInfo';
import { EmptyBox } from '../../components/ui/information/EmptyBox';
import { SelectProjEstimates } from '../../components/ui/selects';
import { PaymentSchedule } from './parts/paymentSchedule/PaymentSchedule';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { ContractFormActions } from './parts/ContractFormActions';
import { ProjectSchedules } from './parts/projSchedules/ProjectSchedules';

import { useHandleProjEstimate } from './hooks';
import { useHandleProjId } from './hooks/useHandleProjId';
import { useResolveParams } from './hooks/useResolveParams';



export const FormContract = () => {
  const { values } = useFormikContext<TypeOfForm>();
  const { projEstimateId, projId, projName } = values;

  useResolveParams();
  useHandleProjId();

  const {
    calculatedEstimate,
  } = useHandleProjEstimate();

  const { totalAmountInclTax } = calculatedEstimate ?? {};

  /* 本当に小数点切り捨ていいか、要確認 */
  const roundedTotalAmt = Math.round(totalAmountInclTax ?? 0);

  return (
    <Form noValidate>
      <ScrollToFieldError />
      <MainContainer justifyContent={'space-between'}>
        <PageTitle label='契約' />

        <Grid item xs={12} md={4} >
          <SearchProjField
            projId={projId}
            projName={projName}
          />
        </Grid>


        {/* 見積もり選択フィールド
          Reload field and its options after every submit.
        */}

        <Grid item xs={12} md={8}
          lg={6}
        >
          <SelectProjEstimates
            projId={projId}
            name={getFieldName('projEstimateId')}
          />
        </Grid>


        {!!projEstimateId && (
          <>
            {/* 支払い予定入力 */}
            <PageSubTitle label='支払い予定' />
            <PaymentSchedule totalAmount={roundedTotalAmt} />

            {/* 工期 */}
            <PageSubTitle label={'工期'} />
            <ProjectSchedules />
          </>
        )}

        {/* 契約内容 */}
        <ContractInfo />

        {!!projEstimateId && (
          <Grid item xs={12} justifyContent={'center'} >
            <ContractFormActions />
          </Grid>
        )}


        {!projEstimateId &&
          <Grid item xs={12}>
            <EmptyBox>
              見積を選択してください。
            </EmptyBox>
          </Grid>}

      </MainContainer>

      {!!projId &&  <ContractPageShortcuts />}


    </Form>
  );
};