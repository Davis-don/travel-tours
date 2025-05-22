import { FaBars, FaUser, FaSearch, FaPhoneAlt } from 'react-icons/fa';
import { MdTravelExplore } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-component ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-top-bar d-none d-md-flex justify-content-end">
          <div className="contact-info">
            <FaPhoneAlt className="me-2" />
            <span>+1 (234) 567-8900</span>
          </div>
          <div className="login-register ms-4">
            <FaUser className="me-1" />
            <Link to="/login">Login/Register</Link>
          </div>
        </div>

        <nav className="navbar navbar-expand-md navbar-light main-navigation">
          <Link className="navbar-brand" to="/">
            <MdTravelExplore className="logo-icon" />
            <span className="brand-name fs-3">ExploreEase</span>
          </Link>

          <div className="d-md-none">
            <button 
              className="navbar-toggler fs-2 text-light" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarCollapse"
              aria-label="Toggle navigation"
            >
              <FaBars />
            </button>
          </div>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tours">Tours</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">Contact</Link>
              </li>
              <li className="nav-item d-md-none">
                <Link className="nav-link fs-4" to="/login">
                  <FaUser className="me-1" />
                  Login
                </Link>
              </li>
            </ul>
            
            <div className="d-none d-md-flex align-items-center ms-3">
              <button className="btn btn-search me-2 fs-3">
                <FaSearch />
              </button>
              <button onClick={()=>navigate("/booking")} className="btn btn-primary fs-4">
                Book Now
              </button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;