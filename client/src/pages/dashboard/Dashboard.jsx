import "./dashboard.css";
const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dash-left">
        <div className="quick-stat">
          <h1 className="quick-stat-heading">Quick Stat</h1>
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

        </div>
      </div>
      <div className="dash-right">
          Right and down
      </div>
    </div>
  );
};

export default Dashboard;
