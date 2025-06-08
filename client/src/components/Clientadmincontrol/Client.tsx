import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { FaSearch, FaUser, FaEnvelope, FaPhone, FaKey, FaCalendarAlt, FaTrash } from 'react-icons/fa';
import { useAuthStore } from '../../Store/useauthstore';
import './client.css';

interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  createdAt: string;
  bookings?: Booking[];
}

interface Booking {
  id: string;
  destination: string;
  travelDates: string;
  status: string;
  plan?: {
    estimatedPrice: string;
    agentNotes: string;
  };
}

function Client() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const apiUrl = import.meta.env.VITE_travel;
  const token = useAuthStore((state) => state.token);

  // Fetch all clients
  const { data: clients = [], isLoading, refetch } = useQuery<Client[]>({
    queryKey: ['clients'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/client/fetch-all`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to fetch clients');
      }
      return res.json();
    }
  });

  // Filter clients based on search term
  const filteredClients = clients.filter(client => 
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mutation to reset client password
  const { mutate: resetPassword, isPending: isResetting } = useMutation({
    mutationFn: async ({ clientId, newPassword }: { clientId: string; newPassword: string }) => {
      const res = await fetch(`${apiUrl}/client/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify({ clientId, newPassword })
      });
      if (!res.ok) {
        throw new Error('Failed to reset password');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Password reset successfully!');
      setNewPassword('');
      setConfirmPassword('');
      setSelectedClient(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  // Mutation to delete client
  const { mutate: deleteClient, isPending: isDeleting } = useMutation({
    mutationFn: async (clientId: string) => {
      const res = await fetch(`${apiUrl}/client/${clientId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to delete client');
      }
      return res.json();
    },
    onSuccess: () => {
      toast.success('Client deleted successfully!');
      refetch();
      setSelectedClient(null);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handlePasswordReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) return;
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    resetPassword({ clientId: selectedClient.id, newPassword });
  };

  const handleDeleteClient = (clientId: string) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      deleteClient(clientId);
    }
  };

  return (
    <div className="client-management">
      <Toaster richColors position="top-center" />
      
      <div className="search-section">
        <h2><FaUser /> Client Management</h2>
        <div className="search-form">
          <div className="search-input-group">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search clients by name or email"
            />
            <div className="search-icon">
              <FaSearch />
            </div>
          </div>
        </div>
      </div>

      <div className="clients-table-container">
        <table className="clients-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Member Since</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="loading-cell">Loading clients...</td>
              </tr>
            ) : filteredClients.length === 0 ? (
              <tr>
                <td colSpan={5} className="no-results">No clients found</td>
              </tr>
            ) : (
              filteredClients.map(client => (
                <tr 
                  key={client.id} 
                  className={selectedClient?.id === client.id ? 'selected' : ''}
                  onClick={() => setSelectedClient(client)}
                >
                  <td>{client.firstName} {client.lastName}</td>
                  <td>{client.email}</td>
                  <td>{client.contact}</td>
                  <td>{new Date(client.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClient(client.id);
                      }}
                      className="delete-button"
                      disabled={isDeleting}
                    >
                      <FaTrash /> {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedClient && (
        <div className="client-details-panel">
          <div className="client-info">
            <h3>Client Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <FaUser />
                <span>Name:</span>
                <strong>{selectedClient.firstName} {selectedClient.lastName}</strong>
              </div>
              <div className="info-item">
                <FaEnvelope />
                <span>Email:</span>
                <strong>{selectedClient.email}</strong>
              </div>
              <div className="info-item">
                <FaPhone />
                <span>Contact:</span>
                <strong>{selectedClient.contact}</strong>
              </div>
              <div className="info-item">
                <FaCalendarAlt />
                <span>Member Since:</span>
                <strong>{new Date(selectedClient.createdAt).toLocaleDateString()}</strong>
              </div>
            </div>
          </div>

          <div className="password-reset-section">
            <h3><FaKey /> Reset Password</h3>
            <form onSubmit={handlePasswordReset} className="password-form">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                  minLength={8}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  required
                />
              </div>
              <button 
                type="submit" 
                className="reset-button"
                disabled={isResetting}
              >
                {isResetting ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </div>

          {selectedClient.bookings && selectedClient.bookings.length > 0 && (
            <div className="bookings-section">
              <h3>Client Bookings</h3>
              <div className="bookings-grid">
                {selectedClient.bookings.map((booking) => (
                  <div key={booking.id} className="booking-card">
                    <div className="booking-header">
                      <h4>{booking.destination}</h4>
                      <span className={`status-badge ${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="booking-details">
                      <p><strong>Dates:</strong> {booking.travelDates}</p>
                      {booking.plan && (
                        <>
                          <p><strong>Estimated Price:</strong> {booking.plan.estimatedPrice}</p>
                          <div className="agent-notes">
                            <strong>Agent Notes:</strong>
                            <p>{booking.plan.agentNotes}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Client;