import {  Divider, Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { LabeledInfo } from '../../../../components/ui/typographies';

import { TypeOfForm } from '../../form';
import { ContractInfoContainer } from './ContractInfoContainer';
import { EditCustomer } from './EditCustomer';
import { EditProject } from './EditProject';

export const ContractInfo = () => {

  const { values: {
    projId,
    projName,
    custName, custAddress, store,
    cocoAg, yumeAg, constAg,
    projAddress,
  } } = useFormikContext<TypeOfForm>();


  return (
    <ContractInfoContainer projId={projId}>
      <Grid item xs={6}>
        <LabeledInfo label={'店舗'} data={store} />
      </Grid>
      <Grid container item xs={6}
        justifyContent={'flex-end'}
      >
        <EditCustomer />
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

      <Grid container item xs={6}
        justifyContent={'flex-end'}
      >
        <EditProject />
      </Grid>

      <Grid item xs={12} md={6}>
        <LabeledInfo label={'工事担当者'} data={constAg} />
      </Grid>

      <Grid item xs={12} md={6}>
        <LabeledInfo label={'工事住所'} data={projAddress} />
      </Grid>



    </ContractInfoContainer>
  );
};