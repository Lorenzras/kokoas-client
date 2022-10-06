import { Formik } from 'formik';
import { initialValues } from './form';
import { FormContract } from './FormContract';
import { validationSchema } from './formValidation';
import { useSubmitContractInfo } from './hooks/useSubmitContractInfo';


export const FormikContract = () => {

  /*   const {
    newInitVals,
    handleChangeSelectedEstimate,
    calculatedEstimate,
    handleChangeProjId,
  } = useReseOnIdsChange();
 */
  const { onSubmit } = useSubmitContractInfo();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <FormContract />
    </Formik>
  );
};