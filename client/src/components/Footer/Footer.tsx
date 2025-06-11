
import './footer.css';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaTripadvisor } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate()
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
            <li onClick={()=>navigate("/")}><a>Home</a></li>
            <li onClick={()=>navigate("/tours")}><a>Tours</a></li>
            <li onClick={()=>navigate("/about")}><a>About Us</a></li>
            <li onClick={()=>navigate("/contact")}><a>Contact</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-heading">Contact Info</h3>
          <ul className="footer-contact">
            <li><FaPhone /> +254 757 783 084</li>
            <li><FaEnvelope /> heartsjungle@gmail.com</li>
            {/* <li><FaMapMarkerAlt /> 123 Travel St, Adventure City</li> */}
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
    <p className="footer-credit">Software developed by Teqnovation Solutions | Contact: 0758420860</p>
</div>
    </footer>
  );
};

export default Footer;