import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import KanjiFlashcards from './pages/KanjiFlashCards';
import N5Quiz from './pages/N5Quiz';
import N4Quiz from './pages/N4Quiz';
import N3Quiz from './pages/N3Quiz';
import N2Quiz from './pages/N2Quiz';
import N1Quiz from './pages/N1Quiz';
import ProtectedRoute from './components/useProcteredRoute';
import Dashboard from './pages/Dashboard';
import ChatBotPage from './pages/ChatBot';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flashcards" element={<KanjiFlashcards />} />

      <Route path="/quiz/n5" element={ <ProtectedRoute>
      <N5Quiz />
    </ProtectedRoute>} />

      <Route path="/quiz/n4" element={ <ProtectedRoute>
      <N4Quiz />
    </ProtectedRoute>} />

    <Route path="/quiz/n3" element={ <ProtectedRoute>
      <N3Quiz />
    </ProtectedRoute>} />

    <Route path="/quiz/n2" element={ <ProtectedRoute>
      <N2Quiz/>
    </ProtectedRoute>} />

    <Route path="/quiz/n1" element={ <ProtectedRoute>
      <N1Quiz />
    </ProtectedRoute>} />

    <Route path="/dashboard" element={<Dashboard />} />

    <Route path="/chatBot" element={<ChatBotPage/>}/>
    </Routes>
  );
}

export default App;
