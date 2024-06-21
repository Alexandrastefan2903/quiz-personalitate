import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.png'; 
import './NavbarStyles.css'; 

class Navbar extends Component {
  state = { clicked: false };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  handleNavigation = (route) => {
    const { quizStarted, setShowExitQuizAlert, setPendingRoute } = this.props;

    if (quizStarted) {
      setPendingRoute(route);
      setShowExitQuizAlert(true);
    } else {
      window.location.href = route; // Navigate using window.location.href
    }
  };

  render() {
    const { isAuthenticated, onLogin, onLogout, isDarkMode, toggleDarkMode } = this.props;

    return (
      <nav className={`navbar ${isDarkMode ? 'dark-mode' : ''}`}>
        <Link to="/" onClick={() => this.handleNavigation("/")}>
          <img src={logo} alt="Logo" style={{ width: '50px', height: 'auto' }} />
        </Link>

        <div>
          <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
            <li><Link to="/" onClick={() => this.handleNavigation("/")}>Home</Link></li>
            <li><Link to="/learn-more" onClick={() => this.handleNavigation("/learn-more")}>Learn more</Link></li>
            <li>
              {isAuthenticated ? (
                <button onClick={onLogout}>Logout</button>
              ) : (
                <button onClick={onLogin}>Login</button>
              )}
            </li>
            <li>
              <button onClick={toggleDarkMode}>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
            </li>
          </ul>
        </div>
        
        <div id="mobile" onClick={this.handleClick}>
          <i id="bar" className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
      </nav>
    );
  }
}

export default Navbar;
