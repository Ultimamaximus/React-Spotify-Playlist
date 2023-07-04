import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  // State variable to store the search term
  const [term, setTerm] = useState("");

  // Event handler for the input change event
  const handleTermChange = (event) => {
    setTerm(event.target.value); // Update the term state with the input value
  };

  // Event handler for the search button click
  const handleSearch = () => {
    onSearch(term); // Call the onSearch function with the current term value
  };

  return (
    <div className="SearchBar">
      {/* Input field for entering the search term */}
      <input
        type="text"
        placeholder="Enter A Song Title"
        value={term}
        onChange={handleTermChange}
      />
      {/* Search button */}
      <button className="SearchButton" onClick={handleSearch}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;

