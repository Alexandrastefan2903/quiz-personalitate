import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import LearnMore from './components/LearnMore';
import './App.css';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [flipLearnMore, setFlipLearnMore] = useState(false);
  const [flipPlaylist, setFlipPlaylist] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setIsAuthenticated(true);
    },
    onFailure: () => {
      console.log('Login failed');
    },
  });

  const handleLogin = () => {
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
          onLogin={handleLogin}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  isAuthenticated={isAuthenticated}
                  onLogin={handleLogin}
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
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
