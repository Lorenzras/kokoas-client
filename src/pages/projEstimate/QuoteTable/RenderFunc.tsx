import QuoteTable from './QuoteTable';
import { buzaiListInit } from '../constantDefinition';
import { Button } from '@mui/material';
import { FieldArrayRenderProps, FormikProps } from 'formik';
import { TypeOfForm } from '../form';

export const RenderFunc = (arrayHelpers: FieldArrayRenderProps) => {
  const { form, push } = arrayHelpers;
  const { values } = form as FormikProps<TypeOfForm>;

  // console.log('renderFunc', values);

  // 部材numberの中の最大値を取得する
  const newNumber = () => {
    const newNum = values.items.map((item) => {
      return item.number;
    });
    // console.log('test', newNum);
    return Math.max.apply(null, newNum) + 1;
  };

  return (
    <div>
      <div>
        <QuoteTable arrayHelpers={arrayHelpers} values={values} />
      </div>
      <Button
        variant="outlined"
        onClick={() => push({
          ...buzaiListInit,
          number: newNumber(),
        })}
        sx={{
          textAlign: 'right',
        }}
      >
        追加
      </Button>
    </div>
  );
};