import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import './ResultsStyles.css';

import hillaryClinton from './celebrities/hillaryClinton.jpg';
import margaretThatcher from './celebrities/MargareThatcher.jpeg';
import robertDeNiro from './celebrities/RoberDeNiro.jpeg';
import michaelJordan from './celebrities/Michael_Jordan.jpg';
import billClinton from './celebrities/Bill_Clinton.jpg';
import robinWilliams from './celebrities/Robin_williams.jpg';
import steveMartin from './celebrities/Steve_Martin.jpg';
import lizaMinnelli from './celebrities/Liza_Minnelli.jpg';
import motherTeresa from './celebrities/Mother_Teresa.jpg';
import gandhi from './celebrities/Gandhi.jpg';
import halleBerry from './celebrities/Halle_Berry.jpg';
import jimmyFallon from './celebrities/Jimmy_Fallon.jpg';
import einstein from './celebrities/Einstein.jpg';
import kevinCostner from './celebrities/Kevin_Costner.jpg';
import richardNixon from './celebrities/Richard_Nixon.jpg';
import clintEastwood from './celebrities/Clint_Eastwood.jpg';

const celebrities = {
  D: [
    { name: 'Hillary Clinton', image: hillaryClinton },
    { name: 'Margaret Thatcher', image: margaretThatcher },
    { name: 'Robert De Niro', image: robertDeNiro },
    { name: 'Michael Jordan', image: michaelJordan },
  ],
  I: [
    { name: 'Bill Clinton', image: billClinton },
    { name: 'Robin Williams', image: robinWilliams },
    { name: 'Steve Martin', image: steveMartin },
    { name: 'Liza Minnelli', image: lizaMinnelli },
  ],
  S: [
    { name: 'Mother Teresa', image: motherTeresa },
    { name: 'Gandhi', image: gandhi },
    { name: 'Halle Berry', image: halleBerry },
    { name: 'Jimmy Fallon', image: jimmyFallon },
  ],
  C: [
    { name: 'Albert Einstein', image: einstein },
    { name: 'Kevin Costner', image: kevinCostner },
    { name: 'Richard Nixon', image: richardNixon },
    { name: 'Clint Eastwood', image: clintEastwood },
  ],
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const score = location.state?.score || { D: 0, I: 0, S: 0, C: 0 }; 

  const highestScore = Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));
  const [currentCelebrityIndex, setCurrentCelebrityIndex] = useState(0);
  const celebrityList = celebrities[highestScore] || [];

  const handlePrevClick = () => {
    setCurrentCelebrityIndex((prevIndex) =>
      prevIndex === 0 ? celebrityList.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentCelebrityIndex((prevIndex) =>
      prevIndex === celebrityList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleViewPlaylist = () => {
    navigate('/spotify-playlist', { state: { score } });
  };

  return (
    <div className="results-container">
      <h1>Your DISC Personality Type</h1>
      <p>D: {score.D}</p>
      <p>I: {score.I}</p>
      <p>S: {score.S}</p>
      <p>C: {score.C}</p>
      <p>
        Based on your personality type, here are some celebrities you might share traits with:
      </p>
      <div className="carousel">
        <FaArrowLeft className="arrow left" onClick={handlePrevClick} />
        <div className="carousel-inner">
          {celebrityList.length > 0 && (
            <div className="carousel-item">
              <img src={celebrityList[currentCelebrityIndex].image} alt={celebrityList[currentCelebrityIndex].name} />
              <p>{celebrityList[currentCelebrityIndex].name}</p>
            </div>
          )}
        </div>
        <FaArrowRight className="arrow right" onClick={handleNextClick} />
      </div>
      <button onClick={handleViewPlaylist} className="back-button">View Personalized Spotify Playlist</button>
      <Link to="/" className="back-button">Go Back to Home</Link>
    </div>
  );
};

export default Results;
