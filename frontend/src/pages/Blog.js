import React, { useState, useEffect } from 'react';
import client from '../client';
import { Link } from 'react-router-dom';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';

export default function Blog() {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    // Fetch featured posts
    client
      .fetch(
        `*[_type == "post" && featured == true] | order(orderRank asc) {
          title,
          slug,
          mainImage {
            asset -> {
              _id,
              url
            },
            alt
          },
          orderRank
        }`
      )
      .then((data) => setFeaturedPosts(data))
      .catch(console.error);

    // Fetch all posts
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
          longitude,
          latitude
        }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  return (
    <section>
      <div className="container p-3">
        <h1 className="display-3 fw-bold">Blog Page</h1>
        <h4>You are viewing <span className="fw-bold">{allPosts.length}</span> blog posts</h4>
        <SearchBar posts={allPosts} />

        {featuredPosts.length > 0 && (
          <div>
            <h2 className="section-headers">Featured Post</h2>
            <div className="row mb-4">
              {featuredPosts.map((post) => (
                <div key={post.slug.current} className="col-12">
                  <div className="card h-100 shadow rounded-3">
                    <div style={{ height: '400px', overflow: 'hidden' }}>
                      <img
                        src={post.mainImage.asset.url}
                        className="card-img-top img-fluid"
                        alt={post.title}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{post.title}</h5>
                      <button className="btn btn-dark">
                        <Link className="text-decoration-none text-light" to={`/blog/${post.slug.current}`}>
                          Read more
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="section-headers">All Posts</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {allPosts.map((post) => (
            <div key={post.slug.current} className="col">
              <div className="card h-100 shadow rounded-3">
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <img
                    src={post.mainImage.asset.url}
                    className="card-img-top img-fluid"
                    alt={post.title}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{post.title}</h5>
                  <button className="btn btn-dark">
                    <Link className="text-decoration-none text-light" to={`/blog/${post.slug.current}`}>
                      Read more
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add the Map component here */}
        <h2 className="section-headers">Map of Posts</h2>
        <Map posts={allPosts} />
      </div>
    </section>
  );
}
