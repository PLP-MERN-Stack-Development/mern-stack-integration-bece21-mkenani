import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold">
            MERN Blog
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            
            {user ? (
              <>
                <Link to="/create-post" className="hover:text-blue-200 transition">
                  Create Post
                </Link>
                <span className="text-blue-200">Hello, {user.username}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-blue-700 px-3 py-1 rounded hover:bg-blue-800 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;