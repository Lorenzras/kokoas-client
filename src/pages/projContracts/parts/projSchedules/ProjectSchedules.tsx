import { Stack } from '@mui/material';
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
          <Stack key={label} direction={'row'} spacing={2}>
            <ProjScheduleDate fieldName={dateFName} label={label} />
            <ProjScheduleDays fieldName={daysFName} />
          </Stack>
        );
      })}
    </ProjectSchedulesContainer>);
};