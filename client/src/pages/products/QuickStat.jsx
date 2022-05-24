import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
const QuickStat = ({ drugsNum, outStock, active, expired }) => {
  return (
    <div className="quick-stat">
      <div className="quick-stat-header">
        <h1 className="heading">Quick Stat</h1>
        <h1 className="heading">
          Store Id: <b>{localStorage.getItem("storeId")}</b>
        </h1>
      </div>
      <div className="quick-stat-container">
        <div className="quick-stat-item">
          <span className="number">{drugsNum}</span>
          <span className="desc">drugs</span>
        </div>
        <div className="quick-stat-item">
          <span className="number">{outStock}</span>
          <span className="desc">out stock</span>
        </div>
        <div className="quick-stat-item">
          <span className="number">
            <b>{expired}</b>
          </span>
          <span className="desc">Expired</span>
        </div>
        <div className="quick-stat-item">
          <span className="number">
            <b>{active}</b>
          </span>
          <span className="desc">Active</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStat;
