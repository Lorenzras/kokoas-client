import { TKMaterials } from './form';

/**
 * 見積もりテーブルの初期値
 */
export const buzaiListInit = {
  number: 0,
  majorItem: '',
  middleItem: '',
  element: '',
  costPrice: 0,
  quantity: 1,
  elemProfRate: 0,
  unit: '',
  tax: '',
  unitPrice: 0,
  price: 0,
};

/**
 * 見積もりテーブルのkeyリスト
 */
export const materialsLabelList: Record<TKMaterials, 'display' | 'pulldown' | 'pullldownAndInput' | 'input'> = {
  'number': 'display',
  'majorItem': 'pulldown',
  'middleItem': 'pulldown',
  'element': 'pullldownAndInput',
  'costPrice': 'input',
  'quantity': 'input',
  'elemProfRate': 'input',
  'unit': 'pullldownAndInput',
  'tax': 'pulldown',
  'unitPrice': 'display',
  'price': 'display',
} as const;

/**
 * 見積もりアイテムのラベル定義
 */
export const materialsNameList = [
  'No.', '大項目*', '中項目', '部材', '原価*', '数量*', '利益率(%)', '単位', '税(課税 / 非課税)', '単価', '金額',
] as const;

/**
 * 合計欄のkeyリスト
 */
/* export const summaryLabelList = [
  'totalCost', 'grossProfit', 'grossProfitMargin', 'taxAmount', 'taxExcludedAmount', 'amountIncludingTax',
]; */

/**
 * 合計欄のラベル定義
 */
export const summaryNameList = [
  '原価合計', '粗利', '粗利率', '税(円)', '税抜金額', '税込金額',
] as const;
