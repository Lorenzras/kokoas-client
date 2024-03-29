declare namespace Estimates.middleItems {
  interface Data {
    備考: kintone.fieldTypes.SingleLineText;
    大項目: kintone.fieldTypes.Number;
    中項目名: kintone.fieldTypes.SingleLineText;
    大項目名: kintone.fieldTypes.SingleLineText;
  }
  interface SavedData extends Data {
    $id: kintone.fieldTypes.Id;
    $revision: kintone.fieldTypes.Revision;
    更新者: kintone.fieldTypes.Modifier;
    作成者: kintone.fieldTypes.Creator;
    レコード番号: kintone.fieldTypes.RecordNumber;
    更新日時: kintone.fieldTypes.UpdatedTime;
    作成日時: kintone.fieldTypes.CreatedTime;
  }
}
