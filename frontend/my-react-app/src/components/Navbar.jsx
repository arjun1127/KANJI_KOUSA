import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import Modal from './modal.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { loginWithPopup, logout, isAuthenticated, user } = useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [hasSavedUser, setHasSavedUser] = useState(false);
  const [glow, setGlow] = useState(false);

  const handleLogin = async () => {
    try {
      await loginWithPopup();
      setShowModal(false);
    } catch (err) { 
      console.error('Login error:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user && !user.email_verified) {
      alert('Please verify your email address. Check your inbox for a verification link.');
      logout({ returnTo: window.location.origin });
    }
  }, [isAuthenticated, user, logout]);

  useEffect(() => {
    if (isAuthenticated && user?.email_verified && !hasSavedUser) {
      const userData = {
        email: user.email,
        name: user.name,
        auth0_id: user.sub,
      };

      axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/save-user`, userData)
        .then(() => {
          console.log('User saved successfully');
          setHasSavedUser(true);
        })
        .catch((err) => {
          console.error('Error saving user:', err);
        });
    }
  }, [isAuthenticated, user, hasSavedUser]);

  useEffect(() => {
    const shouldGlow = localStorage.getItem('showLoginGlow') === 'true';
    if (shouldGlow) {
      setGlow(true);
      localStorage.removeItem('showLoginGlow');
      setTimeout(() => setGlow(false), 3000);
    }
  }, []);

  return (
    <nav className="flex justify-end items-center gap-4 mb-4">
      {isAuthenticated && user?.email_verified ? (
        <>
          <span className="text-white mr-2">👤 {user.email}</span>
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition"
          >
            Log Out
          </button>
          <button
            className={`bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-4 py-2 rounded transition ${
              glow ? 'animate-pulse ring-2 ring-cyan-300' : ''
            }`}
          >
            <Link to="/dashboard">Analyze Your Scores</Link>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setShowModal(true)}
            className={`bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-4 py-2 rounded transition ${
              glow ? 'animate-pulse ring-2 ring-cyan-300' : ''
            }`}
          >
            Login / Signup
          </button>

          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <h2 className="text-2xl font-bold mb-4 text-cyan-400">Welcome</h2>
            <p className="text-gray-300 mb-4">Please sign in using Auth0</p>
            <button
              onClick={handleLogin}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded w-full transition"
            >
              Continue with Auth0
            </button>
          </Modal>
        </>
      )}
    </nav>
  );
};

export default Navbar;
