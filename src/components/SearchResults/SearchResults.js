import React from "react";
import PropTypes from "prop-types";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

const SearchResults = ({ searchResults, onAdd }) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      {/* isRemoval set to false */}
      <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    </div>
  );
};

// Prop type validation
SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default SearchResults;
