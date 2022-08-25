import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TypeOfProjForm } from '..';
import { Shortcuts } from '../../../components/ui/speedDials/Shortcuts';
import { generateParams, getParams } from '../../../helpers/url';
import { pages } from '../../Router';

export const ProjectShortCuts = () => {
  const { values: { custGroupId, recordId } } = useFormikContext<TypeOfProjForm>();
  const navigate = useNavigate();

  return (
    <Shortcuts
    shortcuts={[
      {
        type: 'custGroup',
        handleClick: ()=>navigate(`${pages.custGroupEdit}?${generateParams({
          ...getParams(),
          projId: recordId,
          custGroupId: custGroupId,
        })}`),
      },
      {
        type: 'prospect',
        handleClick: ()=>navigate(`${pages.projProspect}?${generateParams({
          ...getParams(),
          projId: recordId,
        })}`),
      },
      {
        type: 'contract',
        handleClick: ()=>navigate(`${pages.projContractPreview}?${generateParams({
          ...getParams(),
          projId: recordId,
        })}`),

      },
    ]}

  />);
};