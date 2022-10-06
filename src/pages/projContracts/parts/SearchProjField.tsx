import { Autocomplete, TextField, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLazyEffect } from '../../../hooks';
import { Caption } from '../../../components/ui/typographies';
import { searchProjects } from '../../../api/kintone/projects';

type Opt = {
  id: string,
  projName: string
};

export const SearchProjField = (props: {
  projId: string,
  projName: string,
  handleChange?: (projId: string) => void
}) => {

  const {
    projName = '',
    handleChange,
    projId,
  } = props;

  // User inputed value state.
  const [inputVal, setInputVal] = useState(projName);

  // Selected value state
  const [fieldVal, setFieldVal] = useState<Opt | null>(null);

  const [options, setOptions] = useState<Array<Opt>>([]);


  const [isInit, setIsInit] = useState(true);

  useEffect(()=>{
    /*
      When there is no option but with projName,
      make a single option.
    */
    if (options.length === 0 && projName) {
      const singleOpt = { projName, id: projId };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    }

  }, [projName, options.length, projId]);


  useLazyEffect(()=>{
    /*
      Prevent doing anything on initial render
      to save API call when projId was
      initialized by URL parameters
     */
    if (isInit) return;

    if (inputVal) {

      searchProjects(inputVal)
        .then(r => {
          setOptions(r.map(({
            $id,
            projName: recProjName })=>{
            return { id: $id.value, projName: recProjName.value };
          }));

        });
    }

  }, [inputVal], 2000);


  return (

    <Autocomplete
      sx={{ transition: 'all .3s ease-in-out;' }}
      value={fieldVal}
      onInputChange={(_, value)=>{
        setInputVal(value);
      }}
      onChange={(_, val)=>{
       
        setFieldVal(val);
        handleChange?.(val?.id || '');

      }}
      onFocus={()=>setIsInit(false)}
      options={options}
      getOptionLabel={(opt)=> opt.projName}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          label={'工事選択'}
        />)}
      renderOption={(p, opt) => {
        const key = `listItem-${opt.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {opt.projName}
              <Caption text={`id: ${opt.id}`} />
            </Stack>
          </li>
        );
      }}
    />

  );
};