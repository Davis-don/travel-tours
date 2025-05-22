import './tourlist.css';
import {type  ReactNode } from 'react';
import TourCard from '../TourCard/Tourcard';

// Define the Tour type
export interface Tour {
  id?: string | number;
  name: string;
  description: string;
  price: number;
  duration: string;
  image?: string;
}

// Define props for Tourlist component
interface TourlistProps {
  tours?: Tour[];
  children?: (tour: Tour, index: number) => ReactNode;
}

function Tourlist({ tours = [], children }: TourlistProps) {
  return (
    <div className="tour-list-container">
      <h2 className="tour-list-title">Available Tours</h2>
      <div className="tour-list-grid">
        {tours.length > 0 ? (
          tours.map((tour, index) => (
            children ? 
              children(tour, index) : 
              <TourCard key={tour.id || index} tour={tour} />
          ))
        ) : (
          <div className="tour-list-empty">No tours available at the moment</div>
        )}
      </div>
    </div>
  );
}

export default Tourlist;