import { FaStar, FaRegStar, FaMapMarkerAlt, FaClock, FaUsers, FaTimes } from 'react-icons/fa';
import './featuredtours.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Featuredtours() {
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Sample tour data
  const tours = [
    {
      id: 1,
      title: "Bali Paradise Adventure",
      location: "Bali, Indonesia",
      duration: "7 Days",
      groupSize: "12 People",
      price: "$1,299",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1518544866330-95a2bfb5f8e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      description: "Experience the tropical paradise of Bali with its lush jungles, stunning beaches, and vibrant culture. This adventure includes surfing lessons, temple visits, and a sunrise hike up Mount Batur.",
      itinerary: [
        "Day 1: Arrival in Denpasar, transfer to Ubud",
        "Day 2: Sacred Monkey Forest and Tegalalang Rice Terrace",
        "Day 3: Sunrise hike at Mount Batur, hot springs visit",
        "Day 4: Surfing lessons in Canggu",
        "Day 5: Day trip to Nusa Penida island",
        "Day 6: Uluwatu Temple and Kecak fire dance",
        "Day 7: Departure"
      ],
      inclusions: [
        "6 nights accommodation in 4-star hotels",
        "All transportation between locations",
        "Professional English-speaking guide",
        "All activities mentioned",
        "Daily breakfast"
      ]
    },
    {
      id: 2,
      title: "Italian Cultural Journey",
      location: "Rome, Florence, Venice",
      duration: "10 Days",
      groupSize: "15 People",
      price: "$2,199",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      description: "Immerse yourself in Italy's rich history, art, and cuisine as you travel from Rome's ancient ruins to Florence's Renaissance masterpieces and Venice's romantic canals.",
      itinerary: [
        "Day 1-3: Rome - Colosseum, Vatican City, Trevi Fountain",
        "Day 4-6: Florence - Uffizi Gallery, Duomo, Tuscan countryside",
        "Day 7-9: Venice - Grand Canal, St. Mark's Basilica, Murano glass",
        "Day 10: Departure"
      ],
      inclusions: [
        "9 nights accommodation in boutique hotels",
        "All intercity transportation",
        "Guided tours in each city",
        "3 cooking classes",
        "Daily breakfast and 3 dinners"
      ]
    },
    {
      id: 3,
      title: "Japanese Heritage Tour",
      location: "Tokyo, Kyoto, Osaka",
      duration: "12 Days",
      groupSize: "10 People",
      price: "$3,499",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: false,
      description: "Discover Japan's perfect blend of ancient traditions and cutting-edge modernity as you explore Tokyo's neon lights, Kyoto's serene temples, and Osaka's culinary delights.",
      itinerary: [
        "Day 1-4: Tokyo - Shibuya, Asakusa, day trip to Hakone",
        "Day 5-8: Kyoto - Golden Pavilion, Fushimi Inari, tea ceremony",
        "Day 9-11: Osaka - Dotonbori, Universal Studios, castle",
        "Day 12: Departure"
      ],
      inclusions: [
        "11 nights accommodation (ryokan and hotels)",
        "Japan Rail Pass for transportation",
        "Traditional kaiseki dinner",
        "Sumo wrestling tournament tickets",
        "All breakfasts and 3 dinners"
      ]
    },
    {
      id: 4,
      title: "African Safari Expedition",
      location: "Serengeti, Tanzania",
      duration: "8 Days",
      groupSize: "8 People",
      price: "$2,899",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      featured: true,
      description: "Witness the breathtaking wildlife of the Serengeti on this once-in-a-lifetime safari adventure, featuring the Big Five and the Great Migration (seasonal).",
      itinerary: [
        "Day 1: Arrival in Arusha",
        "Day 2-3: Tarangire National Park",
        "Day 4-6: Serengeti National Park",
        "Day 7: Ngorongoro Crater",
        "Day 8: Departure"
      ],
      inclusions: [
        "7 nights in luxury safari lodges and tented camps",
        "All game drives in 4x4 vehicles",
        "Professional safari guide",
        "All park fees",
        "All meals and drinks (excluding alcohol)"
      ]
    }
  ];

  // Render star rating
  const renderStars = (rating:any) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    
    return stars;
  };

  const handleViewDetails = (tour:any) => {
    setSelectedTour(tour);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <section className="featured-tours">
      <div className="container">
        <div className="section-header text-center mb-5">
          <h6 className="section-subtitle-featured">EXPLORE OUR</h6>
          <h2 className="section-title-featured">Featured Tours</h2>
          <p className="section-description-featured">
            Discover our handpicked selection of exceptional travel experiences around the globe
          </p>
        </div>
        
        <div className="row">
          {tours.map(tour => (
            <div className="col-lg-3 col-md-6 mb-4" key={tour.id}>
              <div className="tour-card">
                <div className="tour-image" style={{ backgroundImage: `url(${tour.image})` }}>
                  <div className="price-tag-featured">{tour.price}</div>
                </div>
                <div className="tour-content">
                  <div className="tour-rating">
                    {renderStars(tour.rating)}
                    <span className="rating-value">{tour.rating}</span>
                  </div>
                  <h3 className="tour-title">{tour.title}</h3>
                  <div className="tour-meta">
                    <div className="meta-item">
                      <FaMapMarkerAlt className="meta-icon" />
                      <span>{tour.location}</span>
                    </div>
                    <div className="meta-item">
                      <FaClock className="meta-icon" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="meta-item">
                      <FaUsers className="meta-icon" />
                      <span>{tour.groupSize}</span>
                    </div>
                  </div>
                  <button 
                    className="btn btn-primary tour-button fs-4"
                    onClick={() => handleViewDetails(tour)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <button onClick={()=>navigate('/tours')} className="btn btn-outline-primary view-all-btn">
            View All Tours
          </button>
        </div>
      </div>

      {/* Tour Details Modal */}
      {showModal && selectedTour && (
        <div className="tour-modal-overlay">
          <div className="tour-modal">
            <button className="tour-modal-close" onClick={closeModal}>
              <FaTimes />
            </button>
            <div className="tour-modal-header" style={{ backgroundImage: `url(${selectedTour.image})` }}>
              <div className="header-overlay">
                <h2>{selectedTour.title}</h2>
                <div className="modal-price">{selectedTour.price}</div>
              </div>
            </div>
            <div className="tour-modal-body">
              <div className="row">
                <div className="col-md-8">
                  <div className="tour-modal-section">
                    <h3>Overview</h3>
                    <p>{selectedTour.description}</p>
                  </div>
                  
                  <div className="tour-modal-section">
                    <h3>Itinerary</h3>
                    <ul className="tour-itinerary">
                      {selectedTour.itinerary.map((item:string, index:number) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="tour-modal-highlights">
                    <h3>Tour Highlights</h3>
                    <div className="tour-modal-meta">
                      <div className="meta-item">
                        <FaMapMarkerAlt className="meta-icon" />
                        <span>{selectedTour.location}</span>
                      </div>
                      <div className="meta-item">
                        <FaClock className="meta-icon" />
                        <span>{selectedTour.duration}</span>
                      </div>
                      <div className="meta-item">
                        <FaUsers className="meta-icon" />
                        <span>{selectedTour.groupSize}</span>
                      </div>
                      <div className="meta-item">
                        <div className="tour-rating">
                          {renderStars(selectedTour.rating)}
                          <span className="rating-value">{selectedTour.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="tour-modal-section">
                      <h3>Inclusions</h3>
                      <ul className="tour-inclusions">
                        {selectedTour.inclusions.map((item:string, index:number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tour-modal-footer">
              <button onClick={()=>navigate('/booking')} className="btn btn-primary book-now-btn">
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Featuredtours;