
import * as Yup from 'yup';



export const initialValues = {
  projId: '',
  projEstimateId: '',
  custGroupId: '',

  custName: '',
  custAddress: '',
  store: '',
  cocoAg: '',
  yumeAg: '',
  constAg: '',

  projName: '',
  projAddress: '',

  envelopeId: '',
  envelopeStatus: '' as TEnvelopeStatus,
  envDocFileKeys: [] as kintone.fieldTypes.File['value'],
  envSelectedDoc: '',
  revision: '',
  signMethod: '' as TSignMethod,

  contractPrice: 0,

};

export type TypeOfForm =  typeof initialValues;
export type KeyOfForm = keyof TypeOfForm;

export const getFieldName = (s: KeyOfForm) => s;

export const validationSchema =  Yup.object(
  {
    'projId': Yup
      .string(),
  } as Partial<Record<KeyOfForm, any>>,
);