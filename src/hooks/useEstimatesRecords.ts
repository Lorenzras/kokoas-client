import { useSnackBar } from './useSnackBar';
import { useCallback, useEffect, useState } from 'react';
import { fetchEstimatesByProjId } from './../api/kintone/estimates/GET';

/**
 * 渡された工事番号に関連する見積もを取得する。
 * 
 * @param projId 
 * @param fetchOnMount - default: true. falseの場合、handleFetchEstimatesを読んで取得する必要がある。
 * @returns {Object} obj
 * @return obj.projEstimateRecords - 見積もり配列
 * @return obj.handleFetchEstimates - 手動で更新したい時、この関数を呼ぶ
 * @return obj.loading - 取得中
 */
export const useEstimateRecords = (projId: string, fetchOnMount = true) => {
  const { setSnackState } = useSnackBar();
  const [records, setRecords] = useState<Awaited<ReturnType<typeof fetchEstimatesByProjId>>>([]);
  const [loading, setLoading] = useState(false);

  const handleFetchEstimates = useCallback(() => {
    console.log('RELOAD START');
    setLoading(true);
    fetchEstimatesByProjId(projId)
      .then(res => {
        setRecords(res);
        setLoading(false);
      })
      .catch((e) => {
        setSnackState({
          open: true,
          severity: 'error',
          message: `見積リストの取得にエラーが発生しました。${e.message}`,
        });
      });   
  }, [projId, setSnackState]);

  useEffect(() => {
    if (!projId) return;
    if (fetchOnMount) {
      handleFetchEstimates();
    }
  }, [projId, fetchOnMount, handleFetchEstimates]);


  return {
    projEstimateRecords: records,
    handleFetchEstimates,
    loading,
  };
};