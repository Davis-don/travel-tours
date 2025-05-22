import './sidebar.css';
import { 
  FaHome, 
  FaMapMarkedAlt, 
  FaInfoCircle, 
  FaEnvelope, 
  FaCalendarAlt 
} from 'react-icons/fa';

function Sidebar() {
  const navItems = [
    { name: 'Home', icon: <FaHome className="nav-icon" />, path: '/' },
    { name: 'Tours', icon: <FaMapMarkedAlt className="nav-icon" />, path: '/tours' },
    { name: 'About', icon: <FaInfoCircle className="nav-icon" />, path: '/about' },
    { name: 'Contact', icon: <FaEnvelope className="nav-icon" />, path: '/contact' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">TravelEase</h2>
      </div>
      
      <ul className="sidebar-nav">
        {navItems.map((item, index) => (
          <li className="nav-item-sidebar" key={index}>
            <a href={item.path} className="nav-link-sidebar">
              {item.icon}
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      
      <a href="/book" className="book-now-btn">
        <FaCalendarAlt className="book-now-icon" />
        Book Now
      </a>
    </div>
  );
}

export default Sidebar;