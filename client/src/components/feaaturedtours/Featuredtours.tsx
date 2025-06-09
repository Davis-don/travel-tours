import { FaStar, FaRegStar, FaMapMarkerAlt, FaClock, FaUsers, FaTimes } from 'react-icons/fa';
import './featuredtours.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {toast,Toaster} from 'sonner'

function Featuredtours() {
  const navigate = useNavigate();
  const [selectedTour, setSelectedTour] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  // Sample tour data
const tours = [
  {
    id: 1,
    title: "Masai Mara Safari Adventure",
    location: "Masai Mara, Kenya",
    duration: "5 Days",
    groupSize: "12 People",
    rating: 4.9,
    image: "https://plus.unsplash.com/premium_photo-1661962656908-24102eafa8d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFhc2FpJTIwbWFyYXxlbnwwfHwwfHx8MA%3D%3D",
    featured: true,
    description: "Experience Kenya's most famous wildlife reserve with spectacular game viewing opportunities, including the Big Five and the Great Migration (seasonal).",
    itinerary: [
      "Day 1: Arrival in Nairobi, transfer to Masai Mara",
      "Day 2-3: Full day game drives in Masai Mara",
      "Day 4: Morning game drive, visit Maasai village",
      "Day 5: Departure to Nairobi"
    ],
    inclusions: [
      "4 nights accommodation in safari lodges",
      "All game drives in 4x4 vehicles",
      "Professional safari guide",
      "All park entry fees",
      "All meals during safari"
    ]
  },
  {
    id: 2,
    title: "Mount Kenya Trekking Expedition",
    location: "Mount Kenya",
    duration: "6 Days",
    groupSize: "8 People",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1621414050946-1b936a78491f?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    description: "Challenge yourself with this trek to Point Lenana (4,985m), the third highest peak of Mount Kenya, passing through diverse vegetation zones and stunning scenery.",
    itinerary: [
      "Day 1: Nairobi to Naro Moru, start trek to Met Station",
      "Day 2: Trek to Mackinder's Camp",
      "Day 3: Acclimatization day at Mackinder's",
      "Day 4: Summit attempt (Point Lenana), descend to Shipton's",
      "Day 5: Descend to park gate",
      "Day 6: Return to Nairobi"
    ],
    inclusions: [
      "5 nights accommodation (mountain huts/camping)",
      "All park fees and trekking permits",
      "Professional mountain guides and porters",
      "All meals during the trek",
      "Transport from/to Nairobi"
    ]
  },
  {
    id: 3,
    title: "Diani Beach Retreat",
    location: "Diani Beach, Kenya",
    duration: "7 Days",
    groupSize: "15 People",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    featured: false,
    description: "Relax on Kenya's most beautiful beach with its white sands and turquoise waters, with optional activities including snorkeling, scuba diving, and dolphin watching.",
    itinerary: [
      "Day 1: Arrival in Mombasa, transfer to Diani",
      "Day 2-5: Beach relaxation and optional activities",
      "Day 6: Shimba Hills day trip",
      "Day 7: Departure"
    ],
    inclusions: [
      "6 nights accommodation in beach resort",
      "Airport transfers",
      "Daily breakfast",
      "Shimba Hills day trip with game drive",
      "Snorkeling equipment"
    ]
  },
  {
    id: 4,
    title: "Amboseli Wildlife Safari",
    location: "Amboseli National Park",
    duration: "4 Days",
    groupSize: "10 People",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1678092369673-94f97a97d4e5?q=80&w=1958&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: true,
    description: "Enjoy spectacular views of Mount Kilimanjaro while observing large herds of elephants and diverse wildlife in this iconic Kenyan national park.",
    itinerary: [
      "Day 1: Nairobi to Amboseli",
      "Day 2-3: Morning and evening game drives",
      "Day 4: Morning game drive, return to Nairobi"
    ],
    inclusions: [
      "3 nights accommodation in safari lodge",
      "All game drives",
      "Park entry fees",
      "Professional guide",
      "All meals during safari"
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
      <Toaster richColors position='top-center'/>
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
              <button
  onClick={() => {
    toast.info("We're working on automating this. For now, create/login and set up your dream tour.");
    setTimeout(() => navigate('/login'), 4000);
  }}
  className="btn btn-primary book-now-btn"
>
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