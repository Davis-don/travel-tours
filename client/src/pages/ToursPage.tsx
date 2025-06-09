import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import {toast,Toaster} from 'sonner'
import './tourpage.css';

interface Accommodation {
  id: string;
  name: string;
  description: string;
  city: string;
  county: string;
  country: string;
  circuit: string;
  class: number;
  imgUrl: string;
  publicId: string;
  type: {
    name: string;
  };
  amenities: {
    amenity: {
      name: string;
    };
  }[];
}

interface AccommodationType {
  id: string;
  name: string;
}

interface Amenity {
  id: string;
  name: string;
}

function ToursPage() {
  const apiUrl = import.meta.env.VITE_travel_api;
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [types, setTypes] = useState<AccommodationType[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all accommodations
  const { data: accommodations = [], isLoading, error } = useQuery<Accommodation[]>({
    queryKey: ['accommodations'],
    queryFn: async () => {
      const res = await fetch(`${apiUrl}/accommodation/fetch-all-accommodations`);
      if (!res.ok) {
        throw new Error('Failed to fetch accommodations');
      }
      return await res.json();
    }
  });

  // Fetch accommodation types and amenities
  useEffect(() => {
    if (accommodations.length) {
      // Get unique types
      const uniqueTypes = Array.from(new Set(accommodations.map(a => a.type.name)))
        .map(name => ({ id: name.toLowerCase().replace(/\s+/g, '-'), name }));
      setTypes(uniqueTypes);

      // Get unique amenities
      const allAmenities = accommodations.flatMap(a => 
        a.amenities.map(am => am.amenity.name)
      );
      const uniqueAmenities = Array.from(new Set(allAmenities))
        .map(name => ({ id: name.toLowerCase().replace(/\s+/g, '-'), name }));
      setAmenities(uniqueAmenities);
    }
  }, [accommodations]);

  // Filter accommodations based on selections
  const filteredAccommodations = accommodations.filter(acc => {
    // Filter by type if any selected
    if (selectedTypes.length > 0 && !selectedTypes.includes(acc.type.name)) {
      return false;
    }
    
    // Filter by star rating if any selected
    if (selectedStars.length > 0 && !selectedStars.includes(acc.class)) {
      return false;
    }
    
    // Filter by amenities if any selected
    if (selectedAmenities.length > 0) {
      const accAmenities = acc.amenities.map(a => a.amenity.name);
      const hasAllSelected = selectedAmenities.every(amenity => 
        accAmenities.includes(amenity)
      );
      if (!hasAllSelected) return false;
    }
    
    return true;
  });

  // Toggle functions for filters
  const toggleType = (typeName: string) => {
    setSelectedTypes(prev =>
      prev.includes(typeName)
        ? prev.filter(t => t !== typeName)
        : [...prev, typeName]
    );
  };

  const toggleStar = (star: number) => {
    setSelectedStars(prev =>
      prev.includes(star)
        ? prev.filter(s => s !== star)
        : [...prev, star]
    );
  };

  const toggleAmenity = (amenityName: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenityName)
        ? prev.filter(a => a !== amenityName)
        : [...prev, amenityName]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedStars([]);
    setSelectedAmenities([]);
  };

  const openModal = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  // Determine which accommodations to display
  const displayedAccommodations = showAll ? filteredAccommodations : filteredAccommodations.slice(0, 3);

  return (
    <div className="tours-page">
      <Toaster position='top-center' richColors/>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Our Featured Tours</h1>
          <p>Discover the perfect getaway with our handpicked selection of premium accommodations</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Loading State */}
        {isLoading && (
          <div className="loading-section">
            <h2>Our Tours</h2>
            <div className="loading">Loading our amazing tours...</div>
          </div>
        )}

        {error && <div className="error">Error: {error.message}</div>}

        {!isLoading && !error && (
          <>
            {/* Filters Section - Always visible */}
            <div className="filters-section">
              <div className="filter-group">
                <h3>Accommodation Type</h3>
                <div className="filter-options">
                  {types.map(type => (
                    <button
                      key={type.id}
                      className={`filter-btn ${selectedTypes.includes(type.name) ? 'active' : ''}`}
                      onClick={() => toggleType(type.name)}
                    >
                      {type.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Star Rating</h3>
                <div className="filter-options">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      className={`filter-btn ${selectedStars.includes(star) ? 'active' : ''}`}
                      onClick={() => toggleStar(star)}
                    >
                      {Array(star).fill('★').join('')}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-group">
                <h3>Amenities</h3>
                <div className="filter-options">
                  {amenities.map(amenity => (
                    <button
                      key={amenity.id}
                      className={`filter-btn ${selectedAmenities.includes(amenity.name) ? 'active' : ''}`}
                      onClick={() => toggleAmenity(amenity.name)}
                    >
                      {amenity.name}
                    </button>
                  ))}
                </div>
              </div>

              {(selectedTypes.length > 0 || selectedStars.length > 0 || selectedAmenities.length > 0) && (
                <button className="clear-filters" onClick={clearFilters}>
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Tours Section */}
            <section className="featured-tours">
              <h2>Our Tours</h2>
              <div className="results-info">
                Showing {displayedAccommodations.length} of {filteredAccommodations.length} accommodations
                {(selectedTypes.length > 0 || selectedStars.length > 0 || selectedAmenities.length > 0) && (
                  <span className="filter-indicator"> (filtered)</span>
                )}
              </div>

              {filteredAccommodations.length === 0 ? (
                <div className="no-results">
                  <p>No accommodations match your current filters.</p>
                  <button onClick={clearFilters}>Clear filters</button>
                </div>
              ) : (
                <>
                  <div className="accommodation-grid">
                    {displayedAccommodations.map(acc => (
                      <div key={acc.id} className="accommodation-card">
                        <div 
                          className="card-image"
                          style={{ backgroundImage: `url(${acc.imgUrl})` }}
                        >
                          <div className="star-rating">
                            {Array(acc.class).fill('★').join('')}
                          </div>
                        </div>
                        <div className="card-content">
                          <h3>{acc.name}</h3>
                          <p className="location">
                            {acc.city}, {acc.county}, {acc.country}
                          </p>
                          <p className="description">
                            {acc.description.length > 100 
                              ? `${acc.description.substring(0, 100)}...` 
                              : acc.description}
                          </p>
                          <div className="amenities">
                            {acc.amenities.slice(0, 3).map((am, i) => (
                              <span key={i} className="amenity-tag">
                                {am.amenity.name}
                              </span>
                            ))}
                            {acc.amenities.length > 3 && (
                              <span className="amenity-more">
                                +{acc.amenities.length - 3} more
                              </span>
                            )}
                          </div>
                          <button 
                            className="view-details"
                            onClick={() => openModal(acc)}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredAccommodations.length > 3 && !showAll && (
                    <div className="show-more-container">
                      <button 
                        className="show-more-btn"
                        onClick={() => setShowAll(true)}
                      >
                        Show All {filteredAccommodations.length} Tours
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}
      </div>

      {/* Accommodation Details Modal */}
      {isModalOpen && selectedAccommodation && (
  <div className="tour-modal-overlay" onClick={closeModal}>
    <div className="tour-modal-container" onClick={e => e.stopPropagation()}>
      <button className="tour-modal-close-btn" onClick={closeModal}>
        &times;
      </button>
      
      <div className="tour-modal-header">
        <div 
          className="tour-modal-hero-image"
          style={{ backgroundImage: `url(${selectedAccommodation.imgUrl})` }}
        >
          <div className="tour-modal-rating-badge">
            {Array(selectedAccommodation.class).fill('★').join('')}
          </div>
        </div>
        <h2 className="tour-modal-title">{selectedAccommodation.name}</h2>
        <p className="tour-modal-location">
          {selectedAccommodation.city}, {selectedAccommodation.county}, {selectedAccommodation.country}
        </p>
        <p className="tour-modal-type">
          Type: {selectedAccommodation.type.name}
        </p>
      </div>
      
      <div className="tour-modal-content">
        <div className="tour-modal-section">
          <h3 className="tour-modal-section-title">Description</h3>
          <p className="tour-modal-description">{selectedAccommodation.description}</p>
        </div>
        
        <div className="tour-modal-section">
          <h3 className="tour-modal-section-title">Amenities</h3>
          <div className="tour-modal-amenities-list">
            {selectedAccommodation.amenities.map((am, i) => (
              <span key={i} className="tour-modal-amenity-item">
                {am.amenity.name}
              </span>
            ))}
          </div>
        </div>
        
        <div className="tour-modal-section">
          <h3 className="tour-modal-section-title">Location Details</h3>
          <p className="tour-modal-circuit">Circuit: {selectedAccommodation.circuit}</p>
        </div>
      </div>
      
      <div className="tour-modal-footer">
        <button onClick={()=>toast.info("This feature will be available soon thankyou!!!!")} className="tour-modal-primary-btn">Book Now</button>
        <button className="tour-modal-secondary-btn" onClick={closeModal}>
          Close
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default ToursPage;