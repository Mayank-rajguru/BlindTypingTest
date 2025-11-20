import {exportToCSV} from '../Utils/UtilFun.jsx'
import {Trophy, Home, Download} from 'lucide-react';

export const Leaderboard = ({ onBack }) => {
  const results = JSON.parse(localStorage.getItem('typingResults') || '[]');
  const sortedResults = results.sort((a, b) => b.wpm - a.wpm);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-amber-900 mb-8 text-center flex items-center justify-center gap-4">
          <Trophy className="w-12 h-12" />
          Leaderboard
        </h2>
        
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          {sortedResults.length === 0 ? (
            <p className="text-center text-gray-600 py-8">No results yet. Complete a challenge to see your scores!</p>
          ) : (
            <div className="space-y-3">
              {sortedResults.map((result, index) => (
                <div
                  key={result.timestamp}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    index === 0 ? 'bg-yellow-100 border-2 border-yellow-400' :
                    index === 1 ? 'bg-gray-100 border-2 border-gray-400' :
                    index === 2 ? 'bg-orange-100 border-2 border-orange-400' :
                    'bg-gray-50'
                  }`}
                >
                  <div className="text-2xl font-bold w-12 text-center">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{result.prompt}</p>
                    <p className="text-sm text-gray-600">
                      {result.mode} • {new Date(result.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-indigo-600">{result.wpm} WPM</p>
                    <p className="text-sm text-gray-600">
                      {result.accuracy === 'N/A' ? 'Free Topic' : `${result.accuracy}% accuracy`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <Home className="w-6 h-6" />
            Back to Home
          </button>
          <button
            onClick={exportToCSV}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <Download className="w-6 h-6" />
            Export to CSV
          </button>
        </div>
      </div>
    </div>
  );
};
