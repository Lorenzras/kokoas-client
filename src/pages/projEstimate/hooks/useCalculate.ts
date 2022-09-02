import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useEffect } from 'react';
import { TypeOfForm } from '../form';



export const useCalculate = (rowIdx: number) => {
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { taxRate, items } = values;
  const { costPrice, quantity, elemProfRate, tax, price } = items[rowIdx];

  useEffect(() => {
    // 合計欄：原価合計、粗利、税抜金額、税込金額の算出処理
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

    // 合計欄：粗利率の算出処理
    const provVal = (newValues.grossProfitVal / newValues.totalCostPrice) * 100;
    const grossProfitMarginVal = isNaN(provVal) ? 0 : parseFloat(provVal.toFixed(2));


    // 単価の算出処理 : IF(原価 <= 0, 0 , 原価  * ( 1 + (内訳利益率/100)))
    let newUnitPrice = 0; // 入力値がエラー(数値でない)時は0にする
    if (!(isNaN(costPrice) || isNaN(elemProfRate)) && ((costPrice) > 0)) {
      newUnitPrice = Math.round(+costPrice * (1 + (+elemProfRate / 100)));
    }

    // 金額の算出処理 : IF(原価 <= 0, 原価, IF ( 税="課税", (単価*数量) * (1 + (税率/100)), (単価*数量)))
    let newPrice = 0; // 入力値がエラー(数値でない)時は0にする
    if (+costPrice <= 0) {
      newPrice = costPrice;
    } else if ((newUnitPrice !== 0) && !(isNaN(quantity))) {
      if (tax === '課税') {
        newPrice = Math.round((newUnitPrice * +quantity) * (1 + (+taxRate / 100)));
      } else { /* 非課税 */
        newPrice = Math.round(newUnitPrice * +quantity);
      }
    }

    setValues(
      (prev) => produce(prev, (draft) => {
        draft.items[rowIdx].unitPrice = newUnitPrice;
        draft.items[rowIdx].price = newPrice;
        draft.totalCost = Math.round(newValues.totalCostPrice);
        draft.grossProfit = Math.round(newValues.grossProfitVal);
        draft.grossProfitMargin = grossProfitMarginVal;
        draft.taxAmount = Math.round(newValues.amountIncludingTaxVal - newValues.taxExcludedAmountVal);
        draft.taxExcludedAmount = Math.round(newValues.taxExcludedAmountVal);
        draft.amountIncludingTax = Math.round(newValues.amountIncludingTaxVal);
      }),
    );
  }, [costPrice, quantity, elemProfRate, tax, taxRate, price]);
};