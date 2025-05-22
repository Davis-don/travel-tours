import './companystory.css';

function Companystory() {
  return (
    <section className="company-story">
      <div className="story-container">
        <h2 className="story-title">Our Journey Through Time</h2>
        <div className="story-timeline">
          <div className="timeline-item">
            <div className="timeline-year-container">
              <div className="timeline-year">2005</div>
            </div>
            <div className="timeline-content">
              <h3>Humble Beginnings</h3>
              <p>Founded in a small office with just two employees and a single van, we started offering local city tours with a passion for sharing our love of travel.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-year-container">
              <div className="timeline-year">2010</div>
            </div>
            <div className="timeline-content">
              <h3>First International Tour</h3>
              <p>We expanded our horizons by offering our first international package to Bali, Indonesia. This marked the beginning of our global adventure.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-year-container">
              <div className="timeline-year">2015</div>
            </div>
            <div className="timeline-content">
              <h3>Award-Winning Service</h3>
              <p>Recognized as "Best Tour Operator" by Travel Excellence Awards for our innovative itineraries and exceptional customer service.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-year-container">
              <div className="timeline-year">2020</div>
            </div>
            <div className="timeline-content">
              <h3>Sustainable Travel Initiative</h3>
              <p>Launched our eco-friendly tour programs, committing to carbon-neutral operations and supporting local communities.</p>
            </div>
          </div>
          
          <div className="timeline-item">
            <div className="timeline-year-container">
              <div className="timeline-year">Present</div>
            </div>
            <div className="timeline-content">
              <h3>Your Trusted Travel Partner</h3>
              <p>Today, we operate in 35 countries with over 150 dedicated staff members, but our core values remain the same - creating unforgettable experiences.</p>
            </div>
          </div>
        </div>
        
        <div className="story-mission">
          <h3>Our Mission</h3>
          <p>To inspire discovery and meaningful connection through exceptional travel experiences that enrich lives and broaden perspectives.</p>
          <div className="mission-values">
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h4>Global Perspective</h4>
              <p>We believe travel breaks down barriers and fosters understanding.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h4>Passionate Service</h4>
              <p>Our team's enthusiasm is the heart of every journey we create.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">♻️</div>
              <h4>Sustainable Travel</h4>
              <p>We're committed to protecting the destinations we love.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Companystory;