import { Autocomplete, TextField, Stack } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { useLazyEffect } from '../../../hooks';
import { Caption } from '../../../components/ui/typographies';
import { getFieldName, TypeOfForm } from '../form';
import { searchProjects } from '../../../api/kintone/projects';

type Opt = {
  id: string,
  projName: string
};

export const SearchProjField = (props: {
  name: string,
  label: string,
  projName: string,
  handleChange?: (projId: string) => void
}) => {
  const { setStatus, setFieldValue } = useFormikContext<TypeOfForm>();

  // User inputed value state.
  const [inputVal, setInputVal] = useState('');

  // Selected value state
  const [fieldVal, setFieldVal] = useState<Opt | null>(null);

  const [options, setOptions] = useState<Array<Opt>>([]);

  const [field, meta, helpers] = useField(props);
  const [isInit, setIsInit] = useState(true);

  const { error, touched } = meta;

  const {
    projName,
    label,
    handleChange,
  } = props;


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

  useEffect(()=>{
    /*
      When there is no option but with projName,
      make a single option.
    */
    if (options.length === 0 && projName) {
      const singleOpt = { projName, id: field.value };
      setOptions([singleOpt]);
      setFieldVal(singleOpt);
    }

  }, [field.value, projName, options.length]);

  return (

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
          handleChange?.(val?.id);
          setStatus('busy' as TFormStatus);
        } else {
          // Clear options, and projName when nothing is selected
          setOptions([]);
          setFieldValue(getFieldName('projName'), '');
        }

        // Clear projEstimateId whenever projId changes
        setFieldValue(getFieldName('projEstimateId'), '');
      }}
      onFocus={()=>setIsInit(false)}
      options={options}
      getOptionLabel={(opt)=> opt.projName}
      isOptionEqualToValue={(opt, value) => opt.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          name={field.name}
          label={label}
          error={Boolean(error && touched)}
          helperText={error ? error : ''}
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