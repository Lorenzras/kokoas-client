import { Stack } from '@mui/material';

import { ChoiceButton } from './ChoiceButton';

export const MethodChoice = ({
  handleSendContract,
}:{
  handleSendContract: (
    signMethod: ReqSendContract['signMethod']
  ) => void
}) => {

  return (
    <Stack spacing={2} direction={'column'}>

      <ChoiceButton
        mainLabel='電子手続き'
        secondaryLabel='顧客と担当者が電子サインしたら、店長と経理が最終確認を行います。'
        handleClick={()=> handleSendContract('electronic')}
      />

      <ChoiceButton
        mainLabel='紙印刷'
        secondaryLabel='担当者が印刷し、サインが出来たら、またこちらにアップロードしてください。店長と経理が最終確認を行います。'
        handleClick={()=> handleSendContract('wetInk')}
      />

    </Stack>
  );
};