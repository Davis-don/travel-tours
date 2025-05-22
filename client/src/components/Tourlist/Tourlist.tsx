import type { ReactNode } from 'react';
import { useState } from 'react';
import './tourlist.css';
import TourCard from '../TourCard/Tourcard';
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';

// Define the Tour type
export interface Tour {
  id?: string | number;
  name: string;
  description: string;
  detailedDescription?: string;
  price: number;
  duration: string;
  location: string;
  highlights?: string[];
  inclusions?: string[];
  image?: string;
}

// Define props for Tourlist component
interface TourlistProps {
  tours?: Tour[];
  children?: (tour: Tour, index: number) => ReactNode;
}

const Tourlist: React.FC<TourlistProps> = ({ tours = [], children }) => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleReadMore = (tour: Tour): void => {
    setSelectedTour(tour);
    setIsModalOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  return (
    <div className="tour-list-container">
      {/* Detailed Tour Modal */}
      {isModalOpen && selectedTour && (
        <div className="tour-detail-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>
              <FaTimes />
            </button>

            <div className="modal-header">
              <img
                src={selectedTour.image || 'default-tour.jpg'}
                alt={selectedTour.name}
              />
              <h2>{selectedTour.name}</h2>
            </div>

            <div className="modal-body">
              <div className="tour-meta">
                <span><FaMapMarkerAlt /> {selectedTour.location}</span>
                <span><FaCalendarAlt /> {selectedTour.duration}</span>
                <span><FaMoneyBillWave /> KES {selectedTour.price.toLocaleString()}</span>
              </div>

              <div className="tour-description">
                <h3>About This Tour</h3>
                <p>{selectedTour.detailedDescription || selectedTour.description}</p>
              </div>

              {selectedTour.highlights && (
                <div className="tour-highlights">
                  <h3>Tour Highlights</h3>
                  <ul>
                    {selectedTour.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedTour.inclusions && (
                <div className="tour-inclusions">
                  <h3>What's Included</h3>
                  <ul>
                    {selectedTour.inclusions.map((inclusion, index) => (
                      <li key={index}>{inclusion}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button className="book-now-btn">Book Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Tour List */}
      <h2 className="tour-list-title">Available Tours</h2>
      <div className="tour-list-grid">
        {tours.length > 0 ? (
          tours.map((tour, index) => (
            children ? (
              children(tour, index)
            ) : (
              <TourCard
                key={tour.id || index}
                tour={tour}
                onReadMore={() => handleReadMore(tour)}
              />
            )
          ))
        ) : (
          <div className="tour-list-empty">No tours available at the moment</div>
        )}
      </div>
    </div>
  );
};

export default Tourlist;
