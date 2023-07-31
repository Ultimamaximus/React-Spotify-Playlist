import React from "react";
import PropTypes from "prop-types";
import "./Track.css";

const Track = ({ track, isRemoval, onAdd, onRemove }) => {
  // Function to handle adding a track
  const addTrack = () => {
    onAdd(track);
  };

  // Function to handle removing a track
  const removeTrack = () => {
    onRemove(track);
  };

  // Render the appropriate action button (+ or -) based on the isRemoval prop
  const renderAction = () => {
    // Determine the action symbol and action handler based on isRemoval
    const actionSymbol = isRemoval ? "-" : "+";
    const actionHandler = isRemoval ? removeTrack : addTrack;

    return (
      <button className="Track-action" onClick={actionHandler}>
        {actionSymbol}
      </button>
    );
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction()} {/* Render the appropriate action button */}
    </div>
  );
};

// Prop type validation
Track.propTypes = {
  track: PropTypes.object.isRequired,
  isRemoval: PropTypes.bool.isRequired,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};

export default Track;

