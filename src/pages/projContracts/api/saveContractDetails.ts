import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { toKintoneDateStr } from '../../../lib/date';
import { paymentLabels, TypeOfForm } from '../form';

const convertToKintone = (
  {
    paymentFields,
    hasRefund,
    refundAmt,
    projEstimateRevision,
    startDate,
    startDaysAfterContract,
    finishDate,
    finishDaysAfterContract,
    completeDate,
    payMethod,
    payDestination,
  }: TypeOfForm,
) => {



  const convertedPaymentFields : Estimates.main.SavedData['支払い']  = {
    type: 'SUBTABLE',
    value: paymentFields.map((
      {
        amount, checked, payDate,
      },
      idx,
    ) => {

      return {
        id: '',
        value: {
          isPayEnabled: { value: (+checked).toString() },
          paymentAmt: { value: amount.toString() },
          paymentType:{ value: paymentLabels[idx] },
          paymentDate: { value: toKintoneDateStr(payDate) },
        },
      };
    }),
  };


  const kintoneRecord :  Partial<Estimates.main.SavedData> = {

    hasRefund: { value: (+hasRefund).toString() },
    refundAmt: { value: refundAmt.toString() },
    支払い: convertedPaymentFields,
    $revision: {
      type: '__REVISION__',
      value: projEstimateRevision,
    },

    startDate: { value: toKintoneDateStr(startDate) },
    startDaysAfterContract:{ value: startDaysAfterContract.toString() },
    finishDate:{ value: toKintoneDateStr(finishDate) },
    finishDaysAfterContract: { value: finishDaysAfterContract.toString() },
    payDestination: { value: payDestination.toString() },
    payMethod: { value: payMethod },
    completeDate: { value: toKintoneDateStr(completeDate) },

    updatedById: { value : kintone.getLoginUser().employeeNumber },
    updateDateTime: { value: toKintoneDateStr(new Date(), true) },

  };

  return kintoneRecord;
};


/**
 * Main save process
 *
 * @param {TypeofForm} form
 * @returns {Promise<{id: string, revision: string}>}
 *  */
export const saveContractDetails = async (
  form: TypeOfForm,
) => {
  const { projEstimateId } = form;

  if (!projEstimateId) throw new Error('Invalid project id.');

  const record = convertToKintone(form);

  const result = await KintoneRecord.updateRecord({
    app: APPIDS.projectEstimate,
    id: projEstimateId,
    record,
  });

  return { ...result, id: projEstimateId };
};