
import { Box, Tab,  Skeleton  } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { DTCustomer } from './DTCustomer';
import { DTProject } from './DTProject';
import { useState, useEffect, SyntheticEvent } from 'react';
import { getCustGroup } from '../../../../../api/kintone/custgroups/GET';
import { ButtonEdit } from './ButtonEdit';
import { getConstRecordByIds } from '../../../../../api/kintone/construction/GET';
import { pages } from '../../../../Router';
import { generateParams } from '../../../../../helpers/url';

export function DetailsTabs(props : {
  custGroupId?: string,
}) {
  const { custGroupId } = props;
  const [tabValue, setTabValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const [record, setRecord] = useState<CustomerGroupTypes.SavedData>();
  const [fetchedProjects, setFetchedProjects] = useState<ProjectDetails.SavedData[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const projectIds =  record?.projects?.value
    .map(item => item.value.constructionId.value)
    .filter(Boolean) ?? [];

  useEffect(()=>{
    if (projectIds.length && !fetchedProjects && tabValue === '2') {
      getConstRecordByIds(
        projectIds,
      ).then(result => {
        console.log('triggered');
        setFetchedProjects(result.records as unknown as ProjectDetails.SavedData[]);
      });
    }
  }, [JSON.stringify(projectIds), fetchedProjects, tabValue]);

  useEffect(()=>{
    if (custGroupId) {
      setLoading(true);
      getCustGroup(custGroupId)
        .then(resp => {
          console.log('triggered!');
          setLoading(false);
          setRecord(resp);
        });
    }
  }, [custGroupId]);

  const isWithProject = Boolean(record?.projects.value
    .filter(item=>item.value.constructionId.value)
    .length);

  console.log(isWithProject, record?.projects.value);
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext  value={tabValue}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList variant='fullWidth' onChange={handleChange} >
            <Tab label="顧客情報" value="1" />
            <Tab label="工事情報" value="2" disabled={!isWithProject} />
          </TabList>
        </Box>
        <TabPanel value="1">
          <DTCustomer {...{ record, loading }} />
          <ButtonEdit link={`${pages.custGroupEdit}?${generateParams({
            custGroupId,
          })}`}/>
        </TabPanel>
        <TabPanel value="2">
          {
            fetchedProjects &&
            <DTProject fetchedProjects={fetchedProjects} />
          }

          {
            !fetchedProjects &&
            <Skeleton variant="rectangular" width={210} height={118}/>
          }
        </TabPanel>
      </TabContext>
    </Box>
  );
}
