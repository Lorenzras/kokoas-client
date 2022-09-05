import { generateParams } from './url';

describe('url', ()=>{
  it('should return urlparam', ()=>{
    const result = generateParams({
      projId: 'hello',
      projEstimateId: undefined,
    });
    console.log(result);

    expect(result).toMatchSnapshot();
  });
});