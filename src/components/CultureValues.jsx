import React from 'react';
import './StyleSheets/CultureValues.css'; // Import CSS file
import ownershipIcon from '../assets/CultureValuesLogo/ownershipIcon.png';
import playerIcon from '../assets/CultureValuesLogo/playerIcon.png';
import teamIcon from '../assets/CultureValuesLogo/teamIcon.png';
import innovationIcon from '../assets/CultureValuesLogo/innovationIcon.png';
import longTermIcon from '../assets/CultureValuesLogo/longTermIcon.png';
import detailIcon from '../assets/CultureValuesLogo/detailIcon.png';

const values = [
  {
    icon: ownershipIcon,
    title: 'High Ownership',
    description: 'We take bold risks, embrace mistakes, and take full ownership of every outcome.',
  },
  {
    icon: playerIcon,
    title: 'Player Experience Is Paramount',
    description: 'We exist for our players and our partners.',
  },
  {
    icon: teamIcon,
    title: 'Team > Individuals',
    description: 'No individual goals, everything is a team.',
  },
  {
    icon: innovationIcon,
    title: 'Constant Excellence & Innovation at Speed',
    description: 'Slowing down is never an option. We push boundaries, delivering top-quality solutions.',
  },
  {
    icon: longTermIcon,
    title: 'Building For The Long Term',
    description: 'Exceptional execution over days, months, years.',
  },
  {
    icon: detailIcon,
    title: 'Attention To Detail',
    description: 'The magic is in the details. We focus on perfecting every aspect.',
  },
];

const CultureValues = () => {
  return (
    <section className="culture-values-section">
      <h2 className="culture-heading">
        Our Culture <span className="highlight">and Values</span>
      </h2>
      <div className="values-grid">
        {values.map((value, index) => (
          <div className="value-card" key={index}>
            <img src={value.icon} alt={value.title} />
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CultureValues;
