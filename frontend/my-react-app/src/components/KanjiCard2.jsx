const KanjiCard = ({ kanji }) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-2xl shadow-lg border border-cyan-500 hover:shadow-cyan-500/50 transition duration-300 transform hover:scale-105 animate-glow">
      <div className="text-5xl font-bold text-center text-cyan-300 drop-shadow-md">
        {kanji.kanji}
      </div>
      <div className="mt-2 text-center text-sm text-gray-300">{kanji.meanings.join(', ')}</div>
      <div className="mt-1 text-center text-xs text-gray-400">Onyomi: {kanji.on_readings.join(', ')}</div>
      <div className="text-center text-xs text-gray-400">Kunyomi: {kanji.kun_readings.join(', ')}</div>
    </div>
  );
};


export default KanjiCard;
