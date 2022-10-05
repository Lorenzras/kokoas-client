import { useFormikContext } from 'formik';
import { useCallback, useEffect, useMemo } from 'react';
import { useSnackBar } from '../../../hooks';
import { getProjDataById } from '../api/getProjDataById';
import {  TypeOfForm } from '../form';

export const useUpdateProjId = () => {
  const { setSnackState } = useSnackBar();

  const {
    values,
    setValues,
    setStatus,
    status,
  } = useFormikContext<TypeOfForm>();

  const { projId } = values;
  const formStatus: TFormStatus = status;

  const setStatusSafe = useCallback((s: TFormStatus) => setStatus(s), [setStatus]);

  const memSetSnackState = useMemo(() => setSnackState, []);

  useEffect(()=>{
    if (projId) {

      setStatusSafe('busy');

      getProjDataById(projId)
        .then((formData) => {

          setValues( (prev) => {
            return {
              ...prev,
              ...formData,
            };
          });

        })
        .catch((err) => {
          memSetSnackState({
            open: true,
            message: `レコード取得にエラーが発生しました。${err.message}`,
            severity: 'error',
          });
        })
        .finally(() => setStatusSafe(''));

    } else {
      setStatusSafe('');
    }
  },
  [projId,  setStatusSafe, setValues, memSetSnackState ]);

  return {
    formStatus,
    values,
  };
};