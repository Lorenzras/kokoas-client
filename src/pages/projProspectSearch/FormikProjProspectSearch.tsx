import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useSnackBar } from '../../hooks';
import { initialSearch, searchProject, TSearchResult } from './api/searchProject';
import { initialValues } from './form';
import { FormProjProspectSearch } from './FormProjProspectSearch';



export const FormikProjProspectSearch = () => {
  const [list, setList] = useState<TSearchResult>([]);

  const { setSnackState } = useSnackBar();


  useEffect(()=>{
    initialSearch()
      .then((res) => setList(res));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}

      onReset={()=>{
        initialSearch()
          .then((res) => setList(res));
      }}

      onSubmit={(values, { setSubmitting }) => {
        setTimeout(()=>{
          searchProject(values)
            .then(res => {
              setSnackState({
                open:true,
                autoHideDuration: 5000,
                severity: 'success',
                message: `結果：${res.length}件`,
              });
              setList(res);
            })
            .catch(err => {
              setSnackState({
                open:true,
                autoHideDuration: 20000,
                severity: 'error',
                message: `エラーが発生しました。管理者にご連絡ください。${err.message}`,
              });
            })
            .finally(()=>{
              setSubmitting(false);
            });

        }, 1000); // Throttle search

      }}
    >

      <FormProjProspectSearch list={list}/>

    </Formik>
  );
};