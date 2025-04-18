import { useState } from 'react';
import QuizSelector from './components/QuizSelector';
import Quiz from './components/Quiz';
import Results from './components/Results';
import SpaceBackground from './components/SpaceBackground';
import './styles/main.css';

function App() {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizResults, setQuizResults] = useState(null);

  return (
    <div className="app">
      <SpaceBackground />
      <div className="content">
        {!selectedQuiz && !quizResults && (
          <QuizSelector onSelectQuiz={setSelectedQuiz} />
        )}
        {selectedQuiz && !quizResults && (
          <Quiz 
            quiz={selectedQuiz} 
            onComplete={(results) => {
              setQuizResults(results);
              setSelectedQuiz(null);
            }}
            onBack={() => setSelectedQuiz(null)}
          />
        )}
        {quizResults && (
          <Results 
            results={quizResults}
            onRestart={() => setQuizResults(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;