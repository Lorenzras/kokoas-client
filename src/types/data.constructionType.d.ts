declare namespace ConstructionTypes {
  interface Data {
    description: kintone.fieldTypes.MultiLineText;
    label: kintone.fieldTypes.SingleLineText;
    profitRate: kintone.fieldTypes.Number;
    projectName: kintone.fieldTypes.SingleLineText;
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
