import './customercare.css';
import { FaPhone, FaWhatsapp, FaHeadset, FaShieldAlt, FaClock } from 'react-icons/fa';

function Customercare() {
  return (
    <div className="customer-care-container">
      <header className="care-header">
        <h1>Customer Support</h1>
        <p>We're available 24/7 to assist you</p>
      </header>

      <div className="care-content">
        {/* Password Recovery Notice */}
        <div className="password-notice">
          <div className="notice-icon">
            <FaShieldAlt />
          </div>
          <div className="notice-content">
            <h3>Forgot Your Password?</h3>
            <p>
              Please contact us directly via phone or WhatsApp for immediate assistance with password recovery.
              Our team is working on implementing a more convenient self-service password reset system.
            </p>
            <p className="update-notice">
              <strong>Update:</strong> We're enhancing our security systems to provide better password recovery options.
            </p>
          </div>
        </div>

        {/* Contact Methods */}
        <section className="contact-methods">
          <div className="contact-card emergency">
            <div className="icon-circle phone">
              <FaPhone className="contact-icon" />
            </div>
            <h3>Immediate Assistance</h3>
            <p>Call us now for urgent support</p>
            <a href="tel:+254757783084" className="contact-link call">
              +254 757 783 084
            </a>
            <p className="availability">
              <FaClock /> Available 24/7
            </p>
          </div>

          <div className="contact-card whatsapp-card">
            <div className="icon-circle whatsapp">
              <FaWhatsapp className="contact-icon" />
            </div>
            <h3>WhatsApp Support</h3>
            <p>Chat with our support team</p>
            <a 
              href="https://wa.me/254757783084" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-link whatsapp-link"
            >
              +254 757 783 084
            </a>
            <p className="response-time">
              <FaHeadset /> Typically replies within 5 minutes
            </p>
          </div>
        </section>

        {/* Additional Support Info */}
        <section className="support-info">
          <h2>Additional Support Options</h2>
          <div className="info-grid">
            <div className="info-item">
              <h3>Account Issues</h3>
              <p>Locked accounts, login problems, or suspicious activity</p>
            </div>
            <div className="info-item">
              <h3>Booking Assistance</h3>
              <p>Help with reservations, modifications, or cancellations</p>
            </div>
            <div className="info-item">
              <h3>Payment Support</h3>
              <p>Billing questions and payment issues</p>
            </div>
            <div className="info-item">
              <h3>Technical Help</h3>
              <p>App or website troubleshooting</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Customercare;