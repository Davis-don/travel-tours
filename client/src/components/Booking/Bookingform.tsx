import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Toaster, toast } from 'sonner';
import { useAuthStore } from '../../Store/useauthstore';

interface TripDetails {
  destination: string;
  travelDates: string;
  budget: string;
  travelers: string;
  preferences: string;
  specialRequests?: string;
}

const BookingForm = () => {
  const [tripDetails, setTripDetails] = useState<TripDetails>({
    destination: '',
    travelDates: '',
    budget: '',
    travelers: '',
    preferences: '',
    specialRequests: '',
  });

  const apiUrl = import.meta.env.VITE_travel;

  // ✅ Get token from auth store
  const token = useAuthStore((state) => state.token);

  const bookingMutation = useMutation({
    mutationFn: async (newBooking: TripDetails) => {
      const res = await fetch(`${apiUrl}/booking/add-booking`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `${token}` : '',
        },
        body: JSON.stringify(newBooking),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Booking request failed');
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Trip booked successfully!');
      setTripDetails({
        destination: '',
        travelDates: '',
        budget: '',
        travelers: '',
        preferences: '',
        specialRequests: '',
      });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to submit trip request');
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTripDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitTrip = (e: React.FormEvent) => {
    e.preventDefault();

    const { destination, travelDates, budget, travelers, preferences } = tripDetails;

    if (!destination || !travelDates || !budget || !travelers || !preferences) {
      toast.error('Please fill in all required fields.');
      return;
    }

    bookingMutation.mutate(tripDetails);
  };

  return (
    <div className="new-trip-section">
      <Toaster richColors position="top-center" />

      <h2 className="section-title">
        <i className="fas fa-globe-americas"></i> Plan Your Dream Trip
      </h2>
      <p className="section-subtitle">
        Fill out the form below with your travel preferences, and our agents will create a customized itinerary for you.
      </p>

      <form onSubmit={handleSubmitTrip} className="trip-form">
        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="fas fa-map-marker-alt"></i> Destination(s):
            </label>
            <input
              type="text"
              name="destination"
              value={tripDetails.destination}
              onChange={handleInputChange}
              placeholder="Where would you like to go?"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="far fa-calendar-alt"></i> Travel Dates:
            </label>
            <input
              type="text"
              name="travelDates"
              value={tripDetails.travelDates}
              onChange={handleInputChange}
              placeholder="Approximate dates or duration"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>
              <i className="fas fa-money-bill-wave"></i> Budget:
            </label>
            <input
              type="text"
              name="budget"
              value={tripDetails.budget}
              onChange={handleInputChange}
              placeholder="Total budget for the trip"
              required
            />
          </div>

          <div className="form-group">
            <label>
              <i className="fas fa-users"></i> Number of Travelers:
            </label>
            <input
              type="text"
              name="travelers"
              value={tripDetails.travelers}
              onChange={handleInputChange}
              placeholder="Adults, children, ages if applicable"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>
            <i className="fas fa-heart"></i> Travel Preferences:
          </label>
          <textarea
            name="preferences"
            value={tripDetails.preferences}
            onChange={handleInputChange}
            placeholder="Accommodations, transportation, pace of travel, etc."
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <i className="fas fa-star"></i> Special Requests:
          </label>
          <textarea
            name="specialRequests"
            value={tripDetails.specialRequests}
            onChange={handleInputChange}
            placeholder="Any specific activities, dietary needs, etc."
            rows={4}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={bookingMutation.isPending}>
          <i className="fas fa-paper-plane"></i>{' '}
          {bookingMutation.isPending ? 'Submitting...' : 'Submit Trip Request'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
