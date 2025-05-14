import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./CSS/SearchResults.css";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { search } = useLocation(); // gets the ?q=value from URL

  const query = new URLSearchParams(search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/search?q=${query}`);
        setResults(response.data.results);
      } catch (err) {
        console.error("Error fetching search results:", err);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div className="search-results-wrapper">
      <h2>Search Results for "{query}"</h2>
      {results.length > 0 ? (
        <ul>
         <div className="search-results-page-container">
           {results.map(product => (
            <div className="product-card" key={product._id}>
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
               <div className="product-name">{product.name}</div>
               <div className="product-price">${product.price}</div>
             </div>
           </div>
           ))}
         </div>
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default SearchResults;
