import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import client from "../client";
import BlockContent from "@sanity/block-content-to-react"

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
          author-> {  // Fetch the author's name
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
            <img className="img-fluid" src={singlePost.mainImage.asset.url} alt={singlePost.title} />
          )}
          <div className="row">
            <div className="col-md-2">
              <p>Hosted by {singlePost.author.name}</p>
            </div>
            <div className="col-md-2">
              <p>{singlePost.bedrooms} bedrooms</p>
            </div>
            <div className="col-md-2">
              <p>{singlePost.beds} beds</p>
            </div>
          </div>
          <div>
            <BlockContent blocks={singlePost.body} projectId="7wz6aui0" dataset="production" />
          </div>
          <button className="btn btn-dark mb-3">
            <Link className="text-decoration-none text-light" to="/blog">See more properties</Link>
          </button>
        </section>
      ) : (
        <h1>Post not found</h1>
      )}
    </>
  );
}
