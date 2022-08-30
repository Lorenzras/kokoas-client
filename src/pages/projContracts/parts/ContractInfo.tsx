import { Button, Divider, Grid, Grow, Tooltip } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { OutlinedDiv } from '../../../components/ui/containers';
import { LabeledInfo } from '../../../components/ui/typographies';
import { generateParams } from '../../../helpers/url';
import { pages } from '../../Router';
import { TypeOfForm } from '../form';
import EditIcon from '@mui/icons-material/Edit';

export const ContractInfo = () => {
  const navigate = useNavigate();
  const { values: {
    projId,
    projEstimateId,
    projName,
    custName, custAddress, store,
    cocoAg, yumeAg, constAg,
    projAddress,
    custGroupId,
  } } = useFormikContext<TypeOfForm>();


  useEffect(() => {
    if (projEstimateId) {

    }

  }, [projEstimateId]);


  return (
    <Grow in={!!projId} mountOnEnter unmountOnExit>
      <Grid item xs={12} >
        <OutlinedDiv label='内容'>

          <Grid container spacing={2} p={2}>
            <Grid item xs={6}>
              <LabeledInfo label={'店舗'} data={store} />
            </Grid>
            <Grid container item xs={6} justifyContent={'flex-end'}>
              <Tooltip title="顧客を編集する画面にいく">
                <Button
                onClick={()=>navigate(`${pages.custGroupEdit}?${generateParams({
                  custGroupId,
                  projId,
                  projEstimateId,
                })}`)}
                size={'small'}
                color="secondary"
                >
                  <EditIcon />
                </Button>
              </Tooltip>
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'顧客名'} data={custName} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'現住所'} data={custAddress} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LabeledInfo label={'ここすも営業担当者'} data={cocoAg} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'ゆめてつAG'} data={yumeAg} />
            </Grid>



            <Grid item xs={12} >
              <Divider />
            </Grid>

            <Grid item xs={6}>
              <LabeledInfo label={'工事名'} data={projName} />
            </Grid>

            <Grid container item xs={6} justifyContent={'flex-end'} >
              <Tooltip title="工事情報を編集する画面にいく">
                <Button
                onClick={()=>navigate(`${pages.projEdit}?${generateParams({
                  custGroupId,
                  projId,
                  projEstimateId,
                })}`)}
                size={'small'}
                color="secondary"
                 >
                  <EditIcon/>
                </Button>
              </Tooltip>
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'工事担当者'} data={constAg} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'工事住所'} data={projAddress} />
            </Grid>



          </Grid>
        </OutlinedDiv>
      </Grid>
    </Grow>
  );
};