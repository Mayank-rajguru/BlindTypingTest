

export const HomePage = ({ onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-indigo-900 mb-4">
            Blind Typing Challenge
          </h1>
          <p className="text-xl text-indigo-700">
            Test your typing skills without seeing what you type!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full">
          <button
            onClick={() => onSelectMode('free')}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-indigo-200 hover:border-indigo-400"
          >
            <div className="text-6xl mb-4">✍️</div>
            <h2 className="text-3xl font-bold text-indigo-900 mb-3">
              Free Topic Typing
            </h2>
            <p className="text-gray-600 text-lg">
              Express yourself freely on a given prompt without seeing your text
            </p>
          </button>
          
          <button
            onClick={() => onSelectMode('script')}
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 border-4 border-purple-200 hover:border-purple-400"
          >
            <div className="text-6xl mb-4">📝</div>
            <h2 className="text-3xl font-bold text-purple-900 mb-3">
              Script Copy Typing
            </h2>
            <p className="text-gray-600 text-lg">
              Type a provided script accurately while your screen is covered
            </p>
          </button>
        </div>
      </div>
      
      <footer className="bg-indigo-900 text-white py-6 text-center">
        <p className="text-lg font-semibold">Computer Science Dept – Education Fair 2025</p>
      </footer>
    </div>
  );
};