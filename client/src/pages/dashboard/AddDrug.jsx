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
import { Add, AddPhotoAlternate, CancelOutlined } from "@mui/icons-material";
import { request } from "../../request";

export default function FormDialog({ open, handleClose }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState();
  const [supplier, setSupplier] = useState("");
  const [implications, setImplications] = useState("");
  const [dosage, setDosage] = useState("");
  const [price, setPrice] = useState();
  const [file, setFile] = useState();
  const formData = new FormData();
  const drugDetails = { name, stock, supplier, implications, dosage, price };
  formData.append(`drug`, file);
  console.log(formData);
  //   formData.append("details", drugDetails);
  const handleAdd = async () => {
    // const res = await request.post("/drugs", formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });
    // alert(res.data);
  };
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="dial-heading">ADD/EDIT DRUG FORM</DialogTitle>
        <DialogContent>
          <DialogContentText>Kindly fill all fields</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            // id="name"
            label="Drug name"
            type="text"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            // id="name"
            label="stock"
            type="number"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={(e) => setStock(e.target.value)}
          />
          <TextField
            margin="dense"
            // id="name"
            label="Supplier"
            type="text"
            fullWidth
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
          <label htmlFor="drug-img">
            <AddPhotoAlternate className="file-picker" />
          </label>
          <TextField
            margin="dense"
            id="drug-img"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {file && (
            <img
              alt={name}
              className="img-preview"
              src={URL.createObjectURL(file)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <CancelOutlined className="dial-icon cancel" />
          </Button>
          <Button onClick={() => handleAdd()}>
            <Add className="dial-icon" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
