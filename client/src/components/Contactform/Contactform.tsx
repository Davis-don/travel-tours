import './contactform.css';
import { FaPhone, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

function Contactform() {
  return (
    <div className="voyago-contact-section">
      <div className="voyago-contact-header">
        <h2>Get In Touch</h2>
        <p>Have questions about your next adventure? Our team is ready to help you plan the perfect journey.</p>
      </div>
      
      <div className="voyago-contact-grid">
        <div className="voyago-contact-info">
          <div className="voyago-contact-card">
            <div className="voyago-contact-icon">
              <FaPhone />
            </div>
            <div className="voyago-contact-details">
              <h3>Call Us</h3>
              <p>+1 (555) 123-4567</p>
              <p>Mon-Fri: 9am-6pm</p>
            </div>
          </div>
          
          <div className="voyago-contact-card">
            <div className="voyago-contact-icon">
              <FaEnvelope />
            </div>
            <div className="voyago-contact-details">
              <h3>Email Us</h3>
              <a href="mailto:hello@voyago.com">hello@voyago.com</a>
              <p>Response within 24 hours</p>
            </div>
          </div>
          
          <div className="voyago-contact-card">
            <div className="voyago-contact-icon">
              <FaWhatsapp />
            </div>
            <div className="voyago-contact-details">
              <h3>WhatsApp</h3>
              <a href="https://wa.me/15551234567">+1 (555) 123-4567</a>
              <p>Instant messaging</p>
            </div>
          </div>
          
          <div className="voyago-contact-card">
            <div className="voyago-contact-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="voyago-contact-details">
              <h3>Visit Us</h3>
              <p>123 Adventure Lane</p>
              <p>Barcelona, Spain 08001</p>
            </div>
          </div>
          
          <div className="voyago-social-links">
            <a href="#" className="voyago-social-link"><FaFacebook /></a>
            <a href="#" className="voyago-social-link"><FaInstagram /></a>
            <a href="#" className="voyago-social-link"><FaTwitter /></a>
          </div>
        </div>
        
        <div className="voyago-contact-form-container">
          <form>
            <div className="voyago-form-group">
              <label htmlFor="name">Full Name</label>
              <input 
                type="text" 
                id="name" 
                placeholder="Your name" 
                required 
              />
            </div>
            
            <div className="voyago-form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                placeholder="your.email@example.com" 
                required 
              />
            </div>
            
            <div className="voyago-form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" required>
                <option value="" disabled selected>Select an option</option>
                <option value="booking">Booking Inquiry</option>
                <option value="custom">Custom Tour Request</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="voyago-form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                placeholder="Tell us about your dream adventure..." 
                required 
              />
            </div>
            
            <button type="submit" className="voyago-submit-btn">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contactform;