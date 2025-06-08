import './agentaccount.css';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { FaUser, FaMapMarkerAlt, FaInfoCircle, FaDollarSign, FaUndo } from 'react-icons/fa';
import { useQuery, useMutation } from '@tanstack/react-query';
import Servicelevelcomponent from '../components/service-level/Servicelevelcomponent';
import AccommodationType from '../components/Accomodationtype/Accomodationtype';
import Roomtype from '../components/Roomtype/Roomtype';
import Amenities from '../components/Amenity/Amenities';
import Accommodation from '../components/Accomodation/Accomodation';
import { useLocation } from 'react-router-dom';
import { useAuthStore } from '../Store/useauthstore';
import axios from 'axios';
import { toast, Toaster } from 'sonner';
import Agentsettings from '../components/Agentsettings/Agentsettings';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  id: string;
  clientId: string;
  destination: string;
  travelDates: string;
  budget: string;
  travelers: string;
  preferences: string;
  specialRequests: string;
  status: string; // Changed to string to accommodate all statuses
  createdAt: string;
  updatedAt: string;
  client: Client;
}

type ActiveTab =
  | 'tasks'
  | 'service'
  | 'accommodationType'
  | 'roomType'
  | 'amenity'
  | 'accommodation'
  | 'agentSettings';

