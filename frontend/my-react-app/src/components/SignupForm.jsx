//ITS NOT COMPULSORY TO HAVE BUT LETS YOU HAVE A EXTRA STEP TO SIGNUP 

import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupForm = () => {
  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  if (isAuthenticated) {
    return (
      <div className="text-white p-6 rounded-lg shadow-lg w-full max-w-md bg-gray-900">
        <h2 className="text-2xl font-bold mb-4 text-cyan-400">Welcome!</h2>
        <p className="mb-2">
          <span className="text-gray-400">Logged in as:</span> {user.email}
        </p>
        <button
          onClick={() => logout({ returnTo: window.location.origin })}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded transition duration-200"
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Join with Auth0</h2>
      <button
        onClick={() => loginWithRedirect()}
        className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded transition duration-200 w-full"
      >
        Login / Signup with Auth0
      </button>
    </div>
  );
};

export default SignupForm;
