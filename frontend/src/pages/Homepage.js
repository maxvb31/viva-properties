import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const backgroundStyle = {
    backgroundImage: `url(/bg-min.png)`, // Assuming the image is located in the public directory
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={backgroundStyle}>
      <section className='container text-center'>
        <h1 className='display-1 fw-bold text-light'>Viva Properties</h1>
        <button className='btn btn-light'>
          <Link to="/properties" className='text-decoration-none text-dark'>Find Properties</Link>
        </button>
      </section>
    </div>
  );
}

export default Homepage;
