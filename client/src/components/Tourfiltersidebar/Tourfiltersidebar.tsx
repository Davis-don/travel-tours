import { useState } from 'react';
import { FaSearch, FaChevronDown, FaChevronUp, FaMapMarkerAlt } from 'react-icons/fa';
import './Tourfiltersidebar.css';

type FilterKeys = 'destination' | 'duration' | 'price' | 'rating' | 'date';

function Tourfiltersidebar() {
  const [activeFilters, setActiveFilters] = useState<Record<FilterKeys, boolean>>({
    destination: true,
    duration: false,
    price: true,
    rating: false,
    date: false
  });

  const toggleFilter = (filter: FilterKeys) => {
    setActiveFilters(prev => ({
      ...prev,
      [filter]: !prev[filter]
    }));
  };

  const destinations = [
    { name: 'All Destinations', image: '🌎' },
    { name: 'Europe', image: '🏰' },
    { name: 'Asia', image: '🗼' },
    { name: 'Africa', image: '🦒' },
    { name: 'North America', image: '🗽' },
    { name: 'South America', image: '🌋' },
    { name: 'Australia', image: '🐨' }
  ];

  return (
    <div className="tour-filter-sidebar">
      <div className="sidebar-header">
        <div className="header-image">
          <img 
            src="https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=500&auto=format&fit=crop" 
            alt="Travel adventure"
          />
          <div className="header-overlay">
            <h3>Find Your Perfect Tour</h3>
            <p>Filter by your preferences</p>
          </div>
        </div>
      </div>

      <div className="filter-content">
        {/* Search Filter */}
        <div className="filter-group search-group">
          <div className="search-filter">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search tours..."
              className="search-input"
            />
          </div>
        </div>

        {/* Destination Filter */}
        <div className={`filter-group ${activeFilters.destination ? 'active' : ''}`}>
          <div className="filter-title" onClick={() => toggleFilter('destination')}>
            <div className="title-content">
              <FaMapMarkerAlt className="filter-icon" />
              <h4>Destination</h4>
            </div>
            {activeFilters.destination ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {activeFilters.destination && (
            <div className="filter-options destination-options">
              {destinations.map((dest, index) => (
                <div className="destination-option" key={index}>
                  <input
                    type="radio"
                    name="destination"
                    id={`dest-${index}`}
                    defaultChecked={index === 0}
                  />
                  <label htmlFor={`dest-${index}`}>
                    <span className="destination-emoji">{dest.image}</span>
                    {dest.name}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="apply-filters-btn">
          Apply Filters
          <span className="btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

export default Tourfiltersidebar;
