import { getCustGroupByProjName } from './getCustGroupByProjName';

describe('getCustGroupByProjName', () => {
  it('should get custgroup with matching projName', async ()=> {
    const result = await getCustGroupByProjName('早川');
    console.log(result);
    expect(result.length).toBeGreaterThan(0);
  });
});