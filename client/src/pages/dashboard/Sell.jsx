import { useState } from "react";
import {
  TextField,
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { CancelOutlined, CurrencyExchange } from "@mui/icons-material";

export default function SellDial({
  open,
  handleClose,
  drugName,
  stock,
  price,
  event,
  quantity,
  handleSellDrug
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dial-heading">SELL DRUG</DialogTitle>
        <DialogContent>
          <DialogContentText>{drugName}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={event}
          />
          <DialogContentText>Stock: {stock}</DialogContentText>
          <DialogContentText>Price: &#8373;{price}</DialogContentText>
          <DialogContentText>
            Total cost: <b>&#8373;{price * quantity}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <CancelOutlined className="dial-icon cancel" />
          </Button>
          <Button onClick={handleSellDrug}>
            <CurrencyExchange className="dial-icon" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
