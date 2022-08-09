import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { TypeOfForm } from '../form';

export const fetchRecord = async (recordId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
  }).then(r => r.record as unknown as TypeOfProjectDetails);
};

export const getFormDataById = async (recordId: string) => {

  const {
    constructionName,
    envelopeId,
    envelopeStatus,
    envDocFileKeys,
    custGroupId,
    signMethod,
    $revision,
  } = await fetchRecord(recordId);

  //console.log('PROJNAME', envDocFileKeys);

  return {
    projId: recordId,
    custGroupId: custGroupId.value,
    projName: constructionName.value,
    envelopeId: envelopeId.value,
    envelopeStatus: envelopeStatus.value,
    envDocFileKeys: envDocFileKeys.value,
    envSelectedDoc: envDocFileKeys.value[0]?.fileKey,
    revision: $revision.value,
    signMethod: signMethod.value,
    contractPrice: 0,
  } as TypeOfForm;

};