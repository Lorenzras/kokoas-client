import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';

export const saveForm = async (form: TypeOfForm) => {

  const {
    invoiceId,
    amountType,
    billingAmount,
    plannedPaymentDate,
    projId,
    estimates,
  } = form;

  /* formをkintoneの型に変換する */
  const record: Partial<Invoice.SavedData> = {
    amountType: { value: amountType },
    billingAmount: { value: billingAmount },
    plannedPaymentDate: { value: plannedPaymentDate },
    projId: { value: projId },
    estimateLists: {
      type: 'SUBTABLE',
      value: estimates.map(({ estimateId }) => {
        return {
          id: '',
          value: {
            estimateId: { value: estimateId },
          },
        };
      }),
    },
  };


  if (invoiceId) {
    const result = await KintoneRecord.updateRecord({
      app: APPIDS.paymentInvoice,
      id: invoiceId,
      record,
    });

    return {
      ...result,
      id: invoiceId,
    };
  } else {
    return KintoneRecord.addRecord({
      app: APPIDS.paymentInvoice,
      record,
    });
  }

};