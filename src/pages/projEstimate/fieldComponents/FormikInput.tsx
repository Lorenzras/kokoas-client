import { debounce, FormControl, FormHelperText, Input } from '@mui/material';
import { useField } from 'formik';
import { ChangeEvent, useState } from 'react';

export const FormikInput = (
  { name, type = 'string' }:
  {
    name: string,
    type?: 'string' | 'number'
  },
) => {
  const [field, meta, helpers] = useField(name);

  // 入力中一時的にコンポーネント内にInputのステートを管理する
  const [inputVal, setInputVal] = useState<string>(field.value);
  const { error, touched } = meta;

  const changeHandlerInput
  : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined

   = debounce((el: ChangeEvent<HTMLInputElement>) => {
     const newVal = type === 'number' ? +el.target.value : el.target.value;
     helpers.setValue(newVal, true);
     setInputVal(''); // 本フォームのステート画面に反映させるように、リセットする。
   }, 1000);



  return (
    <FormControl variant="standard">
      <Input
        {...field} error={!!error && touched}
        onInput ={(el)=>{
          // 入力中コンポーネント内のInputのステートを更新
          setInputVal((el as ChangeEvent<HTMLInputElement>).target.value);
        }}
        value={inputVal || field.value} // inputValは空なら、入力中ではないということなので、本フォームのfield.valueを反映させる。
        onChange={changeHandlerInput}
        />
      {(!!error && touched) &&
        <FormHelperText error={!!error && touched}>
          {error}
        </FormHelperText>}
    </FormControl>
  );
};