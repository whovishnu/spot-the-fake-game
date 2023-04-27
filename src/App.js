import { useState } from 'react';
import './App.css';
import Question from './components/Question';
import HomePage from './components/Home';
import Signup from './components/Signup';

function App() {
  const [isStart, setStart] = useState(false)
  const [showSignup, setShowSignup] = useState(false)
  const [playerScore, setPlayerScore] = useState(0)

  const handleContinuous = (score) => {
    setPlayerScore(score)
    setShowSignup(true)
  }

  const handleRetry = () => {
    setShowSignup(false)
  }

  return (
    <div className="App">
      {isStart ? 
        showSignup ? 
          <Signup playerScore={playerScore} handleRetry={handleRetry}/> 
          : <Question handleContinuous={handleContinuous}/> 
        : <HomePage handleStart={() => setStart(true)}/>}
    </div>
  );
}

export default App;
