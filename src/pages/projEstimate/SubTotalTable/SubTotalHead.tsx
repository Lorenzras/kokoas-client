import { TableCell, TableRow } from '@mui/material';

const SubTotalHead = () => {
  return (
    <TableRow>
      <TableCell>
        大項目
      </TableCell>
      <TableCell align='right'>
        大項目小計
      </TableCell>
    </TableRow>
  );
};

export default SubTotalHead;