function Agentaccount() {
  const token = useAuthStore((state) => state.token);
  const location = useLocation();
  const role: string | undefined = location.state?.role;
  const dataStuff = useAuthStore((state) => state.user);

  const [activeTab, setActiveTab] = useState<ActiveTab>('tasks');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [agentNotes, setAgentNotes] = useState<string>('');
  const [estimatedPrice, setEstimatedPrice] = useState<string>('');

  const apiUrl = import.meta.env.VITE_travel;

  const { data: bookings = [], isLoading, error, refetch } = useQuery<Booking[]>({
    queryKey: ['bookings'],
    queryFn: async () => {
      const response = await axios.get(`${apiUrl}/booking/fetch-all`);
      return Array.isArray(response.data) ? response.data : [];
    },
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'pending payment':
        return 'status-pending-payment';
      case 'cancelled':
        return 'status-cancelled';
      case 'confirmed':
        return 'status-confirmed';
      case 'in progress':
        return 'status-in-progress';
      default:
        return 'status-default';
    }
  };

  const handleStartTask = (booking: Booking): void => {
    setSelectedBooking(booking);
    setAgentNotes('');
    setEstimatedPrice('');
    setIsModalOpen(true);
  };

  const planMutation = useMutation({
    mutationFn: async ({ bookingId, agentNotes, estimatedPrice }: {
      bookingId: string;
      agentNotes: string;
      estimatedPrice: string;
    }) => {
      const response = await axios.post(
        `${apiUrl}/plans/add-plan/${bookingId}`,
        { agentNotes, estimatedPrice },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Plan created successfully!');
      setTimeout(() => {
        refetch();
      }, 1000);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to create plan';
      toast.error(message);
    },
  });

 const undoChangesMutation = useMutation({
  mutationFn: async (bookingId: string) => {
    const response = await axios.delete(
      `${apiUrl}/plans/delete/${bookingId}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  },
  onSuccess: (data) => {
    toast.success(data.message || 'Booking reverted to pending successfully!');
    refetch();
  },
  onError: (error: any) => {
    const message = error.response?.data?.message || 'Failed to revert booking';
    toast.error(message);
  },
});


  const handleUndoChanges = (bookingId: string) => {
    undoChangesMutation.mutate(bookingId);
  };

  const handleSubmitAgentForm = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!selectedBooking) return;

    planMutation.mutate({
      bookingId: selectedBooking.id,
      agentNotes,
      estimatedPrice,
    });

    setTimeout(() => {
      setIsModalOpen(false);
    }, 3000);
  };

  const getInitials = (): string => {
    const f = dataStuff?.firstName?.[0]?.toUpperCase() || '';
    const l = dataStuff?.lastName?.[0]?.toUpperCase() || '';
    return f + l;
  };

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error loading bookings</div>;

  return (
    <div className="agent-dashboard">
      <Toaster richColors position="top-center" closeButton={false} />
      <header className="dashboard-header">
        <h1>Agent Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {dataStuff?.firstName}</span>
          <div className="avatar">{getInitials()}</div>
        </div>
      </header>

      <div className="dashboard-container">
        <nav className="sidebar">
          <ul>
            <li className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>
              All Bookings <span className="badge">{bookings.length}</span>
            </li>
            {role === 'senior-agent' && (
              <>
                <li className={activeTab === 'service' ? 'active' : ''} onClick={() => setActiveTab('service')}>
                  Service Level
                </li>
                <li
                  className={activeTab === 'accommodationType' ? 'active' : ''}
                  onClick={() => setActiveTab('accommodationType')}
                >
                  Accommodation Type
                </li>
                <li className={activeTab === 'roomType' ? 'active' : ''} onClick={() => setActiveTab('roomType')}>
                  Room Type
                </li>
                <li className={activeTab === 'amenity' ? 'active' : ''} onClick={() => setActiveTab('amenity')}>
                  Amenity
                </li>
                <li className={activeTab === 'accommodation' ? 'active' : ''} onClick={() => setActiveTab('accommodation')}>
                  Accommodation
                </li>
                <li className={activeTab === 'agentSettings' ? 'active' : ''} onClick={() => setActiveTab('agentSettings')}>
                  Agent Settings
                </li>
              </>
            )}
          </ul>
        </nav>

        <main className="main-content">
          {activeTab === 'tasks' && (
            <div className="tasks-section">
              <h2>All Bookings</h2>
              <div className="tasks-grid">
                {bookings.map((booking) => (
                  <div key={booking.id} className="task-card">
                    <div className="booking-header">
                      <h3>{booking.destination}</h3>
                      <span className={`status-badge ${getStatusColor(booking.status)}`}>
                        {booking.status.toUpperCase()}
                      </span>
                    </div>
                    <p>Client: {booking.client.firstName} {booking.client.lastName}</p>
                    <p>Dates: {booking.travelDates}</p>
                    <div className="task-actions">
                      <button 
                        className="btn-primary"
                        onClick={() => handleStartTask(booking)}
                      >
                        View Details
                      </button>
                      {booking.status === 'Pending Payment' && (
                        <button 
                          className="btn-undo"
                          onClick={() => handleUndoChanges(booking.id)}
                          disabled={undoChangesMutation.isPending}
                        >
                          <FaUndo /> {undoChangesMutation.isPending ? 'Processing...' : 'Undo Changes'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === 'service' && <Servicelevelcomponent />}
          {activeTab === 'accommodationType' && <AccommodationType />}
          {activeTab === 'roomType' && <Roomtype />}
          {activeTab === 'amenity' && <Amenities />}
          {activeTab === 'accommodation' && <Accommodation />}
          {activeTab === 'agentSettings' && <Agentsettings />}
        </main>
      </div>

      {isModalOpen && selectedBooking && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Client Booking Details</h2>
              <span className={`status-badge ${getStatusColor(selectedBooking.status)} modal-status`}>
                {selectedBooking.status.toUpperCase()}
              </span>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-content">
              <div className="client-details-section">
                <h3><FaUser className="section-icon" /> Client Information</h3>
                <div className="details-grid">
                  <div>
                    <p><strong>Name:</strong> {selectedBooking.client.firstName} {selectedBooking.client.lastName}</p>
                    <p><strong>Email:</strong> {selectedBooking.client.email}</p>
                    <p><strong>Phone:</strong> {selectedBooking.client.contact}</p>
                    <p><strong>Travelers:</strong> {selectedBooking.travelers}</p>
                  </div>
                </div>
              </div>

              <div className="trip-details-section">
                <h3><FaMapMarkerAlt className="section-icon" /> Trip Details</h3>
                <div className="details-grid">
                  <div>
                    <p><strong>Destination:</strong> {selectedBooking.destination}</p>
                    <p><strong>Travel Dates:</strong> {selectedBooking.travelDates}</p>
                    <p><strong>Budget:</strong> {selectedBooking.budget}</p>
                    <p><strong>Preferences:</strong> {selectedBooking.preferences}</p>
                  </div>
                </div>
              </div>

              <div className="description-section">
                <h3><FaInfoCircle className="section-icon" /> Special Requests</h3>
                <p>{selectedBooking.specialRequests || 'No special requests'}</p>
              </div>

              {selectedBooking.status === 'pending' && (
                <form onSubmit={handleSubmitAgentForm} className="agent-form">
                  <h3><FaDollarSign className="section-icon" /> Agent Planning</h3>
                  <div className="form-group">
                    <label>Estimated Price</label>
                    <input
                      type="text"
                      value={estimatedPrice}
                      onChange={(e) => setEstimatedPrice(e.target.value)}
                      placeholder="Enter estimated price"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Your Notes & Plan</label>
                    <textarea
                      value={agentNotes}
                      onChange={(e) => setAgentNotes(e.target.value)}
                      placeholder="Enter your plan, itinerary suggestions, or notes for the client..."
                      rows={5}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </button>
                    <button type="submit" className="btn-primary" disabled={planMutation.isPending}>
                      {planMutation.isPending ? 'Submitting...' : 'Complete Task'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Agentaccount;