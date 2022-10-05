import { FormControl, FormLabel, Stack } from '@mui/material';
import { useMemo } from 'react';
import { KeyOfForm } from '../../form';
import { ProjectSchedulesContainer } from './ProjectSchedulesContainer';
import { ProjScheduleDate } from './ProjScheduleDate';
import { ProjScheduleDays } from './ProjScheduleDays';

export const ProjectSchedules = () => {

  const fields : [KeyOfForm, KeyOfForm, string][] = useMemo(()=>[
    ['startDate', 'startDaysAfterContract', '着手'],
    ['finishDate', 'finishDaysAfterContract', '完成'],
  ], []);

  return (
    <ProjectSchedulesContainer>
      {fields.map(([dateFName, daysFName, label]) => {
        return (
          <FormControl key={label}>
            <FormLabel>
              {label}
            </FormLabel>

            <Stack direction={'row'} spacing={2}>
              <ProjScheduleDate fieldName={dateFName} />
              <ProjScheduleDays fieldName={daysFName} />
            </Stack>
          </FormControl>
        );
      })}

      <ProjScheduleDate fieldName='completeDate' variant='outlined' label={'引渡し時期'}  />

    </ProjectSchedulesContainer>);
};