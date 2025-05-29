import './agentaccount.css';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { FaUser, FaMapMarkerAlt, FaInfoCircle, FaDollarSign } from 'react-icons/fa';
import Servicelevelcomponent from '../components/service-level/Servicelevelcomponent';
import AccommodationType from '../components/Accomodationtype/Accomodationtype';
import Roomtype from '../components/Roomtype/Roomtype';
import Amenities from '../components/Amenity/Amenities';
import Accommodation from '../components/Accomodation/Accomodation';

interface Task {
  id: number;
  client: string;
  requestDate: string;
  serviceType: string;
  priority: 'High' | 'Medium' | 'Low';
  details: string;
  destination?: string;
  tripType?: string;
  travelDates?: string;
  duration?: string;
  travelerName?: string;
  email?: string;
  phone?: string;
  travelersCount?: string;
  travelerAges?: string;
  budget?: string;
  accommodation?: string;
  transport?: string[];
  interests?: string[];
  tripDescription?: string;
  notes?: string;
}

function Agentaccount() {
  const [activeTab, setActiveTab] = useState<
    'tasks' | 'completed' | 'service' | 'accommodationType' | 'roomType' | 'amenity' | 'accommodation'
  >('tasks');
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agentNotes, setAgentNotes] = useState('');
  const [estimatedPrice, setEstimatedPrice] = useState('');

  const newTasks: Task[] = [
    {
      id: 1,
      client: 'John Doe',
      requestDate: '2023-05-15',
      serviceType: 'International Trip',
      priority: 'High',
      details: 'Planning a honeymoon to Bali',
      destination: 'Bali, Indonesia',
      tripType: 'Honeymoon',
      travelDates: '2023-11-15 to 2023-11-30',
      duration: '2 Weeks',
      travelerName: 'John and Jane Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      travelersCount: '2',
      budget: '$5,000+',
      accommodation: 'Luxury (5-star)',
      transport: ['flight', 'private'],
      interests: ['beach', 'relaxation', 'food'],
      tripDescription: 'We want a romantic honeymoon with private villas, spa treatments, and fine dining. Interested in cultural experiences but mostly relaxation.',
      notes: 'We are celebrating our wedding anniversary as well.'
    },
    {
      id: 2,
      client: 'Smith Family',
      requestDate: '2023-05-16',
      serviceType: 'Family Vacation',
      priority: 'Medium',
      details: 'Family trip to Europe with kids',
      destination: 'Multiple Destinations',
      tripType: 'Family',
      travelDates: '2024-06-15 to 2024-07-01',
      duration: '2 Weeks',
      travelerName: 'Michael Smith',
      email: 'm.smith@example.com',
      phone: '(987) 654-3210',
      travelersCount: '4',
      travelerAges: '42, 40 (adults), 12, 8 (kids)',
      budget: '$10,000 total',
      accommodation: 'Mix of Options',
      transport: ['flight', 'train'],
      interests: ['culture', 'hiking', 'food'],
      tripDescription: 'Looking for a mix of cultural experiences and fun activities for kids. Want to visit Paris, Rome, and maybe Switzerland. Need kid-friendly accommodations and activities.'
    }
  ];

  const completeTask = (taskId: number) => {
    const task = newTasks.find(t => t.id === taskId);
    if (task) {
      setCompletedTasks(prev => [...prev, task]);
    }
  };

  const handleStartTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleSubmitAgentForm = (e: FormEvent) => {
    e.preventDefault();
    if (selectedTask) {
      completeTask(selectedTask.id);
      setIsModalOpen(false);
      setAgentNotes('');
      setEstimatedPrice('');
    }
  };

  return (
    <div className="agent-dashboard">
      <header className="dashboard-header">
        <h1>Agent Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Agent Smith</span>
          <div className="avatar">AS</div>
        </div>
      </header>

      <div className="dashboard-container">
        <nav className="sidebar">
          <ul>
            <li className={activeTab === 'tasks' ? 'active' : ''} onClick={() => setActiveTab('tasks')}>New Tasks</li>
            <li className={activeTab === 'completed' ? 'active' : ''} onClick={() => setActiveTab('completed')}>Completed Tasks</li>
            <li className={activeTab === 'service' ? 'active' : ''} onClick={() => setActiveTab('service')}>Service Level</li>
            <li className={activeTab === 'accommodationType' ? 'active' : ''} onClick={() => setActiveTab('accommodationType')}>Accommodation Type</li>
            <li className={activeTab === 'roomType' ? 'active' : ''} onClick={() => setActiveTab('roomType')}>Room Type</li>
            <li className={activeTab === 'amenity' ? 'active' : ''} onClick={() => setActiveTab('amenity')}>Amenity</li>
            <li className={activeTab === 'accommodation' ? 'active' : ''} onClick={() => setActiveTab('accommodation')}>Accommodation</li>
          </ul>
        </nav>

        <main className="main-content">
          {activeTab === 'tasks' && (
            <div className="tasks-section">
              <h2>New Tasks</h2>
              <div className="tasks-grid">
                {newTasks.map(task => (
                  <div key={task.id} className="task-card">
                    <div className="task-header">
                      <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
                      <h3>{task.client}</h3>
                      <span className="task-date">{task.requestDate}</span>
                    </div>
                    <div className="task-body">
                      <p><strong>Service:</strong> {task.serviceType}</p>
                      <p><strong>Details:</strong> {task.details}</p>
                    </div>
                    <div className="task-footer">
                      <button className="btn-primary" onClick={() => handleStartTask(task)}>Start Task</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'completed' && (
            <div className="completed-section">
              <h2>Completed Tasks</h2>
              {completedTasks.length === 0 ? (
                <p>No completed tasks yet.</p>
              ) : (
                <table className="completed-tasks-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Service</th>
                      <th>Details</th>
                      <th>Completed Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedTasks.map((task, index) => (
                      <tr key={index}>
                        <td>{task.client}</td>
                        <td>{task.serviceType}</td>
                        <td>{task.details}</td>
                        <td>{new Date().toISOString().split('T')[0]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {activeTab === 'service' && (
            <div className="api-section">
              <Servicelevelcomponent />
            </div>
          )}

          {activeTab === 'accommodationType' && (
            <div className="api-section">
              <AccommodationType />
              {/* Add your component here later */}
            </div>
          )}

          {activeTab === 'roomType' && (
            <div className="api-section">
              <Roomtype />
              {/* Add your component here later */}
            </div>
          )}

          {activeTab === 'amenity' && (
            <div className="api-section">
              <Amenities/>
              {/* Add your component here later */}
            </div>
          )}

          {activeTab === 'accommodation' && (
            <div className="api-section">
              <Accommodation />
              {/* Add your component here later */}
            </div>
          )}
        </main>
      </div>

      {isModalOpen && selectedTask && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Client Trip Details</h2>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>
            </div>
            <div className="modal-content">
              <div className="client-details-section">
                <h3><FaUser className="section-icon" /> Client Information</h3>
                <div className="details-grid">
                  <div>
                    <p><strong>Name:</strong> {selectedTask.travelerName}</p>
                    <p><strong>Email:</strong> {selectedTask.email}</p>
                    <p><strong>Phone:</strong> {selectedTask.phone}</p>
                    <p><strong>Travelers:</strong> {selectedTask.travelersCount}</p>
                    {selectedTask.travelerAges && (
                      <p><strong>Ages:</strong> {selectedTask.travelerAges}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="trip-details-section">
                <h3><FaMapMarkerAlt className="section-icon" /> Trip Details</h3>
                <div className="details-grid">
                  <div>
                    <p><strong>Destination:</strong> {selectedTask.destination}</p>
                    <p><strong>Trip Type:</strong> {selectedTask.tripType}</p>
                    <p><strong>Travel Dates:</strong> {selectedTask.travelDates}</p>
                    <p><strong>Duration:</strong> {selectedTask.duration}</p>
                    <p><strong>Budget:</strong> {selectedTask.budget}</p>
                    <p><strong>Accommodation:</strong> {selectedTask.accommodation}</p>
                  </div>
                  <div>
                    <p><strong>Transport:</strong> {selectedTask.transport?.join(', ')}</p>
                    <p><strong>Interests:</strong> {selectedTask.interests?.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="description-section">
                <h3><FaInfoCircle className="section-icon" /> Trip Description</h3>
                <p>{selectedTask.tripDescription}</p>
                {selectedTask.notes && (
                  <>
                    <h4>Additional Notes:</h4>
                    <p>{selectedTask.notes}</p>
                  </>
                )}
              </div>

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
                  <button type="button" className="btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn-primary">Complete Task</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Agentaccount;
