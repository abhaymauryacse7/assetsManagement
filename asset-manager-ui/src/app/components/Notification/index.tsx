/**
 *
 * Notification
 *
 */
import React, { memo } from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

interface Props {
  openSuccessNotification: boolean;
  openErrorNotification: boolean;
  notificationMessage: string;
  handleNotificationClose: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Notification = memo((props: Props) => {
  const {
    openSuccessNotification,
    openErrorNotification,
    notificationMessage,
    handleNotificationClose,
  } = props;
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={openSuccessNotification}
        autoHideDuration={3000}
        onClose={handleNotificationClose}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openErrorNotification}
        autoHideDuration={5000}
        onClose={handleNotificationClose}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {notificationMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
});
