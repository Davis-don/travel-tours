import './mybookings.css';
import { useState, useEffect } from 'react';
import {
  FaHotel,
  FaPlane,
  FaCar,
  FaCalendarAlt,
  FaUserFriends,
  FaMapMarkerAlt,
  FaSearch,
  FaTimes
} from 'react-icons/fa';

type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

type BookingType = 'hotel' | 'flight' | 'car';

interface Booking {
  id: number;
  type: BookingType;
  title: string;
  location: string;
  date: string;
  guests: number;
  price: string;
  status: BookingStatus;
  image: string;
}

function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | BookingStatus>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: 1,
        type: 'hotel',
        title: 'Luxury Resort & Spa',
        location: 'Bali, Indonesia',
        date: '2023-07-15 to 2023-07-22',
        guests: 2,
        price: '$1200',
        status: 'confirmed',
        image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 2,
        type: 'flight',
        title: 'Round Trip to Tokyo',
        location: 'New York to Tokyo',
        date: '2023-08-10 to 2023-08-25',
        guests: 1,
        price: '$850',
        status: 'confirmed',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 3,
        type: 'car',
        title: 'Premium SUV Rental',
        location: 'Los Angeles, USA',
        date: '2023-09-05 to 2023-09-12',
        guests: 5,
        price: '$450',
        status: 'pending',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      {
        id: 4,
        type: 'hotel',
        title: 'Mountain View Cabin',
        location: 'Aspen, Colorado',
        date: '2023-12-20 to 2023-12-27',
        guests: 4,
        price: '$1800',
        status: 'cancelled',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      }
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch =
      booking.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || booking.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getTypeIcon = (type: BookingType) => {
    switch (type) {
      case 'hotel':
        return <FaHotel className="booking-type-icon hotel" />;
      case 'flight':
        return <FaPlane className="booking-type-icon flight" />;
      case 'car':
        return <FaCar className="booking-type-icon car" />;
      default:
        return null;
    }
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const closeDetails = () => {
    setSelectedBooking(null);
  };

  return (
    <div className="my-bookings-container">
      <h2 className="bookings-header">My Bookings</h2>

      <div className="bookings-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          {['all', 'confirmed', 'pending', 'cancelled'].map((filter) => (
            <button
              key={filter}
              className={activeFilter === filter ? 'active' : ''}
              onClick={() => setActiveFilter(filter as typeof activeFilter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings found matching your criteria.</p>
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className={`booking-card ${booking.status}`}
              onClick={() => handleBookingClick(booking)}
            >
              <div
                className="booking-image"
                style={{ backgroundImage: `url(${booking.image})` }}
              >
                {getTypeIcon(booking.type)}
                <span className={`status-badge ${booking.status}`}>
                  {booking.status}
                </span>
              </div>
              <div className="booking-info">
                <h3>{booking.title}</h3>
                <p className="location">
                  <FaMapMarkerAlt /> {booking.location}
                </p>
                <p className="date">
                  <FaCalendarAlt /> {booking.date}
                </p>
                <p className="guests">
                  <FaUserFriends /> {booking.guests}{' '}
                  {booking.guests > 1 ? 'guests' : 'guest'}
                </p>
                <p className="price">{booking.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedBooking && (
        <div className="booking-details-overlay">
          <div className="booking-details">
            <button className="close-details" onClick={closeDetails}>
              <FaTimes />
            </button>
            <div
              className="details-image"
              style={{ backgroundImage: `url(${selectedBooking.image})` }}
            >
              {getTypeIcon(selectedBooking.type)}
              <span className={`status-badge ${selectedBooking.status}`}>
                {selectedBooking.status}
              </span>
            </div>
            <h2>{selectedBooking.title}</h2>
            <p className="details-location">
              <FaMapMarkerAlt /> {selectedBooking.location}
            </p>

            <div className="details-content">
              <div className="details-section">
                <h4>Booking Details</h4>
                <p>
                  <strong>Date:</strong> {selectedBooking.date}
                </p>
                <p>
                  <strong>Guests:</strong> {selectedBooking.guests}
                </p>
                <p>
                  <strong>Type:</strong> {selectedBooking.type}
                </p>
              </div>

              <div className="details-section">
                <h4>Price Summary</h4>
                <p>
                  <strong>Total:</strong> {selectedBooking.price}
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`status-text ${selectedBooking.status}`}>
                    {selectedBooking.status}
                  </span>
                </p>
              </div>

              <div className="details-actions">
                <button className="primary-btn">View Receipt</button>
                {selectedBooking.status === 'confirmed' && (
                  <button className="secondary-btn">Modify Booking</button>
                )}
                {selectedBooking.status !== 'cancelled' && (
                  <button className="danger-btn">Cancel Booking</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
