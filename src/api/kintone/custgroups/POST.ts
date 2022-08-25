import { APP_ID } from './config';
import { KintoneRecord } from './../config';

import { AddRecordFn } from '../types/restapi';


export const addCustGroup: AddRecordFn = (record = {}) => {

  return KintoneRecord.addRecord({ app: APP_ID, record });

};





