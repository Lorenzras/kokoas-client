import { debounce, FormControl, FormHelperText, Input, MenuItem, Select, Typography } from '@mui/material';
import { useField } from 'formik';
import { materialsLabelList } from '../constantDefinition';
import { TKMaterials } from '../form';
import quotePulldown from '../helpers/quotePulldown';



const InputCellContent = ({
  fieldName, rowIdx,
}: {
  fieldName: TKMaterials,
  rowIdx: number
}) => {
  const arrayFieldName = `items[${rowIdx}][${fieldName}]`;

  const [field, meta, helpers] = useField(arrayFieldName);

  const { error, touched } = meta;

  // INPUT用onchange処理
  const changeHandlerInput
  : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
   = debounce((el) => {
     console.log('2s after chk', el.target.value);

     helpers.setValue(el.target.value, true);
   }, 2000);

  switch (materialsLabelList[fieldName]) {

    case 'input': return (
      <FormControl variant="standard">
        <Input {...field} error={!!error && touched} onChange={changeHandlerInput} value={undefined} />
        {(!!error && touched) &&
          <FormHelperText error={!!error && touched}>
            {error}
          </FormHelperText>}
      </FormControl>
    );

    case 'display': return (
      <Typography variant='body2'>
        {field.value + '円'}
      </Typography>
    );

    case 'pulldown': return (() => {
      const output: string[] = quotePulldown(fieldName);
      return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size='small'>
          <Select {...field} >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            {output.map((item) => {
              return (<MenuItem value={item} key={`${field.name}_${item}`}>{item}</MenuItem>);
            })
          }
          </Select>
          {(!!error && touched) &&
          <FormHelperText error={!!error && touched}>
            {error}
          </FormHelperText>}
        </FormControl>
      );
    })();
    case 'pullldownAndInput': return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select {...field}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    );
    default : return  (<div>表示エラーです</div>);
  }

};

export default InputCellContent;