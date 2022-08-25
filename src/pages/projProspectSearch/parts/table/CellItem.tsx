import { Link } from 'react-router-dom';
import { dateStrToJA } from '../../../../helpers/utils';
import { pages } from '../../../Router';
import { TKeyOfSearchResult, TSearchResult } from '../../api/searchProject';
import { numerals } from 'jp-numerals';
import { generateParams } from '../../../../helpers/url';

export const CellItem = (
  props:
  {
    cellHeader: TKeyOfSearchResult,
    row: TSearchResult[number],
  },
) => {

  const { cellHeader, row } = props;
  const cellValue = row[cellHeader];

  if (!cellValue ) {
    return <>-</>;
  }

  switch (cellHeader) {
    case '工事番号': return (
      <Link
        to={`${pages.projEdit}?${generateParams({
          projId: row['工事番号'],
        })}` }
        target="_blank"
        rel="noopener noreferrer">
        {cellValue}
      </Link>);
    case '顧客番号': return (
      <Link
        to={`${pages.custGroupEdit}?${generateParams({
          projId: row['工事番号'],
          custGroupId: row['顧客番号'],
        })}`}
        target="_blank"
        rel="noopener noreferrer">
        {cellValue}
      </Link>
    );

    case '更新日時':
    case '作成日時': return (
      <>{dateStrToJA(cellValue?.toString())}</>
    );

    case '契約予定金額': return (
      <>{numerals(+cellValue).toString()}円</>
    );

    case '不動産決済日':
    case '契約予定':
    case '設計申込日': return (
      <>{dateStrToJA(cellValue?.toString(), false)}</>
    );

    case '経過日数': return (
      <>{cellValue}日</>
    );


    default: return (
      <> {cellValue} </>
    );
  }


};