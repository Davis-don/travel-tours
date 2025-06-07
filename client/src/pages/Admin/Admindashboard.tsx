// AdminDashboard.jsx
import { useState } from 'react';
import './admindashboard.css';
import Dashboard from '../../components/Admindashboard/Dashboard';
import Agents from '../../components/Adminagents/Agent';
// import Clients from './Clients';
// import Bookings from './Bookings';
// import Settings from './Settings';
// import Reports from './Reports';
// import Payments from './Payments';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'agents':
        return <Agents />;
      case 'clients':
    //     return <Clients />;
    //   case 'bookings':
    //     return <Bookings />;
    //   case 'payments':
    //     return <Payments />;
    //   case 'reports':
    //     return <Reports />;
    //   case 'settings':
    //     return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`admin-container ${sidebarOpen ? '' : 'sidebar-collapsed'}`}>
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="sidebar-header">
          <h2>TravelEase Admin</h2>
          <button 
            className="toggle-btn" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '◄' : '►'}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => setActiveTab('dashboard')}
            >
              <i className="fas fa-tachometer-alt"></i>
              {sidebarOpen && <span>Dashboard</span>}
            </li>
            <li 
              className={activeTab === 'agents' ? 'active' : ''}
              onClick={() => setActiveTab('agents')}
            >
              <i className="fas fa-user-tie"></i>
              {sidebarOpen && <span>Agents</span>}
            </li>
            <li 
              className={activeTab === 'clients' ? 'active' : ''}
              onClick={() => setActiveTab('clients')}
            >
              <i className="fas fa-users"></i>
              {sidebarOpen && <span>Clients</span>}
            </li>
            <li 
              className={activeTab === 'bookings' ? 'active' : ''}
              onClick={() => setActiveTab('bookings')}
            >
              <i className="fas fa-calendar-check"></i>
              {sidebarOpen && <span>Bookings</span>}
            </li>
            <li 
              className={activeTab === 'payments' ? 'active' : ''}
              onClick={() => setActiveTab('payments')}
            >
              <i className="fas fa-credit-card"></i>
              {sidebarOpen && <span>Payments</span>}
            </li>
            <li 
              className={activeTab === 'reports' ? 'active' : ''}
              onClick={() => setActiveTab('reports')}
            >
              <i className="fas fa-chart-bar"></i>
              {sidebarOpen && <span>Reports</span>}
            </li>
            <li 
              className={activeTab === 'settings' ? 'active' : ''}
              onClick={() => setActiveTab('settings')}
            >
              <i className="fas fa-cog"></i>
              {sidebarOpen && <span>Settings</span>}
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <div className="header-left">
            <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
          <div className="header-right">
            <div className="user-profile">
              <span>Admin User</span>
              <div className="avatar">AU</div>
            </div>
          </div>
        </header>

        <div className="admin-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;