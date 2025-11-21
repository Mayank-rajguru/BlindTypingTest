import { useState } from 'react';
import { Clock, Home, Trophy, RefreshCw } from 'lucide-react';
import { calculateWPM, calculateAccuracy, compareWords} from '../Utils/UtilFun.jsx';
import { evaluateFreeTextQuality } from '../Utils/qualityEvaluator.jsx';

export const Results = ({ data, config, onRetry, onHome, onLeaderboard }) => {
  const [saved, setSaved] = useState(false);

  // core metrics
  const chars = data.typedText ? data.typedText.length : 0;
  const wpm = calculateWPM(chars, data.timeTaken);

  // script-mode metrics


  const wordMatch = config.mode === 'script'
    ? compareWords(data.typedText, config.script.content)
    : null;

  // free-mode quality & composite scoring
  let qualityResult = null;
  let qualityPercent = 0;
  let composite = 0;
  let grade = null;

  if (config.mode === 'free') {
    // evaluateFreeTextQuality should return { quality: 0..1, details: {...} }
    qualityResult = evaluateFreeTextQuality(data.typedText || '');
    const quality = qualityResult?.quality ?? 0;
    qualityPercent = Math.round(quality * 100);
    composite = Math.round(wpm * quality); // composite 0..(wpm)
    // convert composite to 0..100-ish scale (depends on your expected WPM range)
    // grading thresholds (tweakable)
    if (composite >= 60) grade = 'Excellent';
    else if (composite >= 40) grade = 'Good';
    else if (composite >= 20) grade = 'Fair';
    else grade = 'Low';
  }

  const saveResult = () => {
    const result = {
      timestamp: Date.now(),
      mode: config.mode === 'free' ? 'Free Topic' : 'Script Copy',
      wpm,
      characters: chars,
      timeTaken: data.timeTaken,
      prompt: config.mode === 'free' ? config.prompt : config.script.title,
      // extra fields for free-mode evaluation
      qualityPercent: config.mode === 'free' ? qualityPercent : undefined,
      composite: config.mode === 'free' ? composite : undefined,
      qualityDetails: config.mode === 'free' ? qualityResult?.details : undefined
    };

    try {
      const results = JSON.parse(localStorage.getItem('typingResults') || '[]');
      results.push(result);
      localStorage.setItem('typingResults', JSON.stringify(results));
      setSaved(true);
    } catch (err) {
      console.error('Failed to save result', err);
      alert('Failed to save result. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-bold text-orange-900 mb-2">Results</h2>
          <p className="text-xl text-orange-700">Here's how you performed!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <p className="text-gray-600 mb-2">Words Per Minute</p>
            <p className="text-5xl font-bold text-indigo-600">{wpm}</p>
          </div>


          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <p className="text-gray-600 mb-2">Characters Typed</p>
            <p className="text-5xl font-bold text-purple-600">{chars}</p>
          </div>
        </div>

        {/* Free Mode Quality Block */}
        {config.mode === 'free' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Free Mode Quality</h3>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-indigo-50 text-center">
                <p className="text-sm text-gray-600">WPM</p>
                <p className="text-3xl font-bold text-indigo-700">{wpm}</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 text-center">
                <p className="text-sm text-gray-600">Quality</p>
                <p className="text-3xl font-bold text-green-700">{qualityPercent}%</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 text-center">
                <p className="text-sm text-gray-600">Composite</p>
                <p className="text-3xl font-bold text-yellow-700">{composite}</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-semibold">Grade: <span className="font-bold">{grade}</span></p>
              <p className="text-sm text-gray-600 mt-2">
                {grade === 'Excellent' && 'Great — fast and meaningful.'}
                {grade === 'Good' && 'Good speed — your writing is mostly sensible.'}
                {grade === 'Fair' && 'Decent speed. Try to write clearer sentences.'}
                {grade === 'Low' && 'Low score. Your typing might be gibberish — focus on meaningful words.'}
              </p>
            </div>

            <div className="mt-4 bg-gray-50 p-3 rounded">
              <p className="text-sm text-gray-600">Quality Details (for judges):</p>
              <pre className="text-xs text-gray-700 mt-2">{JSON.stringify(qualityResult?.details || {}, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Word Matching (Script Mode) */}
        {wordMatch && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Word Matching</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 bg-green-100 rounded-lg p-4">
                <p className="text-sm text-gray-600">Correct Words</p>
                <p className="text-3xl font-bold text-green-700">
                  {wordMatch.matched} / {wordMatch.totalWords}
                </p>
              </div>
              <div className="flex-1 bg-blue-100 rounded-lg p-4">
                <p className="text-sm text-gray-600">Match Percentage</p>
                <p className="text-3xl font-bold text-blue-700">{wordMatch.percentage}%</p>
              </div>
            </div>

            {wordMatch.mismatches.length > 0 && (
              <div className="mt-4">
                <p className="font-semibold text-gray-700 mb-2">Mismatched Words:</p>
                <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                  {wordMatch.mismatches.map((mm, i) => (
                    <div key={i} className="flex gap-4 py-2 border-b border-gray-200 last:border-0">
                      <span className="text-red-600">❌ {mm.typed}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-green-600">✓ {mm.expected}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Your Text */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Text</h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <p className="text-gray-700 whitespace-pre-wrap">{data.typedText}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <RefreshCw className="w-6 h-6" />
            Try Again
          </button>
          <button
            onClick={onHome}
            className="bg-gray-600 hover:bg-gray-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <Home className="w-6 h-6" />
            Home
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <button
            onClick={saveResult}
            disabled={saved}
            className={`text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 ${
              saved ? 'bg-green-500 text-white cursor-default' : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <Trophy className="w-6 h-6" />
            {saved ? 'Saved to Leaderboard!' : 'Save to Leaderboard'}
          </button>
          <button
            onClick={onLeaderboard}
            className="bg-orange-600 hover:bg-orange-700 text-white text-xl font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3"
          >
            <Trophy className="w-6 h-6" />
            View Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};
