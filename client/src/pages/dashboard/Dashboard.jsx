import "./dashboard.css";
import Navbar from "../../components/nav/Navbar";
import {
  ArrowForwardIos,
  MedicalServices,
  Visibility,
  Restore,
  CancelOutlined,
  CurrencyExchange,
  RestartAlt,
  Search,
  Close,
  Add,
} from "@mui/icons-material";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../../components/Table";
import { drugsStart, drugsSuccess, drugsFailure } from "../../redux/drugs";
import { salesStart, salesSuccess, salesFailure } from "../../redux/sales";
import {
  TextField,
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import { request } from "../../request";
import { Link } from "react-router-dom";
import QuickStat from "./QuickStat";
import Restock from "./Restock";
import AlertComponent from "../../components/Alert";
import { salesColumn } from "../../data";
import Loading from "../../components/Loading";
const Dashboard = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  // REFRESHING DATA
  const handleRefresh = async () => {
    setLoading(true);
    dispatch(drugsStart());
    dispatch(salesStart());
    try {
      const drugs = await request.get("/drugs");
      dispatch(drugsSuccess(drugs.data));
      const sales = await request.get("/sales");
      dispatch(salesSuccess(sales.data));
      window.location.reload();
    } catch (err) {
      dispatch(drugsFailure());
      dispatch(salesFailure());
    }
    setLoading(false);
  };
  const allDrugs = useSelector((state) => state.drugs.Drugs);
  const allSales = useSelector((state) => state.sales.Sales);
  const [search, setSearch] = useState("");
  const [drugs, setDrugs] = useState(allDrugs);
  const [sales, setSales] = useState(allSales);
  const [drugsNum, setDrugsNum] = useState(drugs?.length);
  const salesToday = sales?.filter((sale) =>
    sale.createdAt?.indexOf(moment().format("DD/MM/YYYY") )> -1
  );
  let salesTodayFigures = [];
  salesToday?.forEach((sale) => salesTodayFigures.push(sale.cost));

  const [dailySales, setDailySales] = useState(
    salesTodayFigures.length > 0 ? salesTodayFigures.reduce((a, b) => a + b) : 0
  );

  const salesMonth = sales?.filter((sale) =>
    sale?.createdAt?.indexOf(moment().format("MM/YYYY") )> -1
  );
  let monthlySalesFigures = [];
  salesMonth?.forEach((sale) => monthlySalesFigures.push(sale.cost));

  const [monthlySales, setMonthlySales] = useState(
    monthlySalesFigures.length > 0
      ? monthlySalesFigures.reduce((a, b) => a + b)
      : 0
  );
  const [openDial, setOpenDial] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [supplier, setSupplier] = useState("");
  const [implications, setImplications] = useState("");
  const [dosage, setDosage] = useState("");
  const [id, setId] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  // ADD DRUG
  const handleAdd = async () => {
    const drugDetails = {
      name,
      stock,
      supplier,
      implications: implications.split(", "),
      dosage,
      price,
      id: (Math.floor(Math.random() * 100000) + 100000).toString().substring(1),
    };
    if (!name || !stock || !price) {
      setOpenAlert(true);
      setSeverity("warning");
      setMessage("Provide valid data for name, stock or price");
    } else {
      setOpenAlert(true);
      try {
        const res = await request.post("/drugs", drugDetails);
        setDrugs([drugDetails, ...drugs]);
        setDrugsNum(drugsNum + 1);
        setMessage(res.data);
        setSeverity("success");
        setName("");
        setDosage("");
        setPrice("");
        setStock(0);
        setImplications("");
      } catch (err) {
        setMessage(err.response.data);
        setSeverity("error");
      }
    }
  };
  // SELL DRUG
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
        createdAt: moment().format("ddd DD/MM/YYYY h:mm:ss"),
        id: (Math.floor(Math.random() * 100000) + 100000)
          .toString()
          .substring(1),
      };
      try {
        const res = await request.post("/sales", salesDetails);
        setQuantity(0);
        setSales([salesDetails, ...sales]);
        setDailySales(dailySales + salesDetails.cost);
        setMonthlySales(monthlySales + salesDetails.cost);
        setMessage(res.data);
        setOpenAlert(true);
      } catch (err) {
        setOpenAlert(true);
        setMessage(err.response.data);
        setSeverity("error");
      }
      setOpenSell(false);
    }
  };
  const handleClose = () => {
    setOpenDial(false);
  };

  const drugsColumn = [
    { field: "name", headerName: "Drug", width: 200 },
    {
      headerName: "Action",
      width: 150,
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
          <RestartAlt
            className="action-icon mr10"
            onClick={() => {
              setName(params.row.name);
              setId(params.row.id);
              setOpenStock(true);
            }}
          />
        </div>
      ),
    },
    { field: "price", headerName: "Price", width: 100 },
    { field: "stock", headerName: "Stock", width: 130 },
    { field: "id", headerName: "ID", width: 70 },
  ];

  const handleRestock = async () => {
    if (!stock || stock < 1) {
      setSeverity("warning");
      setMessage("Enter valid stock number");
      setOpenAlert(true);
    } else {
      try {
        const res = await request.put("/drugs/restock/" + id, { stock });
        setMessage(res.data);
        setOpenStock(false);
        setStock(0);
        setMessage(res.data);
        setSeverity("success");
      } catch (err) {
        setMessage(err.response.data);
        setSeverity("error");
      }
      setOpenAlert(true);
      setOpenStock(false);
    }
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
      {/* ADD DRUG FORM */}
      <Dialog open={openDial} onClose={handleClose}>
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
            value={supplier}
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
            value={price}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <Close className="dial-icon cancel" />
          </Button>
          <Button onClick={() => handleAdd()}>
            <Add className="dial-icon" />
          </Button>
        </DialogActions>
      </Dialog>
      <Restock
        openStock={openStock}
        handleClose={() => setOpenStock(false)}
        name={name}
        restockEvent={(e) => setStock(e.target.value)}
        handleRestock={() => handleRestock()}
      />
      <Dialog open={openSell} onClose={() => setOpenSell(false)}>
        <DialogTitle className="dial-heading">SELL DRUG</DialogTitle>
        <DialogContent>
          <DialogContentText>{name}</DialogContentText>
          <TextField
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
          <QuickStat
            drugsNum={drugsNum}
            outStock={drugs?.filter((drug) => drug.stock < 1).length}
            dailySales={dailySales}
            monthlySales={monthlySales}
          />

          <div className="drugs-container">
            <div className="nav-center">
              <input
                type="text"
                placeholder="Search drug"
                className="search-input"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setDrugs(
                    allDrugs?.filter(
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
            <DataTable rows={[...drugs]?.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1:-1)} columns={drugsColumn} />
          </div>
        </div>
        <div className="dash-right chart">
          <div className="sales-top">
            <h1 className="heading">Sales</h1>
            <Link to="/sales">
              <ArrowForwardIos className="icon-link" />
            </Link>
          </div>
          <DataTable rows={[...sales]?.sort((a,b)=> a.createdAt.toString() > b.createdAt.toString() ? -1 : 1)} columns={salesColumn} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
