import { CardContent, Stack } from '@mui/material';
import { LabeledInfo } from '../../../../../../components/ui/typographies';
import { generateParams } from '../../../../../../helpers/url';
import { pages } from '../../../../../Router';
import { ButtonEdit } from '../ButtonEdit';

export const ProjectDetails = ({
  projectDetailsData : {
    postal, address1, address2,
    $id, projTypeName, projName,
    buildingType, agents, isAgentConfirmed, addressKari,
  },
}: {
  projectDetailsData : ProjectDetails.SavedData
}) => {

  const constructionOfficer =  agents.value
    .filter(item=>item.value.agentId.value)
    .map(item=>item.value.agentName.value)
    .join(', ');

  return (

    <CardContent sx={{ width: '40%' }}>
      <Stack spacing={1}>
        <LabeledInfo label="工事番号" info={$id.value} />
        <LabeledInfo label="工事種別" info={projTypeName.value} />
        <LabeledInfo label="工事名称" info={projName.value} />
        <LabeledInfo label="建物種別" info={buildingType.value} />
        <LabeledInfo
          label="工事住所"
          info={[postal.value, address1.value, address2.value]
            .filter(Boolean)
            .map(item=>item)
            .join(' ')}
        />
        <LabeledInfo
          label="工事担当"
          info={constructionOfficer}
        />

        <LabeledInfo label="担当確定" info={+isAgentConfirmed.value ? 'はい' : 'いいえ'} />
        <LabeledInfo label="仮換地地番" info={addressKari.value} />
        <ButtonEdit link={`${pages.projEdit}?${generateParams({
          projId: $id.value,
        })}`}
        />
      </Stack>
    </CardContent>


  );
};