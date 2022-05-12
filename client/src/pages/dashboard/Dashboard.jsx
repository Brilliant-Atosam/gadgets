import "./dashboard.css";
import {
  ArrowForwardIos,
  MedicalServices,
  Visibility,
  Restore,
  CancelOutlined,
  CurrencyExchange,
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
const Dashboard = () => {
  const dispatch = useDispatch();
  const [drugs, setDrugs] = useState(useSelector((state) => state.drugs.Drugs));
  const [sales, setSales] = useState(useSelector((state) => state.sales.Sales));
  const [drugsNum, setDrugsNum] = useState(sales.length);
  const salesToday = sales?.filter(
    (sale) => sale.createdAt === moment().format("DD-MM-YYYY")
  );
  let salesTodayFigures = [];
  salesToday.forEach((sale) => salesTodayFigures.push(sale.cost));
  const [dailySales, setDailySales] = useState(
    salesTodayFigures.reduce((a, b) => a + b)
  );

  const salesMonth = sales?.filter((sale) =>
    sale?.createdAt?.indexOf(moment().format("-MM-YYYY") > -1)
  );
  let monthlySalesFigure = [];
  salesMonth.forEach((sale) => monthlySalesFigure.push(sale.cost));

  const [monthlySales, setMonthlySales] = useState(
    monthlySalesFigure.reduce((a, b) => a + b)
  );
  const [openDial, setOpenDial] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const [openStock, setOpenStock] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [id, setId] = useState("");

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
    setSales([...sales, salesDetails]);
    setDailySales(dailySales + salesDetails.cost);
    setMonthlySales(monthlySales + salesDetails.cost);
    alert(res.data);
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
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Drug", width: 130 },
    { field: "stock", headerName: "Stock", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
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
          <QuickStat
            drugsNum={drugsNum}
            outStock={drugs.filter((drug) => drug.stock < 1).length}
            dailySales={dailySales}
            monthlySales={monthlySales}
          />

          <div className="drugs-container">
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
        <div className="dash-right">
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
