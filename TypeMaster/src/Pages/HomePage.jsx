import React from 'react';

export const HomePage = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <header className="w-full max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-indigo-900 leading-tight">
                TypeMaster
              </h1>
              <p className="mt-2 text-indigo-700 text-lg">
                Fast. Funny. Fair. Type without looking — show off speed, accuracy and creativity.
              </p>
            </div>

            <div className="hidden md:flex flex-col items-end">
              <span className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-full font-semibold shadow">
                Computer Science • Education Fair 2025
              </span>
              <small className="text-sm text-indigo-600 mt-2">Table: CS Dept — Bring your A-game 🎯</small>
            </div>
          </div>
        </header>

        <main className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-start">
          {/* Mode Card: Free Topic */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelectMode('free')}
            onKeyDown={(e) => e.key === 'Enter' && onSelectMode('free')}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-transform transform hover:-translate-y-2 border-4 border-indigo-200 hover:border-indigo-400 cursor-pointer focus:outline-none focus:ring-4 focus:ring-indigo-200"
            aria-label="Start Free Topic Blind Typing"
          >
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-3">
              Free Topic — Blind Typing
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Pick a prompt, close your screen, and type whatever comes to mind. We score speed **and** meaning.
            </p>

            <ul className="text-sm text-gray-500 space-y-2">
              <li>⏱️ 30–60s rounds (you choose)</li>
              <li>✍️ Creativity & coherence boost your score</li>
              <li>✅ Judges can add a creativity bonus</li>
            </ul>

            <div className="mt-6">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg">
                Play Free Topic
              </button>
            </div>
          </div>

          {/* Mode Card: Script Copy */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => onSelectMode('script')}
            onKeyDown={(e) => e.key === 'Enter' && onSelectMode('script')}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-transform transform hover:-translate-y-2 border-4 border-purple-200 hover:border-purple-400 cursor-pointer focus:outline-none focus:ring-4 focus:ring-purple-200"
            aria-label="Start Script Copy Blind Typing"
          >
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-900 mb-3">
              Script Copy — Blind Typing
            </h2>
            <p className="text-gray-600 text-lg mb-4">
              Receive a short script on paper and type it blind—accuracy is king here. Perfect for muscle-memory tests.
            </p>

            <ul className="text-sm text-gray-500 space-y-2">
              <li>⏱️ 60s default (configurable)</li>
              <li>🔍 Exact word matching & accuracy scoring</li>
              <li>🏆 Save to leaderboard for fair competition</li>
            </ul>

            <div className="mt-6">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg">
                Play Script Copy
              </button>
            </div>
          </div>
        </main>

        {/* Quick Rules + Volunteer hint */}
        <aside className="w-full max-w-4xl mt-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-800">How it works — quick</h3>
              <ol className="mt-3 text-gray-600 list-decimal list-inside space-y-2">
                <li>Choose a mode and set the timer.</li>
                <li>Player types with the screen covered (blind mode).</li>
                <li>The app calculates WPM, accuracy, and quality automatically.</li>
                <li>Save scores to the leaderboard or export for judges.</li>
              </ol>
            </div>

            
          </div>
        </aside>
      </div>

      <footer className="bg-indigo-900 text-white py-6 text-center">
        <p className="text-lg font-semibold">Computer Science Dept • Education Fair 2025</p>
        <p className="text-sm text-indigo-200 mt-1">Visit our table for instant prizes 🎁 — bring a friend!</p>
      </footer>
    </div>
  );
};
