import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Quiz.css';

export default function Quiz({ quiz, onComplete, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showFact, setShowFact] = useState(false);
  const [answered, setAnswered] = useState(false);

  const handleOptionSelect = (optionIndex) => {
    if (answered) return;
    setSelectedOption(optionIndex);
    setAnswered(true);
    
    if (optionIndex === quiz.questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    
    setShowFact(true);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setAnswered(false);
      setShowFact(false);
    } else {
      onComplete({
        score,
        total: quiz.questions.length,
        quizId: quiz.id,
        quizTitle: quiz.title
      });
    }
  };

  return (
    <div className="quiz-container">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Quizzes
      </button>
      
      <div className="quiz-progress">
        <div 
          className="progress-bar"
          style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
        ></div>
        <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
      </div>
      
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="question-card"
      >
        <h2>{quiz.questions[currentQuestion].question}</h2>
        
        <div className="options-grid">
          {quiz.questions[currentQuestion].options.map((option, index) => (
            <motion.div
              key={index}
              className={`option ${selectedOption === index ? (index === quiz.questions[currentQuestion].answer ? 'correct' : 'incorrect') : ''} ${answered && index === quiz.questions[currentQuestion].answer ? 'revealed' : ''}`}
              onClick={() => handleOptionSelect(index)}
              whileHover={!answered ? { scale: 1.03 } : {}}
            >
              {option}
            </motion.div>
          ))}
        </div>
        
        {showFact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fact-box"
          >
            <h4>Did you know?</h4>
            <p>{quiz.questions[currentQuestion].fact}</p>
          </motion.div>
        )}
        
        <button 
          className="next-button"
          onClick={handleNext}
          disabled={!answered}
        >
          {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      </motion.div>
    </div>
  );
}