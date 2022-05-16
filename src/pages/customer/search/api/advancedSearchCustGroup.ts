import { KintoneRecord, APPIDS } from '../../../../api/kintone';

export interface AdvancedSearchCustGroupParam {
  storeId?: string,
  custName?: string,
  phone?: string,
  address?: string,
  email?: string,
  yumeAG?: string,
  cocoAG?: string,
  cocoConst?: string,
  custType?: string,
  recordStatus?: string[],
}

export const advancedSearchCustGroup = async <
  Key extends Partial<keyof CustomerGroupTypes.SavedData>,
  CustKey extends  Partial<keyof CustomerGroupTypes.SavedData['members']['value'][0]['value']>,
  ProjectKey extends Partial<keyof CustomerGroupTypes.SavedData['projects']['value'][0]['value']>,
  AgentsKey extends Partial<keyof CustomerGroupTypes.SavedData['agents']['value'][0]['value']>,
>(
  params : AdvancedSearchCustGroupParam,
) => {
  const {
    storeId,
    custName,
    phone,
    address,
    email, cocoAG, cocoConst, yumeAG,
    custType, recordStatus,
  } = params;


  const query = [
    ...(custType ? [`${'custType' as Key} in ("${custType}")`] : []),
    ...(storeId ? [`${'storeId' as Key} = "${storeId}"`] : []),
    ...(yumeAG ? [`${'employeeId' as AgentsKey} in ("${yumeAG}")`] : []),
    ...(cocoAG ? [`${'employeeId' as AgentsKey} in ("${cocoAG}")`] : []),
    ...(cocoConst ? [`${'employeeId' as AgentsKey} in ("${cocoConst}")`] : []),
    ...(custName ? [`${'customerName' as CustKey} like "${custName}"`] : []),
    ...(phone ? [`${'dump' as CustKey} like "${phone}"`] : []),
    ...(email ? [`${'dump' as CustKey} like "${email}"`] : []),
    ...(recordStatus?.length ? [
      `(${recordStatus
        .map(item => `${'status' as Key} = "${item}"`)
        .join(' or ')
      })`,
    ] : []),
    ...(address ? [
      `(${
        (['dump',
          'address1',
          'address2',
          'postal',
          'projectAddress1',
          'projectAddress2',
          'kariAddress',
          'projectPostal',
        ] as CustKey[] | ProjectKey[] | CustKey[])
          .map(item => `${item} like "${address}"`)
          .join(' or ')
      })`] : []),
  ].join(' and ');


  return KintoneRecord.getAllRecords({
    app: APPIDS.custGroup,
    condition: query ?? undefined,
    orderBy:  `${'更新日時' as Key} desc`,
  });

};