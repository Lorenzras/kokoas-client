import { useFormikContext, FormikErrors } from 'formik';
import { useEffect } from 'react';
import { isArray } from '../../helpers/utils';
import './scrollToField.css';

export const getFieldErrorNames = (formikErrors: FormikErrors<unknown>) => {

  /* According to docs, Formik generates dot notation for nested field names, eg. customers.0.custName
    but when I checked it generated customers[0].custName
  */

  const transformObject = (obj: any, prefix = '', result: string[] = [], isArr = false) => {
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (!value) return;

      let nextKey = key ;

      if (prefix){
        if ( isArr){
          nextKey = `${prefix}[${key}].`;
          console.log('Is');
        } else {
          nextKey = `${prefix}${key}`;
        }
      }
      if (typeof value === 'object') {
        transformObject(value, nextKey, result, isArray(value));
      } else {
        result.push(nextKey);
      }
    });
    return result; //[store]
  };

  return transformObject(formikErrors);
};

const scrollIntoViewThenShake = (element: Element | null) => {
  if (!element) return;

  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const parentInputEl = element.closest('.MuiFormControl-root');

  if (!parentInputEl) return;

  parentInputEl.classList.add('shakes');

  setTimeout(()=>{
    parentInputEl.classList.remove('shakes');
  }, 1000);

};

export const ScrollToFieldError = () => {
  const { submitCount, isValid, errors } = useFormikContext();

  useEffect(() => {

    if (isValid) return;

    const fieldErrorNames = getFieldErrorNames(errors);
    if (fieldErrorNames.length <= 0) return;

    fieldErrorNames
      .map((item) => (
        document.querySelector(`input[name='${item}']`)
      ))
      .filter((el: HTMLInputElement) => !!el && !el.disabled)
      .forEach((element, index) => {
        setTimeout(()=>{
          scrollIntoViewThenShake(element);
        }, 500 * index);
      });

  }, [submitCount]);

  return null;
};