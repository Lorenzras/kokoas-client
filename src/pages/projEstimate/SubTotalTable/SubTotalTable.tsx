import { Paper, Table, TableBody, TableContainer, TableHead } from '@mui/material';
import { useSubTotalCalc } from '../hooks/useSubTotalCalc';
import SubTotalHead from './SubTotalHead';
import { SubTotalRow } from './SubTotalRow';

export const SubTotalTable = () => {
  const rows = useSubTotalCalc();

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <SubTotalHead />
        </TableHead>
        <TableBody>
          {rows.map(([key, value]) => <SubTotalRow key={key} majorItem={key} value={value} />)}
        </TableBody>
      </Table>
    </TableContainer>
  );
};