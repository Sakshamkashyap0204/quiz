import { motion } from 'framer-motion';
import { quizzes } from '../data/quizzes';
import './QuizSelector.css';

export default function QuizSelector({ onSelectQuiz }) {
  return (
    <div className="quiz-selector">
      <h1 className="title">Astroverse Explorer</h1>
      <p className="subtitle">Test your space knowledge across different domains</p>
      
      <div className="quiz-grid">
        {Object.entries(quizzes).map(([key, quiz], index) => (
          <motion.div
            key={key}
            className="quiz-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => onSelectQuiz({ ...quiz, id: key })}
          >
            <div className="planet-icon">{key.charAt(0).toUpperCase()}</div>
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <div className="start-button">Begin Journey</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}