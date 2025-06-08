import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Toaster, toast } from 'sonner';
import './bookingtrips.css';
import { useAuthStore } from '../../Store/useauthstore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTimes, FaMoneyBillWave, FaFileAlt } from 'react-icons/fa';

interface Booking {
  id: string;
  clientId: string;
  destination: string;
  travelDates: string;
  budget: string;
  travelers: string;
  preferences: string;
  specialRequests: string;
  status: "pending" | "confirmed" | "cancelled" | "Pending Payment";
  createdAt: string;
  updatedAt: string;
}

interface Proposal {
  id: string;
  bookingId: string;
  details: string;
  price: string;
  itinerary: string;
}

interface Plan {
  id: string;
  bookingId: string;
  estimatedPrice: string;
  agentNotes: string;
  createdAt: string;
  updatedAt: string;
  booking: Booking;
}

const defaultImages = [
  'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
];

function BookedTrips() {
  const apiUrl = import.meta.env.VITE_travel;
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedBookingForPlan, setSelectedBookingForPlan] = useState<Booking | null>(null);
  const token = useAuthStore((state) => state.token);

  // Fetch booked trips
  const { 
    data: bookings = [], 
    isLoading, 
    error,
    refetch: refetchBookings
  } = useQuery<Booking[], Error>({
    queryKey: ['bookings'],
    queryFn: async () => {
      if (!token) throw new Error('Authentication required');

      const res = await fetch(`${apiUrl}/booking/fetch-all`, {
        headers: { 'Authorization': `${token}` }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch bookings');
      }
      return await res.json();
    }
  });

  // Fetch agent proposals
  const { data: agentProposals = [] } = useQuery<Proposal[], Error>({
    queryKey: ['proposals'],
    queryFn: async () => {
      if (!token) throw new Error('Authentication required');

      const res = await fetch(`${apiUrl}/proposals`, {
        headers: { 'Authorization': `${token}` }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch proposals');
      }
      return await res.json();
    },
    enabled: bookings.some(b => b.status === 'Pending Payment')
  });

  // Fetch plan for a booking
  const { 
    data: selectedPlan, 
    isLoading: isLoadingPlan,
    error: planError,
  } = useQuery<Plan, Error>({
    queryKey: ['plan', selectedBookingForPlan?.id],
    queryFn: async () => {
      if (!token || !selectedBookingForPlan) throw new Error('Authentication required');

      const res = await fetch(`${apiUrl}/plans/plan/${selectedBookingForPlan.id}`, {
        headers: { 'Authorization': `${token}` }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch plan');
      }
      return await res.json();
    },
    enabled: !!selectedBookingForPlan,
  });

  // Mutation for accepting a proposal
  const { mutateAsync: acceptProposal } = useMutation({
    mutationFn: async (proposalId: string) => {
      if (!token) throw new Error('Authentication required');

      const res = await fetch(`${apiUrl}/proposals/${proposalId}/accept`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to accept proposal');
      }
      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Proposal accepted successfully!');
      refetchBookings();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  // Mutation for rejecting a proposal
  const { mutateAsync: rejectProposal } = useMutation({
    mutationFn: async (proposalId: string) => {
      if (!token) throw new Error('Authentication required');

      const res = await fetch(`${apiUrl}/proposals/${proposalId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to reject proposal');
      }
      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Proposal rejected successfully');
      refetchBookings();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  // Mutation for cancelling a booking
  const { mutateAsync: cancelBooking } = useMutation({
    mutationFn: async (bookingId: string) => {
      if (!token) throw new Error('Authentication required');

      const res = await fetch(`${apiUrl}/booking/${bookingId}/cancel`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to cancel booking');
      }
      return await res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Booking cancellation in progress');
      refetchBookings();
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const handleAcceptProposal = (proposalId: string) => {
    acceptProposal(proposalId);
  };

  const handleRejectProposal = (proposalId: string) => {
    rejectProposal(proposalId);
  };

  const handleCancelBooking = (bookingId: string) => {
    cancelBooking(bookingId);
  };

  const handleViewPlan = (booking: Booking) => {
    setSelectedBookingForPlan(booking);
  };

  const closePlanModal = () => {
    setSelectedBookingForPlan(null);
  };

  const getRandomImage = (bookingId: string) => {
    const hash = bookingId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return defaultImages[hash % defaultImages.length];
  };

  const formatStatus = (status: string) => {
    const formatted = status.split(' ').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return {
      displayText: formatted,
      className: status.toLowerCase().replace(/\s+/g, '_')
    };
  };

  if (isLoading) return <div className="loading">Loading your trips...</div>;
  if (error) return <div className="error">Error loading trips: {error.message}</div>;

  return (
    <div className="bookings-container">
      <Toaster richColors position="top-center" />
      
      {/* Payment Options Modal */}
      {showPaymentOptions && (
        <div className="payment-options-modal">
          <div className="payment-options-card">
            <button 
              className="modal-close"
              onClick={() => setShowPaymentOptions(false)}
            >
              &times;
            </button>
            
            <div className="payment-header">
              <h2>Complete Your Payment</h2>
              <p>Choose your preferred payment method</p>
              
              <div className="automation-notice">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <p>We're working on implementing a more automated payment system for your convenience. Stay tuned for updates!</p>
              </div>
            </div>

            <div className="payment-methods-container">
              {/* M-PESA Payment Section */}
              <section className="payment-method mpesa-section">
                <div className="payment-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                    <path fill="#43A047" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-4 30h-4V18h4v16zm8 0h-4V18h4v16z"/>
                  </svg>
                </div>
                <h3>Pay with M-PESA (KES)</h3>
                <div className="payment-instructions">
                  <ol>
                    <li>Go to your <strong>M-PESA</strong> menu</li>
                    <li>Select <strong>"Lipa na M-PESA"</strong></li>
                    <li>Select <strong>"Buy Goods and Services"</strong></li>
                    <li>Enter Till Number: <strong className="till-number">3556118</strong></li>
                    <li>Enter the amount you wish to pay</li>
                    <li>Enter your M-PESA PIN and confirm</li>
                  </ol>
                </div>
                <div className="payment-note">
                  <p>You will receive a confirmation message from M-PESA once payment is complete.</p>
                </div>
              </section>

              {/* USD Payment Section */}
              <section className="payment-method usd-section">
                <div className="payment-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
                    <path fill="#1976D2" d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm-1 32h-4V26h4v10zm0-16h-4v-4h4v4zm8 16h-4V26h4v10zm0-16h-4v-4h4v4z"/>
                  </svg>
                </div>
                <h3>Pay in USD ($)</h3>
                <div className="payment-instructions">
                  <div className="important-note">
                    <h4>Important:</h4>
                    <p>Before sending any payment, please contact us to confirm payment details.</p>
                  </div>
                  <ul>
                    <li>Call or WhatsApp: <strong>+254 758 420 860</strong></li>
                    <li>Confirm payment details before sending</li>
                    <li>We will provide you with the USD payment instructions</li>
                  </ul>
                </div>
                <div className="payment-note warning">
                  <p><strong>Do not send money without contacting us first.</strong> We need to verify the current exchange rate and payment details.</p>
                </div>
              </section>
            </div>

            <div className="payment-footer">
              <p>Need help with payment? Contact us at <strong>support@example.com</strong></p>
            </div>
          </div>
        </div>
      )}
      
      {/* Plan Details Modal - Takes 3/4 of screen */}
      {selectedBookingForPlan && (
        <div className="plan-modal-overlay">
          <div className="plan-modal-container">
            <div className="plan-modal-header">
              <h2>Agent's Travel Plan</h2>
              <button 
                className="plan-modal-close"
                onClick={closePlanModal}
              >
                <FaTimes />
              </button>
            </div>
            
            {isLoadingPlan ? (
              <div className="plan-loading">Loading plan details...</div>
            ) : planError ? (
              <div className="plan-error">Error loading plan: {planError.message}</div>
            ) : selectedPlan ? (
              <div className="plan-modal-content">
                <div className="plan-section">
                  <h3>Estimated Price</h3>
                  <p className="plan-price">{selectedPlan.estimatedPrice}</p>
                </div>
                
                <div className="plan-section">
                  <h3>Agent's Notes</h3>
                  <div className="plan-notes">
                    {selectedPlan.agentNotes.split('\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </div>
                
                <div className="plan-actions">
                  <button 
                    className="btn btn-success"
                    onClick={() => setShowPaymentOptions(true)}
                  >
                    <FaMoneyBillWave /> Pay Now
                  </button>
                </div>
              </div>
            ) : (
              <div className="plan-not-found">No plan found for this booking</div>
            )}
          </div>
        </div>
      )}
      
      <div className="bookings-section">
        <h2 className="section-title">
          <i className="fas fa-suitcase"></i> Your Booked Trips
        </h2>
        
        {bookings.length === 0 ? (
          <div className="no-trips">
            <p>You don't have any trips booked yet.</p>
            <button className="btn primary">Plan a new trip</button>
          </div>
        ) : (
          <div className="trips-list">
            {bookings.map(booking => {
              const bookingProposals = agentProposals.filter(p => p.bookingId === booking.id);
              const hasProposals = booking.status === "Pending Payment" && bookingProposals.length > 0;
              const canCancel = booking.status === "pending" || booking.status === "confirmed" || booking.status === "Pending Payment";
              const statusInfo = formatStatus(booking.status);
              
              return (
                <div key={booking.id} className={`trip-card ${statusInfo.className}`}>
                  <div 
                    className="trip-image"
                    style={{ backgroundImage: `url(${getRandomImage(booking.id)})` }}
                  ></div>
                  <div className="trip-content">
                    <div className="trip-header">
                      <h3>{booking.destination}</h3>
                      <span className={`status-badge ${statusInfo.className}`}>
                        {statusInfo.displayText}
                      </span>
                    </div>
                    <div className="trip-details">
                      <p className="detail-item">
                        <i className="far fa-calendar-alt"></i> 
                        <strong>Dates:</strong> {booking.travelDates}
                      </p>
                      <p className="detail-item">
                        <i className="fas fa-users"></i> 
                        <strong>Travelers:</strong> {booking.travelers}
                      </p>
                      <p className="detail-item">
                        <i className="fas fa-wallet"></i> 
                        <strong>Budget:</strong> {booking.budget}
                      </p>
                      <p className="detail-item">
                        <i className="fas fa-heart"></i> 
                        <strong>Preferences:</strong> {booking.preferences}
                      </p>
                      {booking.specialRequests && (
                        <p className="detail-item">
                          <i className="fas fa-star"></i> 
                          <strong>Special Requests:</strong> {booking.specialRequests}
                        </p>
                      )}
                    </div>
                    
                    <div className="booking-actions">
                      {hasProposals && (
                        <>
                          <button 
                            className="btn accept"
                            onClick={() => handleAcceptProposal(bookingProposals[0].id)}
                          >
                            <i className="fas fa-check"></i> Accept Proposal
                          </button>
                          <button 
                            className="btn reject"
                            onClick={() => handleRejectProposal(bookingProposals[0].id)}
                          >
                            <i className="fas fa-times"></i> Reject Proposal
                          </button>
                          <button 
                            className="btn read-more"
                            onClick={() => setSelectedProposal(bookingProposals[0])}
                          >
                            <i className="fas fa-info-circle"></i> Full Details
                          </button>
                        </>
                      )}
                      <div className="buttons-concel-here">
                        {canCancel && (
                          <button 
                            className="btn btn-danger cancel"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            <i className="fas fa-ban"></i> Cancel Request
                          </button>
                        )}

                        {booking.status === "Pending Payment" && (
                          <button 
                            className="btn btn-primary"
                            onClick={() => handleViewPlan(booking)}
                          >
                            <FaFileAlt /> View Agent's Plan
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Proposal Details Modal */}
      {selectedProposal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button 
              className="modal-close"
              onClick={() => setSelectedProposal(null)}
            >
              &times;
            </button>
            <h3>Proposal Details</h3>
            <div className="proposal-details">
              <p><strong>Price:</strong> {selectedProposal.price}</p>
              <p><strong>Itinerary:</strong></p>
              <div className="itinerary">
                {selectedProposal.itinerary.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <p><strong>Additional Details:</strong></p>
              <p>{selectedProposal.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookedTrips;