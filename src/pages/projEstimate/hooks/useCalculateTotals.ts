import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { TypeOfForm } from '../form';

export const useCalculateTotals = () => {
  const { values, setFieldValue } = useFormikContext<TypeOfForm>();

  // 原価合計の算出処理
  const costPriceFields = values.items.map(({ costPrice, quantity }) => +costPrice * +quantity);
  const totalCostPrice = costPriceFields.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // 粗利合計の算出処理
  const grossProfitFields = values.items.map(({ costPrice, quantity, elemProfRate }) => {
    return ((+costPrice * +quantity) * (+elemProfRate / 100));
  });
  const grossProfitVal = grossProfitFields.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // 利益率の算出処理
  const provVal = (grossProfitVal / totalCostPrice) * 100;
  const grossProfitMarginVal = isNaN(provVal) ? '-'
    : parseFloat(provVal.toFixed(2));

  // 税抜金額の算出処理
  const taxExcludedAmountFields = values.items.map(({ costPrice, quantity, elemProfRate }) => {
    return ((+costPrice * quantity) * (1 + (elemProfRate / 100)));
  });
  const taxExcludedAmountVal = taxExcludedAmountFields.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // 税込金額の算出処理
  const amountIncludingTaxFields = values.items.map(({ price })=> +price);
  const amountIncludingTaxVal = amountIncludingTaxFields.reduce((acc, cur) => {
    return acc + cur;
  }, 0);

  // 合計欄の更新処理
  useEffect(() => {
    setFieldValue('totalCost', Math.round(totalCostPrice));
    setFieldValue('grossProfit', Math.round(grossProfitVal));
    setFieldValue('grossProfitMargin', grossProfitMarginVal);
    setFieldValue('taxAmount', Math.round(amountIncludingTaxVal - taxExcludedAmountVal));
    setFieldValue('taxExcludedAmount', Math.round(taxExcludedAmountVal));
    setFieldValue('amountIncludingTax', Math.round(amountIncludingTaxVal));
  }, [totalCostPrice, grossProfitVal, grossProfitMarginVal, taxExcludedAmountVal, amountIncludingTaxVal]);

  /* フォームプルダウンに使用する配列の入れ物の定義 */
  /* フォームプルダウンに使用する配列の更新処理 */
  /* 何かをトリガにuseEffectで更新する？？ */

  console.log('values', values);
};