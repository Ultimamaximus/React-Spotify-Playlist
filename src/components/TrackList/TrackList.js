import React from "react";
import PropTypes from "prop-types";
import "./TrackList.css";
import Track from "../Track/Track";

const TrackList = ({ tracks, onAdd, onRemove, isRemoval }) => {
  return (
    <div className="TrackList">
      {/* Map through the tracks array and render a Track component for each track */}
      {tracks.map((track) => (
        <Track
          key={track.id}
          track={track}
          onAdd={onAdd}
          onRemove={onRemove}
          isRemoval={isRemoval}
        />
      ))}
    </div>
  );
};

// Prop type validation
TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  isRemoval: PropTypes.bool.isRequired,
};

export default TrackList;

