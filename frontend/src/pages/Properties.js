import React, { useState, useEffect } from 'react';
import client from '../client';
import { Link } from 'react-router-dom';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

export default function Properties() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    // Fetch categories
    client
      .fetch('*[_type == "category"] { title, _id }')
      .then((data) => setCategories(data))
      .catch(console.error);

    // Fetch all posts with mainImage
    client
      .fetch(
        `*[_type == "post"] | order(orderRank asc) {
          title,
          slug,
          mainImage {
            asset -> {
              _id,
              url
            },
            alt
          },
          orderRank,
          categories[]->{
            title,
            slug
          },
          longitude,
          latitude
        }`
      )
      .then((data) => {
        setAllPosts(data);
      })
      .catch(console.error);
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredPosts = selectedCategory
    ? allPosts.filter((post) =>
        post.categories && post.categories.some((category) => category.title === selectedCategory)
      )
    : allPosts;

  return (
    <section>
      <div className="container p-3">
        <h1 className="display-3 fw-bold">Find Properties</h1>
        <div className="mb-3">
          <label htmlFor="categorySelect" className="form-label">
            Select a Category:
          </label>
          <select
            className="form-select"
            id="categorySelect"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <SearchBar posts={allPosts} />
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {filteredPosts.map((post) => (
            <div key={post.slug.current} className="col">
              <div className="card h-100 shadow rounded-3">
                {post.mainImage && (
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={post.mainImage.asset.url}
                      className="card-img-top img-fluid"
                      alt={post.title}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <Link to={`/properties/${post.slug.current}`} className="btn btn-dark">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="py-3">
          <h2 className="section-headers">Find by location</h2>
          <Map posts={filteredPosts} />
        </div>
      </div>
    </section>
  );
}
