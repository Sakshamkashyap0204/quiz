import { motion } from 'framer-motion';
import './Results.css';

export default function Results({ results, onRestart }) {
  const percentage = Math.round((results.score / results.total) * 100);
  
  const getFeedback = () => {
    if (percentage >= 90) return "Cosmic Genius! You're ready for NASA!";
    if (percentage >= 70) return "Stellar Performance! Keep reaching for the stars!";
    if (percentage >= 50) return "Good effort! The universe has more to teach you.";
    return "Keep exploring! The cosmos is full of wonders to discover.";
  };

  return (
    <motion.div 
      className="results-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1>Quiz Complete!</h1>
      <h2>{results.quizTitle}</h2>
      
      <div className="score-display">
        <div className="score-circle">
          <motion.div
            className="circle-bg"
            initial={{ strokeDashoffset: 440 }}
            animate={{ strokeDashoffset: 440 - (440 * percentage) / 100 }}
            transition={{ duration: 1.5 }}
          />
          <div className="score-text">
            <span>{percentage}%</span>
            <small>{results.score} / {results.total}</small>
          </div>
        </div>
      </div>
      
      <div className="feedback">
        <h3>{getFeedback()}</h3>
      </div>
      
      <div className="action-buttons">
        <button className="restart-button" onClick={onRestart}>
          Explore Another Quiz
        </button>
        <button className="share-button">
          Share Your Results
        </button>
      </div>
      
      <div className="constellation"></div>
    </motion.div>
  );
}