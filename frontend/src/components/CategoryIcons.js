// CategoryIcons.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../client';

const CategoryIcons = ({ setFilteredCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    client
      .fetch(`*[_type == "category"] { title, slug, icon { asset -> { _id, url } } }`)
      .then((data) => setCategories(data))
      .catch(console.error);
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        {categories.map((category) => (
          <div key={category.title} className="col-auto">
            <Link to="#" onClick={() => setFilteredCategory(category.slug.current)} className="text-decoration-none">
              <div className="text-center">
                <img src={category.icon?.asset?.url || ''} alt={category.title} style={{ maxWidth: '50px', maxHeight: '50px' }} className="img-fluid" />
                <p className="mt-2">{category.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryIcons;