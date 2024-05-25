import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../client";
import BlockContent from "@sanity/block-content-to-react";
import BookingComponent from '../components/BookingComponent';

export default function SinglePost() {
  const [singlePost, setSinglePost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const [mainImageAspectRatio, setMainImageAspectRatio] = useState(null); // State to track main image aspect ratio

  useEffect(() => {
    client
      .fetch(
        `*[slug.current == "${slug}"] {
          title,
          body,
          mainImage {
            asset -> {
              _id,
              url,
              metadata {
                dimensions {
                  aspectRatio
                }
              }
            },
            alt
          },
          propertyImages[]{
            asset -> {
              _id,
              url
            },
            alt
          },
          bedrooms,
          beds,
          pricePerNight,
          host-> {  
            name
          }
        }`
      )
      .then((data) => {
        if (data.length > 0) {
          setSinglePost(data[0]);
          setMainImageAspectRatio(data[0]?.mainImage?.asset?.metadata?.dimensions?.aspectRatio);
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
          <div className="row">
            <div className="col-md-6">
              {singlePost.mainImage && (
                <img
                  className="img-fluid mb-4"
                  src={singlePost.mainImage.asset.url}
                  alt={singlePost.title}
                  style={{ objectFit: 'cover', width: '100%', height: 'auto', maxHeight: '600px' }}
                />
              )}
            </div>
            <div className="col-md-6">
              <div className="row g-3">
                {singlePost.propertyImages &&
                  singlePost.propertyImages.map((image, index) => (
                    <div key={index} className="col-6" style={{ maxHeight: '50%', overflow: 'hidden' }}>
                      <img
                        className="img-fluid"
                        src={image.asset.url}
                        alt={image.alt || `Property Image ${index + 1}`}
                        style={{
                          objectFit: 'cover',
                          width: '100%',
                          height: '97%',
                          aspectRatio: mainImageAspectRatio
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <p className="d-inline-block me-3 fw-bold">Hosted by {singlePost.host.name}</p>
              <p className="d-inline-block me-3 fw-bold">{singlePost.bedrooms} bedrooms</p>
              <p className="d-inline-block me-3 fw-bold">{singlePost.beds} beds</p>
              <p className="d-inline-block fw-bold">${singlePost.pricePerNight} per night</p>
              <div>
                <BlockContent blocks={singlePost.body} projectId="7wz6aui0" dataset="production" />
              </div>
            </div>
            <div className="col-md-4">
              <BookingComponent pricePerNight={singlePost.pricePerNight} maxGuests={singlePost.beds} />
            </div>
          </div>
          <button className="btn btn-dark mb-3 mt-4">
            <Link className="text-decoration-none text-light" to="/properties">See more properties</Link>
          </button>
        </section>
      ) : (
        <h1>Post not found</h1>
      )}
    </>
  );
}
