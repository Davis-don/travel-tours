import { FaBars, FaUser, FaSearch, FaPhoneAlt } from 'react-icons/fa';
import { MdTravelExplore } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

          <button 
            className="navbar-toggler fs-2 text-light" 
            type="button" 
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <FaBars />
          </button>

          <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link fs-4" to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-4" to="/tours" onClick={() => setIsMobileMenuOpen(false)}>Tours</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-4" to="/about" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link fs-4" to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
              </li>
              <li className="nav-item d-md-none">
                <Link className="nav-link fs-4" to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <FaUser className="me-1" />
                  Login
                </Link>
              </li>
            </ul>
            
            <div className="d-none d-md-flex align-items-center ms-3">
              <button className="btn btn-search me-2 fs-3">
                <FaSearch />
              </button>
              <button className="btn btn-primary fs-4">
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