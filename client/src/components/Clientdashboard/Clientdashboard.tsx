import { FaCalendarAlt, FaReceipt } from 'react-icons/fa';
import './clientdashBoard.css'

function ClientdashBoard() {
  return (
    <main className="dashboard-content">
      {/* Dashboard Title */}
      <h1 className="welcome-title">Welcome Back!</h1>
      
      {/* Quick Actions */}
      <div className="quick-actions">
        <button className="action-card">
          <FaCalendarAlt className="action-icon" />
          <span>Book New Trip</span>
        </button>
        <button className="action-card">
          <FaCalendarAlt className="action-icon" />
          <span>View Bookings</span>
        </button>
        <button className="action-card">
          <FaReceipt className="action-icon" />
          <span>View Invoices</span>
        </button>
      </div>

      {/* Current Bookings */}
      <section className="current-bookings">
        <h2>Your Upcoming Trips</h2>

        <div className="booking-card">
          <div className="booking-info">
            <h3>Bali Adventure</h3>
            <p>June 15-25, 2023</p>
            <span className="booking-status confirmed">Confirmed</span>
          </div>
          <button className="booking-action">View Details</button>
        </div>
        
        <div className="booking-card">
          <div className="booking-info">
            <h3>Paris Getaway</h3>
            <p>August 5-12, 2023</p>
            <span className="booking-status pending">Payment Pending</span>
          </div>
          <button className="booking-action">Complete Payment</button>
        </div>
      </section>
    </main>
  );
}

export default ClientdashBoard;
