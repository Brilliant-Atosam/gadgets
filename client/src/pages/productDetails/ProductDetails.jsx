import { Delete, Edit, Repeat } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import DataTable from "../../components/Table";
import { salesColumn } from "../../data";
import { request } from "../../request";

const ProductDetails = () => {
  const { id } = useParams();
  const sales = useSelector((state) =>
    state.sales.Sales.filter((sale) => sale.drug_id === id)
  );

  const deleteDrug = async () => {
    try {
      const res = await request.delete(`/drugs/${id}`);
      alert(res.data);
      window.location.href = "/";
    } catch (err) {}
  };
  return (
    <div className="dashboard-container">
      <div className="dash-left">
        <div className="quick-stat">
          <h1 className="heading">Drug Performance</h1>
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
              <span className="number">$700</span>
              <span className="desc">Overall sales</span>
            </div>
          </div>
        </div>
        <div className="drugs-container">
          <div className="drugs-top">
            <h1 className="heading">Drug Sales history</h1>
            <div className="head-links">
              <Repeat className="icon-link mr10" />
              <Edit className="icon-link" />
              <Delete className="icon-link" onClick={() => deleteDrug()} />
            </div>
          </div>
          {sales && <DataTable rows={sales} columns={salesColumn} />}
        </div>
      </div>
      <div className="dash-right"></div>
    </div>
  );
};

export default ProductDetails;
