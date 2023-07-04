import React, { useState, useCallback } from "react";
import "./App.css";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Spotify from "../../util/Spotify";

const App = () => {
  // State variables
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Perform search using Spotify API
  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  // Add a track to the playlist
  const addTrack = useCallback(
    (track) => {
      // Check if the track is already in the playlist
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
        return;
      }
      setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    },
    [playlistTracks]
  );

  // Remove a track from the playlist
  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) =>
      prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  // Update the playlist name
  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  // Save the playlist to Spotify
  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return (
    <div>
      <h1>
        M<span className="highlight">us</span>e
      </h1>
      <div className="App">
        {/* Render the SearchBar component with the search function */}
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          {/* Render the SearchResults component with the search results and addTrack function */}
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          {/* Render the Playlist component with the playlist name, tracks, and relevant functions */}
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
