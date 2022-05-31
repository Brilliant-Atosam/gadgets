import {
  TextField,
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Close, Check } from "@mui/icons-material";
export default function FormDialog({
  open,
  handleClose,
  name,
  nameEvent,
  brand,
  brandEvent,
  specs,
  specsEvent,
  price,
  priceEvent,
  handleEdit,
}) {
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dial-heading">ADD/EDIT ITEM FORM</DialogTitle>
        <DialogContent>
          <DialogContentText>Kindly fill all fields</DialogContentText>
          <TextField
            margin="dense"
            label="Item name"
            value={name}
            type="text"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={nameEvent}
          />
          <TextField
            margin="dense"
            label="Brand"
            type="text"
            fullWidth
            value={brand}
            variant="outlined"
            className="dial-input"
            onChange={brandEvent}
          />
          <TextField
            margin="dense"
            onChange={specsEvent}
            label="Specifications"
            type="text"
            value={specs}
            fullWidth
            variant="outlined"
            className="dial-input"
          />
          <TextField
            margin="dense"
            onChange={priceEvent}
            label="Price"
            type="number"
            value={price}
            fullWidth
            variant="outlined"
            className="dial-input"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Close className="dial-icon cancel" />
          </Button>
          <Button onClick={handleEdit}>
            <Check />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
