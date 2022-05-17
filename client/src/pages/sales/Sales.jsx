import DataTable from "../../components/Table";
import { data, salesColumn } from "../../data";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import moment from "moment";
import { useSelector } from "react-redux";
import QuickStat from "./QuickStat";
import Navbar from "../../components/nav/Navbar";
import Loading from "../../components/Loading";
import { salesFailure, salesStart, salesSuccess } from "../../redux/sales";
import { request } from "../../request";
import { useState } from "react";
import { useDispatch } from "react-redux";
const Sales = () => {
  const dispatch = useDispatch();
  const salesRecords = useSelector((state) => state.sales.Sales);
  const dailySales = salesRecords?.filter((sale) =>
    sale.createdAt?.indexOf(moment().format("DD-MM-YYYY") > -1)
  );
  let salesTodayFigures = [];
  dailySales?.forEach((sale) => salesTodayFigures.push(sale.cost));
  const [dailySalesFigure, setDailySales] = useState(
    salesTodayFigures.length > 0 ? salesTodayFigures.reduce((a, b) => a + b) : 0
  );
  const salesMonth = salesRecords?.filter((sale) =>
    sale?.createdAt?.indexOf(moment().format("-MM-YYYY") > -1)
  );
  let monthlySalesFigures = [];
  salesMonth?.forEach((sale) => monthlySalesFigures.push(sale.cost));

  const [monthlySalesFigure, setMonthlySales] = useState(
    monthlySalesFigures.length > 0
      ? monthlySalesFigures.reduce((a, b) => a + b)
      : 0
  );
  const salesYear = salesRecords?.filter((sale) =>
    sale?.createdAt?.indexOf(moment().format("-YYYY") > -1)
  );
  let annualSalesFigures = [];
  salesYear?.forEach((sale) => annualSalesFigures.push(sale.cost));
  const annualSalesFigure =
    annualSalesFigures.length > 0
      ? annualSalesFigures.reduce((a, b) => a + b)
      : 0;
      let totalSalesFigures = [];
      salesRecords.forEach(sale => totalSalesFigures.push(sale.cost))
  const totalSalesFigure =
    totalSalesFigures.length > 0
      ? totalSalesFigures.reduce((a, b) => a + b)
      : 0;
  console.log(dailySalesFigure);
  console.log();
  console.log();
  console.log();
  const [loading, setLoading] = useState(false);
  // REFRESHING DATA
  const handleRefresh = async () => {
    setLoading(true);
    dispatch(salesStart());
    try {
      const sales = await request.get("/sales");
      dispatch(salesSuccess(sales.data));
    } catch (err) {
      dispatch(salesFailure());
    }
    setLoading(false);
  };
  return (
    <div className="dashboard-container">
      <Navbar refresh={() => handleRefresh()} />
      <Loading open={loading} />
      <div className="dash-left">
        <QuickStat
          dailySales={dailySalesFigure}
          monthlySales={monthlySalesFigure}
          annualSales={annualSalesFigure}
          overallSales={totalSalesFigure}
        />
        <div className="drugs-container">
          <div className="drugs-top">
            <h1 className="heading">
              Sales History as at <b>{moment().format("dddd DD-MM-yy")}</b>
            </h1>
          </div>
          {
            <DataTable
              rows={[...salesRecords].sort((a, b) =>
                a.createdAt > b.createdAt ? -1 : 1
              )}
              columns={salesColumn}
            />
          }
        </div>
      </div>
      <div className="dash-right chart">
        <div className="dash-right-top">
          <h1 className="heading mb20">
            Annual Sales Performance Area Chart for {moment().format("yyyy")}
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
  );
};

export default Sales;
