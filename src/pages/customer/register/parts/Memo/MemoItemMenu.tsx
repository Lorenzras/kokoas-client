
import { Menu, MenuItem } from '@mui/material';
import { MemoFormType } from './memoForm/form';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ConfirmDialog } from '../../../../../components/ui/dialogs/ConfirmDialog';
import { useState } from 'react';

export interface MenuProps {
  anchorEl: HTMLElement | null,
  handleClose: (
    memoItem?: MemoFormType,
    method?: '削除' | '編集'
  )=>void
  memoItem: MemoFormType,
}

export const MemoItemMenu = (props: MenuProps) => {
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const {
    memoItem,
    anchorEl,
    handleClose,
  } = props;

  const open = Boolean(anchorEl);

  const handleClickDelete = () => {
    setIsConfirmDeleteOpen(true);

  };

  const handleAnswer = (answer: boolean) => {
    if (answer) {
      handleClose(memoItem, '削除');
    }
    setIsConfirmDeleteOpen(false);
  };



  return (
    <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={()=> handleClose()}

      >
      <MenuItem onClick={() =>handleClose(memoItem, '編集')}><EditIcon color={'action'} sx={{ mr: '8px' }}/> 編集</MenuItem>

      <MenuItem onClick={() => handleClickDelete()}><DeleteIcon color={'action'} sx={{ mr: '8px' }}/> 削除</MenuItem>
      <ConfirmDialog
        open={isConfirmDeleteOpen}
        content={'このメモを削除します。この操作は取り消せません。'}
        title={'本当に続けますか？'}
        handleAnswer={handleAnswer}
      />
    </Menu>
  );
};
