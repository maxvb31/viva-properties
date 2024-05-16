import React from 'react';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <section className='container text-center'>
        <h1 className='display-2 fw-bold'>Max's Blog</h1>
        <button className='btn btn-dark'>
          <Link to="/blog" className='text-decoration-none text-light'>Read the blog</Link>
        </button>
      </section>
    </div>
  );
}