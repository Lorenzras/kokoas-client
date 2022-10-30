import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { isBrowser } from '../../helpers/utils';

/* Use session authentication */

const options = {
  baseUrl: process.env.BASE_URL,
  auth: isBrowser() ? undefined : {
    apiToken: [
      process.env.API_CUSTOMERS,
      process.env.API_STORES,
      process.env.API_EMPLOYEES,
      process.env.API_CUST_GROUP,
      process.env.API_CUST_MEMO,
      process.env.API_CONSTRUCTION_TYPE,
      process.env.API_CONSTRUCTION_DETAILS,
      process.env.API_ESTIMATE,
      process.env.API_INVOICE,
    ],
  },
};

export enum APPIDS {
  customers = 173,
  stores = 19,
  employees = 34,
  custGroup = 185,
  custMemo = 181,

  /** @deprecated Use projType instead */
  constructionType = 190,

  /** @deprecated Use project instead */
  constructionDetails = 194,

  projType = 190,
  project = 194,
  projectEstimate = 202,
  paymentInvoice = 204,
}


export const KintoneClient = new KintoneRestAPIClient(options);

export const KintoneRecord = KintoneClient.record;
