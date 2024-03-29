import { useFormikContext } from 'formik';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { useCustGroupByProjId } from '../../../hooksQuery/useCustGroupByProjId';
import { TypeOfForm } from '../form';

export const useHandleProjId = () => {
  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { projId } = values;
  const { data } = useCustGroupByProjId(projId);

  useDeepCompareEffect(() => {
    if (data?.custGroupData && data?.projData) {
      const {
        projName,
        custGroupId,
        store,
        agents: projOfficers,
        postal: pPostal,
        address1: pAddress1,
        address2: pAddress2,

      } = data.projData;

      const {
        members,
        agents: custGroupAgents,
      } = data.custGroupData;

      const mainCust = members.value[0].value;
      const {
        customerName,
        address1, address2, postal,
      } = mainCust;

      const cocoAg = custGroupAgents.value
        .filter(item => (item.value.agentType.value as AgentType) === 'cocoAG' )
        ?.map(item => item.value.employeeName.value)
        .join('、 ') ?? '';

      const yumeAg = custGroupAgents.value
        .filter(item => (item.value.agentType.value as AgentType) === 'yumeAG' )
        ?.map(item => item.value.employeeName.value)
        .join('、 ') ?? '';

      const constAg = projOfficers.value
        ?.map(item => item.value.agentName.value)
        .join('、');

      const newFormData : Partial<TypeOfForm> = {

        projId,
        custGroupId: custGroupId.value,
        projName: projName.value,

        custName: customerName.value,
        custAddress: `〒${postal.value} ${address1.value}${address2.value}`,
        store: store.value,

        cocoAg: cocoAg,
        yumeAg: yumeAg,
        constAg: constAg,

        projAddress: `〒${pPostal.value} ${pAddress1.value}${pAddress2.value}`,

      };

      setValues(prev => ({
        ...prev,
        ...newFormData,
      }));
    }
  }, [data || {}]);
};