import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 

import { motion } from 'framer-motion';
import { Element, scroller } from 'react-scroll';
import './HomeStyles.css';

const questions = [
  'Do you enjoy exploring new ideas and concepts?',
  'Are you attracted to originality and creativity?',
  'Do you like trying new experiences, even if they are unconventional?',
  'Do you prefer novelty and variety in your life?',
  'Do you have a vivid and active imagination?',
  'Do you value personal expression and self-expression?',
  'Are you interested in unconventional art, music, or literature?',
  'Do you enjoy questioning established norms?',
  'Are you curious and open to new ideas?',
  'Do you consider yourself unconventional?',
  'Do you find cultures and viewpoints different from your own fascinating?',
  'Do you prefer variety and spontaneity over routine and structure?',
  'Do you like planning and organizing your activities?',
  'Are you detail-oriented and careful in your work?',
  'Do you strive for perfection in your tasks?',
  'Does it bother you when things are not orderly or clean?',
  'Are you disciplined and self-controlled?',
  'Do you have a strong sense of duty and responsibility?',
  'Do you prefer to have a clear plan before acting?',
  'Are you punctual and like to meet deadlines?',
  'Do you like to follow established rules and procedures?',
  'Do you consider yourself organized and tidy by nature?',
  'Are you meticulous when making important decisions?',
  'Do you strive to maintain high standards in your work and personal life?',
  'Do you feel comfortable interacting with many people?',
  'Do you consider yourself a sociable and outgoing person?',
  'Do you like being in the center of attention in social groups?',
  'Do you enjoy parties and social events?',
  'Do you feel energized when surrounded by people?',
  'Do you like meeting new people and making new friends?'
];

const answerOptions = [
  { answerText: 'Strongly disagree', type: 'D' },
  { answerText: 'Disagree', type: 'I' },
  { answerText: 'Neutral', type: 'S' },
  { answerText: 'Agree', type: 'C' },
  { answerText: 'Strongly agree', type: 'D' },
];

const Home = ({ isAuthenticated, onLogin, quizStarted, setQuizStarted, flipLearnMore, setFlipLearnMore, flipPlaylist, setFlipPlaylist }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState({ D: 0, I: 0, S: 0, C: 0 });
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated && !quizStarted) {
      setQuizStarted(true);
    }
    if (!isAuthenticated) {
      setCurrentQuestion(0);
      setShowScore(false);
      setLoading(false);
      setScore({ D: 0, I: 0, S: 0, C: 0 });
    }
  }, [isAuthenticated, quizStarted, setQuizStarted]);

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      setError('You must be logged in to start the quiz.');
      onLogin();
    } else {
      setQuizStarted(true);
      setCurrentQuestion(1);
      setError('');
    }
  };

  const handleAnswerOptionClick = (type) => {
    setScore((prevScore) => ({
      ...prevScore,
      [type]: prevScore[type] + 1,
    }));

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      scroller.scrollTo(`question-${nextQuestion}`, {
        duration: 800,
        delay: 0,
        smooth: 'easeInOutQuart'
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        setShowScore(true);
        setLoading(false);
      }, 2000); // Simulate a delay for loading
    }
  };

  const getPersonalityDescription = () => {
    const highestScore = Object.keys(score).reduce((a, b) => (score[a] > score[b] ? a : b));
    switch (highestScore) {
      case 'D':
        return 'You are dominant and driven by challenge.';
      case 'I':
        return 'You are influential and thrive in social settings.';
      case 'S':
        return 'You are steady and value stability and support.';
      case 'C':
        return 'You are conscientious and strive for accuracy and detail.';
      default:
        return 'Your personality type is balanced.';
    }
  };

  const progress = (currentQuestion / questions.length) * 100;

  return (
    <div className={`container ${isAuthenticated ? '' : 'unauthenticated'}`}>
      <header className="header">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Personality Test
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          You are unique, just like your personality. Immerse yourself in a fascinating introspective experience by participating in our Exclusive Personality Test.
        </motion.p>
        {!showScore && currentQuestion === 0 && (
          <>
            {quizStarted ? (
              <motion.button
                className="start-button"
                onClick={() => setCurrentQuestion(1)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Start Test
              </motion.button>
            ) : (
              <motion.button
                className="start-button"
                onClick={handleStartQuiz}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                Take your personalized test
              </motion.button>
            )}
            {error && <p className="error">{error}</p>}
          </>
        )}
      </header>

      {!quizStarted && (
        <motion.div className="cards-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
          <motion.div className={`card ${flipLearnMore ? 'flipped' : ''}`} onClick={() => setFlipLearnMore(!flipLearnMore)}>
            <motion.div className="card-inner" initial={{ rotateY: 0 }} animate={{ rotateY: flipLearnMore ? 180 : 0 }} transition={{ duration: 0.6 }}>
              <div className="card-front">
                <h3>Learn More About Yourself</h3>
              </div>
              <div className="card-back">
                <h3>Personality Types</h3>
                <ul>
                  <li>Dominant</li>
                  <li>Influential</li>
                  <li>Steady</li>
                  <li>Conscientious</li>
                </ul>
                <Link to="/learn-more" className="learn-more-button">Learn More About Yourself</Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className={`card ${flipPlaylist ? 'flipped' : ''}`} onClick={() => setFlipPlaylist(!flipPlaylist)}>
            <motion.div className="card-inner" initial={{ rotateY: 0 }} animate={{ rotateY: flipPlaylist ? 180 : 0 }} transition={{ duration: 0.6 }}>
              <div className="card-front">
                <h3>Personalized Playlist</h3>
              </div>
              <div className="card-back">
                <p>Receive a personalized playlist based on your quiz results.</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Assessment in progress</p>
        </div>
      ) : showScore ? (
        <div className="result-container">
          <h2>Your DISC Personality Type</h2>
          <p>D: {score.D}</p>
          <p>I: {score.I}</p>
          <p>S: {score.S}</p>
          <p>C: {score.C}</p>
          <p>{getPersonalityDescription()}</p>
        </div>
      ) : (
        currentQuestion > 0 && (
          <div className="quiz-container">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <Element name={`question-${currentQuestion}`}>
              <div className="question-container current">
                <h2>{questions[currentQuestion - 1]}</h2>
                <div className="answers">
                  {answerOptions.map((answerOption, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => handleAnswerOptionClick(answerOption.type)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {answerOption.answerText}
                    </motion.button>
                  ))}
                </div>
              </div>
            </Element>
            {currentQuestion < questions.length - 1 && (
              <Element name={`question-${currentQuestion + 1}`}>
                <div className="question-container">
                  <h2>{questions[currentQuestion]}</h2>
                  <div className="answers">
                    {answerOptions.map((answerOption, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleAnswerOptionClick(answerOption.type)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {answerOption.answerText}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </Element>
            )}
            {currentQuestion < questions.length - 2 && (
              <Element name={`question-${currentQuestion + 2}`}>
                <div className="question-container">
                  <h2>{questions[currentQuestion + 1]}</h2>
                  <div className="answers">
                    {answerOptions.map((answerOption, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleAnswerOptionClick(answerOption.type)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {answerOption.answerText}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </Element>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default Home;
