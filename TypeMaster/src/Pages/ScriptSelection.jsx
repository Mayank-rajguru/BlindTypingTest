import { useState } from 'react';
import { SCRIPTS } from '../Utils/Script_Topics.jsx'

export const ScriptSelection = ({ onStart }) => {
  const [selectedScript, setSelectedScript] = useState(null);
  const [duration, setDuration] = useState(60);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-purple-900 mb-8 text-center">
          Script Copy Blind Typing
        </h2>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Select a Script</h3>
          <div className="space-y-4">
            {SCRIPTS.map(script => (
              <button
                key={script.id}
                onClick={() => setSelectedScript(script)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  selectedScript?.id === script.id
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                <h4 className="text-xl font-bold text-gray-800 mb-2">{script.title}</h4>
                <p className="text-gray-600">{script.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {script.content.split(/\s+/).length} words
                </p>
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Select Duration</h3>
          <div className="flex gap-4">
            {[30, 45, 60, 90].map(dur => (
              <button
                key={dur}
                onClick={() => setDuration(dur)}
                className={`flex-1 py-4 rounded-xl border-2 text-xl font-semibold transition-all ${
                  duration === dur
                    ? 'border-purple-500 bg-purple-500 text-white'
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {dur}s
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => selectedScript && onStart({ 
            script: selectedScript, 
            duration, 
            mode: 'script' 
          })}
          disabled={!selectedScript}
          className={`w-full text-2xl font-bold py-6 rounded-xl shadow-lg transition-all ${
            selectedScript
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
};
