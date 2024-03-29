
import { PageTitle } from '../../../components/ui/labels';
import {   useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Customers } from './parts/Customers/Customers';
import { Agents } from './parts/Agents';
import { FabSave } from '../../../components/ui/fabs/FabSave';
import {  Grid } from '@mui/material';
import { MemoColumn } from './parts/Memo/MemoColumn';
import { CustomerForm } from './form';
import { CustGroupShortcuts } from  './parts/CustGroupShortcuts';
import { useSnackBar } from '../../../hooks';
import { CustomerStatus } from './parts/CustomerStatus';
import { RelatedProjects } from './parts/Related/RelatedProjects';
import { FormContainer } from './FormContainer';


export const FormIndividualCustomer  = () => {
  const { setSnackState } = useSnackBar();
  const {
    isValid,
    isSubmitting,
    touched,
    submitForm,
    submitCount,
    values : {
      id: custGroupId,
      isDeleted,
    },
  } = useFormikContext<CustomerForm>();

  const isEditMode = !!custGroupId;

  useEffect(()=>{
    if (!isValid && !isSubmitting) {
      setSnackState({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }

  }, [isSubmitting]);


  const isDeletedStatus = Boolean(+isDeleted) || (touched.isDeleted && !submitCount);

  return (

    <FormContainer>

      <PageTitle label="顧客登録（個人）" />

      <Grid container item xs={12}
        md={12} lg={12} xl={9}
        spacing={2} alignItems="flex-start" justifyContent={'flex-start'}
      >
        {isDeletedStatus && <CustomerStatus />}

        <Grid className='fieldarray' container item
          xs={12} md={8} lg={5}
          spacing={2}
        >
          <Customers />
        </Grid>

        <Grid container item xs={12}
          md={4} lg={6} spacing={4}
          justifyContent="center"
        >
          <Agents />
          {isEditMode && <MemoColumn />}
        </Grid>

        <Grid container item xs={12}
          spacing={2}
        >
          {isEditMode && <RelatedProjects />}

        </Grid>

      </Grid>

      <FabSave onClick={submitForm} url="custgroup" appear={!+isDeleted} />
      {
          isEditMode && !isDeletedStatus &&  <CustGroupShortcuts custGroupId={custGroupId} />
        }



    </FormContainer>

  );
};