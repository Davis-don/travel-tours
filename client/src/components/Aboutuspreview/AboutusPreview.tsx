import { FaUmbrellaBeach, FaGlobeAmericas, FaAward } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io';
import './aboutuspreview.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function AboutusPreview() {
  const navigate = useNavigate()
  return (
    <section className="about-preview">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="about-image">
              <div className="image-main" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)' }}></div>
              <div className="image-secondary" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1527631746610-bca00a040d60?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80)' }}></div>
              <div className="experience-badge">
                <span>12+</span>
                <p>Years Experience</p>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="about-content">
              <h6 className="section-subtitle-story-preview">OUR STORY</h6>
              <h2 className="section-title-preview">Creating Memorable Travel Experiences</h2>
              <p className="about-text-preview">
  JungleHearts Travels was born from a deep love for adventure and a desire to bring travelers closer to the wild, untamed beauty of the world. We specialize in crafting unforgettable journeys—where lush rainforests, hidden trails, and heart-pounding experiences meet the warmth of local cultures. Our expert guides and carefully designed itineraries ensure every trip is as seamless as it is extraordinary. Whether trekking through remote jungles or relaxing in eco-luxury retreats, we turn wanderlust into lifelong memories.
</p>
              <p className="about-text-preview">
                We believe travel has the power to change lives. That's why we carefully design each itinerary to immerse you in local cultures while providing comfort, safety, and unforgettable moments.
              </p>
              
             <div className="stats-grid">
  <div className="stat-item">
    <FaGlobeAmericas className="stat-icon" />
    <div>
      <span className="stat-number">32</span>
      <p className="stat-label">Destinations</p>
    </div>
  </div>
  <div className="stat-item">
    <IoIosPeople className="stat-icon" />
    <div>
      <span className="stat-number">8,500+</span>
      <p className="stat-label">Happy Travelers</p>
    </div>
  </div>
  <div className="stat-item">
    <FaUmbrellaBeach className="stat-icon" />
    <div>
      <span className="stat-number">120+</span>
      <p className="stat-label">Curated Tours</p>
    </div>
  </div>
  <div className="stat-item">
    <FaAward className="stat-icon" />
    <div>
      <span className="stat-number">6</span>
      <p className="stat-label">Industry Awards</p>
    </div>
  </div>
</div>
              
              <button onClick={()=>navigate('/about')} className="btn btn-primary mt-4 button-story fs-4">
                Learn More About Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutusPreview;