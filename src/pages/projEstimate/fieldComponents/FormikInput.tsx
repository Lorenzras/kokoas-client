import { debounce, FormControl, FormHelperText, Input } from '@mui/material';
import { useField } from 'formik';
import { ChangeEvent, useState } from 'react';

export const FormikInput = (
  { name, handleChange }:
  {
    name: string,
    handleChange?: (inputval: string) => void
  },
) => {
  const [field, meta, helpers] = useField(name);

  // 入力中一時的にコンポーネント内にInputのステートを管理する
  const [inputVal, setInputVal] = useState<string | null>(null);
  const { error, touched } = meta;


  const changeHandlerInput
  : React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined

    = debounce((el: ChangeEvent<HTMLInputElement>) => {
      if (handleChange) {
        handleChange(el.target.value);
      } else {
        field.onChange(el);
      }      
      setInputVal(null); // 本フォームのステート画面に反映させるように、リセットする。
    }, 1000);


  return (
    <FormControl variant="standard">
      <Input
        {...field} error={!!error && touched}
        onInput={(el) => {
          // 入力中コンポーネント内のInputのステートを更新
          if (!touched) helpers.setTouched(true);

          setInputVal((el as ChangeEvent<HTMLInputElement>).target.value);
        }}
        value={inputVal === null ? field.value : inputVal} // inputValは空なら、入力中ではないということなので、本フォームのfield.valueを反映させる。
        onChange={changeHandlerInput}
        sx={{ minWidth: 60 }}
      />
      {(!!error && touched) &&
        <FormHelperText error={!!error && touched}>
          {error}
        </FormHelperText>}
    </FormControl>
  );
};