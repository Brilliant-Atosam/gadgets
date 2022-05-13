import React, { useEffect, useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
const QuickStat = ({ drugsNum, outStock, dailySales, monthlySales }) => {
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
            <b>&#8373;{dailySales}</b>
          </span>
          <span className="desc">Today</span>
        </div>
        <div className="quick-stat-item">
          <span className="number">
            <b>&#8373;{monthlySales}</b>
          </span>
          <span className="desc">This month</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStat;
