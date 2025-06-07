const QuestionCard = ({ question, showAnswer, handleAnswer }) => {
  if (!question || !Array.isArray(question.options)) return null;

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <p className="text-xl mb-4">{question.question}</p>
      <div className="grid gap-2">
        {question.options.map((opt, idx) => (
          <button
            key={idx}
            className="bg-gray-700 hover:bg-cyan-600 px-4 py-2 rounded"
            onClick={() => handleAnswer(opt)}
            disabled={showAnswer}
          >
            {opt}
          </button>
        ))}
      </div>
      {showAnswer && (
        <div className="mt-3 text-green-400">
          Correct Answer: {question.answer}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
