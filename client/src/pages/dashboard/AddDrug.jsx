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
import { Add, Close } from "@mui/icons-material";
import { request } from "../../request";
import { useSelector } from "react-redux";
import AlertComponent from "../../components/Alert";
import moment from "moment";
  export default function AddDrugForm({
  open,
  handleClose,
  handleAdd,
  nameEvent,
  stockEvent,
  supplierEvent,
  implicationsEvent,
  priceEvent,
  dosageEvent,
  expiryEvent,
}){
const [openAlert, setOpenAlert] = useState(false);
const [severity, setSeverity] = useState("success");
const [message, setMessage] = useState("");

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dial-heading">ADD/EDIT DRUG FORM</DialogTitle>
        <AlertComponent
          open={openAlert}
          severity={severity}
          message={message}
          close={() => {
            setOpenAlert(false);
          }}
        />
        <DialogContent>
          <DialogContentText>Kindly fill all fields</DialogContentText>
          <TextField
            margin="dense"
            label="Drug name"
            type="text"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={nameEvent}
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
            label="Supplier"
            type="text"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={supplierEvent}
          />
          <TextField
            margin="dense"
            onChange={implicationsEvent}
            label="Implications"
            type="text"
            fullWidth
            variant="outlined"
            className="dial-input"
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
            label="Dosage"
            type="text"
            fullWidth
            variant="outlined"
            onChange={dosageEvent}
            className="dial-input"
          />
          <TextField
            id="date"
            margin="dense"
            label="Expiry date"
            type="date"
            onChange={expiryEvent}
            variant="outlined"
            fullWidth
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
