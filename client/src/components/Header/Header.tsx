import { FaBars, FaUser } from 'react-icons/fa';
import { GiJungle } from 'react-icons/gi';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import useSidebarStore from '../../Store/sidebarstore';

function Header() {
  const toggleSidebar = useSidebarStore((state)=>state.toggleSidebar)
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-component ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-top-bar d-none d-lg-block">
      </div>

      <nav className="navbar navbar-expand-lg navbar-dark main-navigation">
        <div className="container">
         <Link className="navbar-brand" to="/">
  <GiJungle className="logo-icon" />
  <span className="brand-name">JungleHearts Travels</span>
</Link>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarCollapse"
            aria-label="Toggle navigation"
          onClick={()=>toggleSidebar()}
          >
            <FaBars />
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link-header" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link-header" to="/tours">Tours</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link-header" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link-header" to="/contact">Contact</Link>
              </li>
              <li className="nav-item d-lg-none">
                <Link className="nav-link-header" to="/login">
                  <FaUser className="me-2" />
                  Login
                </Link>
              </li>
            </ul>
            
            <div className="header-actions d-none d-lg-flex">
              {/* <button className="btn btn-search">
                <FaSearch />
              </button> */}
              <button onClick={() => navigate("/login")} className="btn btn-primary fs-4">
                Get started
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;