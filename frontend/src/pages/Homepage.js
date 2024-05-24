import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <section className='container text-center'>
        <h1 className='display-2 fw-bold'>Viva Properties</h1>
        <button className='btn btn-dark'>
          <Link to="/properties" className='text-decoration-none text-light'>Find Properties</Link>
        </button>
      </section>
    </div>
  );
}