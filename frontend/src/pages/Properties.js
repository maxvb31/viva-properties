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
      .fetch('*[_type == "category"] { title, _id, "iconUrl": icon.asset->url }')
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
        setPosts(data);
        setAllPosts(data);
      })
      .catch(console.error);
  }, []);

  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
  };

  const filteredPosts = selectedCategory
    ? posts.filter((post) =>
        post.categories && post.categories.some((category) => category.title === selectedCategory)
      )
    : posts;

  return (
    <section>
      <div className="container p-3">
        <h1 className="display-3 fw-bold">Find Properties</h1>
        <div className="d-flex justify-content-center">
          <div className="mb-3">
            <ul className="list-unstyled d-flex flex-wrap justify-content-center align-items-center pt-4">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className={`me-3 mb-3 category-link${selectedCategory === category.title ? ' active' : ''}`}
                  onClick={() => handleCategoryClick(category.title)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={category.iconUrl}
                      alt={category.title}
                      className="me-2"
                      style={{ width: '48px', height: '48px' }}
                    />
                    <div className="text-center">{category.title}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-center mb-3">Viewing {filteredPosts.length} properties</p>
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