import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import AlertComponent from "./Alert";

export default function Password({
  open,
  close,
  reset,
  severity,
  message,
  openAlert,
  closeAlert,
  oldEvent,
  newEvent,
  confirmEvent,
}) {
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>PASSWORD RESET FORM</DialogTitle>
      <AlertComponent
        severity={severity}
        message={message}
        open={openAlert}
        close={closeAlert}
      />
      <DialogContent>
        <DialogContentText>
          <TextField
            margin="dense"
            label="Old password"
            type="password"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={oldEvent}
          />
          <TextField
            margin="dense"
            label="New password"
            type="password"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={newEvent}
          />
          <TextField
            margin="dense"
            label="Confirm new password"
            type="password"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={confirmEvent}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button onClick={reset}>Reset</Button>
      </DialogActions>
    </Dialog>
  );
}
