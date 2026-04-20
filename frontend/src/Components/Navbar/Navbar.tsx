import React, { useState } from 'react'
import logo from './logo.png'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../Context/UseAuth'

const Navbar = () => {
  const {isLoggedIn, user, logout} = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/search', label: 'Search', protected: true },
  ];

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 border-b border-purple-500/20 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity group">
            <div className="relative">
              <img src={logo} alt="Finskark" className="h-8 md:h-10 w-auto group-hover:scale-110 transition-transform" />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              (!link.protected || isLoggedIn()) && (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative font-semibold transition-all duration-300 group ${
                    isActive(link.to)
                      ? 'text-purple-300'
                      : 'text-gray-300 hover:text-purple-300'
                  }`}
                >
                  {link.label}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transform origin-left transition-transform duration-300 ${
                    isActive(link.to) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
                </Link>
              )
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {isLoggedIn() ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium">
                  <span className="text-gray-400">Welcome, </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-bold">
                    {user?.userName}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="font-semibold text-gray-300 hover:text-purple-300 transition-colors relative group"
                >
                  Login
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col space-y-1.5 p-2 group"
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-6 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-2 animate-slideDown border-t border-purple-500/20">
            {navLinks.map((link) => (
              (!link.protected || isLoggedIn()) && (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block py-3 px-4 font-semibold rounded-lg transition-all duration-200 ${
                    isActive(link.to)
                      ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border-l-4 border-purple-400'
                      : 'text-gray-300 hover:bg-purple-500/10'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
            <div className="border-t border-purple-500/20 pt-4 mt-4 space-y-2">
              {isLoggedIn() ? (
                <>
                  <p className="text-sm font-medium px-4">
                    <span className="text-gray-400">Welcome, </span>
                    <span className="text-purple-300">{user?.userName}</span>
                  </p>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block text-center py-3 px-4 font-semibold text-gray-300 hover:bg-purple-500/10 rounded-lg transition-all"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
