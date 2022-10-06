import { Alert, Fade } from '@mui/material';
import { useField } from 'formik';
import {   useRef, useState } from 'react';
import { useLazyEffect } from '../../../../hooks';
import { getFieldName, TypeOfForm } from '../../form';

export const RemainingAmountInfo = () => {

  const [field, meta] = useField<TypeOfForm['remainingAmt']>(getFieldName('remainingAmt'));
  const { value: remainingAmt, name } = field;
  const { error } = meta;

  const [animAmt, setAnimAmt] = useState(remainingAmt || 0);

  const oldAmt = useRef(remainingAmt || 0);



  useLazyEffect(()=>{
    if (remainingAmt === undefined) return;

    const oldDiff = remainingAmt - oldAmt.current;
    const interval = 10;
    const timeout = 800;
    const numOfCalls = timeout / interval;

    const increment =  oldDiff / numOfCalls;


    let c = 0;
    const intervalId = setInterval(()=>{
      setAnimAmt(prev => prev + increment);

      if (c++ === numOfCalls || remainingAmt === 0) {
        clearInterval(intervalId);
        setAnimAmt(remainingAmt);
        oldAmt.current = remainingAmt;
      }

    }, interval);

    return () => clearInterval(intervalId);
  }, [remainingAmt], 800);


  const newNum = Math.round(animAmt);
  const isNumber = !isNaN(newNum);


  return (

    <Fade in={remainingAmt !== undefined} timeout={2000}>
      <Alert id={name} severity={!error ? 'success' : 'warning'} >

        {!error && '契約合計と請求額が合っています。'}

        {!!error &&  `${error}`}

        {!!error && isNumber && (
        <div>
          {`相違額： ${newNum?.toLocaleString()} 円 。`}
        </div>)}
      </Alert>
    </Fade>

  );
};