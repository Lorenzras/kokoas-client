import { Formik } from 'formik';
import { FormContract } from './FormContract';
import { validationSchema } from './formValidation';
import { useResetOnEstimateChange } from './hooks/useResetOnEstimateChage';
import { useSubmitContractInfo } from './hooks/useSubmitContractInfo';


export const FormikContract = () => {
  const { newInitVals, handleChangeSelectedEstimate, calculatedEstimate } = useResetOnEstimateChange();
  const { onSubmit } = useSubmitContractInfo();

  return (
    <Formik
      initialValues={newInitVals}
      initialStatus={'busy' as TFormStatus}
      validateOnMount
      enableReinitialize
      validationSchema={validationSchema}
      onSubmit={onSubmit}

    >
      <FormContract
        handleChangeSelectedEstimate={handleChangeSelectedEstimate}
        calculatedEstimate={calculatedEstimate}
      />
    </Formik>
  );
};