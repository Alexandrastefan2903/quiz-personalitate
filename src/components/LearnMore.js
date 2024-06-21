import React from 'react';
import { motion } from 'framer-motion';
import './LearnMoreStyles.css';

const LearnMore = () => {
  return (
    <div className="learn-more-container">
      <header className="learn-more-header">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Learn More About DISC Personality Types
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          Discover detailed information about each DISC personality type and the benefits of understanding your own personality.
        </motion.p>
      </header>
      <motion.div className="learn-more-content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>
        <section>
          <h2>DISC Personality Types</h2>
          <div className="disc-types">
            <div className="disc-type-card">
              <h3>Dominant</h3>
              <p>Individuals with a Dominant personality are driven, ambitious, and goal-oriented. They are confident and like to take charge.</p>
            </div>
            <div className="disc-type-card">
              <h3>Influential</h3>
              <p>Influential personalities are outgoing, enthusiastic, and enjoy social interactions. They are great at motivating others and building relationships.</p>
            </div>
            <div className="disc-type-card">
              <h3>Steady</h3>
              <p>Steady individuals are patient, reliable, and great team players. They value stability and support and are often seen as dependable.</p>
            </div>
            <div className="disc-type-card">
              <h3>Conscientious</h3>
              <p>Conscientious people are detail-oriented, analytical, and strive for accuracy. They are methodical and value quality and precision.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>The Importance of the DISC Test</h2>
          <p>Understanding your DISC personality type can have numerous benefits in both personal and professional areas. It helps in self-awareness, improves communication, and enhances team dynamics. Knowing your personality type can guide you in career development and interpersonal relationships.</p>
        </section>

        <section>
          <h2>Educational Resources</h2>
          <ul>
            <li><a href="https://example.com/article1" target="_blank" rel="noopener noreferrer">Article on DISC Personalities</a></li>
            <li><a href="https://example.com/book1" target="_blank" rel="noopener noreferrer">Book: Understanding DISC</a></li>
            <li><a href="https://example.com/case-study1" target="_blank" rel="noopener noreferrer">Case Study: DISC in the Workplace</a></li>
            <li><a href="https://example.com/video1" target="_blank" rel="noopener noreferrer">Video: Introduction to DISC</a></li>
            <li><a href="https://example.com/tutorial1" target="_blank" rel="noopener noreferrer">Tutorial: Applying DISC in Real Life</a></li>
          </ul>
        </section>

        <section>
          <h2>Practical Applications</h2>
          <p>The DISC test is widely used in various industries to improve team performance and communication. Below are some examples:</p>
          <ul>
            <li>Using DISC for team building and improving collaboration.</li>
            <li>Applying DISC in customer service to enhance client interactions.</li>
            <li>Implementing DISC in leadership development programs.</li>
            <li>Utilizing DISC for conflict resolution and improving workplace harmony.</li>
          </ul>
          <p>For more detailed case studies and testimonials, check out our <a href="https://example.com/practical-applications" target="_blank" rel="noopener noreferrer">Practical Applications</a> page.</p>
        </section>
      </motion.div>
    </div>
  );
};

export default LearnMore;
