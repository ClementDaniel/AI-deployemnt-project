import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch prediction.');
      }

      const data = await response.json();
      setResult(`Sentiment: ${data.sentiment} (Confidence: ${data.confidence.toFixed(2)})`);
    } catch (error) {
      setResult('Error fetching prediction. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">AI Sentiment Analysis</h1>
      <div className="w-full max-w-md p-4 bg-white shadow rounded-lg">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to analyze"
          className="w-full h-32 p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full mt-4 p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
        >
          Analyze Sentiment
        </button>
        {result && (
          <div className="mt-4 p-3 border-t text-gray-700">
            <strong>Result:</strong> {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
