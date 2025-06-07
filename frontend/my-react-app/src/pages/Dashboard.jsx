import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


const Dashboard = () => {
  const { user, isAuthenticated } = useAuth0();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/get-results?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching results:', err);
          setLoading(false);
        });
    }
  }, [user, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl text-red-400">Please log in to view your dashboard.</p>
      </div>
    );
  }

  const filteredResults =
    levelFilter === 'all'
      ? results
      : results.filter((r) => r.level === levelFilter);

  const scores = filteredResults.map((r) => r.score);
  const best = scores.length ? Math.max(...scores) : 0;
  const avg = scores.length
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2)
    : 0;

  const chartData = filteredResults.map((r) => ({
    date: new Date(r.taken_at).toLocaleDateString(),
    score: r.score
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.picture}
            alt="avatar"
            className="w-12 h-12 rounded-full border-2 border-cyan-400 shadow-lg"
          />
          <div>
            <h1 className="text-3xl font-bold text-cyan-400 animate-pulse">
              Welcome, {user.name || user.email}
            </h1>
            <p className="text-gray-300">You've taken <span className="text-yellow-300 font-semibold">{results.length}</span> quizzes.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-lg text-yellow-300 font-bold">Best Score</p>
            <p className="text-2xl text-cyan-400">{best} / 20</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-lg text-yellow-300 font-bold">Average Score</p>
            <p className="text-2xl text-cyan-400">{avg} / 20</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-lg text-yellow-300 font-bold">Quiz Streak</p>
            <p className="text-2xl text-cyan-400">To be Updated !</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl text-center">
            <p className="text-lg text-yellow-300 font-bold">Level Filter</p>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-gray-700 text-white mt-2 p-1 rounded"
            >
              <option value="all">All</option>
              <option value="N5">N5</option>
              <option value="N4">N4</option>
              <option value="N3">N3</option>
              <option value="N2">N3</option>
              <option value="N1">N3</option>
            </select>
          </div>
        </div>

        {results.length >= 5 && (
          <div className="mb-4 text-center">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
              🏅 5+ Quizzes Taken!
            </span>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-xl font-bold text-cyan-300 mb-2">Progress Chart</h2>
          <div className="bg-gray-800 p-4 rounded-xl">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <XAxis dataKey="date" stroke="#ccc" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-400">No data to display chart.</p>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th className="p-3 text-left border-b border-gray-600">Date</th>
                <th className="p-3 text-left border-b border-gray-600">Level</th>
                <th className="p-3 text-left border-b border-gray-600">Score</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((r, i) => (
                <tr key={i} className="hover:bg-gray-800 transition border-b border-gray-700">
                  <td className="p-3">{new Date(r.taken_at).toLocaleDateString()}</td>
                  <td className="p-3">JLPT {r.level}</td>
                  <td className="p-3 text-cyan-300 font-medium">{r.score} / 20</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-bold transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
