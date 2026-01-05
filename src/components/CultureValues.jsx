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
    description: 'We take responsibility end-to-end. Every outcome matters.',
  },
  {
    icon: playerIcon,
    title: 'Player Experience Is Paramount',
    description: 'If it doesn’t serve our players and partners, it doesn’t ship.',
  },
  {
    icon: teamIcon,
    title: 'Team > Individuals',
    description: 'We win together. Growth is collective.',
  },
  {
    icon: innovationIcon,
    title: 'Constant Excellence & Innovation at Speed',
    description: 'We move fast, learn faster, and build better every day.',
  },
  {
    icon: longTermIcon,
    title: 'Building For The Long Term',
    description: 'Short-term wins never come at the cost of long-term trust.',
  },
  {
    icon: detailIcon,
    title: 'Attention To Detail',
    description: 'Great experiences are built in the smallest moments.',
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
