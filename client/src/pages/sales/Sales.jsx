import DataTable from "../../components/Table";
import { data } from "../../data";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { request } from "../../request";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Sales = () => {
  const { id } = useParams();
  const salesRecords = useSelector((state) => state.sales.Sales);
  const drugSales = salesRecords.filter((sale) => sale.drug_id === id);
  const [sales, setSales] = useState(drugSales);
  const [overallSales, setOverallSales] = useState(0);
  const salesColumn = [
    { field: "drug_name", headerName: "Drug", width: 200 },
    { field: "quantity", headerName: "Qty", width: 40 },
    { field: "cost", headerName: "Cost", width: 130 },
    {
      field: "createdAt",
      headerName: "Date",
      width: 170,
      renderCell: (params) => <>{params.row.createdAt}</>,
    },
    { field: "id", headerName: "ID", width: 70 },
  ];

  return (
    <div className="dashboard-container">
      <div className="dash-left">
        <div className="quick-stat">
          <h1 className="heading">Sales Overview</h1>
          <div className="quick-stat-container">
            <div className="quick-stat-item">
              <span className="number">$200</span>
              <span className="desc">sale today</span>
            </div>
            <div className="quick-stat-item">
              <span className="number">$700</span>
              <span className="desc">This month</span>
            </div>
            <div className="quick-stat-item">
              <span className="number">$700</span>
              <span className="desc">This year</span>
            </div>
            <div className="quick-stat-item">
              <span className="number">&#8373;{overallSales}.00</span>
              <span className="desc">Overall sales</span>
            </div>
          </div>
        </div>
        <div className="drugs-container">
          <div className="drugs-top">
            <h1 className="heading">Sales History</h1>
          </div>
          {<DataTable rows={sales} columns={salesColumn} />}
        </div>
      </div>
      <div className="dash-right chart">
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
