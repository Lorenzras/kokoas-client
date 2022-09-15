import { DialogTitle, Dialog, DialogContent, Grid, DialogActions, Button, Typography, CircularProgress } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useState, useRef, startTransition } from 'react';
import { getPrefectures, getCities, getTowns, GetTownsResponseLocation, GetCitiesRespLocation } from '../../../../../api/others/address';
import { getKanaRow } from '../../../../../helpers/utils';
import { usePrefectureArea } from '../../../../../hooks/usePrefectureArea';
import { CustomerForm } from '../../form';
import { SimpleChoices, SortedCities, SortedTowns } from './AddressDialogParts/';



export type AddressDetails = typeof initialAddressDetailsState;




const initialAddressDetailsState = {
  area: '',
  prefecture: '',
  city: '',
  town: '',
  postal: '',
};

const alphabeticalReducer = (accu: any, curr: any, groupKey: string)=>{
  let firstChar = curr[groupKey].charAt(0);
  firstChar = firstChar === '(' ? firstChar = '他' : getKanaRow(firstChar);
  // そのた
  return { ...accu, [firstChar]: [...accu?.[firstChar] ?? [], curr] };
};

const sorter = ([a]: any, [b]: any)=>{
  return a === '他' ? 0 : a.localeCompare(b);
};


export const AddressDialog = (props: {
  open: boolean,
  postalFN: string,
  address1FN: string,
  handleClose: ()=>void
}) => {
  const { setFieldValue } = useFormikContext<CustomerForm>();
  const { areas } = usePrefectureArea();
  const [prefectures, setPrefectures] = useState<string[]>([]);
  const [cities, setCities] = useState<GetCitiesRespLocation>([]);
  const [towns, setTowns] = useState<GetTownsResponseLocation>([]);
  const [addressDetails, setAddressDetails] = useState<AddressDetails>(initialAddressDetailsState);
  const kanaRows = useRef<Array<HTMLElement | null>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { area, city, postal, prefecture, town } = addressDetails;
  const { open, postalFN, address1FN, handleClose } = props;

  const handleClick = (name: keyof AddressDetails, value: string) => {
    setAddressDetails(prev => ({ ...prev, [name]: value }));
  };

  useEffect(()=>{
    if (!area) return;
    setIsLoading(true);
    setPrefectures([]);
    getPrefectures(area).then(resp => {
      setPrefectures(resp);
      setCities([]);
      setIsLoading(false);
    });
  }, [area]);

  useEffect(()=>{
    if (!prefecture) return;
    setIsLoading(true);
    getCities({ prefecture: prefecture })
      .then(resp => {
        setCities(resp);
        setTowns([]);
        setIsLoading(false);
      });
  }, [prefecture]);

  useEffect(()=>{
    if (!city) return;
    setIsLoading(true);
    getTowns({ city: city })
      .then(resp => {
        setTowns(resp);
        setIsLoading(false);
      });
  }, [city]);

  useEffect(()=>{
    if (postal) {
      console.log(postal);
      handleClose();
      startTransition(()=>{
        setFieldValue(postalFN, postal );
        setFieldValue(address1FN, `${prefecture}${city}${town}` );
      });


    }

  }, [postal]);

  useEffect(()=>{
    if (open) {
      setAddressDetails(initialAddressDetailsState);
    }
  }, [open]);



  const groupedTowns :  { [key : string]: GetTownsResponseLocation } = towns
    .reduce((accu, curr) => alphabeticalReducer(accu, curr, 'town_kana'), {} );

  const groupedCities : { [key : string]: GetCitiesRespLocation } = cities
    .reduce((accu, curr) => alphabeticalReducer(accu, curr, 'city_kana'), {} );

  const sortedCities = Object.entries(groupedCities)
    .sort(sorter);
  const sortedTowns = Object.entries(groupedTowns)
    .sort(sorter);

  return (
    <Dialog

      open={open}
      PaperProps={{ sx: { height: '80vh' } }}
      onClose={handleClose}
      fullWidth
      maxWidth={'xs'}

    >
      <DialogTitle >
        選択してください。<br />

        <Typography variant='subtitle1' component={'span'} fontWeight={600}>
          {`${postal ? '〒' + postal : ''} ${prefecture}${city}${town}`}
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} justifyContent="center" alignContent={'center'} >
          {isLoading &&
            <Grid item xs={8}><CircularProgress size={200} /></Grid>
          }

          {!addressDetails.area && !isLoading &&
            <SimpleChoices name='area' choices={areas} handleClick={handleClick} />
          }

          {addressDetails.area && !addressDetails.prefecture && !isLoading &&
            <SimpleChoices name='prefecture' choices={prefectures} handleClick={handleClick} />
          }

          {addressDetails.prefecture && !addressDetails.city && !isLoading &&
            <SortedCities
              sortedCities={sortedCities}
              kanaRows={kanaRows}
              handleChoice={(val) => {
                setAddressDetails(prev => (
                  { ...prev, city: val }
                ));
              }}
            />
          }

          { addressDetails.city && !addressDetails.town && !isLoading &&
            <SortedTowns
              sortedTowns={sortedTowns}
              kanaRows={kanaRows}
              handleChoice={(_postal, _town) => {
                setAddressDetails(prev => (
                  { ...prev,
                    postal: _postal,
                    town: _town,
                  }
                ));
              }}
            />

          }

        </Grid>
      </DialogContent>
      <DialogActions sx={{
        justifyContent: 'space-between',
      }}>
        <Typography variant="caption">出典:「位置参照情報」(国土交通省)の加工情報・「HeartRails Geo API」(HeartRails Inc.)</Typography>
        <Button onClick={handleClose}>閉じる</Button>
      </DialogActions>
    </Dialog>
  );
};