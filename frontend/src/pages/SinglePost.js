import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../client";
import BlockContent from "@sanity/block-content-to-react";
import BookingComponent from '../components/BookingComponent';

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
          title,
          body,
          mainImage {
            asset -> {
              _id,
              url
            },
            alt
          },
          bedrooms,
          beds,
          author-> {  
            name
          }
        }`
      )
      .then((data) => {
        if (data.length > 0) {
          setSinglePost(data[0]);
        }
        setIsLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : singlePost ? (
        <section className="container">
          <h1 className='display-2 fw-bold text-center'>{singlePost.title}</h1>
          {singlePost.mainImage && (
            <img className="img-fluid mb-4" src={singlePost.mainImage.asset.url} alt={singlePost.title} />
          )}
          <div className="row">
            <div className="col-md-8">
              <p className="d-inline-block me-3 fw-bold">Hosted by {singlePost.author.name}</p>
              <p className="d-inline-block me-3 fw-bold">{singlePost.bedrooms} bedrooms</p>
              <p className="d-inline-block fw-bold">{singlePost.beds} beds</p>
              <div>
                <BlockContent blocks={singlePost.body} projectId="7wz6aui0" dataset="production" />
              </div>
            </div>
            <div className="col-md-4">
              <BookingComponent />
            </div>
          </div>
          <button className="btn btn-dark mb-3 mt-4">
            <Link className="text-decoration-none text-light" to="/blog">See more properties</Link>
          </button>
        </section>
      ) : (
        <h1>Post not found</h1>
      )}
    </>
  );
}
