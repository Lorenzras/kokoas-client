import { getFormFieldsOfProjects } from './getFormFieldsOfProjects';

describe('getFormFieldsOfProjects', () => {
  it('should get projects fields', async () => {
    const result = await getFormFieldsOfProjects();
   
    expect(result).toHaveProperty('properties');
  });
});