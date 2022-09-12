import { Formik } from 'formik';
import { useSnackBar } from '../../hooks';
import { initialValues, validationSchema } from './form';
import FormProjEstimate from './FormProjEstimate';


export const FormikProjEstimate = () => {
  const { setSnackState } = useSnackBar();

  return (
    <Formik
      initialValues={initialValues}
      initialStatus={((s: TFormStatus)=>s)('busy')}
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        /* kintoneに保存する処理を追加する */

        setTimeout(()=>{
          setSnackState({
            open: true,
            message: '保存しました。',
          });
          setSubmitting(false);
        }, 1500);

      }}
    >

      <FormProjEstimate />
    </Formik>
  );
};