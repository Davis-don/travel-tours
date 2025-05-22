import './valuessection.css';

function Valuessection() {
  return (
    <section className="values-section">
      <div className="values-container">
        <h2 className="values-title">Our Core Values</h2>
        <p className="values-subtitle">The principles that guide every journey we create</p>
        
        <div className="values-grid">
          <div className="value-card adventure">
            <div className="value-icon">🌍</div>
            <h3>Adventure</h3>
            <p>We believe travel should be exciting and push you beyond your comfort zone to discover new perspectives.</p>
          </div>
          
          <div className="value-card authenticity">
            <div className="value-icon">✨</div>
            <h3>Authenticity</h3>
            <p>We connect you with genuine local experiences that reveal the true heart of each destination.</p>
          </div>
          
          <div className="value-card sustainability">
            <div className="value-icon">♻️</div>
            <h3>Sustainability</h3>
            <p>We're committed to responsible travel that protects the places and cultures we visit.</p>
          </div>
          
          <div className="value-card community">
            <div className="value-icon">🤝</div>
            <h3>Community</h3>
            <p>We build meaningful connections between travelers and local communities.</p>
          </div>
          
          <div className="value-card excellence">
            <div className="value-icon">⭐</div>
            <h3>Excellence</h3>
            <p>From planning to execution, we deliver exceptional service at every step of your journey.</p>
          </div>
          
          <div className="value-card passion">
            <div className="value-icon">❤️</div>
            <h3>Passion</h3>
            <p>Our team's love for travel shines through in every experience we craft for you.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Valuessection;