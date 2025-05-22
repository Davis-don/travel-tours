import './bookatrip.css';
import { FaUser, FaMapMarkerAlt, FaPlane, FaDollarSign, FaCalendarAlt, FaInfoCircle, FaHeadset } from 'react-icons/fa';

function Bookatrip() {
  return (
    <div className="booking-container">
      {/* Assistance Banner */}
      <div className="assistance-banner">
        <div className="assistance-content">
          <FaHeadset className="assistance-icon" />
          <div>
            <h3>Need help planning your perfect trip?</h3>
            <p>Our travel experts are ready to assist you in creating your dream vacation</p>
          </div>
        </div>
        <button className="assistance-btn">
          Get Personalized Assistance
        </button>
      </div>

      <div className="booking-header">
        <h2>Book Your Dream Trip</h2>
        <p>Fill in the details below and our team will help create your perfect itinerary</p>
      </div>

      <form className="booking-form">
        <div className="form-section">
          <h3><FaMapMarkerAlt className="section-icon" /> Trip Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Destination (or desired region)</label>
              <select required>
                <option value="">Select Destination</option>
                <option value="bali">Bali, Indonesia</option>
                <option value="paris">Paris, France</option>
                <option value="tokyo">Tokyo, Japan</option>
                <option value="rome">Rome, Italy</option>
                <option value="new-york">New York, USA</option>
                <option value="multiple">Multiple Destinations</option>
                <option value="undecided">Not Sure - Need Recommendations</option>
              </select>
            </div>
            <div className="form-group">
              <label>Trip Type</label>
              <select required>
                <option value="">Select Trip Type</option>
                <option value="adventure">Adventure</option>
                <option value="relaxation">Relaxation</option>
                <option value="cultural">Cultural</option>
                <option value="family">Family</option>
                <option value="honeymoon">Honeymoon</option>
                <option value="business">Business</option>
                <option value="custom">Custom Experience</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Preferred Travel Dates</label>
              <div className="date-range-input">
                <FaCalendarAlt className="date-icon" />
                <input type="text" placeholder="Flexible dates or specific range" required />
              </div>
            </div>
            <div className="form-group">
              <label>Trip Duration</label>
              <select required>
                <option value="">Select Duration</option>
                <option value="weekend">Weekend (2-3 days)</option>
                <option value="1week">1 Week</option>
                <option value="2weeks">2 Weeks</option>
                <option value="3weeks+">3+ Weeks</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3><FaUser className="section-icon" /> Traveler Information</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Smith" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="(123) 456-7890" required />
            </div>
            <div className="form-group">
              <label>Number of Travelers</label>
              <select required>
                <option value="">Select</option>
                <option value="1">1 Traveler</option>
                <option value="2">2 Travelers</option>
                <option value="3-4">3-4 Travelers</option>
                <option value="5-10">5-10 Travelers</option>
                <option value="10+">10+ Travelers</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Traveler Ages</label>
              <input type="text" placeholder="e.g. 32, 30 (adults), 8, 5 (kids)" />
            </div>
            <div className="form-group">
              <label>Special Requirements</label>
              <select>
                <option value="">None</option>
                <option value="accessibility">Accessibility Needs</option>
                <option value="dietary">Dietary Restrictions</option>
                <option value="medical">Medical Considerations</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3><FaDollarSign className="section-icon" /> Budget & Preferences</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Estimated Budget Per Person</label>
              <select required>
                <option value="">Select Budget Range</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-5000">$2,000 - $5,000</option>
                <option value="5000+">$5,000+</option>
                <option value="flexible">Flexible - Discuss Options</option>
              </select>
            </div>
            <div className="form-group">
              <label>Accommodation Preference</label>
              <select required>
                <option value="">Select Preference</option>
                <option value="luxury">Luxury (5-star)</option>
                <option value="boutique">Boutique Hotels</option>
                <option value="resort">Resorts</option>
                <option value="vacation-rental">Vacation Rentals</option>
                <option value="budget">Budget-Friendly</option>
                <option value="mix">Mix of Options</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Transportation Preferences</label>
              <div className="checkbox-group">
                <label><input type="checkbox" name="transport" value="flight" /> Flights</label>
                <label><input type="checkbox" name="transport" value="train" /> Trains</label>
                <label><input type="checkbox" name="transport" value="car" /> Rental Car</label>
                <label><input type="checkbox" name="transport" value="private" /> Private Transfers</label>
              </div>
            </div>
            <div className="form-group">
              <label>Interests & Activities</label>
              <div className="checkbox-group">
                <label><input type="checkbox" name="interests" value="beach" /> Beach</label>
                <label><input type="checkbox" name="interests" value="hiking" /> Hiking</label>
                <label><input type="checkbox" name="interests" value="culture" /> Cultural Sites</label>
                <label><input type="checkbox" name="interests" value="food" /> Food Tours</label>
                <label><input type="checkbox" name="interests" value="shopping" /> Shopping</label>
                <label><input type="checkbox" name="interests" value="nightlife" /> Nightlife</label>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3><FaInfoCircle className="section-icon" /> Trip Description</h3>
          <div className="form-group">
            <label>Describe Your Dream Trip</label>
            <textarea 
              placeholder="Tell us about your ideal vacation - what experiences you're looking for, any specific places you want to visit, special occasions, or anything else that will help us plan your perfect trip..."
              rows={5}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Additional Notes or Requests</label>
            <textarea 
              placeholder="Anything else we should know?"
              rows={3}
            ></textarea>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            <FaPlane className="btn-icon" /> Submit Trip Request
          </button>
        </div>
      </form>

      <div className="booking-assurance">
        <div className="assurance-item">
          <div className="assurance-icon">🔒</div>
          <p>Secure SSL Encryption</p>
        </div>
        <div className="assurance-item">
          <div className="assurance-icon">🔄</div>
          <p>Free Initial Consultation</p>
        </div>
        <div className="assurance-item">
          <div className="assurance-icon">📧</div>
          <p>Personalized Itinerary Within 24 Hours</p>
        </div>
      </div>
    </div>
  );
}

export default Bookatrip;