const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Overview</h3>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <h4>Total Bookings</h4>
            <p>1,245</p>
            <span className="stat-change positive">↑ 12%</span>
          </div>
          <div className="stat-card">
            <h4>Active Agents</h4>
            <p>42</p>
            <span className="stat-change positive">↑ 5%</span>
          </div>
          <div className="stat-card">
            <h4>Registered Clients</h4>
            <p>3,789</p>
            <span className="stat-change positive">↑ 8%</span>
          </div>
          <div className="stat-card">
            <h4>Revenue</h4>
            <p>$124,567</p>
            <span className="stat-change positive">↑ 15%</span>
          </div>
        </div>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Recent Bookings</h3>
          <button className="btn btn-primary">View All</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Client</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Sample data - would come from API in real app */}
            <tr>
              <td>#TRV-1001</td>
              <td>John Smith</td>
              <td>Paris, France</td>
              <td>2023-06-15</td>
              <td><span className="status confirmed">Confirmed</span></td>
            </tr>
            {/* More rows... */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;