const KanjiCard = ({ kanji }) => {
  return (
    <div className="bg-gray-900/80 backdrop-blur-md border border-cyan-500 text-white rounded-2xl shadow-lg p-6 w-72 text-center transition-transform duration-300 hover:scale-105 hover:shadow-cyan-500/40">
      <h1 className="text-8xl font-black text-cyan-300 mb-4 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]">
        {kanji.character}
      </h1>

      <div className="space-y-1 text-sm text-cyan-100 mb-4">
        <p><span className="font-semibold text-cyan-200">Onyomi:</span> {kanji.onyomi || '—'}</p>
        <p><span className="font-semibold text-cyan-200">Kunyomi:</span> {kanji.kunyomi || '—'}</p>
        <p><span className="font-semibold text-cyan-200">Meaning:</span> {kanji.meaning || '—'}</p>
      </div>

      <span className="inline-block mt-2 text-xs bg-cyan-700 text-white font-medium px-3 py-1 rounded-full shadow-md shadow-cyan-500/40">
        Level: {kanji.level || 'N/A'}
      </span>
    </div>
  );
};

export default KanjiCard;
