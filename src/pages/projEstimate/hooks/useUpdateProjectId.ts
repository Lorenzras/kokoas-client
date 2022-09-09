import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { getConstRecord } from '../../../api/kintone/construction';
import { getCustGroup } from '../../../api/kintone/custgroups/GET';
import { getProjTypeByLabel } from '../../../api/kintone/projectType/GET';
import { useSnackBar } from '../../../hooks';
import { initialValues, TypeOfForm } from '../form';

export const useUpdateProjectId = () => {
  const { values, dirty, setValues } = useFormikContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const { projId } = values;
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (projId) {
      setLoading(true);
      getConstRecord(projId)
        .then(async ({
          constructionName, constructionType,
          custGroupId,
        }) => {

          const [
            custGroup,
            { profitRate },
          ] = await Promise.all([
            custGroupId?.value ? getCustGroup(custGroupId.value) : undefined,
            getProjTypeByLabel(constructionType.value),
          ]);

          const mainCustName = custGroup?.members?.value[0].value.customerName.value ?? '';

          // Throttle speed to avoid request spam.
          setTimeout(()=> {
            setValues((prev) => produce(prev, draft => {
              draft.projName = constructionName.value;
              draft.projType = constructionType.value;
              draft.profitRate = +profitRate.value;
              draft.customerName = mainCustName;
            }));
            setLoading(false);
          }, 1000);

        })
        .catch((err) => {
          setSnackState({
            open: true,
            severity: 'error',
            message: `レコード取得が失敗しました。管理者にご連絡ください。useUpdateProjectId ${err.message}`,
          });
          setLoading(false);
        });

    } else if (!projId && dirty) {
      setValues((prev) => produce(prev, draft => {
        draft.projId = initialValues.projId;
        draft.projName = initialValues.customerName;
        draft.projType = initialValues.projType;
        draft.profitRate = initialValues.profitRate;
        draft.customerName = initialValues.customerName;
      }));
    }
  },  [projId, dirty]);

  return {
    isLoading: loading,
  };
};