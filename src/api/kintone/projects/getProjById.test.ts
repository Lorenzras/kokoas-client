import { getProjById } from './getProjById';

describe('getProjById', () => {
  it('should get project by projId', async () => {
    const result = await getProjById('123');

    console.log(result);
    
    expect(result).toHaveProperty('$id');
  });
});