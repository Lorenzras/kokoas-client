import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { TypeOfForm } from '../form';

export const useCalculateTotals = () => {
  const { values, setFieldValue } = useFormikContext<TypeOfForm>();

  const newFields = values.items.map((val) => {
    const totalCostPrice = +val.costPrice * +val.quantity;
    const grossProfitVal = (totalCostPrice * (+val.elemProfRate / 100));
    const provVal = (grossProfitVal / totalCostPrice) * 100;
    const grossProfitMarginVal = isNaN(provVal) ? 0 : parseFloat(provVal.toFixed(2));
    const taxExcludedAmountVal = ((+val.costPrice * +val.quantity) * (1 + (+val.elemProfRate / 100)));
    const amountIncludingTaxVal = +val.price;

    return ({
      totalCostPrice: totalCostPrice,
      grossProfitVal: grossProfitVal,
      grossProfitMarginVal: grossProfitMarginVal,
      taxExcludedAmountVal: taxExcludedAmountVal,
      amountIncludingTaxVal: amountIncludingTaxVal,
    });
  }, 0);

  const newValues = newFields.reduce((acc, cur) => {
    return ({
      totalCostPrice: acc.totalCostPrice + cur.totalCostPrice,
      grossProfitVal: acc.grossProfitVal + cur.grossProfitVal,
      grossProfitMarginVal: acc.grossProfitMarginVal + cur.grossProfitMarginVal,
      taxExcludedAmountVal: acc.taxExcludedAmountVal + cur.taxExcludedAmountVal,
      amountIncludingTaxVal: acc.amountIncludingTaxVal + cur.amountIncludingTaxVal,
    });
  }, {
    totalCostPrice: 0,
    grossProfitVal: 0,
    grossProfitMarginVal: 0,
    taxExcludedAmountVal: 0,
    amountIncludingTaxVal: 0,
  });


  // 原価合計の算出処理
  /* const costPriceFields = values.items.map(({ costPrice, quantity }) => +costPrice * +quantity);
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
  }, 0); */

  // 合計欄の更新処理
  useEffect(() => {
    setFieldValue('totalCost', Math.round(newValues.totalCostPrice));
    setFieldValue('grossProfit', Math.round(newValues.grossProfitVal));
    setFieldValue('grossProfitMargin', newValues.grossProfitMarginVal);
    setFieldValue('taxAmount', Math.round(newValues.amountIncludingTaxVal - newValues.taxExcludedAmountVal));
    setFieldValue('taxExcludedAmount', Math.round(newValues.taxExcludedAmountVal));
    setFieldValue('amountIncludingTax', Math.round(newValues.amountIncludingTaxVal));
  }, [values.items]);

  console.log('values', newValues);
};