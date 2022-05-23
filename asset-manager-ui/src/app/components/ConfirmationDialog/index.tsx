/**
 *
 * ConfirmationDialog
 *
 */
import React, { memo } from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

interface Props {
  id: string;
  keepMounted: boolean;
  open: boolean;
  onClose: (value?: boolean) => void;
  title: string;
  content: string;
  option1: string;
  option2: string;
}

export const ConfirmationDialog = memo((props: Props) => {
  const { onClose, open, title, content, option1, option2, ...other } = props;
  const radioGroupRef = React.useRef<HTMLElement>(null);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>{content}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          {option1}
        </Button>
        <Button onClick={handleOk}>{option2}</Button>
      </DialogActions>
    </Dialog>
  );
});
