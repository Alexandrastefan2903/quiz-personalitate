import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LearnMore from './components/LearnMore';
import Results from './components/Results';
import SpotifyPlaylist from './components/SpotifyPlaylist'; // Import SpotifyPlaylist component
import './App.css';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [flipLearnMore, setFlipLearnMore] = useState(false);
  const [flipPlaylist, setFlipPlaylist] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [redirectToQuiz, setRedirectToQuiz] = useState(false);
  const [showExitQuizAlert, setShowExitQuizAlert] = useState(false);
  const [pendingRoute, setPendingRoute] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setIsAuthenticated(true);
      if (redirectToQuiz) {
        setQuizStarted(true);
        setRedirectToQuiz(false);
      }
    },
    onFailure: () => {
      console.log('Login failed');
    },
  });

  const handleLogin = (redirect = false) => {
    setRedirectToQuiz(redirect);
    login();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setQuizStarted(false);
    setFlipLearnMore(false);
    setFlipPlaylist(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <Router>
        <Navbar
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          onLogin={() => handleLogin(false)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          setShowExitQuizAlert={setShowExitQuizAlert}
          setPendingRoute={setPendingRoute}
          quizStarted={quizStarted}
        />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isAuthenticated={isAuthenticated}
                  onLogin={() => handleLogin(true)}
                  quizStarted={quizStarted}
                  setQuizStarted={setQuizStarted}
                  flipLearnMore={flipLearnMore}
                  setFlipLearnMore={setFlipLearnMore}
                  flipPlaylist={flipPlaylist}
                  setFlipPlaylist={setFlipPlaylist}
                />
              }
            />
            <Route path="/learn-more" element={<LearnMore />} />
            <Route path="/results" element={<Results />} />
            <Route path="/spotify-playlist" element={<SpotifyPlaylist />} /> {/* Add SpotifyPlaylist route */}
          </Routes>
        </div>
        {showExitQuizAlert && (
          <div className="modal">
            <div className="modal-content">
              <p>Do you want to exit the quiz?</p>
              <button
                onClick={() => {
                  setShowExitQuizAlert(false);
                  setQuizStarted(false);
                  if (pendingRoute) {
                    window.location.href = pendingRoute; // Navigate using window.location.href
                    setPendingRoute(null);
                  }
                }}
              >
                Exit Quiz
              </button>
              <button onClick={() => setShowExitQuizAlert(false)}>Cancel</button>
            </div>
          </div>
        )}
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
