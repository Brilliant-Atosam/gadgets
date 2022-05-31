import {
  TextField,
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
export default function AddItemForm({
  open,
  handleClose,
  handleAdd,
  nameEvent,
  stockEvent,
  priceEvent,
  brandEvent,
  specsEvent,
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
            variant="outlined"
            onChange={brandEvent}
            className="dial-input"
          />
          <TextField
            margin="dense"
            label="stock"
            type="number"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={stockEvent}
          />

          <TextField
            margin="dense"
            onChange={priceEvent}
            label="Price"
            type="number"
            fullWidth
            variant="outlined"
            className="dial-input"
          />

          <TextField
            margin="dense"
            label="Specifications"
            type="text"
            fullWidth
            variant="outlined"
            onChange={specsEvent}
            className="dial-input"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Close className="dial-icon cancel" />
          </Button>
          <Button onClick={handleAdd}>
            <Add className="dial-icon" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
