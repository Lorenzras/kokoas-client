
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';
import { ConstructionInfo } from './sections/ConstructionInfo';
import { ConstructionLocation, CustInfo, StatusControls } from './sections';
import { Grid } from '@mui/material';
import {  Form, useFormikContext } from 'formik';
import { useEffect } from 'react';
import { FabSave } from '../../components/ui/fabs/FabSave';
import { ScrollToFieldError } from '../../components/utils/ScrollToFieldError';
import { GetEmployeesParams } from '../../api/kintone/employees/GET';
import { TypeOfProjForm, getFieldName } from './form';
import { useSnackBar } from '../../hooks';
import { ProjectShortCuts } from './parts/ProjectShortCuts';
import { getFormDataById } from './api/getFormDataById';
import { UneditableInfo } from '../../components/ui/information/UneditableInfo';
import { getParam } from '../../helpers/url';


export const FormConstruction  = () => {
  const { setSnackState } = useSnackBar();

  const {
    status,
    isValid,
    isSubmitting,
    setValues,
    setStatus,
    submitForm,
    setFieldValue,
    values : {
      recordId,
      storeId,
      territory,
      constructionTypeId,
      envelopeStatus,
    },
  } = useFormikContext<TypeOfProjForm>();
  let passedGroupId = getParam('custGroupId');
  const projIdFromURL = getParam('projId') ?? undefined;

  const isEditMode = window.location.href.includes('edit');
  const isAbleToSave = (status as TFormStatus) === '';
  const isFormDisabled = (status as TFormStatus) === 'disabled';

  useEffect(()=>{
    console.log(status);
    if (!!!status && passedGroupId && !isEditMode) {
      console.log('Update ', recordId, !!recordId, isEditMode);
      setFieldValue(getFieldName('custGroupId'), passedGroupId);
    }
  }, [passedGroupId, isEditMode, status]);

  useEffect(()=>{
    if (!isValid && !isSubmitting) {
      setSnackState({ open: true, message: '入力内容をご確認ください。', severity: 'error' });
    }
  }, [isSubmitting]);


  useEffect(()=>{

    if (projIdFromURL) {
      setStatus(((s: TFormStatus) => s )('busy'));
      getFormDataById(projIdFromURL)
        .then((resp) => {
          setValues(resp);
          setStatus(((s: TFormStatus) => s )(resp.envelopeStatus === '' ? '' : 'disabled'));
        }).catch((e)=>{
          setStatus('');
          setSnackState({ open: true, message: `エラーが発生しました。 管理者にご連絡ください。${e.message}`, severity: 'error' });
        });
    } else {
      setStatus('');
    }
  }, [projIdFromURL]);



  return (

    <Form noValidate>
      <ScrollToFieldError/>

      <MainContainer>
        <PageTitle label="工事情報登録" color="#60498C" textColor='#FFF' />
        <Grid container item xl={8} spacing={2} mb={12}>
          <UneditableInfo isVisible={isFormDisabled} projId={recordId}/>
          <CustInfo />
          <ConstructionLocation/>
          <ConstructionInfo
            storeId={storeId}
            territory={territory as GetEmployeesParams['territory']}
            constructionTypeId={constructionTypeId}
            />


          {isEditMode && !envelopeStatus && <StatusControls />}
        </Grid>
        {isAbleToSave && <FabSave onClick={submitForm} url="project"/>}
      </MainContainer>

      {isEditMode && <ProjectShortCuts />}

    </Form>

  );
};