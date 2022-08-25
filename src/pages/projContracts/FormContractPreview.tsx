import { Form, useFormikContext } from 'formik';
import { MainContainer } from '../../components/ui/containers';
import { PageTitle } from '../../components/ui/labels';

import { ProspectShortcuts } from './parts/ProspectShortcuts';
import { getFieldName, TypeOfForm } from './form';
import {  Button, Grid, Grow, LinearProgress } from '@mui/material';
import { SearchProjField } from './parts/SearchProjField';
import { useEffect, useState } from 'react';
import { getFormDataById } from './api/fetchRecord';
import { SelectProjEstimates } from './parts/ProjEstimates/SelectProjEstimate';
import { ItemEstimate } from './parts/ProjEstimates/ItemEstimate';
import { getProjEstimates } from './api/getProjEstimates';
import { Box } from '@mui/system';
import { ContractInfo } from './parts/ContractInfo';
import { EmptyBox } from '../../components/ui/information/EmptyBox';
import { Preview } from './parts/Preview/Preview';
import { getParam } from '../../helpers/url';
import { useNavigate } from 'react-router-dom';

export const FormContractPreview = () => {
  const [searchTTOpen, setSearchTTOpen] = useState(false);
  const [options, setOptions] = useState<OptionNode[]>([]);
  const navigate = useNavigate();

  const projIdFromURL = getParam('projId');
  const projEstimateIdFromURL = getParam('projEstimateId');

  const {
    values,
    setValues,
    setStatus,
    status,
  } = useFormikContext<TypeOfForm>();

  const { projName, projId, projEstimateId } = values;

  const handleInitForm = async () => {
    setStatus('busy' as TFormStatus);
    const projDetails = await getFormDataById(projId);
    const estimates = await getProjEstimates(projId);

    if (estimates.length) {

      let newOptions: OptionNode[] = [{
        value: '',
        key: 'clear',
        component: '---',
      }];

      newOptions.push(...estimates.map<OptionNode>((rec)=>{
        const { contractPrice, $id, 作成日時 } = rec;
        return {
          value: $id.value,
          key: $id.value,
          component: <ItemEstimate contractPrice={contractPrice.value} dateCreated={作成日時.value} id={$id.value}/>,
        };
      }));

      newOptions.push({
        value: '',
        key: 'new',
        component: <Button onClick={()=>navigate('/')} variant="text" color={'inherit'} fullWidth disableRipple>見積作成</Button>,
      });
      setOptions(newOptions);

    }

    setValues((prev)=>({ ...prev, ...projDetails }));
    setStatus('' as TFormStatus);
  };

  useEffect(()=>{
    if (projId) {
      console.log('ENtered');
      handleInitForm();
    } else {
      setStatus('');
    }
  },  [projId]);


  useEffect(()=>{
    if (projIdFromURL) {
      setValues((prev)=>({
        ...prev,
        projEstimateId: projEstimateIdFromURL ?? '',
        projId: projIdFromURL,
      }));
      // /setFieldValue(getFieldName('projId'), projIdFromURL);
    }
  }, [projIdFromURL, projEstimateIdFromURL]);


  const handleSearchTTClose = () => setSearchTTOpen(false);
  const handleSearchTTOpen = () => setSearchTTOpen(true);

  return (
    <Form noValidate>
      <MainContainer>
        <PageTitle label='契約'/>
        <Grid container item xl={8} spacing={2} mb={12} alignItems={'center'} >

          <Grid item xs={12} md={4} >
            <SearchProjField
              label="工事情報の検索"
              name={getFieldName('projId')}
              projName={projName}
              handleSearchTTClose={handleSearchTTClose}
              handleSearchTTOpen={handleSearchTTOpen}
              searchTTOpen={searchTTOpen}
              />
          </Grid>

          {/* Just for eyecandy as the form looks too empty when nothing is selected. */}
          <Grid item xs={12} md={8} >

            <Grow in={!!projId && status === '' } timeout={1000} mountOnEnter unmountOnExit>
              <Box sx={{ position: 'relative' }}>
                {!!projId && <SelectProjEstimates {...{ options, status }} />}
              </Box>
            </Grow>

            <Grow in={!!!projId && status === ''} timeout={1000} mountOnEnter unmountOnExit>
              <Box sx={{ position: 'relative' }}>
                {!projId &&
                  <EmptyBox onMouseEnter={handleSearchTTOpen} onMouseLeave={handleSearchTTClose }>
                    工事名で検索してください
                  </EmptyBox>
                  }
              </Box>
            </Grow>
          </Grid>

          {/* 契約のプレビュー */}
          {!!projEstimateId &&  <Preview/>}
          {!projEstimateId && !!projId && !!options.length &&
          <Grid item xs={12}>
            <EmptyBox>
              見積を選択してください。
            </EmptyBox>
          </Grid>

          }

          {/* 契約内容 */}
          <ContractInfo />



          {(status as TFormStatus) === 'busy' && <Grid item xs={12}><LinearProgress /></Grid>}
        </Grid>


      </MainContainer>
      <ProspectShortcuts />

    </Form>
  );
};