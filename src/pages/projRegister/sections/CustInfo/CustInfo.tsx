import { Button, Grid, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { getCustGroup } from '../../../../api/kintone/custgroups/GET';
import {  OutlinedDiv } from '../../../../components/ui/containers';
import { PageSubTitle } from '../../../../components/ui/labels/';
import EditIcon from '@mui/icons-material/Edit';
import { LabeledInfoProps, LabeledInfo } from '../../../../components/ui/typographies/';
import {  useNavigate } from 'react-router-dom';
import { useFormikContext } from 'formik';
import { TypeOfProjForm, KeyOfProjForm } from '../../form';
import { AGLabels } from '../../../../api/kintone/employees/GET';
import { CustGroupSearchField } from './CustGroupSearchField';
import { CustomerInstance } from '../../../customer/register/form';
import { pages } from '../../../Router';
import { EmptyBox } from '../../../../components/ui/information/EmptyBox';
import { generateParams } from '../../../../helpers/url';


export const CustInfo = () => {

  const [custGroupRecord, setCustomerRecord] = useState<CustomerGroupTypes.SavedData>();
  const { status, values, setFieldValue } = useFormikContext<TypeOfProjForm>();
  const navigate = useNavigate();

  const isReadOnly = (status as TFormStatus ) === 'disabled';

  const {
    members,
    storeId,
    territory,
    storeName,
  } = custGroupRecord ?? {};

  const {
    customerId,
    address1,
    address2,
    postal: postalCode,
    customerName,
    dump,
  } = members?.value[0]?.value ?? {}; // Main Customer

  const {
    custNameReading,
    email, emailRel,
    phone1, phone1Rel,
    phone2, phone2Rel,
  } = JSON.parse(dump?.value || 'null') as CustomerInstance ?? {};



  const {
    custGroupId,
    constructionType,
    recordId,
  } = values;

  useEffect(()=>{

    if (custGroupId) {
      getCustGroup(custGroupId)
        .then(resp => setCustomerRecord(resp));
    } else {
      setCustomerRecord(undefined);
    }
  }, [custGroupId]);

  useEffect(()=>{
    if (storeId?.value) {
      setFieldValue('storeId' as KeyOfProjForm, storeId?.value);
      setFieldValue('territory' as KeyOfProjForm, territory?.value);
      setFieldValue('constructionName' as KeyOfProjForm, `${customerName?.value}様邸`);
    }
  }, [storeId?.value, territory?.value, customerName?.value]);


  useEffect(()=>{
    setFieldValue('constructionName' as KeyOfProjForm, `${customerName?.value ?? '--'}様邸 ${constructionType ?? '--'}`);
  }, [customerName?.value, constructionType]);



  return (
    <>
      <PageSubTitle label="顧客情報" />
      <Grid item xs={12} md={4} >
        {!isReadOnly && <CustGroupSearchField />}
      </Grid>

      <Grid item xs={12}>

        {custGroupId &&
          <OutlinedDiv label='参照結果'>
            <Grid container spacing={2} justifyContent="center" p={4}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <>
                    <LabeledInfo label="氏名" data={customerName?.value}/>
                    <LabeledInfo label="氏名フリガナ" data={custNameReading}/>
                    <LabeledInfo
                    label="現住所"
                    data={[postalCode?.value, address1?.value, address2?.value]
                      .join('')}
                  />
                    <LabeledInfo label="メアド" data={email ? [email, emailRel].join(',') : ''}/>
                    <LabeledInfo label="電話番号１" data={phone1 ? [phone1, phone1Rel].join(',') : ''}/>
                    <LabeledInfo label="電話番号２" data={phone2 ? [phone2, phone2Rel].join(',') : ''}/>

                    {
                    custGroupRecord?.members.value.reduce((accu, curr, index: number) => {
                      if (index > 0) {
                        return [...accu, <LabeledInfo key={curr.id} label={`契約者${index + 1}`} data={curr.value.customerName.value}/>];
                      }
                      return accu;
                    }, [] as typeof LabeledInfo[])
                  }
                  </>
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <LabeledInfo label={'店舗名'} data={storeName?.value} />
                  {custGroupRecord?.agents
                    .value
                    .reduce((accu, { id, value: { agentType, employeeName } })=>{
                      const rawLabel = AGLabels[agentType.value as keyof typeof AGLabels];
                      const numberedLabel = `${rawLabel ?? '担当者'}1`;
                      const isExist = accu.some(item => item.label === numberedLabel);
                      const resolvedLabel = isExist ?  `${rawLabel}2` : numberedLabel;

                      return [...accu, { key: id, label: resolvedLabel, data: employeeName.value }];
                    }, [] as Array<LabeledInfoProps & { key: string }>)
                    .map(({ key, label, data }) => {
                      return <LabeledInfo key={key}  {...{ label, data }} />;
                    })
                  }
                  <LabeledInfo label={'グループ番号'} data={custGroupId} />
                  <LabeledInfo label={'顧客番号'} data={customerId?.value} />
                </Stack>

              </Grid>
              {!isReadOnly &&

                <Grid item xs={3}>

                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<EditIcon />}
                    onClick={()=>navigate(`${pages.custGroupEdit}?${generateParams({
                      custGroupId,
                      projId: recordId,
                    })}`)}
                    fullWidth

                  >
                    編集
                  </Button>


                </Grid>
              }

            </Grid>
          </OutlinedDiv>
        }
        {!custGroupId && <EmptyBox >顧客</EmptyBox>}
      </Grid>
    </>
  );
};