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
          <p>By Max</p>
          <div>
            <BlockContent blocks={singlePost.body} projectId="7wz6aui0" dataset="production" />
          </div>
          <button className="btn btn-dark mb-3">
            <Link className="text-decoration-none text-light" to="/blog">Read more articles</Link>
          </button>
        </section>
      ) : (
        <h1>Post not found</h1>
      )}
    </>
  );
}
