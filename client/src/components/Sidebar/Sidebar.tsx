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
  const toggleSidebar = useSidebarStore((state)=>state.toggleSidebar)

  const navItems = [
    { name: 'Home', icon: <FaHome className="nav-icon" />, path: '/' },
    { name: 'Tours', icon: <FaMapMarkedAlt className="nav-icon" />, path: '/tours' },
    { name: 'About', icon: <FaInfoCircle className="nav-icon" />, path: '/about' },
    { name: 'Contact', icon: <FaEnvelope className="nav-icon" />, path: '/contact' }
  ];

  const handleNavigation = (path:any) => {
    navigate(path);
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">TravelEase</h2>
      </div>
      
      <div className="nav-links-container">
        <ul className="sidebar-nav">
          {navItems.map((item, index) => (
            <li className="nav-item-sidebar" key={index}>
              <button 
                onClick={() => {handleNavigation(item.path);toggleSidebar()}} 
                className="nav-link-sidebar"
              >
                {item.icon}
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="sidebar-footer">
        <button 
          onClick={() => handleNavigation('/book')} 
          className="book-now-btn"
        >
          <FaCalendarAlt className="book-now-icon" />
          Book Now
        </button>
      </div>
    </div>
  );
}

export default Sidebar;