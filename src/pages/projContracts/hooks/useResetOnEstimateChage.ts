import { parseISO } from 'date-fns';
import { ComponentProps, useEffect, useState } from 'react';
import { calculateEstimate } from '../../../api/others/calculateEstimate';
import { SelectProjEstimates } from '../../../components/ui/selects';
import { getParam } from '../../../helpers/url';
import { getProjDataById } from '../api/getProjDataById';
import { initialValues, TypeOfForm } from '../form';


/**
 * Wrapper hook to generate contract preview
 * in a declarative way.
 *
 * @returns {object} obj.selectedEstimate 選択された見積のレコード
 * @returns {object} obj.handleChangeEstimate 選択の変更際の関数
 */
export const useResetOnEstimateChange = () => {
  const [newInitVals, setNewInitVals] = useState<TypeOfForm>(initialValues);
  const [calculatedEstimate, setCalculatedEstimate] = useState<Awaited<ReturnType<typeof calculateEstimate>>>();
  const [selectedEstimate, setSelectedEstimate] = useState<Estimates.main.SavedData>();

  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');

  useEffect(()=>{

    setNewInitVals(prev => ({
      ...prev,
      projEstimateId: projEstimateIdFromURL ?? '',
      projId: projIdFromURL ?? '',
    }));

    if (projIdFromURL) {
      getProjDataById(projIdFromURL)
        .then(res => {
          setNewInitVals(prev => ({
            ...prev,
            ...res,
          }));
        });
    }

  }, [projIdFromURL, projEstimateIdFromURL, setNewInitVals]);


  const handleChangeSelectedEstimate : ComponentProps<typeof SelectProjEstimates>['handleChange'] = (
    selected,
    projEstimateId,
    calculated,
  ) => {
    /* Updated calculated estimates */
    setCalculatedEstimate(calculated);
    setSelectedEstimate(selected);

    const {
      envStatus,
      envDocFileKeys,
      envId,
      $revision,
      支払い: paymentSched,
      hasRefund,
      refundAmt,
      工事名称: projName,
      projId,
    } = selected ?? {};

    const newPaymentFields : TypeOfForm['paymentFields'] = paymentSched?.value.length ? paymentSched?.value?.map(({ value: {
      isPayEnabled,
      paymentAmt,
      paymentDate,
    } }) => {
      return {
        checked: Boolean(+isPayEnabled.value ?? 0),
        amount: +(paymentAmt?.value ?? 0),
        payDate: paymentDate?.value ? parseISO(paymentDate.value) : '',
      };
    }) : initialValues.paymentFields ;

    const newRemainingAmt = newPaymentFields
      .reduce((acc, { amount }) => acc - +amount, calculated?.totalAmountInclTax || 0);

    const newForm: TypeOfForm = {
      ...initialValues,
      projId: projId?.value || '',
      projName: projName?.value || '',
      projEstimateRevision: $revision?.value || '',
      projEstimateId: projEstimateId ?? '',
      envelopeId: envId?.value ?? '',
      envelopeStatus: envStatus?.value as TEnvelopeStatus ?? '',
      envDocFileKeys: envDocFileKeys?.value ?? [],
      envSelectedDoc: envDocFileKeys?.value[0]?.fileKey ?? '',

      paymentFields: newPaymentFields,
      remainingAmt: newRemainingAmt,

      hasRefund: Boolean(+(hasRefund?.value ?? 0)),
      refundAmt: +(refundAmt?.value ?? 0),
    };

    setNewInitVals(newForm);

    if (!projEstimateId) setSelectedEstimate(undefined);

  };

  return {
    handleChangeSelectedEstimate,
    newInitVals,
    calculatedEstimate,
    selectedEstimate,
  };
};