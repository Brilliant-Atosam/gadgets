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
const Sales = () => {
  const salesRecords = useSelector((state) => state.sales.Sales);
  const dailySales = salesRecords?.filter(
    (sale) => sale.createdAt === moment().format("DD-MM-YYYY")
  );
  const dailySalesFigure =
    dailySales.length > 1
      ? dailySales.reduce((a, b) => a.cost + b.cost)
      : dailySales.length === 1
      ? dailySales[0].cost
      : 0;
  const salesMonth = salesRecords?.filter((sale) =>
    sale?.createdAt?.indexOf(moment().format("-MM-YYYY") > -1)
  );
  const monthlySalesFigure =
    salesRecords.length > 1
      ? salesMonth.reduce((a, b) => a.cost + b.cost)
      : salesMonth.length === 1
      ? salesMonth[0].cost
      : 0;
  const salesYear = salesRecords?.filter((sale) =>
    sale?.createdAt?.indexOf(moment().format("-YYYY") > -1)
  );
  const annualSalesFigure =
    salesRecords.length > 1
      ? salesYear.reduce((a, b) => a.cost + b.cost)
      : salesYear.length === 1
      ? salesYear[0].cost
      : 0;
  const totalSalesFigure =
    salesRecords.length > 1
      ? salesRecords.reduce((a, b) => a.cost + b.cost)
      : salesRecords.length === 1
      ? salesRecords[0].cost
      : 0;
  return (
    <div className="dashboard-container">
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
          {<DataTable rows={salesRecords} columns={salesColumn} />}
        </div>
      </div>
      <div className="dash-right chart">
        <div className="dash-right-top">
          <h1 className="heading mb20">Annual Sales Performance Area Chart for {moment().format('yyyy')}</h1>
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
