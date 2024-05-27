import React, { useState, useEffect } from 'react';
import client from '../client';
import { Link } from 'react-router-dom';
import Map from '../components/Map';
import SearchBar from '../components/SearchBar';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function Properties() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);

  useEffect(() => {
    // Fetch categories
    client
      .fetch('*[_type == "category"] { title, _id, "iconUrl": icon.asset->url }')
      .then((data) => setCategories(data))
      .catch(console.error);

    // Fetch all posts with mainImage and pricePerNight
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
          latitude,
          featured,
          pricePerNight
        }`
      )
      .then((data) => {
        const allPostsData = data.filter(post => !post.featured);
        const featuredPostData = data.find(post => post.featured);

        setPosts(allPostsData);
        setAllPosts(allPostsData);
        setFeaturedPost(featuredPostData);
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

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 5,
          initialSlide: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
          initialSlide: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          initialSlide: 3,
        }
      }
    ]
  };

  return (
    <section>
      <div className="container p-3">
        <h1 className="display-3 fw-bold">Find Properties</h1>
        <div className="d-flex justify-content-center">
          <div className="mb-3 w-100">
            <Slider {...settings}>
              {categories.map((category) => (
                <div key={category._id} className="text-center slider-item" onClick={() => handleCategoryClick(category.title)} style={{ cursor: 'pointer', padding: '0 10px' }}>
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={category.iconUrl}
                      alt={category.title}
                      className="me-2"
                      style={{ width: '48px', height: '48px', marginBottom: '10px' }}
                    />
                    <div>{category.title}</div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <p className="text-center mb-3">Viewing {filteredPosts.length} properties</p>
        <SearchBar posts={allPosts} />
        {!selectedCategory && featuredPost && (
          <div className="row mb-4">
            <div className="col">
              <div className="card shadow rounded-3">
                {featuredPost.mainImage && (
                  <div style={{ height: '250px', overflow: 'hidden' }}>
                    <img
                      src={featuredPost.mainImage.asset.url}
                      className="card-img-top img-fluid"
                      alt={featuredPost.title}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>
                )}
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div>
                    <h5 className="card-title d-flex align-items-center">
                      {featuredPost.title}
                      <span className="badge bg-primary ms-2">Featured</span>
                    </h5>
                    <p className="card-text">£{featuredPost.pricePerNight} per night</p>
                    <Link to={`/properties/${featuredPost.slug.current}`} className="btn btn-dark">
                    View
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
                  <p className="card-text">£{post.pricePerNight} per night</p>
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
