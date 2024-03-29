import { useQuery } from '@tanstack/react-query';
import { APPIDS } from '../api/kintone';
import { useCustGroupById } from './useCustGroupById';
import { useProjById } from './useProjById';


/**
 * 工事番号で、顧客グループと工事データを取得する。
 */
export const useCustGroupByProjId = (projId: string) => {
  const { data: projData } = useProjById(projId);
  const custGroupId = projData?.custGroupId?.value;

  const { data: custGroupData } = useCustGroupById(custGroupId || '');

  return useQuery(
    [APPIDS.project, APPIDS.custGroup, projId],
    () => {
      return {
        custGroupData,
        projData,
      };
    },
    {
      enabled: !!custGroupData && !!projData,
    },
  );
};