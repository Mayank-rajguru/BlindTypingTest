import {formatTime} from '../Utils/UtilFun.jsx'
import {useState, useEffect, useRef} from 'react'
import { Clock, Eye, Play } from 'lucide-react';

export const TypingChallenge = ({ config, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(config.duration);
  const [isStarted, setIsStarted] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isBlind, setIsBlind] = useState(true);
  const timerRef = useRef(null);
  const textareaRef = useRef(null);
  
  useEffect(() => {
    if (isStarted && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleStop();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isStarted, timeLeft]);
  
  useEffect(() => {
    if (isStarted && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isStarted]);
  
  const handleStart = () => {
    setIsStarted(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };
  
  const handleStop = () => {
    clearInterval(timerRef.current);
    setIsBlind(false);
    const timeTaken = config.duration - timeLeft;
    onComplete({
      typedText,
      timeTaken: timeTaken || config.duration,
      totalTime: config.duration
    });
  };
  
  const handleKeyDown = (e) => {
    if (isStarted) {
      e.stopPropagation();
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Timer Display */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 text-center">
          <div className="flex items-center justify-center gap-4">
            <Clock className="w-8 h-8 text-indigo-600" />
            <span className="text-5xl font-bold text-indigo-900">
              {formatTime(timeLeft)}
            </span>
          </div>
          {!isStarted && (
            <p className="text-gray-600 mt-2">Press Start to begin</p>
          )}
        </div>
        
        {/* Prompt/Script Display */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {config.mode === 'free' ? 'Your Prompt:' : 'Script to Type:'}
          </h3>
          <p className="text-lg text-gray-700 bg-gray-50 p-4 rounded-lg">
            {config.mode === 'free' ? config.prompt : config.script.content}
          </p>
        </div>
        
        {/* Typing Area */}
        <div className="relative bg-white rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-3">Type Here:</h3>
          <div className="relative" onClick={() => isStarted && textareaRef.current?.focus()}>
            <textarea
              ref={textareaRef}
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={!isStarted}
              className="w-full h-64 p-4 border-2 border-gray-300 rounded-lg text-lg resize-none focus:outline-none focus:border-indigo-500"
              placeholder={isStarted ? "Start typing..." : "Click Start to begin"}
              autoFocus={isStarted}
            />
            {isBlind && isStarted && (
              <div className="absolute inset-0 bg-slate-900 bg-opacity-95 rounded-lg flex items-center justify-center pointer-events-none">
                <div className="text-white text-center">
                  <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-2xl font-bold">Blind Mode Active</p>
                  <p className="text-gray-300 mt-2">Keep typing - you're doing great!</p>
                  <p className="text-sm text-gray-400 mt-4">
                    {typedText.length} characters typed
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Control Buttons */}
        <div className="flex gap-4">
          {!isStarted ? (
            <button
              onClick={handleStart}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-2xl font-bold py-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
            >
              <Play className="w-8 h-8" />
              Start Typing
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-2xl font-bold py-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
            >
              <Eye className="w-8 h-8" />
              Stop & Reveal
            </button>
          )}
        </div>
      </div>
    </div>
  );
};