import { KintoneClient, APPIDS } from '../config';

export const getFormFieldsOfProjects = () => {
  return KintoneClient.app.getFormFields({
    app: APPIDS.projectEstimate,
  });
};