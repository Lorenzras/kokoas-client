

const initPayFields = {
  checked: false,
  amount: 0,
  payDate: '' as Date | '',
};
export type TypeOfPayFields = typeof initPayFields;

export const initialValues = {
  /* Form management */
  submitMethod: 'normal' as 'normal' | 'contract',

  /* 工事 */
  projId: '',
  projEstimateId: '',
  projName: '',
  projAddress: '',

  /* 顧客 */
  custGroupId: '',
  custName: '',
  custAddress: '',

  /* 担当 */
  store: '',
  cocoAg: '',
  yumeAg: '',
  constAg: '',

  /* 見積も契約 */
  envelopeId: '',
  envelopeStatus: '' as TEnvelopeStatus,
  envDocFileKeys: [] as kintone.fieldTypes.File['value'],
  envSelectedDoc: '',
  projEstimateRevision: '',

  signMethod: '' as TSignMethod,

  /* 支払い予定 */
  paymentFields: Array<TypeOfPayFields>(4)
    .fill(initPayFields),
  remainingAmt: 0,
  hasRefund: false,
  refundAmt: '' as number | '',

};

export const paymentLabels = ['契約金', '着手金', '中間金', '最終金'] as const;


export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;
export type TPaymentLabels = typeof paymentLabels[number];

/* Utility functions */

export const getFieldName = (s: KeyOfForm) => s;
export const getPayFieldNameByIdx = (
  field: keyof TypeOfPayFields,
  idx: number,
) => {
  return `${getFieldName('paymentFields')}[${idx}].${field}`;
};
export const getPayFieldName = (k: keyof TypeOfPayFields) => k;
