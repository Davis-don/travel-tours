import React from 'react';
import './tourcard.css';

// Define props interface with detailed JSDoc
interface TourCardProps {
  /** 
   * The tour object containing all tour details
   */
  tour: {
    id?: string | number;
    name: string;
    description: string;
    price: number;
    duration: string;
    image?: string;
  };
  
  /** 
   * Optional click handler for the card 
   */
  onBookNow?: (tourId: string | number | undefined) => void;
}

/**
 * A card component that displays tour information
 */
const TourCard: React.FC<TourCardProps> = ({ tour, onBookNow }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://via.placeholder.com/300x200';
  };

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(tour.id);
    }
  };

  return (
    <div className="tour-card" role="article" aria-label={`Tour: ${tour.name}`}>
      <div className="tour-card-image">
        <img
          src={tour.image || 'https://via.placeholder.com/300x200'}
          alt={`${tour.name} tour`}
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      <div className="tour-card-content">
        <h3 className="tour-card-title">{tour.name}</h3>
        <p className="tour-card-description">{tour.description}</p>
        <div className="tour-card-details">
          <div className="tour-card-price" aria-label={`Price: $${tour.price.toFixed(2)}`}>
            ${tour.price.toFixed(2)}
          </div>
          <div className="tour-card-duration" aria-label={`Duration: ${tour.duration}`}>
            {tour.duration}
          </div>
        </div>
        <button 
          className="tour-card-button"
          onClick={handleBookNow}
          aria-label={`Book ${tour.name} tour`}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default TourCard;
