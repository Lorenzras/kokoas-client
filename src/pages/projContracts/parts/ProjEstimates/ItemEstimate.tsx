import { Divider, Stack, Typography } from '@mui/material';
import { numerals } from 'jp-numerals';

import { ComponentProps } from 'react';
import { dateStrToJA, isNumber } from '../../../../helpers/utils';

export const ItemEstimate = ({
  dateCreated,
  contractPrice,
  id,
}: {
  dateCreated: string,
  contractPrice: string,
  id: string,
}) => {

  /**
   * [label, info, unit?][]
   */
  const contents = [
    ['作成日', dateStrToJA(dateCreated)],
    ['契約金額', `${contractPrice}`, '円'],
    ['番号', id],
  ];
  return (
    <Stack width={'100%'} direction={'row'} spacing={2} alignItems="center" justifyContent="space-around" divider={<Divider orientation="vertical" flexItem />}>
      {
      contents.map(([label, info, unit])=>{
        const isInfoNum = isNumber(info);
        const align: ComponentProps<typeof Typography>['textAlign']  = isInfoNum ? 'right' : 'left';
        let normInfo = info;

        if (unit === '円' && isInfoNum) {
          normInfo = numerals(+info).toString();
        }

        return (
          <Stack direction={'column'} key={label} width={'33%'}>
            <Typography textAlign={align} variant="caption">{label}</Typography>
            <Typography textAlign={align} variant="body1">{`${normInfo}${unit ?? ''}`}</Typography>
          </Stack>
        );
      })
      }

    </Stack>
  );
};