import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <>
      <header className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">Max's Blog</Link>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}
