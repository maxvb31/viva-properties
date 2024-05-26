import React from 'react';

const Error = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h1 className='display-1'>VIVA</h1>
      <h1 className="text-danger">Oops! Something went wrong...</h1>
      <p className="text-muted">We're sorry, but the page you're looking for cannot be found.</p>
      <p className="text-muted">Please check the URL or go back to our homepage.</p>
    </div>
  );
};

export default Error;
