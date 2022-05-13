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
import { AddPhotoAlternate, CancelOutlined, Check } from "@mui/icons-material";
import { request } from "../../request";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
export default function FormDialog({ open, handleClose }) {
  const { id } = useParams();
  const drug = useSelector((state) =>
    state.drugs.Drugs.find((d) => d.id === id)
  );
  console.log(drug);
  const [name, setName] = useState(drug.name);
  // const [stock, setStock] = useState(drug.stock);
  const [supplier, setSupplier] = useState(drug.supplier);
  const [implications, setImplications] = useState(
    drug.implications.toString()
  );
  const [dosage, setDosage] = useState(drug.dosage);
  const [price, setPrice] = useState(drug.price);
  const [file, setFile] = useState();
  const handleEdit = async () => {
    const drugDetails = {
      name,
      supplier,
      implications: implications.split(", "),
      dosage,
      price,
    };
    const res = await request.put(`/drugs/${id}`, drugDetails);
    alert(res.data);
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
            label="Drug name"
            value={name}
            type="text"
            fullWidth
            variant="outlined"
            className="dial-input"
            onChange={(e) => setName(e.target.value)}
          />
          {/* <TextField
            margin="dense"
            label="stock"
            type="number"
            fullWidth
            value={stock}
            variant="outlined"
            className="dial-input"
            onChange={(e) => setStock(e.target.value)}
          /> */}
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
          <Button onClick={() => handleEdit()}>
            <Check />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
