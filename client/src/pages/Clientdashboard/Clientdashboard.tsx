import './clientdashboard.css';
import { FaHome, FaCalendarAlt, FaReceipt, FaSignOutAlt } from 'react-icons/fa';
import ClientdashBoard from '../../components/Clientdashboard/Clientdashboard';
import Bookatrip from '../../components/Booktrip/Bookatrip';
import MyBookings from '../../components/Mybookings/Mybookings';
import { useState } from 'react';

function Clientdashboard() {
    const [dash,setDash]=useState(true)
    const [tripBook,setTripBook]=useState(false)
    const [myBookings,setmyBookings]=useState(false)
  return (
    <div className="client-dashboard">
      {/* Sidebar Navigation */}
      <div className="dashboard-sidebar">
        <div className="sidebar-header">
          <h2>TravelEase</h2>
          <p>Client Portal</p>
        </div>
        
        <nav className="sidebar-nav">
          <a onClick={()=>{setDash(true);setTripBook(false);setmyBookings(false)}}  className={dash? "nav-item active" : "nav-item"}>
            <FaHome className="nav-icon" />
            <span>Dashboard</span>
          </a>
          <a onClick={()=>{setDash(false);setTripBook(true);setmyBookings(false)}} className={tripBook? "nav-item active" : "nav-item"}>
            <FaCalendarAlt className="nav-icon" />
            <span>Book a Trip</span>
          </a>
          <a onClick={()=>{setDash(false);setTripBook(false);setmyBookings(true)}} className={myBookings? "nav-item active" : "nav-item"}>
            <FaCalendarAlt className="nav-icon" />
            <span>My Bookings</span>
          </a>
        </nav>
        
        <div className="sidebar-footer">
          <a href="#" className="nav-item">
            <FaSignOutAlt className="nav-icon" />
            <span>Logout</span>
          </a>
        </div>
      </div>


      {/* Main Content Area */}
      <div className="dashboard-main">
     
        {dash && <ClientdashBoard/>}
        {tripBook && <Bookatrip/>}
        {myBookings && <MyBookings/>}


      </div>
    </div>
  );
}

export default Clientdashboard;