import {
  CurrencyExchange,
  Delete,
  Edit,
  RestartAlt,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "../../components/Table";
import { request } from "../../request";
import QuickStat from "./QuickStat";
import moment from "moment";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { data, drugSalesColumn } from "../../data";
import FormDialog from "./EditDrug";
import { useState } from "react";
import ResponsiveDialog from "../../components/Dialog";
import AlertComponent from "../../components/Alert";
import SellDial from "../dashboard/Sell";
import Navbar from "../../components/nav/Navbar";
import Loading from "../../components/Loading";
import { salesFailure, salesStart, salesSuccess } from "../../redux/sales";
import { useDispatch } from "react-redux";
import Restock from "../dashboard/Restock";
const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const drug = useSelector((state) =>
    state.drugs.Drugs.find((drug) => drug.id === id)
  );
  const [openEdit, setOpenEdit] = useState(false);
  const [openRestock, setOpenRestock] = useState(false);
  const [stock, setStock] = useState(0);

  const salesHistory = useSelector((state) =>
    state.sales.Sales.filter((sale) => sale.drug_id === id)
  );
  const [sales, setSales] = useState(salesHistory);
  let [totalSalesFigure, setTotalSalesFigure] = useState(
    salesHistory?.length > 1
      ? salesHistory?.reduce((a, b) => a.cost + b.cost)
      : salesHistory?.length === 1
      ? salesHistory[0].cost
      : 0
  );

  const salesToday = salesHistory?.filter(
    (sale) => sale?.createdAt?.indexOf(moment().format("DD/MM/YYYY")) > -1
  );
  let dailySalesFigures = [];
  salesToday?.forEach((sale) => dailySalesFigures.push(sale.cost));
  let [dailySalesFigure, setDailySalesFigure] = useState(
    dailySalesFigures.length > 0 ? dailySalesFigures.reduce((a, b) => a + b) : 0
  );
  console.log(dailySalesFigure);
  const salesMonth = salesHistory?.filter(
    (sale) => sale?.createdAt?.indexOf(moment().format("/MM/YYYY")) > -1
  );
  let monthlySalesFigures = [];
  salesMonth?.forEach((sale) => monthlySalesFigures.push(sale.cost));
  let [monthlySalesFigure, setMonthlySalesFigure] = useState(
    monthlySalesFigures?.length > 0
      ? monthlySalesFigures?.reduce((a, b) => a + b)
      : 0
  );
  let salesYear = salesHistory?.filter(
    (sale) => sale?.createdAt?.indexOf(moment().format("/YYYY")) > -1
  );
  let annualSalesFigures = [];
  salesYear?.forEach((sale) => annualSalesFigures.push(sale.cost));
  let [annualSalesFigure, setAnnualSalesFigure] = useState(
    annualSalesFigures?.length > 0
      ? annualSalesFigures?.reduce((a, b) => a + b)
      : 0
  );
  const deleteDrug = async () => {
    try {
      const res = await request.delete(`/drugs/${id}`);
      alert(res.data);
      window.location.href = "/";
    } catch (err) {}
  };
  // DIALOG INFO
  const [openDial, setOpenDial] = useState(false);
  // OPEN SELL DIAL
  const [openSell, setOpenSell] = useState(false);
  const [quantity, setQuantity] = useState(0);
  // ALERT INFO
  const [openAlert, setOpenAlert] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [message, setMessage] = useState("");
  // SELL DRUG
  const handleSellDrug = async () => {
    if (!quantity || quantity < 1) {
      setSeverity("error");
      setMessage("Enter valid quantity");
      setOpenAlert(true);
    } else {
      const salesDetails = {
        drug_name: drug.name,
        drug_id: id,
        cost: drug.price * quantity,
        quantity,
        createdAt: moment().format("DD/MM/YYYY"),
        id: (Math.floor(Math.random() * 100000) + 100000)
          .toString()
          .substring(1),
      };
      try {
        const res = await request.post("/sales", salesDetails);
        setQuantity(0);
        setMessage(res.data);
        setOpenAlert(true);
        setDailySalesFigure(dailySalesFigure + salesDetails.cost);
        setMonthlySalesFigure(monthlySalesFigure + salesDetails.cost);
        setAnnualSalesFigure(annualSalesFigure + salesDetails.cost);
        setTotalSalesFigure(totalSalesFigure + salesDetails.cost);
        setSales([salesDetails, ...sales]);
      } catch (err) {
        setOpenAlert(true);
        setMessage(err.response.data);
        setSeverity("error");
      }
      setOpenSell(false);
    }
  };
  // RESTOCK
  const handleRestock = async () => {
    setLoading(true);
    if (!stock || stock < 1) {
      setSeverity("warning");
      setMessage("Enter valid stock number");
      setOpenAlert(true);
      setLoading(false);
    } else {
      try {
        const res = await request.put("/drugs/restock/" + id, {
          stock,
        });
        setMessage(res.data);
        setOpenRestock(false);
        setStock(0);
        setMessage(res.data);
        setSeverity("success");
      } catch (err) {
        setMessage(err.response.data);
        setSeverity("error");
      }
      setOpenAlert(true);
      setOpenRestock(false);
      setLoading(false);
    }
  };
  const [loading, setLoading] = useState(false);
  // REFRESHING DATA
  const handleRefresh = async () => {
    setLoading(true);
    dispatch(salesStart());
    try {
      const sales = await request.get("/sales");
      dispatch(salesSuccess(sales.data));
      window.location.reload();
    } catch (err) {
      dispatch(salesFailure());
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
        close={() => setOpenAlert(false)}
      />
      <ResponsiveDialog
        open={openDial}
        DialContent={`If you proceed with this action, ${drug.name} will be deleted.`}
        title={`Delete ${drug.name}`}
        handleClose={() => setOpenDial(false)}
        option1="Cancel"
        option2="Delete"
        event={() => deleteDrug()}
      />
      <FormDialog open={openEdit} handleClose={() => setOpenEdit(false)} />
      <SellDial
        open={openSell}
        drugName={drug.name}
        stock={drug.stock}
        price={drug.price}
        handleClose={() => setOpenSell(false)}
        quantity={quantity}
        event={(e) => setQuantity(e.target.value)}
        handleSellDrug={() => handleSellDrug()}
      />
      <Restock
        openStock={openRestock}
        handleClose={() => setOpenRestock(false)}
        name={drug?.name}
        restockEvent={(e) => setStock(e.target.value)}
        handleRestock={() => handleRestock()}
      />
      <div className="dashboard-container">
        <div className="dash-left">
          <QuickStat
            overallSales={totalSalesFigure}
            dailySales={dailySalesFigure}
            monthlySales={monthlySalesFigure}
            annualSales={annualSalesFigure}
          />
          <div className="drugs-container">
            <div className="drugs-top">
              <h1 className="heading">Drug Sales history</h1>
              <div className="head-links">
                {new Date(drug.expiry) > new Date() && (
                  <CurrencyExchange
                    className="icon-link mr10"
                    onClick={() => setOpenSell(true)}
                  />
                )}
                <RestartAlt
                  className="icon-link mr10"
                  onClick={() => {
                    setOpenRestock(true);
                  }}
                />
                <Edit className="icon-link" onClick={() => setOpenEdit(true)} />
                <Delete
                  className="icon-link"
                  onClick={() => setOpenDial(true)}
                />
              </div>
            </div>
            {sales && (
              <DataTable
                rows={[...sales]?.sort((a, b) =>
                  a.createdAt.toString() < b.createdAt.toString() ? 1 : -1
                )}
                columns={drugSalesColumn}
              />
            )}
          </div>
        </div>
        <div className="dash-right">
          <div className="dash-right-drug-info mb20">
            <div className="drug-info-top">
              <h1 className="heading">Drug Details</h1>
              <button
                className="btn"
                onClick={() => setOpenSell(true)}
                disabled={new Date(drug.expiry) < new Date()}
              >
                Sell
                <CurrencyExchange className="icon-link" />
              </button>
            </div>
            <div className="drug-info-content">
              <div className="drug-info-left">
                <div className="drug-info-key-vale">
                  <span className="key">Name</span>:
                  <span className="value">{drug?.name}</span>
                </div>
                <div className="drug-info-key-vale">
                  <span className="key">Supplier</span>:
                  <span className="value">{drug?.supplier}</span>
                </div>
                <div className="drug-info-key-vale">
                  <span className="key">Price</span>:
                  <span className="value">&#8373;{drug?.price}</span>
                </div>
                <div className="drug-info-key-vale">
                  <span className="key">Stock</span>:
                  <span className="value">{drug?.stock}</span>
                </div>
              </div>
              <div className="drug-info-right">
                <div className="drug-info-key-vale">
                  <span className="key">Status</span>:
                  <span className="value">
                    {new Date(drug?.expiry) < new Date() ? (
                      <span className="expired">Expired</span>
                    ) : drug.stock < 1 ? (
                      <span className="out-stock">Out of stock</span>
                    ) : (
                      <span className="active">Active</span>
                    )}
                  </span>
                </div>
                <div className="drug-info-key-vale">
                  <span className="key">Implications</span>:
                  <span className="value">
                    {drug.implications?.toString().replace(",", ", ")}
                  </span>
                </div>
                <div className="drug-info-key-vale">
                  <span className="key">Dosage</span>:
                  <span className="value">{drug?.dosage}</span>
                </div>
                <div className="drug-info-key-vale">
                  <span className="key">Expiry</span>:
                  <span className="value">{drug?.expiry}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chart">
            <div className="dash-right-top">
              <h1 className="heading mb20">
                Annual Sales Performance Area Chart of {drug?.name} in
                {moment().format(" yyyy")}
              </h1>
            </div>
            <AreaChart
              width={850}
              height={400}
              className="areaChart"
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#087a75"
                fillOpacity={1}
                fill="#30e6dd1b"
              />
            </AreaChart>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
