import { getLookUpFields } from './getLookUpFields';
import { getProjById } from '../projects/getProjById';
import { APPIDS } from '../config';
import { Record } from '@kintone/rest-api-client/lib/client/types';

describe('getLookUpFields', () => {
  it('should get lookup fields of project', async () => {
    const record = await getProjById('123');
    const newRecord = await getLookUpFields(APPIDS.project, record as unknown as  Record);
    console.log(newRecord);
    expect(newRecord).toBeDefined();
  });
});