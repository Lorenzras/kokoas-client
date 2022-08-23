import {
  Grid,  Paper, Stack, Table, TableBody, TableCell,
  TableContainer, TablePagination,
  TableRow, Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { getComparator } from '../../../../helpers/table';
import { TKeyOfSearchResult, TSearchResult } from '../../api/searchProject';
import { EnhancedTableHead } from './EnhancedTableHead';
import { headCells, cellAlign } from './constants';
import { CellItem } from './CellItem';


export const TableResult = ({
  list,
}: {
  list: TSearchResult
}) => {
  //const { isSubmitting, values } = useFormikContext<TypeOfForm>();
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<TKeyOfSearchResult>('更新日時');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const rows = list;

  console.log('order', order, orderBy);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: TKeyOfSearchResult,
  ) => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {

    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Grid item xs={12} >
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer >
            <TablePagination
              labelRowsPerPage="表示件数を変更"
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Table
            aria-labelledby="tableTitle"
            size="small"
          >
              <EnhancedTableHead
              order={order}
              orderBy={orderBy as string}
              onRequestSort={handleRequestSort}
            />
              <TableBody>
                {/* if we need to support IE11, replace
                rows.slice().sort(getComparator(order, orderBy)) with `stableSort` */}
                {rows?.slice().sort(getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow

                      hover
                      tabIndex={-1}
                      key={row.顧客番号 + row.工事番号}

                    >

                        {headCells.map((headCellGroup, colIdx) => (
                          <TableCell
                          sx={{ maxWidth: '10%', verticalAlign: 'top' }}
                          key={headCellGroup.join('-')}
                          id={labelId}
                          scope="row"
                          padding="normal"
                          align = {cellAlign[colIdx]}
                        >
                            <Stack spacing={2} alignContent="flex-start">
                              {headCellGroup.map(headCellItem => {

                                return (
                                  <Tooltip key={headCellItem} title={headCellItem} placement="right" arrow>
                                    <div >
                                      <CellItem cellHeader={headCellItem} row={row}  />
                                    </div>
                                  </Tooltip>
                                );
                              })}

                            </Stack>



                          </TableCell>

                        ))}
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows, //(dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

        </Paper>

      </Box>
      {/*       <DetailsDialog
      open={Boolean(detailsDialogState?.open)}
      custGroupId={detailsDialogState?.custGroupdId}
      handleClose={()=> {setDetailsDialogState({ open: false, custGroupdId: '' });}}/> */}
    </Grid>
  );

};