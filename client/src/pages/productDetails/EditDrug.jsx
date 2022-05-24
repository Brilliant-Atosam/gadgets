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
import { AddPhotoAlternate, Close, Check } from "@mui/icons-material";
import { request } from "../../request";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import AlertComponent from "../../components/Alert";
import moment from "moment";
export default function FormDialog({ open, handleClose }) {
  const { id } = useParams();
  let Drug = useSelector((state) =>
    state.drugs.Drugs?.find((d) => d.id === id)
  );
  const [drug, setDrug] = useState(Drug);
  const [name, setName] = useState(drug.name);
  const [supplier, setSupplier] = useState(drug.supplier);
  const [implications, setImplications] = useState(
    drug.implications.toString()
  );
  const [expiry, setExpiry] = useState(drug.expiry);
  const [dosage, setDosage] = useState(drug.dosage);
  const [price, setPrice] = useState(drug.price);
  // ALERT INFO
  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const handleEdit = async () => {
    setOpenAlert(true);
    const drugDetails = {
      name,
      supplier,
      implications: implications.split(", "),
      dosage,
      price,
      expiry: moment(expiry).format("MM/DD/YYYY"),
      id: (Math.floor(Math.random() * 100000) + 100000).toString().substring(1),
    };
    try {
      await request.put(`/drugs/${id}`, drugDetails);
      setDrug(drugDetails);
      
    } catch (err) {
      setMessage(err.response.data);
      setSeverity("error");
    }
  };
  return (
    <div>
      <AlertComponent
        open={openAlert}
        severity={severity}
        message={message}
        close={() => setOpenAlert(false)}
      />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dial-heading">ADD/EDIT DRUG FORM</DialogTitle>
        <DialogContent>
          <DialogContentText>Kindly fill all fields</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Drug name"
            value={name}
            type="text"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Supplier"
            type="text"
            fullWidth
            value={supplier}
            variant="outlined"
            className="dial-input"
            onChange={(e) => setSupplier(e.target.value)}
          />
          <TextField
            margin="dense"
            onChange={(e) => setImplications(e.target.value)}
            label="Implications"
            type="text"
            value={implications}
            fullWidth
            variant="outlined"
            className="dial-input"
          />
          <TextField
            margin="dense"
            onChange={(e) => setPrice(e.target.value)}
            label="Price"
            type="number"
            value={price}
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
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            className="dial-input"
          />
          <TextField
            variant="outlined"
            margin="dense"
            fullWidth
            label="Expiry date"
            type="date"
            onChange={(e) => setExpiry(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Close className="dial-icon cancel" />
          </Button>
          <Button onClick={() => handleEdit()}>
            <Check />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
