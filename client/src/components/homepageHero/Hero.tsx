import { FaArrowRight } from 'react-icons/fa';
import './hero.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-image"></div>
      <div className="hero-overlay"></div>
      
      <div className="container hero-content">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <div className="hero-text-content">
              <h6 className="hero-subtitle">YOUR JOURNEY BEGINS HERE</h6>
              <h1 className="hero-title">
                <span className="title-line">Explore The</span>
                <span className="title-line highlight">Beautiful World</span>
              </h1>
              <p className="hero-text">
                Discover breathtaking destinations, immerse yourself in vibrant cultures, 
                and create memories that will last a lifetime with our expertly curated travel experiences.
              </p>
              <div className="hero-cta">
                <button className="cta-button">
                  Start Your Adventure <FaArrowRight className="cta-icon" />
                </button>
                <div className="social-proof">
                  <div className="rating">
                    ★★★★★ <span>5.0 (2.4k reviews)</span>
                  </div>
                  <div className="destinations-count">
                    <strong>150+</strong> Destinations Worldwide
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* <div className="scroll-indicator">
        <span>Scroll Down</span>
        <div className="arrow-down"></div>
      </div> */}
    </section>
  );
}

export default Hero;