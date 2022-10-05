import * as Yup from 'yup';
import {
  getFieldName,
  getPayFieldName,
  KeyOfForm,
  TypeOfForm,
  TypeOfPayFields } from './form';


/* Common validations */

const payAmtValidation  = Yup
  .number()
  .when(getPayFieldName('checked'), {
    is: true,
    then: Yup
      .number()
      .typeError('数値を入れてください。')
      .positive('ゼロ以上を入力してください。')
      .required('金額を入力してください。'),
  });

const payDateValidation =  Yup
  .date()
  .typeError('無効な日付です');



/* MAIN VALIDATION SCHEMA */

export const validationSchema =  Yup
  .object()
  .shape <Partial<Record<KeyOfForm, Yup.AnySchema>>>({

  refundAmt: Yup
    .number()
    .when(getFieldName('hasRefund'), {
      is: true,
      then: Yup
        .number()
        .typeError('数値を入れてください。')
        .positive('ゼロ以上を入力してください。')
        .required('返金予定金額を入力してください。'),
    }),

  paymentFields: Yup.array().of(
    Yup
      .object()
      .shape<Partial<Record<keyof TypeOfPayFields, Yup.AnySchema>>>({
      amount: payAmtValidation,
      payDate: Yup
        .date()
        .when(getPayFieldName('checked'), {
          is: true,
          then: payDateValidation
            .notRequired(),
        }),
    }),
  ),

  remainingAmt: Yup
    .number()
    .typeError('数字ではないものが入っています。確認してください。')
    .equals([0], '契約合計と請求額が相違しています。'),

  payMethod: Yup.string().required('選択してください。'),

  payDestination : Yup
    .string()
    .when(getFieldName('payMethod'), {
      is: (payMethod: TypeOfForm['payMethod']) => payMethod === '振込',
      then: Yup.string(),
    }),
});