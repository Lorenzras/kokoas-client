import {  Divider, Grid, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSnackBar } from '../../../../hooks';
import { Loading } from './Loading';

import { downloadContract } from '../../api/docusign/downloadContract';
import { TypeOfForm } from '../../form';
import { base64ToBlob } from '../../../../lib';
import { PreviewToolBar } from '../PreviewToolBar/PreviewToolBar';
import { OutlinedDiv } from '../../../../components/ui/containers';
import { useFormikContext } from 'formik';
import { DocumentsSelect } from './SelectDocuments';
import { RefreshButton } from '../PreviewToolBar/RefreshButton';



export const Preview = () => {
  const { values, status } = useFormikContext<TypeOfForm>();
  const {
    projId, projName, envelopeId,
    envelopeStatus, envSelectedDoc,
    revision,
  } = values;
  const [previewUrl, setPreviewUrl] = useState('');
  const [previewLoading, setPreviewLoading] = useState(true);
  const { setSnackState } = useSnackBar();

  const handlePreview = async () => {
    try {


      setPreviewLoading(true);
      const res = await downloadContract({
        form: values,
        fileType: 'pdf',
      });

      if (!res) return;
      if (previewUrl) URL.revokeObjectURL(previewUrl); // free Memory

      const base64 = res;

      if (base64) {
        const blob = base64ToBlob( base64, 'application/pdf' );
        const url = URL.createObjectURL( blob );
        setPreviewUrl(url);
      } else {
        setPreviewUrl('');
      }

    } catch (err) {

      setSnackState({
        open: true,
        severity: 'error',
        message: `プレビューの取得が失敗しました。管理者をご連絡ください。${err.message}`,
      });

    } finally {
      setPreviewLoading(false);
    }

  };

  useEffect(()=>{

    if (!projId || !projName || (status as TFormStatus) === 'busy') return;

    handlePreview();
  }, [projId, projName, envelopeStatus,  revision, envSelectedDoc]);



  const loading = (status as TFormStatus) === 'busy' || previewLoading;
  //console.log('status', status);

  return (
    <Grid item xs={12} >
      <OutlinedDiv label="プレビュー">

        <Grid container justifyContent={'flex-end'} alignContent={'flex-start'} spacing={2} p={2}>
          <Grid item xs={6}>
            {/* <EnvelopeStatus envStatus={envelopeStatus} loading={loading} isVisible={!!projId}/> */}
            <RefreshButton loading={loading} isVisible={!!projId}/>
          </Grid>
          <Grid item xs={6}>
            <PreviewToolBar {...{ envelopeId, envelopeStatus, loading, projId, projName, previewLoading }} />
          </Grid>
          <Grid item xs={12}>
            <Divider/>
          </Grid>
          {!loading && previewUrl &&
            <Grid item xs={12}>
              <Paper>
                <DocumentsSelect />
                <embed src={previewUrl} width="100%" height='900px' />

              </Paper>
            </Grid>
        }

          {loading && projId &&
            <Grid item xs={12}>
              <Loading/>
              <Typography variant="caption">
                書類を作成しています。少々お待ちください。
              </Typography>
            </Grid>
        }

          {loading && !projId &&
            <Grid item xs={12}>
              <Typography variant="caption">
                プロジェクトを選択してください。
              </Typography>
            </Grid>
        }

          {envelopeId &&
            <Grid item xs={12}>
              <Typography variant="caption">
                Envelope Id: {envelopeId}
              </Typography>
            </Grid>
        }

        </Grid>
      </OutlinedDiv>
    </Grid>

  );
};