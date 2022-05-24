import {
  ArrowForwardIos,
  MedicalServices,
  CurrencyExchange,
  Add,
  Visibility,
  Close,
  Search,
  RestartAlt,
} from "@mui/icons-material";
import SnackbarAlert from "../../components/Snackback";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../components/Table";
import { drugsStart, drugsSuccess, drugsFailure } from "../../redux/drugs";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { request } from "../../request";
import { Link } from "react-router-dom";
import Restock from "../dashboard/Restock";
import Navbar from "../../components/nav/Navbar";
import Loading from "../../components/Loading";
import AlertComponent from "../../components/Alert";
import SellDrugForm from "../dashboard/Sell";
import AddDrugForm from "../dashboard/AddDrug";
import QuickStat from "./QuickStat";
const Drugs = () => {
  const storeId = localStorage.getItem("storeId");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(drugsStart);
    try {
      const fetchData = async () => {
        const drugs = await request.get(`/drugs?storeId=${storeId}`);
        dispatch(drugsSuccess(drugs.data));
      };
      fetchData();
    } catch (err) {
      dispatch(drugsFailure(err.response.data));
    }
  }, [dispatch]);
  const [openAdd, setOpenAdd] = useState(false);
  const allDrugs = useSelector((state) => state.drugs.Drugs);
  const [drugs, setDrugs] = useState(allDrugs);
  const [search, setSearch] = useState("");
  const [openSell, setOpenSell] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [id, setId] = useState("");
  const [expiry, setExpiry] = useState("");
  const [supplier, setSupplier] = useState("");
  const [implications, setImplications] = useState("");
  const [dosage, setDosage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [drugsNum, setDrugsNum] = useState(drugs?.length);
  const [outStock, setOutStock] = useState(
    drugs?.filter((drug) => drug.stock === 0).length
  );
  const [expired, setExpired] = useState(
    drugs?.filter((drug) => new Date(drug.expiry) < new Date()).length
  );
  const [active, setActive] = useState(drugsNum - expired);
  //   ADD DRUG
  const handleAdd = async () => {
    if (!name || !price || stock < 1) {
      setOpenSnack(true);
      setMessage("Provide valid data for name, price or stock");
    } else {
      const drugDetails = {
        name,
        stock,
        supplier,
        implications: implications.split(", "),
        dosage,
        price,
        expiry,
        storeId,
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
        setOpenSnack(true);
        setDrugs([drugDetails, ...drugs]);
        setDrugsNum(drugsNum + 1);
        setActive(active + 1);
      } catch (err) {
        setMessage(err.response.data);
        setOpenSnack(true);
      }
    }
  };
  //   SELL DRUG
  const sellDrug = async () => {
    if (!quantity || quantity < 1) {
      setSeverity("error");
      setMessage("Enter valid quantity");
      setOpenAlert(true);
    } else {
      const salesDetails = {
        drug_name: name,
        drug_id: id,
        cost: price * quantity,
        quantity,
        storeId,
        createdAt: moment().format("DD/MM/YYYY h:mm:ss"),
        id: (Math.floor(Math.random() * 100000) + 100000)
          .toString()
          .substring(1),
      };
      try {
        const res = await request.post("/sales", salesDetails);
        setQuantity(0);
        setMessage(res.data);
        setOpenAlert(true);
        setSeverity("success");
      } catch (err) {
        setOpenAlert(true);
        setMessage(err.response.data);
        setSeverity("error");
      }
    }
  };

  const drugsColumn = [
    {
      field: "name",
      headerName: "Drug",
      width: 200,
      renderCell: (params) => (
        <p
          className={
            new Date(params.row.expiry) <= new Date()
              ? "expired"
              : params.row.stock < 0
              ? "out-stock"
              : "drug-name"
          }
        >
          {params.row.name}
        </p>
      ),
    },
    {
      headerName: "Action",
      width: 170,
      renderCell: (params) => (
        <div className="action-btn">
          <Link to={`/drugs/${params.row.id}`}>
            <Visibility className="action-icon" />
          </Link>

          <RestartAlt
            className="action-icon "
            onClick={() => {
              setName(params.row.name);
              setId(params.row.id);
              setExpiry(params.row.expiry);
              setOpenStock(true);
            }}
          />
          {new Date(params.row.expiry) > new Date() && (
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
          )}
        </div>
      ),
    },

    { field: "price", headerName: "Price", width: 100 },
    { field: "stock", headerName: "Stock", width: 130 },
    { field: "id", headerName: "ID", width: 70 },
    {
      headerName: "Status",
      field: "expiry",
      width: 100,
      renderCell: (params) => (
        <>
          {new Date(params.row.expiry) < new Date() ? (
            <span className="expired">Expired</span>
          ) : (
            <span className="active">Active</span>
          )}
        </>
      ),
    },
  ];
  const handleRestock = async () => {
    try {
      const res = await request.put("/drugs/restock/" + id, { stock });
      setMessage(res.data);
      setSeverity("success");
      setOpenAlert(true);
      setOpenStock(false);
      setStock(0);
    } catch (err) {
      setMessage(err.response.data);
      setSeverity("error");
      setOpenAlert(true);
    }
  };
  const [loading, setLoading] = useState(false);
  // REFRESHING DATA
  const handleRefresh = async () => {
    setLoading(true);
    dispatch(drugsStart());
    try {
      const drugs = await request.get(`/drugs?storeId=${storeId}`);
      dispatch(drugsSuccess(drugs.data));
      window.location.reload();
    } catch (err) {
      dispatch(drugsFailure());
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar refresh={() => handleRefresh()} />
      <Loading open={loading} />
      <AlertComponent
        open={openAlert}
        severity={severity}
        message={message}
        close={() => {
          setOpenAlert(false);
        }}
      />
      <Restock
        openStock={openStock}
        handleClose={() => setOpenStock(false)}
        name={name}
        restockEvent={(e) => setStock(e.target.value)}
        resetExpiry={(e) => setExpiry(e.target.value)}
        handleRestock={() => handleRestock()}
      />
      <SellDrugForm
        open={openSell}
        quantity={quantity}
        handleClose={() => setOpenSell(false)}
        drugName={name}
        price={price}
        quantityEvent={(e) => setQuantity(e.target.value)}
        handleSellDrug={() => sellDrug()}
        stock={stock}
      />
      <AddDrugForm
        open={openAdd}
        handleClose={() => setOpenAdd(false)}
        nameEvent={(e) => setName(e.target.value)}
        stockEvent={(e) => setStock(e.target.value)}
        supplierEvent={(e) => setSupplier(e.target.value)}
        implicationsEvent={(e) => setImplications(e.target.value)}
        priceEvent={(e) => setPrice(e.target.value)}
        dosageEvent={(e) => setDosage(e.target.value)}
        expiryEvent={(e) => setExpiry(e.target.value)}
        handleAdd={() => handleAdd()}
      />
      <SnackbarAlert
        open={openSnack}
        message={message}
        handleClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpenSnack(false);
        }}
      />
      <div className="dashboard-container">
        <div className="dash-left">
          <QuickStat
            drugsNum={drugsNum}
            outStock={outStock}
            expired={expired}
            active={active}
          />
          <div className="drugs-container drugs-page">
            <div className="add-drug-form">
              <h1 className="heading">Add new drug</h1>
              <TextField
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
                onClick={() => setOpenAdd(true)}
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
