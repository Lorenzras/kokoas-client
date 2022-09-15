
import { Grid, Collapse,  IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {  FormikTextField, TextMaskPostal } from '../../../../../components/ui/textfield';
import { Contacts } from './Contacts';
import { FormikLabeledCheckBox } from '../../../../../components/ui/checkboxes';
import { CustomerForm, getCustFieldName } from '../../form';
import { useFormikContext } from 'formik';
import { useLazyEffect } from '../../../../../hooks/useLazyEffect';
import { getAddressByPostal } from '../../../../../api/others/postal';
import { useRef, useState } from 'react';
import { AddressDialog } from './AddressDialog';



interface AddressProps {
  namePrefix: string,
  index: number
}

const AddressFields = (namePrefix: string, postal: string, handleAddressSearch: ()=>void) => (
  <Grid container item xs={12} spacing={2} mt={1}>
    <Grid item xs={8} md={4} >
      <FormikTextField
      name={`${namePrefix}${getCustFieldName('postal')}`}
      label="郵便番号" placeholder='471-0041'
      inputComponent={TextMaskPostal}
      shrink={!!postal}/>
    </Grid>
    <Grid item xs={4} md={2} >
      <IconButton color={'primary'} size={'small'} onClick={handleAddressSearch}>
        〒<SearchIcon sx={{ ml: '-6px', mt: '8px' }} fontSize="large" color={'primary'}/>
      </IconButton>
    </Grid>

    <Grid item xs={12} md={6} /> {/* Offset */}

    <Grid item xs={12} >
      <FormikTextField name={`${namePrefix}${getCustFieldName('address1')}`} label="住所" placeholder='愛知県豊田市汐見町8丁目87-8'/>
    </Grid>
    <Grid item xs={12} mb={2}>
      <FormikTextField name={`${namePrefix}${getCustFieldName('address2')}`} label="住所（建物名）" placeholder='マンション山豊101'/>
    </Grid>
    <Contacts namePrefix={namePrefix}/>
  </Grid>
);

export const Address = (props: AddressProps) => {
  const [openAddressDialog, setOpenAddressDialog] = useState<boolean>(false);
  const {
    setFieldValue,
    dirty,
    values: { customers },
  } = useFormikContext<CustomerForm>();

  const {
    namePrefix,
    index,
  } = props;

  const { isSameAddress = true, postal, address1 } = customers[index] ?? {};
  const isFirstCustomer = !index;
  const divRef = useRef<HTMLDivElement>(null);

  const handleAddressSearch = () => {
    setOpenAddressDialog(true);
  };

  useLazyEffect(()=>{

    if (customers.length > 1 && dirty) {
      divRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

  }, [customers.length, isSameAddress ], 300);

  useLazyEffect(()=>{

    /* Automatically retrieve address if address is empty */
    if (postal && !address1) {

      getAddressByPostal(postal as string).then((address)=>{
        setFieldValue(`${namePrefix}${getCustFieldName('address1')}`, address);
      });
    }
  }, [postal], 300);

  return (
    <>
      { !isFirstCustomer &&
      <Grid item xs={12}>
        <FormikLabeledCheckBox name={`${namePrefix}${getCustFieldName('isSameAddress')}`} label="住所と連絡先は【契約者１】と同じ" defaultVal={isSameAddress}/>
      </Grid>
      }

      <Grid item xs={12} ref={divRef}>
        <Collapse appear={!isFirstCustomer} in={(!isSameAddress || isFirstCustomer)} >
          {AddressFields(namePrefix, postal, handleAddressSearch)}
        </Collapse>
      </Grid>

      <AddressDialog
        open={openAddressDialog}
        postalFN={`${namePrefix}${getCustFieldName('postal')}`}
        address1FN={`${namePrefix}${getCustFieldName('address1')}`}
        handleClose={()=>{
          setOpenAddressDialog(false);
        }}
      />
    </>
  );
};