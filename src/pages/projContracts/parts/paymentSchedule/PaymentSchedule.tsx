import { Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { RefundFieldGroup } from './RefundFieldGroup';
import { PaymentContainer } from './PaymentContainer';
import { PaymentFields } from './PaymentFields';
import { RemainingAmountInfo } from './RemainingAmountInfo';
import { TotalPaymentAmount } from './TotalPaymentAmount';
import useDeepCompareEffect from 'use-deep-compare-effect';

export const PaymentSchedule = ({
  totalAmount = 0,
}: {
  totalAmount?: number
}) => {
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { paymentFields, remainingAmt } = values;


  useDeepCompareEffect(() => {

    const newRemainingAmt = paymentFields
      .reduce((acc, { amount }) => acc - +amount, totalAmount);
    setValues((prev) => ({ ...prev, remainingAmt: newRemainingAmt }));

  }, [paymentFields || {}, totalAmount, remainingAmt]);




  return (
    <PaymentContainer>
      <Stack spacing={2}>

        <TotalPaymentAmount totalAmount={totalAmount} />

        <PaymentFields />

        <RemainingAmountInfo />

        <RefundFieldGroup />



      </Stack>
    </PaymentContainer>
  );
};