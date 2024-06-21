import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SpotifyPlaylistStyles.css';

const clientId = 'YOUR_SPOTIFY_CLIENT_ID';
const redirectUri = 'YOUR_REDIRECT_URI';
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
];
const stateKey = 'spotify_auth_state';

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const getHashParams = () => {
  const hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

const SpotifyPlaylist = ({ score }) => {
  const [token, setToken] = useState('');
  const [playlist, setPlaylist] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const highestScore = Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b), 'D');

  const playlists = {
    D: 'YOUR_SPOTIFY_PLAYLIST_ID_FOR_D',
    I: 'YOUR_SPOTIFY_PLAYLIST_ID_FOR_I',
    S: 'YOUR_SPOTIFY_PLAYLIST_ID_FOR_S',
    C: 'YOUR_SPOTIFY_PLAYLIST_ID_FOR_C',
  };

  useEffect(() => {
    const params = getHashParams();
    const token = params.access_token;
    if (token) {
      setToken(token);
      fetchPlaylist(token);
    } else {
      const storedToken = localStorage.getItem('spotify_access_token');
      if (storedToken) {
        setToken(storedToken);
        fetchPlaylist(storedToken);
      }
    }
  }, []);

  const fetchPlaylist = async (token) => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlists[highestScore]}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPlaylist(response.data);
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  };

  const handleLogin = () => {
    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);
    const scope = scopes.join('%20');
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${clientId}&scope=${scope}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}`;
    window.location = url;
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('spotify_access_token');
    navigate('/');
  };

  return (
    <div className="spotify-playlist-container">
      <h1>Your Personalized Spotify Playlist</h1>
      {token ? (
        playlist ? (
          <div>
            <h2>{playlist.name}</h2>
            <img src={playlist.images[0].url} alt={playlist.name} />
            <ul>
              {playlist.tracks.items.map((item, index) => (
                <li key={index}>
                  {item.track.name} by {item.track.artists.map((artist) => artist.name).join(', ')}
                </li>
              ))}
            </ul>
            <button onClick={handleLogout} className="back-button">Logout</button>
          </div>
        ) : (
          <p>Loading playlist...</p>
        )
      ) : (
        <button onClick={handleLogin} className="back-button">Login with Spotify</button>
      )}
      <Link to="/" className="back-button">Go Back to Home</Link>
    </div>
  );
};

export default SpotifyPlaylist;
