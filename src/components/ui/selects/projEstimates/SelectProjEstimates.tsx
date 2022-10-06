import {  Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateParams } from '../../../../helpers/url';
import { pages } from '../../../../pages/Router';
import { useEstimateRecords } from '../../../../hooks/';
import { ItemEstimate } from './ItemEstimate';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { calculateEstimateRecord } from '../../../../api/others/calculateEstimateRecord';

export const SelectProjEstimates = ({
  projId,
  selectedProjEstimateId,
  handleChange,
}: {
  projId: string,
  selectedProjEstimateId: string,

  /** Can pass an optional handleChange
   * to capture selected 見積 and projEstimateId to process it.
   */
  handleChange?: (
    selected?: Estimates.main.SavedData,
    projEstimateId?: string,
    calculated?: Awaited<ReturnType<typeof calculateEstimateRecord>>
  ) => void
}) => {

  const {
    projEstimateRecords,
  } = useEstimateRecords(projId);


  const navigate = useNavigate();

  /**
   * リファレンス安定しないhandleChangeが渡されても、対応する。
   */

  const emptyOption: OptionNode = useMemo(() =>  ({
    value: '',
    key: 'clear',
    component: '---',
  }), []);

  const registerNewOption: OptionNode = useMemo(() =>  ({
    value: '',
    key: 'new',
    component: (
      <Button
        onClick={() => navigate(`${pages.projEstimate}?${generateParams({ projId, projEstimateId: selectedProjEstimateId })}`)}
        variant="text" color={'inherit'}
        fullWidth disableRipple
      >
        見積作成
      </Button>
    ),
  }),
  /**
   * navigateは依存配列として不安定
   * https://github.com/remix-run/react-router/issues/7634
   * */
  [projId]);

  /**
   * 本選択肢
   */
  const actualOptions: OptionNode[] = projEstimateRecords.map<OptionNode>((rec)=>{
    const { $id } = rec;
    return {
      value: $id.value,
      key: $id.value,
      component: (
        <ItemEstimate
          estimateRecord={rec}
        />),
    };
  });

  /* 選択された見積レコードと番号をhandleChangeに渡す。 */
  const handleSelectedValue = async (selectedValue: string) => {
    
    const selectedRecord = projEstimateRecords
      .find(({ $id }) => $id.value === selectedValue);
    const calculated = selectedRecord ? await calculateEstimateRecord(selectedRecord) : Object.create(null);

    handleChange?.(
      selectedRecord,
      selectedValue,
      calculated,
    );

  };

  const options = projId ? [emptyOption, ...actualOptions, registerNewOption  ] : [registerNewOption];

  useDeepCompareEffect(() => {
    if (projEstimateRecords.length && selectedProjEstimateId) {
      handleSelectedValue(selectedProjEstimateId);
    }
  }, [projEstimateRecords || {}, selectedProjEstimateId]);



  return (
    <FormControl 
      fullWidth 
      disabled={!projId}
    >
      <InputLabel>
        見積選択
      </InputLabel>
      <Select
        variant={'outlined'}
        label={'見積選択'}
        value={selectedProjEstimateId || ''}
        onChange={(e)=>{
          handleSelectedValue(e.target.value);
        }}
      >
        {options?.map((option) => {
          const isSelected = option.value === selectedProjEstimateId;
          return (
            <MenuItem key={option.key} value={option.value} selected={isSelected}>
              {option.component}
            </MenuItem>
          );
        })}

      </Select>

    </FormControl>

  );
};