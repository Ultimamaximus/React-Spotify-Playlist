const clientId = ''; // Insert client ID here.
const redirectUri = 'http://localhost:3000/'; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.

const Spotify = {
  accessToken: '',

  // Retrieves the access token from the URL or redirects the user to authorize the app
  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      // If access token and expiration time are present in the URL, extract and store them
      this.accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear the access token after it expires
      window.setTimeout(() => {
        this.accessToken = '';
      }, expiresIn * 1000);

      // Clear the parameters from the URL, allowing the retrieval of a new access token when it expires
      window.history.pushState('Access Token', null, '/');

      return this.accessToken;
    } else {
      // If access token and expiration time are not present in the URL, redirect the user to authorize the app
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  // Searches for tracks using the provided term
  async search(term) {
    const accessToken = this.getAccessToken();

    // Make a GET request to search for tracks using the provided term
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const jsonResponse = await response.json();

    if (!jsonResponse.tracks) {
      return [];
    }

    // Map the retrieved track information to an array of simplified track objects
    return jsonResponse.tracks.items.map(track => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri
    }));
  },

  // Saves the playlist to the user's Spotify account
  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    // Get the current user's ID
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: headers
    });
    const jsonResponse = await response.json();
    const userId = jsonResponse.id;

    // Create a new playlist for the user
    const createPlaylistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({ name: name })
    });
    const createPlaylistJsonResponse = await createPlaylistResponse.json();
    const playlistId = createPlaylistJsonResponse.id;

    // Add tracks to the newly created playlist
    await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: 'POST',
      body: JSON.stringify({ uris: trackUris })
    });
  }
};

export default Spotify;
