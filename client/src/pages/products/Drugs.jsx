import {
  ArrowForwardIos,
  MedicalServices,
  Restore,
  CancelOutlined,
  CurrencyExchange,
  AddPhotoAlternate,
  Add,
  Edit,
  Visibility,
} from "@mui/icons-material";
import moment from "moment";
import FormDialog from "../dashboard/AddDrug";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../components/Table";
import { drugsStart, drugsSuccess, drugsFailure } from "../../redux/drugs";
import {
  TextField,
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { request } from "../../request";
import { Link } from "react-router-dom";
import Restock from "../dashboard/Restock";
const Drugs = () => {
  const dispatch = useDispatch();
  const allDrugs = useSelector((state) => state.drugs.Drugs);
  const [drugs, setDrugs] = useState(allDrugs);
  const [openDial, setOpenDial] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [id, setId] = useState("");
  const [supplier, setSupplier] = useState("");
  const [implications, setImplications] = useState("");
  const [dosage, setDosage] = useState("");
  const [file, setFile] = useState();
  //   ADD DRUG
  const handleAdd = async () => {
    const drugDetails = {
      name,
      stock,
      supplier,
      implications: implications.split(", "),
      dosage,
      price,
      img: file ? name.replace(" ", "_") : undefined,
    };
    if (file) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append(`drug`, file);
      await request.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    }
    const res = await request.post("/drugs", drugDetails);
    setName("");
    setStock("");
    setPrice("");
    setSupplier("");
    setImplications("");
    setDosage("");
    setFile("");
    alert(res.data);
  };
  //   SELL DRUG
  const sellDrug = async () => {
    const salesDetails = {
      drug_name: name,
      drug_id: id,
      cost: price * quantity,
      quantity,
      date: moment().format("DD-MM-YYYY"),
      id: (Math.floor(Math.random() * 100000) + 100000).toString().substring(1),
    };
    const res = await request.post("/sales", salesDetails);
    alert(res.data);
  };
  const handleClose = () => {
    setOpenDial(false);
  };

  useEffect(() => {
    dispatch(drugsStart);
    try {
      const fetchData = async () => {
        const drugs = await request.get("/drugs");
        dispatch(drugsSuccess(drugs.data));
      };
      fetchData();
    } catch (err) {
      dispatch(drugsFailure(err.response.data));
    }
  }, [dispatch]);
  const drugsColumn = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Drugs name", width: 230 },
    { field: "stock", headerName: "Stock", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    {
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="action-btn">
          <Visibility
            className="action-icon"
            onClick={() => (window.location.href = `/drugs/${params.row.id}`)}
          />
          <CurrencyExchange
            className="action-icon"
            onClick={() => {
              setName(params.row.name);
              setPrice(params.row.price);
              setId(params.row.id);
              setOpenSell(true);
              setStock(params.row.stock);
            }}
          />
          <Restore
            className="action-icon mr10"
            onClick={() => {
              setName(params.row.name);
              setId(params.row.id);
              setOpenStock(true);
              handleRestock = { handleRestock };
            }}
          />
        </div>
      ),
    },
  ];
  const handleRestock = async () => {
    try {
      const res = await request.put("/drugs/restock/" + id, { stock });
      alert(res.data);
      setOpenStock(false);
      setStock(0);
      window.location.reload();
      window.location.reload();
    } catch (err) {}
  };
  return (
    <>
      <FormDialog open={openDial} handleClose={handleClose} />
      <Restock
        openStock={openStock}
        handleClose={() => setOpenStock(false)}
        name={name}
        restockEvent={handleRestock}
      />
      <Dialog open={openSell} onClose={() => setOpenSell(false)}>
        <DialogTitle className="dial-heading">SELL DRUG</DialogTitle>
        <DialogContent>
          <DialogContentText>{name}</DialogContentText>
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
          <Button onClick={() => setOpenSell(false)}>
            <CancelOutlined className="dial-icon cancel" />
          </Button>
          <Button onClick={() => sellDrug()}>
            <CurrencyExchange className="dial-icon" />
          </Button>
        </DialogActions>
      </Dialog>
      <div className="dashboard-container">
        <div className="dash-left">
          <div className="drugs-container drugs-page">
            <div className="add-drug-form">
              <h1 className="heading">Add new drug</h1>
              <TextField
                autoFocus
                margin="dense"
                label="Drug name"
                type="text"
                fullWidth
                variant="outlined"
                className="dial-input"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="stock"
                type="number"
                fullWidth
                variant="outlined"
                className="dial-input"
                onChange={(e) => setStock(e.target.value)}
              />
              <TextField
                margin="dense"
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
              <button className="btn add-drug-btn" onClick={() => handleAdd()}>
                <Add className="mr10" /> Add
              </button>
            </div>
          </div>
        </div>
        <div className="dash-right chart">
          <div className="drugs-top">
            <h1 className="heading">Drugs</h1>
            <div className="head-links">
              <MedicalServices
                className="icon-link mr10"
                onClick={() => setOpenDial(true)}
              />
              <Link to="/drugs">
                <ArrowForwardIos className="icon-link" />
              </Link>
            </div>
          </div>
          <DataTable rows={drugs} columns={drugsColumn} />
        </div>
      </div>
    </>
  );
};

export default Drugs;
