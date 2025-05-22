import { useState } from 'react';
import './Tourfiltersidebar.css';
import kenyaHero from '../../assets/Images/mana5280-sTEI0bslWZU-unsplash.jpg'

interface FilterState {
  priceRange: [number, number];
  destination: string;
  tourType: string;
  rating: number;
  departureDate: string;
}

interface TourFilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
}

const Tourfiltersidebar: React.FC<TourFilterSidebarProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [5000, 30000],
    destination: '',
    tourType: '',
    rating: 0,
    departureDate: ''
  });

  const kenyanDestinations = [
    'All Destinations',
    'Maasai Mara',
    'Diani Beach',
    'Amboseli',
    'Tsavo',
    'Lamu Island',
    'Mount Kenya',
    'Lake Nakuru'
  ];

  const tourTypes = [
    'All Types',
    'Safari',
    'Beach',
    'Adventure',
    'Cultural',
    'Luxury'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newPriceRange = [...filters.priceRange] as [number, number];
    newPriceRange[index] = parseInt(e.target.value);
    setFilters(prev => ({
      ...prev,
      priceRange: newPriceRange
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      priceRange: [5000, 30000],
      destination: '',
      tourType: '',
      rating: 0,
      departureDate: ''
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="tour-filter-sidebar">
      <div className="filter-hero">
        <img src={kenyaHero} alt="Beautiful Kenya landscape" />
        <h2 className="filter-title">Find Your Perfect Kenya Tour</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Price Range Filter */}
        <div className="filter-section">
          <h3 className="filter-section-title">Price Range (KES)</h3>
          <div className="price-inputs">
            <div className="price-input-group">
              <label>Min</label>
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                min="0"
                max={filters.priceRange[1]}
                className="price-input"
              />
            </div>
            <div className="price-input-group">
              <label>Max</label>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                min={filters.priceRange[0]}
                max="100000"
                className="price-input"
              />
            </div>
          </div>
          <div className="price-range-display">
            KES {filters.priceRange[0].toLocaleString()} - KES {filters.priceRange[1].toLocaleString()}
          </div>
        </div>

        {/* Destination Filter */}
        <div className="filter-section">
          <h3 className="filter-section-title">Destination</h3>
          <div className="destination-options">
            {kenyanDestinations.map(dest => (
              <label key={dest} className={`destination-option ${filters.destination === dest ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="destination"
                  value={dest}
                  checked={filters.destination === dest}
                  onChange={handleChange}
                  className="hidden-radio"
                />
                {dest}
              </label>
            ))}
          </div>
        </div>

        {/* Tour Type Filter */}
        <div className="filter-section">
          <h3 className="filter-section-title">Tour Type</h3>
          <div className="tour-type-options">
            {tourTypes.map(type => (
              <label key={type} className={`tour-type-option ${filters.tourType === type ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="tourType"
                  value={type}
                  checked={filters.tourType === type}
                  onChange={handleChange}
                  className="hidden-radio"
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="filter-section">
          <h3 className="filter-section-title">Minimum Rating</h3>
          <div className="rating-options">
            {[5, 4, 3, 2, 1].map(star => (
              <label key={star} className={`rating-option ${filters.rating === star ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="rating"
                  value={star}
                  checked={filters.rating === star}
                  onChange={handleChange}
                  className="hidden-radio"
                />
                {'★'.repeat(star)}
                <span className="rating-text">{star}+ stars</span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure Date */}
        <div className="filter-section">
          <h3 className="filter-section-title">Departure Date</h3>
          <input
            type="date"
            name="departureDate"
            value={filters.departureDate}
            onChange={handleChange}
            className="date-input"
            min={new Date().toISOString().split('T')[0]}
            
          />
        </div>

        {/* Action Buttons */}
        <div className="filter-actions">
          <button type="submit" className="apply-filters-btn">
            Search Tours
          </button>
          <button 
            type="button" 
            onClick={handleReset}
            className="reset-filters-btn"
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tourfiltersidebar;