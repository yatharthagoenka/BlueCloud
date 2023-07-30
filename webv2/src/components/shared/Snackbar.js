import React from "react";
import { Snackbar, Alert } from "@mui/material";

function SnackbarComponent(props) {
  const { open, handleClose, severity, message } = props;
  return (
    <div>
      <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackbarComponent;