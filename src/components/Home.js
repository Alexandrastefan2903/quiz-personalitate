import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { motion } from 'framer-motion';
import { Element, scroller } from 'react-scroll';
import './HomeStyles.css';

const questions = [
  'You find it easy to make new friends.',
  'You could spend days learning about random things that interest you.',
  'When others are upset, you feel upset too.',
  'You aren’t one for backup plans.',
  'You stay cool, calm, and collected even when under lots of stress.',
  'When out and about, you don’t really introduce yourself to new people - you prefer to chat with people you already know.',
  'You don’t like to start a new project until the first one’s finished.',
  'You’re a sentimental type of person.',
  'You enjoy using lists or schedules.',
  'Making a small mistake can make you question your knowledge on a subject.',
  'You easily spark up a conversation with a stranger.',
  'You love talking about and analyzing creative works.',
  'You follow your heart more than your head.',
  'You tend to prefer following a daily routine as opposed to just doing whatever you want.',
  'When you meet new people, you worry about whether you made a great first impression.',
  'You prefer solo activities over group activities.',
  'You love watching movies that let you interpret the ending yourself.',
  'You get more happiness from achieving things yourself than you do from helping others.',
  'You aren’t interested in very many things.',
  'You often worry about the worst possible scenario in any given situation.',
  'You love taking up leadership roles.',
  'You’re an artistic type of person.',
  'The world would be better off if people made more decisions with their feelings.',
  'You prefer to relax before getting into chores.',
  'You don’t mind when other people are having a heated argument in front of you.',
  'You like being the center of attention.',
  'Your mood is generally pretty stable.',
  'You have plenty of patience for people that aren’t as efficient as you.',
  'You’re spontaneous.',
  'You have always been fascinated by the question of what, if anything, happens after death.',
  'You prefer to be on your own rather than with others.',
  'You love theoretical discussions and could engage in them for days on end.',
  'You have a hard time empathizing with people who come from a very different lifestyle to your own.',
  'When there’s a decision to be made, you want to make it right away.',
  'You tend to second-guess the decisions you make.',
  'Socializing quickly exhausts you.',
  'You enjoy going to art museums.',
  'You struggle to understand what others are feeling.',
  'You like to have a to-do list for each day.',
  'You often feel insecure.',
  'You prefer talking to people on the phone over texting or messaging them.',
  'When someone has a different perspective on a subject than you, you genuinely try to understand where they’re coming from.',
  'You find that telling the cold, hard truth is more important than being tactful.',
  'You’re happy to go with the flow when your plans are interrupted.',
  'Mistakes you made in the past often haunt your mind.',
  'You feel energized after spending time alone, engaging in solitary activities like reading or reflecting.',
  'You prefer to rely on your instincts rather than sticking strictly to a set plan or schedule.',
  'You often find yourself deeply contemplating the underlying meanings and implications of things rather than focusing solely on the surface details.',
  'When making decisions, you prioritize logic and objective analysis over considering how it might impact others\' feelings.',
  'You often find yourself worrying about potential future outcomes or what could go wrong in a given situation, even if things seem to be going well at the moment.',
  'You often find yourself drawn to new experiences and enjoy exploring unfamiliar places or trying out new activities.',
  'You tend to trust your gut feelings and intuition when faced with difficult decisions rather than relying solely on logical analysis.',
  'You feel a strong sense of empathy towards others and are often affected by their emotions, even if they don\'t directly involve you.',
  'You prefer to have a well-structured plan in place rather than leaving things up to chance or improvisation.',
  'You thrive in dynamic, fast-paced environments and feel invigorated by challenging situations that require quick thinking and adaptability.',
  'When faced with a problem, you\'re more inclined to seek out practical solutions rather than dwelling on abstract theories or hypothetical scenarios.',
  'You enjoy engaging in deep, meaningful conversations with others, exploring complex ideas and exchanging perspectives.',
  'You often find yourself reflecting on past experiences and considering how they\'ve shaped your beliefs and values.',
  'You\'re inclined to take charge in group settings, assuming leadership roles and guiding others towards achieving common goals.',
  'You feel most comfortable when your environment is organized and structured, and you may feel stressed or unsettled in chaotic or unpredictable situations.',
  'You prefer spending time with a small group of close friends rather than attending large social gatherings.',
  'When presented with multiple options, you tend to follow your heart and make decisions based on what feels right in the moment.',
  'You enjoy exploring new ideas and concepts, often seeking out opportunities to expand your knowledge and understanding of the world.',
  'You find it easy to adapt to changes in plans or unexpected situations, often seeing them as opportunities for growth and learning.',
  'When working on a project, you value efficiency and strive to complete tasks quickly and effectively.',
  'You often seek out opportunities to challenge yourself and push your limits, whether it\'s through physical activities or intellectual pursuits.',
  'You prefer to focus on the present moment rather than dwelling on past regrets or worrying about future uncertainties.',
  'You enjoy engaging in lively debates and discussions, sharing your opinions and perspectives with others while also listening to differing viewpoints.',
  'You have a strong desire for structure and order in your daily life, feeling most at ease when following a clear routine or schedule.',
  'You tend to be proactive in seeking out new experiences and opportunities, embracing change as a natural part of life.',
  'You feel energized and excited by social interactions, often seeking out opportunities to meet new people and engage in group activities.',
  'When making decisions, you prioritize logical reasoning and objective analysis, considering the facts and evidence before reaching a conclusion.',
  'You tend to be highly self-critical and introspective, frequently reflecting on your actions and decisions, and striving for self-improvement.',
  'You often find yourself empathizing with others\' emotions, even if you haven\'t experienced the same situation yourself, and strive to offer support and understanding.',
  'You prefer to have a clear plan and direction in life, setting specific goals and working diligently to achieve them.',
  'You enjoy taking on challenges and pushing yourself to excel, thriving in high-pressure situations where you can demonstrate your abilities.',
  'You feel comfortable spending time alone, enjoying solitary activities like reading, writing, or simply reflecting on your thoughts and feelings.',
  'When faced with uncertainty or ambiguity, you trust your instincts and intuition to guide you towards the best course of action.',
  'You often find yourself worrying about potential outcomes and future uncertainties, sometimes feeling anxious even in relatively stable situations.',
  'You prefer to keep your options open and explore different possibilities before committing to a final decision or course of action.',
  'You find it easy to strike up conversations with strangers and enjoy meeting new people in social settings.',
  'When faced with a problem, you\'re more likely to rely on your logical reasoning and objective analysis rather than your gut instincts or intuition.',
  'You prefer to focus on concrete details and tangible facts rather than abstract theories or hypothetical scenarios.',
  'You often prioritize maintaining harmony and avoiding conflict in your relationships, sometimes sacrificing your own needs to keep the peace.',
  'You prefer to have a clear plan and structure in your daily life, feeling most comfortable when things are organized and predictable.',
  'You enjoy taking charge and leading others towards achieving common goals, often assuming leadership roles in group settings.',
  'You feel recharged and refreshed after spending time alone, finding solace and rejuvenation in solitary activities.',
  'You\'re naturally curious and enjoy exploring new ideas and concepts, often delving deep into subjects that pique your interest.',
  'You tend to trust your instincts and rely on your intuition when making decisions, often finding that your gut feelings lead you in the right direction.',
  'You have a keen eye for observing your surroundings and notice even subtle changes in your environment.'
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
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const navigate = useNavigate(); // Use useNavigate

  useEffect(() => {
    if (isAuthenticated && !quizStarted) {
      setQuizStarted(true);
    }
    if (!isAuthenticated || !quizStarted) {
      setCurrentQuestion(0);
      setShowScore(false);
      setLoading(false);
      setScore({ D: 0, I: 0, S: 0, C: 0 });
    }
  }, [isAuthenticated, quizStarted, setQuizStarted]);

  const handleStartQuiz = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
      setError('You must be logged in to start the quiz.');
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
        navigate('/results', { state: { score } }); 
      }, 2000); 
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

      {showLoginAlert && (
        <div className="modal">
          <div className="modal-content">
            <p>You must be logged in to take the quiz.</p>
            <button onClick={() => { setShowLoginAlert(false); onLogin(); }}>Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
