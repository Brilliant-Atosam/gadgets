import "./dashboard.css";
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
} from "@mui/icons-material";
import moment from "moment";
import FormDialog from "./AddDrug";
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
import { useEffect, useState } from "react";
import { request } from "../../request";
import { Link } from "react-router-dom";
import QuickStat from "./QuickStat";
import Restock from "./Restock";
import AlertComponent from "../../components/Alert";
const Dashboard = () => {
  const dispatch = useDispatch();
  const allDrugs = useSelector((state) => state.drugs.Drugs);
  const allSales = useSelector((state) => state.sales.Sales);
  const [search, setSearch] = useState("");
  const [drugs, setDrugs] = useState(allDrugs);
  const [sales, setSales] = useState(allSales);
  const [drugsNum, setDrugsNum] = useState(drugs.length);
  const salesToday = sales?.filter(
    (sale) => sale.createdAt === moment().format("DD-MM-YYYY")
  );
  let salesTodayFigures = [];
  salesToday?.forEach((sale) => salesTodayFigures.push(sale.cost));

  const [dailySales, setDailySales] = useState(
    salesTodayFigures.length > 0 ? salesTodayFigures.reduce((a, b) => a + b) : 0
  );

  const salesMonth = sales?.filter((sale) =>
    sale?.createdAt?.indexOf(moment().format("-MM-YYYY") > -1)
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
  const [id, setId] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
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
        date: moment().format("DD-MM-YYYY"),
        id: (Math.floor(Math.random() * 100000) + 100000)
          .toString()
          .substring(1),
      };
      try {
        const res = await request.post("/sales", salesDetails);
        setQuantity(0);
        setSales([...sales, salesDetails]);
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

  useEffect(() => {
    dispatch(drugsStart);
    dispatch(salesStart);
    try {
      const fetchData = async () => {
        const drugs = await request.get("/drugs");
        dispatch(drugsSuccess(drugs.data));
        const sales = await request.get("/sales");
        dispatch(salesSuccess(sales.data));
      };
      fetchData();
    } catch (err) {
      dispatch(drugsFailure(err.response.data));
      dispatch(salesFailure(err.response.data));
    }
  }, [dispatch]);
  const drugsColumn = [
    { field: "name", headerName: "Drug", width: 200 },
    {
      headerName: "Action",
      width: 150,
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
  const salesColumn = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "drug_name", headerName: "Drug", width: 200 },
    { field: "quantity", headerName: "Qty", width: 40 },
    { field: "cost", headerName: "Cost", width: 130 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 170,
      renderCell: (params) => <>{params.row.createdAt}</>,
    },
    {
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div className="action-btn">
          <Restore className="action-icon" />
        </div>
      ),
    },
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
      <AlertComponent
        open={openAlert}
        severity={severity}
        message={message}
        close={() => {
          window.location.reload();
        }}
      />
      <FormDialog open={openDial} handleClose={handleClose} />
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
          <QuickStat
            drugsNum={drugsNum}
            outStock={drugs.filter((drug) => drug.stock < 1).length}
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
                    allDrugs.filter(
                      (drug) => drug.name.indexOf(e.target.value) > -1
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
            <DataTable rows={drugs} columns={drugsColumn} />
          </div>
        </div>
        <div className="dash-right chart">
          <div className="sales-top">
            <h1 className="heading">Sales</h1>
            <Link to="/sales">
              <ArrowForwardIos className="icon-link" />
            </Link>
          </div>
          <DataTable rows={sales} columns={salesColumn} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
