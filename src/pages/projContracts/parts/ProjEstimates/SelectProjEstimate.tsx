import { Alert, AlertTitle, Button } from '@mui/material';
//import { useFormikContext } from 'formik';
//import { useEffect, useState } from 'react';
import { FormikSelectAdvanced } from '../../../../components/ui/selects/FormikSelectAdvanced';
//import { getProjEstimates } from '../../api/getProjEstimates';
import { getFieldName } from '../../form';
//import { ItemEstimate } from './ItemEstimate';


export const SelectProjEstimates = ({
  options,
}: {
  options: OptionNode[]
}) => {

  const isWithOptions = !!options.length;



  return (
    <>
      {
      isWithOptions &&
        <FormikSelectAdvanced label='見積もりリスト' name={getFieldName('projEstimateId') } options={options}/>
      }

      {!isWithOptions &&
        <Alert
          severity='info'
          action={
            <Button size='large' color="inherit" variant="outlined">
              見積登録
            </Button>
          }
        >
          <AlertTitle>見積は未ありません。 </AlertTitle>
          契約を作成するのに、見積もりが必要です。右のボタンで新規登録出来ます。
        </Alert>
      }
    </>

  );
};