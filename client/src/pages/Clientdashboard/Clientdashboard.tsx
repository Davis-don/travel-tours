import React from 'react';
import './clientdashboard.css';
import Bookingform from '../../components/Booking/Bookingform';
import Bookedtrops from '../../components/Bookedtrips/Bookedtrops';
import { useAuthStore } from '../../Store/useauthstore';
import Clientsettings from '../../components/clientsettings/Clientsettings';

// Type definitions
type TripStatus = 'Confirmed' | 'Pending' | 'Agent Review';

interface Trip {
  id: number;
  destination: string;
  dates: string;
  status: TripStatus;
  agent: string;
  price: string;
  details: string;
  image?: string;
}

interface Hotel {
  name: string;
  rating: string;
  price: string;
  image: string;
}

interface Proposal {
  id: number;
  tripId: number;
  agent: string;
  proposal: string;
  hotels: Hotel[];
  activities: string[];
  status: string;
}



type DashboardTab = 'bookings' | 'new' | 'settings';

const Clientdashboard: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  // Dummy data for booked trips
  const bookedTrips: Trip[] = [
    {
      id: 1,
      destination: "Paris, France",
      dates: "June 15-22, 2023",
      status: "Confirmed",
      agent: "John Travel",
      price: "$2,450",
      details: "7-day tour including Eiffel Tower, Louvre, and Seine River cruise.",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      id: 2,
      destination: "Tokyo, Japan",
      dates: "August 5-18, 2023",
      status: "Pending",
      agent: "Sakura Tours",
      price: "$3,780",
      details: "Exploring Tokyo, Kyoto, and Mount Fuji with traditional ryokan stay.",
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80"
    },
    {
      id: 3,
      destination: "Safari in Kenya",
      dates: "December 10-17, 2023",
      status: "Agent Review",
      agent: "Wildlife Adventures",
      price: "$1,950",
      details: "7-day safari in Maasai Mara with luxury tent accommodations.",
      image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    }
  ];


  const [activeTab, setActiveTab] = React.useState<DashboardTab>("bookings");
  const [selectedProposal, setSelectedProposal] = React.useState<Proposal | null>(null);
  const [rejectFeedback, setRejectFeedback] = React.useState<string>("");
  const [showPaymentModal, setShowPaymentModal] = React.useState<boolean>(false);



  const handleAcceptProposal = () => {
    setShowPaymentModal(true);
  };

  const submitRejection = () => {
    alert(`Proposal rejected. Feedback submitted: ${rejectFeedback}`);
    setSelectedProposal(null);
  };

  const makePayment = () => {
    alert("Payment processed successfully! Your trip is confirmed.");
    setShowPaymentModal(false);
  };

  return (
    <div className="client-dashboard">
      <header className="dashboard-header">
        <div className="header-background"></div>
        <div className="header-content">
          <div className="welcome-message">
            <h1>Welcome back, {user?.firstName}!</h1>
            <p className="subtitle">Ready for your next adventure?</p>
          </div>
      
        </div>
      </header>

      <nav className="dashboard-nav">
        <button 
          className={activeTab === "bookings" ? "active" : ""} 
          onClick={() => setActiveTab("bookings")}
        >
          <i className="fas fa-suitcase"></i> My Bookings
        </button>
        <button 
          className={activeTab === "new" ? "active" : ""} 
          onClick={() => setActiveTab("new")}
        >
          <i className="fas fa-plus-circle"></i> Plan New Trip
        </button>
        <button 
          className={activeTab === "settings" ? "active" : ""} 
          onClick={() => setActiveTab("settings")}
        >
          <i className="fas fa-user-cog"></i> Account Settings
        </button>
      </nav>

      <main className="dashboard-content">
        {activeTab === "bookings" && (
          <Bookedtrops/>
        )}

        {activeTab === "new" && (
          <Bookingform/>
        )}

        {activeTab === "settings" && (

      <Clientsettings/>

        )}
      </main>

      {/* Proposal Detail Modal */}
      {selectedProposal && !showPaymentModal && (
        <div className="modal-overlay">
          <div className="proposal-modal">
            <button className="close-btn" onClick={() => setSelectedProposal(null)}>×</button>
            
            <h3>Proposal Details for {bookedTrips.find(t => t.id === selectedProposal.tripId)?.destination}</h3>
            <p className="agent-name">Prepared by: {selectedProposal.agent}</p>
            
            <div className="proposal-content">
              <h4>Package Summary:</h4>
              <p>{selectedProposal.proposal}</p>
              
              <h4>Recommended Hotels:</h4>
              <div className="hotels-grid">
                {selectedProposal.hotels.map((hotel, index) => (
                  <div key={index} className="hotel-card">
                    <div 
                      className="hotel-image"
                      style={{ backgroundImage: `url(${hotel.image})` }}
                    ></div>
                    <div className="hotel-info">
                      <h5>{hotel.name}</h5>
                      <p><i className="fas fa-star"></i> {hotel.rating}</p>
                      <p><i className="fas fa-tag"></i> {hotel.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <h4>Planned Activities:</h4>
              <ul className="activities-list">
                {selectedProposal.activities.map((activity, index) => (
                  <li key={index}>
                    <i className="fas fa-check-circle"></i> {activity}
                  </li>
                ))}
              </ul>
              
              {selectedProposal.status === "pending client approval" && (
                <div className="rejection-feedback">
                  <h4>Not what you wanted?</h4>
                  <textarea
                    placeholder="Please provide feedback on why you're rejecting this proposal..."
                    value={rejectFeedback}
                    onChange={(e) => setRejectFeedback(e.target.value)}
                    rows={4}
                  />
                  <div className="modal-actions">
                    <button className="btn accept" onClick={handleAcceptProposal}>
                      <i className="fas fa-check"></i> Accept Proposal
                    </button>
                    <button className="btn reject" onClick={submitRejection}>
                      <i className="fas fa-times"></i> Submit Rejection
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedProposal && (
        <div className="modal-overlay">
          <div className="payment-modal">
            <button className="close-btn" onClick={() => setShowPaymentModal(false)}>×</button>
            
            <h3>Confirm Your Booking</h3>
            <p className="booking-destination">
              <i className="fas fa-map-marker-alt"></i> {bookedTrips.find(t => t.id === selectedProposal.tripId)?.destination}
            </p>
            
            <div className="payment-details">
              <h4>Trip Summary:</h4>
              <p>{selectedProposal.proposal}</p>
              
              <div className="price-summary">
                <div className="price-tag">
                  <span className="price-label">Total Price:</span>
                  <span className="price-amount">{bookedTrips.find(t => t.id === selectedProposal.tripId)?.price}</span>
                </div>
                <p className="note">(Payment secures your booking and all reservations)</p>
              </div>
              
              <div className="payment-methods">
                <h4>Select Payment Method:</h4>
                <div className="method-options">
                  <label className="method-option">
                    <input type="radio" name="paymentMethod" defaultChecked />
                    <div className="method-content">
                      <i className="fab fa-cc-visa"></i>
                      <span>Credit/Debit Card</span>
                    </div>
                  </label>
                  <label className="method-option">
                    <input type="radio" name="paymentMethod" />
                    <div className="method-content">
                      <i className="fab fa-paypal"></i>
                      <span>PayPal</span>
                    </div>
                  </label>
                  <label className="method-option">
                    <input type="radio" name="paymentMethod" />
                    <div className="method-content">
                      <i className="fas fa-university"></i>
                      <span>Bank Transfer</span>
                    </div>
                  </label>
                </div>
                
                <div className="card-details">
                  <h5>Card Information</h5>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input type="text" placeholder="123" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Name on Card</label>
                    <input type="text" placeholder="John Doe" />
                  </div>
                </div>
              </div>
              
              <button className="pay-now-btn" onClick={makePayment}>
                <i className="fas fa-lock"></i> Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientdashboard;