import React, { useState } from 'react';
import './tourpage.css';
import Tourfiltersidebar from '../components/Tourfiltersidebar/Tourfiltersidebar';
import Tourlist from '../components/Tourlist/Tourlist';
import type { Tour } from '../Interfaces/tour';

const ToursPage: React.FC = () => {
  

  const tours: Tour[] = [
    {
      id: 1,
      name: "Paris City Tour",
      description: "Explore the most iconic landmarks of Paris with our expert guides.",
      price: 129,
      duration: "1 day",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=500&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Alpine Adventure",
      description: "Hike through breathtaking mountain landscapes with experienced guides.",
      price: 299,
      duration: "3 days",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=500&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Mediterranean Cruise",
      description: "Relaxing cruise along the beautiful Mediterranean coast.",
      price: 599,
      duration: "7 days",
      image: "https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=500&auto=format&fit=crop"
    }
  ];

  const handleFilterChange = (filters: any) => {
    console.log("Filters updated:", filters);
    // You can apply filtering logic here and update `filteredTours`
  };

  return (
    <div className="tour-page-container">
      <aside className="tour-page-sidebar">
        <Tourfiltersidebar onFilterChange={handleFilterChange} />
      </aside>
      <main className="tour-page-main">
        <Tourlist tours={tours} />
      </main>
    </div>
  );
};

export default ToursPage;
