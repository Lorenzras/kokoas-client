import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { TypeOfForm } from '../form';

/**
 * 合計欄の算出処理
 */
export const useCalculateTotals = () => {
  const { values, setFieldValue } = useFormikContext<TypeOfForm>();

  // 原価合計、粗利、税抜金額、税込金額の算出処理
  const newValues = values.items.reduce((acc, cur) => {
    const totalCostPrice = +cur.costPrice * +cur.quantity;
    const grossProfitVal = (totalCostPrice * (+cur.elemProfRate / 100));
    const taxExcludedAmountVal = ((+cur.costPrice * +cur.quantity) * (1 + (+cur.elemProfRate / 100)));
    const amountIncludingTaxVal = +cur.price;
    return ({
      totalCostPrice: acc.totalCostPrice + totalCostPrice,
      grossProfitVal: acc.grossProfitVal + grossProfitVal,
      taxExcludedAmountVal: acc.taxExcludedAmountVal + taxExcludedAmountVal,
      amountIncludingTaxVal: acc.amountIncludingTaxVal + amountIncludingTaxVal,
    });
  }, { /* acc初期値 */
    totalCostPrice: 0,
    grossProfitVal: 0,
    taxExcludedAmountVal: 0,
    amountIncludingTaxVal: 0,
  });
  
  // 粗利率の算出処理
  const provVal = (newValues.grossProfitVal / newValues.totalCostPrice) * 100;
  const grossProfitMarginVal = isNaN(provVal) ? 0 : parseFloat(provVal.toFixed(2));

  // 合計欄の更新処理
  useEffect(() => {
    console.log('発火チェック');
    setFieldValue('totalCost', Math.round(newValues.totalCostPrice));
    setFieldValue('grossProfit', Math.round(newValues.grossProfitVal));
    setFieldValue('grossProfitMargin', grossProfitMarginVal);
    setFieldValue('taxAmount', Math.round(newValues.amountIncludingTaxVal - newValues.taxExcludedAmountVal));
    setFieldValue('taxExcludedAmount', Math.round(newValues.taxExcludedAmountVal));
    setFieldValue('amountIncludingTax', Math.round(newValues.amountIncludingTaxVal));
  }, [newValues.amountIncludingTaxVal]);

  console.log('values', values);
};