import React, { useState, useEffect } from "react";
import client from "../client";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "post"] {
          title,
          slug
        }`
      )
      .then((data) => setAllPosts(data))
      .catch(console.error);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const filteredResults = allPosts.filter(post =>
        post.title.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search properties..."
          value={query}
          onChange={handleSearch}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" type="button">
            Search
          </button>
        </div>
      </div>
      {results.length > 0 && (
        <ul className="list-group mt-3">
          {results.map((post) => (
            <li key={post.slug.current} className="list-group-item">
              <Link to={`/properties/${post.slug.current}`}>{post.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
