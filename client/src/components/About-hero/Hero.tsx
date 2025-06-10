import './hero.css';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

function Hero() {
    const navigate = useNavigate()
  return (
    <div className="voyago-hero">
      <div className="voyago-hero-content">
        <h1>Discover the World Differently</h1>
        <p>
          At JungleHearts, we don’t just take you places—we craft unforgettable stories. 
          Founded in 2025, we’re redefining travel with immersive, local-led adventures 
          that go beyond the guidebook.
        </p>
        <button className='btn btn-secondary voyago-hero-btn text-light fs-4' onClick={()=>navigate("/tours")}>Explore Our Journeys</button>
        
      </div>
      
      {/* Optional: Animated floating element (e.g., a hot air balloon or passport) */}
      <img 
        src="https://images.unsplash.com/photo-1551523711-5a8c0e48b9b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" 
        alt="Travel Adventure" 
        className="voyago-hero-image" 
      />
    </div>
  );
}

export default Hero;