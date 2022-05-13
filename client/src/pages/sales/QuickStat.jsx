const QuickStat = ({ dailySales, monthlySales, annualSales, overallSales }) => {
  return (
    <div className="quick-stat">
      <h1 className="heading">Sales Overview</h1>
      <div className="quick-stat-container">
        <div className="quick-stat-item">
          <span className="number">&#8373;{dailySales}</span>
          <span className="desc">sale today</span>
        </div>
        <div className="quick-stat-item">
          <span className="number">&#8373;{monthlySales}</span>
          <span className="desc">This month</span>
        </div>
        <div className="quick-stat-item">
          <span className="number">&#8373;{annualSales}</span>
          <span className="desc">This year</span>
        </div>
        <div className="quick-stat-item">
          <span className="number">&#8373;{overallSales}</span>
          <span className="desc">Overall sales</span>
        </div>
      </div>
    </div>
  );
};

export default QuickStat;
