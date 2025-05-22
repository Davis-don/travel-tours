import './contactform.css';
import { FaPaperPlane, FaPhone, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

function Contactform() {
  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2>Get in Touch</h2>
          <p>Have questions about your next adventure? We'd love to hear from you!</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">
                <FaPhone />
              </div>
              <div className="info-text">
                <h3>Call Us</h3>
                <p>+1 (800) 555-ADVENTURE</p>
                <p>+1 (800) 555-TOURS</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaMapMarkerAlt />
              </div>
              <div className="info-text">
                <h3>Visit Us</h3>
                <p>123 Explorer's Way</p>
                <p>Denver, CO 80202, USA</p>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">
                <FaClock />
              </div>
              <div className="info-text">
                <h3>Office Hours</h3>
                <p>Monday-Friday: 9am - 6pm</p>
                <p>Saturday: 10am - 4pm</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div className="contact-image">
              <img src="https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Travel Adventure" />
            </div>
          </div>

          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="John Smith" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="john@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="(123) 456-7890" />
            </div>

            <div className="form-group">
              <label htmlFor="interest">Tour Interest</label>
              <select id="interest">
                <option value="">Select an option</option>
                <option value="adventure">Adventure Tours</option>
                <option value="cultural">Cultural Experiences</option>
                <option value="luxury">Luxury Travel</option>
                <option value="family">Family Vacations</option>
                <option value="custom">Custom Itinerary</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" rows={5} placeholder="Tell us about your dream vacation..."></textarea>
            </div>

            <div className="form-group checkbox-group">
              <input type="checkbox" id="newsletter" />
              <label htmlFor="newsletter">Subscribe to our newsletter for travel inspiration and special offers</label>
            </div>

            <button type="submit" className="submit-btn">
              <FaPaperPlane className="submit-icon" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contactform;