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
  Close,
  Search,
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
import Navbar from "../../components/nav/Navbar";
import Loading from "../../components/Loading";
import AlertComponent from "../../components/Alert";
const Drugs = () => {
  const dispatch = useDispatch();
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
  const allDrugs = useSelector((state) => state.drugs.Drugs);
  const [drugs, setDrugs] = useState(allDrugs);
  const [search, setSearch] = useState("");
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
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  //   ADD DRUG
  const handleAdd = async () => {
    setOpenAlert(true);
    if (!name || !price || stock < 1) {
      setSeverity("warning");
      setMessage("Provide valid data for name, price or stock");
    } else {
      const drugDetails = {
        name,
        stock,
        supplier,
        implications: implications.split(", "),
        dosage,
        price,
        id: (Math.floor(Math.random() * 100000) + 100000)
          .toString()
          .substring(1),
      };
      try {
        const res = await request.post("/drugs", drugDetails);
        setName("");
        setStock("");
        setPrice("");
        setSupplier("");
        setImplications("");
        setDosage("");
        setMessage(res.data);
        setDrugs([drugDetails, ...drugs]);
      } catch (err) {
        setMessage(err.response.data);
        setSeverity("error");
      }
    }
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
          <Link to={`/drugs/${params.row.id}`}>
            <Visibility className="action-icon" />
          </Link>
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
    } catch (err) {}
  };
  const [loading, setLoading] = useState(false);
  // REFRESHING DATA
  const handleRefresh = async () => {
    setLoading(true);
    dispatch(drugsStart());
    try {
      const sales = await request.get("/drugs");
      dispatch(drugsSuccess(sales.data));
    } catch (err) {
      dispatch(drugsFailure());
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar refresh={() => handleRefresh()} />
      <Loading open={loading} />
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
              <AlertComponent
                open={openAlert}
                severity={severity}
                message={message}
                close={() => {
                  setOpenAlert(false);
                }}
              />
              <TextField
                autoFocus
                margin="dense"
                label="Drug name"
                type="text"
                fullWidth
                variant="outlined"
                className="dial-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="dense"
                label="stock"
                type="number"
                fullWidth
                variant="outlined"
                className="dial-input"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <TextField
                margin="dense"
                label="Supplier"
                type="text"
                fullWidth
                variant="outlined"
                className="dial-input"
                value={supplier}
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
                value={price}
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
              <button className="btn add-drug-btn" onClick={() => handleAdd()}>
                <Add className="mr10" /> Add Drug
              </button>
            </div>
          </div>
        </div>
        <div className="dash-right chart">
          <div className="nav-center">
            <input
              type="text"
              placeholder="Search drug"
              className="search-input"
              onChange={(e) => {
                setSearch(e.target.value);
                setDrugs(
                  allDrugs.filter(
                    (drug) =>
                      drug.name &&
                      drug.name
                        .toLowerCase()
                        .indexOf(e.target.value.toLowerCase()) > -1
                  )
                );
              }}
              value={search}
            />
            <div className="search-icons">
              {search && (
                <Close
                  className="search-icon"
                  onClick={() => {
                    setSearch("");
                    setDrugs(allDrugs);
                  }}
                />
              )}
              <Search className="search-icon" />
            </div>
          </div>
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
          <DataTable
            rows={[...drugs].sort((a, b) =>
              a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
            )}
            columns={drugsColumn}
          />
        </div>
      </div>
    </>
  );
};

export default Drugs;
