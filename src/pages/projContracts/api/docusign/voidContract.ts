import { ErrorDetails } from 'docusign-esign';
import { yumecocoDocusign } from '../../../../config/settings';

export const voidContract = async (params: IVoidReq) => {

  try {

    if (!params.envelopeId) throw new Error('エンベロープ番号は定義されていません。');
    if (!params.voidedReason) throw new Error('無効にする理由は定義されていません。');
    const endpoint = `${yumecocoDocusign.baseUrl}/docusign/contract/void`;

    const data = params;

    const [body, status] = await kintone.proxy(
      endpoint,
      'POST',
      { 'Content-Type': 'application/json' },
      data,
    );

    if (status === 200) {
      return JSON.parse(body) as IVoidRes ;
    } else {
      const error: ErrorDetails =  JSON.parse(body);
      throw new Error(error.message);
    }

  } catch (err : any) {
    throw new Error(` ${err.message}`);
  }

};
