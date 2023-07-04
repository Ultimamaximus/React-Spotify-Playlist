import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

const Playlist = ({ playlistTracks, onNameChange, onRemove, onSave }) => {
  // Handle the change event of the input field for playlist name and call onNameChange function
  const handleNameChange = useCallback((event) => {
    onNameChange(event.target.value);
  }, [onNameChange]);

  return (
    <div className="Playlist">
      {/* Input field for playlist name */}
      <input onChange={handleNameChange} defaultValue="New Playlist" />
      
      {/* Render the TrackList component with playlist tracks */}
      <TrackList tracks={playlistTracks} isRemoval={true} onRemove={onRemove} />
      
      {/* Button to save the playlist to Spotify */}
      <button className="Playlist-save" onClick={onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

// Prop type validation
Playlist.propTypes = {
  playlistTracks: PropTypes.array.isRequired,
  onNameChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default Playlist;


