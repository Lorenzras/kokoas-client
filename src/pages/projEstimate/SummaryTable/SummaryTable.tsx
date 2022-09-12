import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { summaryNameList } from '../constantDefinition';
import DisplayCellContent from './DisplayCellContent';
import { KeyOfForm } from '../form';

export default function SummaryTable() {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {summaryNameList.map((item) => {
              return (<TableCell key={`${item}_header`}>
                <Typography variant="subtitle2" gutterBottom>
                  {item}
                </Typography>
              </TableCell>);
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {/* {(['costPrice'] as TKMaterials[]).map((item)=>item)} */}
            {/* {Object.keys(initialValues.items).map((item) => { */}
            {(['totalCost', 'grossProfit', 'grossProfitMargin', 
              'taxAmount', 'taxExcludedAmount', 'amountIncludingTax'] as KeyOfForm[])
              .map((item)=> {
                return (
                  <TableCell key={`${item}_header`}>
                    <DisplayCellContent name={item} />
                  </TableCell>
                );
              })}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}