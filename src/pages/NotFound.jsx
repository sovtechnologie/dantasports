import React from 'react';
import { Link } from 'react-router-dom';
import '../stylesheets/NotFound.css'; // Assuming you have a CSS file for styles

const NotFound = () => {
  return (
    <div className="notfound-bg">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Page Not Found</p>
      <Link to="/" className="notfound-link">Go to Home</Link>
    </div>
  );
};

export default NotFound;