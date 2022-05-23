import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
const QuickStat = ({ drugsNum, outStock, dailySales, expired }) => {
  return (
    <div className="quick-stat">
      <h1 className="heading">Quick Stat</h1>
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
            <b>&#8373;{dailySales}</b>
          </span>
          <span className="desc">{moment().format("ddd, D MMM")}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStat;
