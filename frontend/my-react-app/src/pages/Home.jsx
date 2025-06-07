import { useEffect, useState } from 'react';
import KanjiCard from '../components/kanjiCard';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import KanjiLogo from '../assets/logo2.svg';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';


const Home = () => {
  const [kanjiList, setKanjiList] = useState([]);
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('');
  

  const fetchKanji = async () => {
    let url = `${import.meta.env.VITE_BACKEND_URL}/api/kanji`;
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (level) params.append('level', level);
    if (params.toString()) url += `?${params.toString()}`;

    const res = await fetch(url);
    const data = await res.json();
    setKanjiList(data);
  };

  useEffect(() => {
    fetchKanji();
  }, [query, level]);

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-6">
      {/* Navbar */}
      {/* <nav className="flex justify-end gap-4 mb-4">
        <button
          onClick={() => setShowSignup(true)}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-4 py-2 rounded transition"
        >
          Sign Up
        </button>
        <button
          onClick={() => setShowLogin(true)}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium px-4 py-2 rounded transition"
        >
          Login
        </button>
      </nav> */}

          <Navbar />
        <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-cyan-400 flex items-center gap-2">
          <img src={KanjiLogo} alt="Kanji Logo" className="w-10 h-10" />
          JLPT Kanji Kousa
        </h1>
        <Link
          to="/flashcards"
          className="mt-4 sm:mt-0 text-lg text-cyan-400 hover:text-white transition hover:underline"
        >
          → Advanced Flashcards
        </Link>
      </header>

      <div className="mb-8">
        <Hero />
      </div>

      <div className="text-center text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
        Discover essential beginner kanji to build a strong foundation for JLPT preparation.
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
        <input
          type="text"
          placeholder="Search kanji or meaning"
          className="p-3 rounded-md w-full md:w-72 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-3 w-full md:w-48 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        >
          <option value="">All Levels</option>
          <option value="N5">N5</option>
          <option value="N4">N4</option>
        </select>
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {kanjiList.length > 0 ? (
          kanjiList.map((k) => <KanjiCard key={k.id} kanji={k} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No kanji found.
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
