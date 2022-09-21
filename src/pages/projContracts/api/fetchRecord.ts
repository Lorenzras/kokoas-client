import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';


export const fetchProj = async (recordId: string) => {
  const result = await KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
  });

  return result.record as unknown as TypeOfProjectDetails;
};

export const fetchCustGroup = async (recordId: string) => {
  const result = await KintoneRecord.getRecord({
    app: APPIDS.custGroup,
    id: recordId,
  });

  return result.record as unknown as TypeOfCustomerGroup;
};

export const getFormDataById = async (projId: string) => {

  const {
    constructionName,

    custGroupId,
    signMethod,
    $revision,
    contractPrice,
    store,
    agents: projOfficers,
    postal: pPostal,
    address1: pAddress1,
    address2: pAddress2,

  } = await fetchProj(projId);

  const {
    members,
    agents: custGroupAgents,
  } = await fetchCustGroup(custGroupId.value);

  const mainCust = members.value[0].value;
  const {
    customerName,
    address1, address2, postal,
  } = mainCust;

  const cocoAg = custGroupAgents.value
    .filter(item => (item.value.agentType.value as AgentType) === 'cocoAG' )
    ?.map(item => item.value.employeeName.value)
    .join('、 ') ?? '';

  const yumeAg = custGroupAgents.value
    .filter(item => (item.value.agentType.value as AgentType) === 'yumeAG' )
    ?.map(item => item.value.employeeName.value)
    .join('、 ') ?? '';

  const constAg = projOfficers.value
    ?.map(item => item.value.agentName.value)
    .join('、');

  return {

    projId,
    custGroupId: custGroupId.value,
    projName: constructionName.value,

    custName: customerName.value,
    custAddress: `〒${postal.value} ${address1.value}${address2.value}`,
    store: store.value,

    cocoAg: cocoAg,
    yumeAg: yumeAg,
    constAg: constAg,

    projAddress: `〒${pPostal.value} ${pAddress1.value}${pAddress2.value}`,

    revision: $revision.value,
    signMethod: signMethod.value,
    contractPrice: +contractPrice.value ?? 0,
  } as TypeOfForm;

};