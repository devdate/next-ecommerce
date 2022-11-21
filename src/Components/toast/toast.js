import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { alertContext } from "../../context/ColorModeContext";

function Toast(props) {
  const { alertOpen, closeAlertOpen, alertData } = useContext(alertContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeAlertOpen();
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alertOpen}
      autoHideDuration={alertData.time}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={alertData.type}
        sx={{ width: "100%" }}
      >
        {alertData.msg}
      </Alert>
    </Snackbar>
  );
}

export default Toast;
