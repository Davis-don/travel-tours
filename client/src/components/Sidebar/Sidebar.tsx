import { 
  FaHome, 
  FaMapMarkedAlt, 
  FaInfoCircle, 
  FaEnvelope, 
  FaCalendarAlt 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './sidebar.css';
import useSidebarStore from '../../Store/sidebarstore';

function Sidebar() {
  const navigate = useNavigate();
  const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

  const navItems = [
    { name: 'Home', icon: <FaHome className="sidebar-nav-icon" />, path: '/' },
    { name: 'Tours', icon: <FaMapMarkedAlt className="sidebar-nav-icon" />, path: '/tours' },
    { name: 'About', icon: <FaInfoCircle className="sidebar-nav-icon" />, path: '/about' },
    { name: 'Contact', icon: <FaEnvelope className="sidebar-nav-icon" />, path: '/contact' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    toggleSidebar();
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <h2 className="sidebar-brand">TravelEase</h2>
      </div>
      
      <nav className="sidebar-navigation">
        <ul className="sidebar-menu">
          {navItems.map((item, index) => (
            <li className="sidebar-menu-item" key={index}>
              <button 
                onClick={() => handleNavigation(item.path)} 
                className="sidebar-menu-link"
              >
                {item.icon}
                <span className="sidebar-menu-text">{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-actions">
        <button 
          onClick={() => handleNavigation('/login')} 
          className="sidebar-action-button"
        >
          <FaCalendarAlt className="sidebar-action-icon" />
          <span>Get started</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;