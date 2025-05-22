import './services.css';
import { FaUmbrellaBeach, FaUsers, FaCrown, FaMountain, FaBriefcase } from 'react-icons/fa';

function Services() {
  const services = [
    {
      name: "Honeymoons",
      icon: <FaUmbrellaBeach className="service-icon" />,
      description: "Romantic getaways tailored for newlyweds with luxury accommodations and private experiences."
    },
    {
      name: "Family Vacations",
      icon: <FaUsers className="service-icon" />,
      description: "Fun-filled trips designed for all ages with activities that create lasting family memories."
    },
    {
      name: "Luxury Travel",
      icon: <FaCrown className="service-icon" />,
      description: "Exclusive high-end experiences with premium services, private tours, and VIP treatment."
    },
    {
      name: "Adventure Tours",
      icon: <FaMountain className="service-icon" />,
      description: "Thrilling expeditions for adrenaline seekers with expert guides and unique challenges."
    },
    {
      name: "Business Travel",
      icon: <FaBriefcase className="service-icon" />,
      description: "Efficient corporate trips with seamless logistics, premium accommodations, and meeting facilities."
    }
  ];

  return (
    <section className="services-section" id="services">
      <h2 className="services-title">Our Exclusive Services</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            {service.icon}
            <h3 className="service-name">{service.name}</h3>
            <p className="service-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;