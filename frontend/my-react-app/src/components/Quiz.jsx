import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Quiz = ({ level, questions }) => {
  const [questionSet, setQuestionSet] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { user, isAuthenticated } = useAuth0();


 const generateQuestionSet = () => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 20);//random 20 questions is generated each time

  // Shuffle options for each question
  return shuffled.map((q) => ({
    ...q,
    options: [...q.options].sort(() => 0.5 - Math.random()),
  }));
};


  useEffect(() => {
    setQuestionSet(generateQuestionSet());
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  }, [level]);

  const handleAnswer = (index, selected) => {
    setAnswers((prev) => ({ ...prev, [index]: selected }));
  };

  const handleSubmit = () => {
  let sc = 0;
  questionSet.forEach((q, i) => {
    if (answers[i] === q.answer) sc += 1;
  });
  setScore(sc); 
  setSubmitted(true);

  if (isAuthenticated) {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/save-result`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        level,
        score: sc,
      }),
    }).then((res) => {
      if (!res.ok) console.error('Failed to save result');
    });
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-purple-400">
          JLPT {level} Quiz :{' '}
          <button
            onClick={() => window.location.reload()}
            className="text-2xl text-cyan-400 hover:text-cyan-300 border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-900 transition"
          >
            NEW SET
          </button>
        </h1>
          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 border border-cyan-400 px-4 py-2 rounded hover:bg-cyan-900 transition"
          >
          Home
          </Link>
        </div>

        <div className="space-y-6">
          {questionSet.map((q, i) => (
            <div key={i} className="bg-gray-800 p-5 rounded-lg shadow-md">
              <p className="mb-2 font-semibold text-lg">Q{i + 1}. {q.question}</p>
              <div className="grid gap-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded text-left transition ${
                      answers[i] === opt
                        ? submitted
                          ? opt === q.answer
                            ? 'bg-green-600'
                            : 'bg-red-600'
                          : 'bg-cyan-600'
                        : 'bg-gray-700 hover:bg-cyan-500'
                    }`}
                    onClick={() => !submitted && handleAnswer(i, opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {submitted && (
                <p className="mt-2 text-sm text-green-300">
                  Correct Answer: {q.answer}
                </p>
              )}
            </div>
          ))}
        </div>

        {!submitted && Object.keys(answers).length === questionSet.length && (
          <button
            onClick={handleSubmit}
            className="mt-8 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold w-full transition"
          >
            Submit Quiz
          </button>
        )}

        {submitted && (
        <>
          <div className="mt-8 text-center text-2xl font-bold text-cyan-400">
            Your Score: {score} / 20
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/dashboard"
              className="inline-block mt-4 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition"
            >
              Analyze Your Scores 
            </Link>
          </div>
        </>
      )}

      </div>
    </div>
  );
};

export default Quiz;
