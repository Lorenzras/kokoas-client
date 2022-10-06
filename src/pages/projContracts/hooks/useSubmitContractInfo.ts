import { Formik } from 'formik';
import { ComponentProps } from 'react';
import { useBackdrop, useSnackBar } from '../../../hooks';
import { sleep } from '../../../lib/promisify';
import { saveContractDetails } from '../api/saveContractDetails';
import { TypeOfForm } from '../form';

export const useSubmitContractInfo = () => {
  const { setSnackState } = useSnackBar();
  const { setBackdropState } = useBackdrop();

  const onSubmit: ComponentProps<typeof Formik<TypeOfForm>>['onSubmit'] = async (
    values,
    {
      resetForm,
    },
  ) => {
    const { 
      submitMethod, 
    } = values;
    try {
      setBackdropState({ open: true });

      console.log('VALUES on submit', values);
  
      /* Throttle */
      if (submitMethod === 'normal') {
        await sleep(2000);
      }


      const { revision } = await saveContractDetails(values);
      setSnackState({
        open: true,
        severity:  'success',
        message: `保存が出来ました。更新番号：${revision}`,
      });
      
      resetForm({ values: {
        ...values,
        projEstimateRevision: revision,
      } });
      

      setBackdropState({ open: false });
  

    } catch (err) {
      setSnackState({
        open: true,
        severity:  'error',
        message: `エラーが発生しました。ブラウザーをリフレッシュして直良かったら、管理者にお知らせください。${err.message}。`,
      });
      setBackdropState({ open: false });
    }

  };


  return {
    onSubmit,
  };
};