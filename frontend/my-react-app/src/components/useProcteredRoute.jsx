//to make sure if user is not logged in then make the sigup button glow!!!

import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    localStorage.setItem('showLoginGlow', 'true');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
