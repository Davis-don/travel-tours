import { FaQuoteLeft, FaStar } from 'react-icons/fa';
import { useState } from 'react';
import './testimonials.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Testimonials() {
  const [activeCard, setActiveCard] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      rating: 5,
      content: "Our Bali tour with ExploreEase was absolutely magical! Every detail was perfectly arranged, from the luxurious accommodations to the incredible cultural experiences. We'll definitely be booking our next adventure with them.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      date: "March 2023"
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      rating: 4,
      content: "The African safari exceeded all our expectations. Our guide was knowledgeable and the wildlife sightings were breathtaking. The only reason I'm not giving 5 stars is that I wish it could have lasted longer!",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      date: "January 2023"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "London, UK",
      rating: 5,
      content: "I've traveled with many companies, but ExploreEase stands out for their attention to detail and authentic experiences. The Japanese Heritage Tour was a life-changing experience. Arigato!",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      date: "November 2022"
    },
    {
      id: 4,
      name: "David Kim",
      location: "Seoul, South Korea",
      rating: 5,
      content: "As a solo traveler, I was nervous about joining a group tour, but the ExploreEase team made me feel welcome from day one. The Italian Cultural Journey was worth every penny - the food, the history, the people - bellissimo!",
      image: "https://randomuser.me/api/portraits/men/75.jpg",
      date: "September 2022"
    }
  ];

  const renderStars = (rating:any) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? "star filled" : "star"} 
      />
    ));
  };

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h6 className="section-subtitle-testimonials">TRAVELER STORIES</h6>
          <h2 className="section-title-testimonials">What Our Guests Say</h2>
          <p className="section-description-testimonial">
            Hear from travelers who've experienced our tours firsthand
          </p>
        </div>

        <div className="row">
          {testimonials.map((testimonial, index) => (
            <div 
              className={`col-lg-6 mb-4 ${index === activeCard ? 'active' : ''}`}
              key={testimonial.id}
              onClick={() => setActiveCard(index)}
            >
              <div className="testimonial-card">
                <div className="card-body">
                  <FaQuoteLeft className="quote-icon" />
                  <p className="testimonial-content">{testimonial.content}</p>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                <div className="card-footer">
                  <div className="author-info">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="author-image" 
                    />
                    <div className="author-details">
                      <h5 className="author-name">{testimonial.name}</h5>
                      <p className="author-location">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="testimonial-date">
                    {testimonial.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonial-nav-dots text-center mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === activeCard ? 'active' : ''}`}
              onClick={() => setActiveCard(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;