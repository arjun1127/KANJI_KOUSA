import React, { useEffect, useState } from 'react';
import KanjiCard from '../components/KanjiCard2.jsx';
import Pagination from '../components/Pagination.jsx';
import { Link } from 'react-router-dom';

const JLPT_LEVELS = ['5', '4', '3', '2', '1'];

const KanjiFlashcards = () => {
  const [kanjiList, setKanjiList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState('5');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchKanji = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://kanjiapi.dev/v1/kanji/jlpt-${level}`);
        const characters = await res.json();

        const detailedKanji = await Promise.all(
          characters.map(async (char) => {
            const res = await fetch(`https://kanjiapi.dev/v1/kanji/${char}`);
            return await res.json();
          })
        );

        setKanjiList(detailedKanji);
        setCurrentPage(1);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };

    fetchKanji();
  }, [level]);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentKanji = kanjiList.slice(indexOfFirst, indexOfLast);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
       <div className="flex items-center justify-between mb-4">
          <Link to="/" className="text-xl font-bold text-cyan-400 hover:text-white transition-all">
            ← Home
          </Link>
          <h1 className="text-2xl font-bold">Kanji Flashcards (JLPT {level.toUpperCase()})</h1>
        </div>
        
      <div className="mb-6 text-center">
        <label className="mr-3 text-lg font-medium">Select JLPT Level:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="bg-gray-800 text-white border border-cyan-500 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          {JLPT_LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>
              N{lvl}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-cyan-300 animate-pulse">Loading kanji...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentKanji.map((kanji) => (
              <KanjiCard key={kanji.kanji} kanji={kanji} />
            ))}
          </div>

          <div className="mt-10">
            <Pagination
              totalItems={kanjiList.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default KanjiFlashcards;
