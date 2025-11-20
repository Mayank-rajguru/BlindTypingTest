import { useState } from 'react';
import { FREE_PROMPTS } from '../Utils/Script_Topics';

export const FreeTopicSetup = ({ onStart }) => {
  const [selectedPrompt, setSelectedPrompt] = useState(FREE_PROMPTS[0]);
  const [duration, setDuration] = useState(60);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-emerald-900 mb-8 text-center">
          Free Topic Blind Typing
        </h2>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Select a Prompt</h3>
          <div className="grid grid-cols-2 gap-4">
            {FREE_PROMPTS.map(prompt => (
              <button
                key={prompt}
                onClick={() => setSelectedPrompt(prompt)}
                className={`p-4 rounded-xl border-2 transition-all ${
                  selectedPrompt === prompt
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Select Duration</h3>
          <div className="flex gap-4">
            {[30, 45, 60].map(dur => (
              <button
                key={dur}
                onClick={() => setDuration(dur)}
                className={`flex-1 py-4 rounded-xl border-2 text-xl font-semibold transition-all ${
                  duration === dur
                    ? 'border-emerald-500 bg-emerald-500 text-white'
                    : 'border-gray-200 hover:border-emerald-300'
                }`}
              >
                {dur}s
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={() => onStart({ prompt: selectedPrompt, duration, mode: 'free' })}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-2xl font-bold py-6 rounded-xl shadow-lg transition-all"
        >
          Start Challenge
        </button>
      </div>
    </div>
  );
};

