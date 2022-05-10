import "./dashboard.css";
import {
  CurrencyExchange,
  ArrowForwardIos,
  MedicalServices,
  Visibility,
  Restore,
} from "@mui/icons-material";
import FormDialog from "./AddDrug";
import DataTable from "../../components/Table";
import { drugsColumn, rows } from "../../data";
import { useEffect, useState } from "react";
import { request } from "../../request";
import SellDial from "./Sell";
const Dashboard = () => {
  const [openDial, setOpenDial] = useState(false);
  const [openSell, setOpenSell] = useState(false);
  const handleClose = () => {
    setOpenDial(false);
  };
  const [drugs, setDrugs] = useState([]);
  const [sales, setSales] = useState([]);
  console.log(sales);
  useEffect(() => {
    const fetchData = async () => {
      const drugs = await request.get("/drugs");
      const sales = await request.get("/sales");
      setDrugs(drugs.data);
      setSales(sales.data);
    };
    fetchData();
  }, []);
  const drugsColumn = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Drug", width: 130 },
    { field: "stock", headerName: "Stock", width: 130 },
    { field: "price", headerName: "Price", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div className="action-btn">
          <Visibility className="action-icon" />
          <CurrencyExchange
            className="action-icon"
            onClick={() => setOpenSell(true)}
          />
        </div>
      ),
    },
  ];
  const salesColumn = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "drug_name", headerName: "Drug", width: 200 },
    { field: "quantity", headerName: "Qty", width: 40 },
    { field: "price", headerName: "Cost", width: 130 },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => (
        <div className="action-btn">
          <Restore className="action-icon" />
        </div>
      ),
    },
  ];
  return (
    <>
      <FormDialog open={openDial} handleClose={handleClose} />
      <SellDial
        open={openSell}
        stock={22}
        price={2.0}
        handleClose={() => setOpenSell(false)}
      />
      <div className="dashboard-container">
        <div className="dash-left">
          <div className="quick-stat">
            <h1 className="heading">Quick Stat</h1>
            <div className="quick-stat-container">
              <div className="quick-stat-item">
                <span className="number">12345</span>
                <span className="desc">drugs</span>
              </div>
              <div className="quick-stat-item">
                <span className="number">15</span>
                <span className="desc">out stock</span>
              </div>
              <div className="quick-stat-item">
                <span className="number">
                  <b>$12345</b>
                </span>
                <span className="desc">Today</span>
              </div>
              <div className="quick-stat-item">
                <span className="number">
                  <b>$12345</b>
                </span>
                <span className="desc">This month</span>
              </div>
            </div>
          </div>
          <div className="drugs-container">
            <div className="drugs-top">
              <h1 className="heading">Drugs</h1>
              <div className="head-links">
                <MedicalServices
                  className="icon-link mr10"
                  onClick={() => setOpenDial(true)}
                />
                <ArrowForwardIos className="icon-link" />
              </div>
            </div>
            <DataTable rows={drugs} columns={drugsColumn} />
          </div>
        </div>
        <div className="dash-right">
          <div className="sales-top">
            <h1 className="heading">Sales</h1>
            <ArrowForwardIos className="icon-link" />
          </div>
          <DataTable rows={sales} columns={salesColumn} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
