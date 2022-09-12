import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RenderRows from './RenderRows';
import { TypeOfForm } from '../form';
import { materialsNameList } from '../constantDefinition';
import { FieldArrayRenderProps } from 'formik';

export type QuoteTableProps = {
  arrayHelpers: FieldArrayRenderProps, 
  values: TypeOfForm,
};

/**
 * 見積もりテーブルを作成する
 * @param arrayHelpers 
 * @returns 
 */
export default function QuoteTable(props : QuoteTableProps) {
  const { arrayHelpers, values } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {materialsNameList.map((item)=>{
              return (<TableCell key={`${item}_header`}>
                {item}
              </TableCell>);
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          <RenderRows arrayHelpers={arrayHelpers} values={values} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}