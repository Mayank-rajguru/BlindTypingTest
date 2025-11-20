import { useState } from 'react'
import {calculateWPM, calculateAccuracy, compareWords, formatTime, exportToCSV} from './Utils/UtilFun.jsx'
import { HomePage } from './Pages/HomePage.jsx'
import { FreeTopicSetup } from './Pages/FreeTopicSetup.jsx'
import { ScriptSelection } from './Pages/ScriptSelection.jsx'
import { TypingChallenge } from './Pages/TypingChallenge.jsx'
import { Results } from './Pages/Results.jsx'
import { Leaderboard } from './Pages/Leaderboard.jsx'

function App() {
const [screen, setScreen] = useState('home');
  const [config, setConfig] = useState(null);
  const [results, setResults] = useState(null);
  
  const handleModeSelect = (mode) => {
    setScreen(mode === 'free' ? 'freeSetup' : 'scriptSetup');
  };
  
  const handleStart = (challengeConfig) => {
    setConfig(challengeConfig);
    setScreen('typing');
  };
  
  const handleComplete = (resultData) => {
    setResults(resultData);
    setScreen('results');
  };
  
  const handleRetry = () => {
    setResults(null);
    setScreen(config.mode === 'free' ? 'freeSetup' : 'scriptSetup');
  };
  
  const handleHome = () => {
    setScreen('home');
    setConfig(null);
    setResults(null);
  };
  
  return (
    <div>
      {screen === 'home' && <HomePage onSelectMode={handleModeSelect} />}
      {screen === 'freeSetup' && <FreeTopicSetup onStart={handleStart} />}
      {screen === 'scriptSetup' && <ScriptSelection onStart={handleStart} />}
      {screen === 'typing' && config && (
        <TypingChallenge config={config} onComplete={handleComplete} />
      )}
      {screen === 'results' && results && (
        <Results 
          data={results} 
          config={config}
          onRetry={handleRetry}
          onHome={handleHome}
          onLeaderboard={() => setScreen('leaderboard')}
        />
      )}
      {screen === 'leaderboard' && (
        <Leaderboard onBack={handleHome} />
      )}
    </div>
  );
}

export default App
