import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { TypeOfForm } from '..';
import { Shortcuts } from '../../../components/ui/speedDials/Shortcuts';
import { generateParams } from '../../../helpers/url';
import { pages } from '../../Router';

export const ProspectShortcuts = () => {
  const {
    values: {
      projId,
      custGroupId,
    },
  } = useFormikContext<TypeOfForm>();
  const navigate = useNavigate();

  return (
    <>
      {projId &&
      <Shortcuts
        shortcuts={[
          {
            type: 'project',
            handleClick: ()=>navigate(`${pages.projEdit}?${generateParams({
              projId,
            })}`),
          },
          {
            type: 'contract',
            handleClick: ()=>navigate(`${pages.projContractPreview}?${generateParams({
              projId,
            })}`),
          },
          {
            type: 'custGroup',
            handleClick: ()=>navigate(`${pages.custGroupEdit}?${generateParams({
              projId, custGroupId,
            })}`),
          },
        ]}

      />
      }
    </>
  );
};