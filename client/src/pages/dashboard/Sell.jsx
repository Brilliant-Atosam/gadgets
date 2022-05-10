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
import {
  CancelOutlined,
  CurrencyExchange,
} from "@mui/icons-material";
import { request } from "../../request";

export default function SellDial({
  open,
  handleClose,
  drugName,
  stock,
  price,
}) {
  const [quantity, setQuantity] = useState(0);
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
            onChange={(e) => setQuantity(e.target.value)}
          />
          <DialogContentText>Stock: {stock}</DialogContentText>
          <DialogContentText>Price: {price}</DialogContentText>
          <DialogContentText>
            Total cost: <b>{price * quantity}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <CancelOutlined className="dial-icon cancel" />
          </Button>
          <Button onClick={() => alert()}>
            <CurrencyExchange className="dial-icon" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
