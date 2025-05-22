
import './footer.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaTripadvisor } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-column">
          <h3 className="footer-heading">About Us</h3>
          <p className="footer-about">
            We create unforgettable travel experiences with exceptional service and carefully curated tours.
          </p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Tripadvisor"><FaTripadvisor /></a>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/tours">Tours</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Contact Info</h3>
          <ul className="footer-contact">
            <li><FaPhone /> +1 (555) 123-4567</li>
            <li><FaEnvelope /> info@tourcompany.com</li>
            <li><FaMapMarkerAlt /> 123 Travel St, Adventure City</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Newsletter</h3>
          <p>Subscribe for travel tips and special offers</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Tour Company. All rights reserved.</p>
        <div className="footer-legal">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;