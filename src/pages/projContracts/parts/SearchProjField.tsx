import { Autocomplete, TextField, Stack, Tooltip } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useLazyEffect } from '../../../hooks';
import { searchProjects } from '../api';
import { Caption } from '../../../components/ui/typographies';
import { TypeOfForm } from '../form';

type Opt = {
  id: string,
  projName: string
};

export const SearchProjField = (props: {
  name: string,
  label: string,
  projName: string,
  handleSearchTTOpen: ()=>void,
  handleSearchTTClose: ()=>void,
  searchTTOpen: boolean,
}) => {
  const { setStatus } = useFormikContext<TypeOfForm>();
  const [inputVal, setInputVal] = useState('');
  const [fieldVal, setFieldVal] = useState<Opt | null>(null);
  const [options, setOptions] = useState<Array<Opt>>([]);
  const [field, meta, helpers] = useField(props);
  const [isInit, setIsInit] = useState(true);

  const { error, touched } = meta;

  const {
    projName,
    searchTTOpen,
    handleSearchTTOpen,
    handleSearchTTClose,
  } = props;


  useLazyEffect(()=>{
    if (!inputVal || isInit) return; // prevent API call on initial load, and when input is empty

    searchProjects(inputVal)
      .then(r => {
        setOptions(r.map(({ $id, constructionName })=>{
          return { id: $id.value, projName: constructionName.value };
        }));

      });

  }, [inputVal], 2000);

  useEffect(()=>{

    if (options.length === 0 && projName) {
      const singleOpt = { projName, id: field.value };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    }

  }, [field.value, projName]);

  return (
    <Tooltip
      title="こちらで工事名が検索出来ます。"
      open={searchTTOpen} onOpen={handleSearchTTOpen}
      onClose={handleSearchTTClose}
      placement="top-end"
      arrow

    >
      <Autocomplete
      sx={{ transition: 'all .3s ease-in-out;' }}
      value={fieldVal}
      onInputChange={(_, value)=>{
        setInputVal(value);

      }}
      onChange={(_, val)=>{
        helpers.setValue(val?.id);
        setFieldVal(val);

        if (val) {
          setStatus('busy' as TFormStatus);
        }
      }}

      onFocus={()=>setIsInit(false)}

      options={options}
      getOptionLabel={(opt)=> opt.projName}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}

      renderInput={(params) => <TextField
        {...params}
        name = {field.name}
        label={props.label}
        error={Boolean(error && touched)}
        helperText={error ? error : ''}
        />}
      renderOption={(p, opt) => {
        const key = `listItem-${opt.id}`;
        return (
          <li {...p} key={key}>
            <Stack>
              {opt.projName}
              <Caption text={`id: ${opt.id}` } />
            </Stack>
          </li>
        );
      }}

    />

    </Tooltip>
  );
};