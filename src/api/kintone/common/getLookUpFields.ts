import { KintoneFormFieldProperty } from '@kintone/rest-api-client';
import { Record } from '@kintone/rest-api-client/lib/client/types';
import { APPIDS, KintoneClient } from '../config';

export const getLookUpFields = async (appId: APPIDS, record: Record) => {
  const { properties } = await KintoneClient.app.getFormFields({
    app: appId,
  });

  const lookUpOnlyRec : Record = {}; 

  Object.keys(properties).map(key => {
    if ('lookup' in properties[key]) {
      lookUpOnlyRec[key] = record[key];
    }

    /** Subtableの場合 */
    if ('fields' in properties[key]) {
      const subtable = properties[key] as KintoneFormFieldProperty.Subtable<any>;
      const hasLookUp = Object.keys(subtable.fields).some(subTblFldKey => {
        return 'lookup' in subtable.fields[subTblFldKey];
      });
      
      if (hasLookUp) {
        lookUpOnlyRec[key] = record[key];
      }
    }
  });

  return lookUpOnlyRec;

};