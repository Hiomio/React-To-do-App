import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authSlice';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // State to track theme (dark or light)
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prevState) => !prevState);
  };
  
  // Use effect to apply the theme to the body and save it in localStorage
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');  // Adds dark theme class to body
      document.documentElement.classList.add('dark'); // For tailwind dark mode
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');  // Removes dark theme class
      document.documentElement.classList.remove('dark'); // For tailwind dark mode
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  // Check for saved theme in localStorage and system preference on initial load
  useEffect(() => {
    // First check localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    } else if (savedTheme === 'light') {
      setIsDarkMode(false);
    } else {
      // If no saved preference, check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDarkMode(prefersDark);
    }
    
    // Add listener for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only change if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  const handleLogout = () => {
    dispatch(logout());
    navigate('/signin');
  };
  
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center p-4 max-w-7xl mx-auto transition-colors duration-300 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center mb-4 sm:mb-0">
        <img className="cursor-pointer w-16 h-16" src={`${process.env.PUBLIC_URL}/Container.png`} alt="Logo" />
            <span className="ml-2 text-xl font-bold">TaskTrek</span>
         </div>

      <div className="flex items-center space-x-4">
        <img
        className="w-6 h-6 text-gray-600 dark:text-gray-300 cursor-pointer transform hover:scale-110 transition-all duration-200"// Invert icons in dark mode
          src={`${process.env.PUBLIC_URL}/search.svg`}
          alt="Search Icon"
        />
        <img
          className="nav-icons dark:invert" // Invert icons in dark mode
          src={`${process.env.PUBLIC_URL}/grid-view.svg`}
          alt="Grid View Icon"
        />
        {/* Toggle Dark Mode Button with animation */}
        <button
          onClick={toggleTheme}
          className="relative w-10 h-5 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center transition-colors duration-300 focus:outline-none"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span 
            className={`absolute left-0.5 bg-white rounded-full w-4 h-4 transition-transform duration-300 transform ${
              isDarkMode ? 'translate-x-5' : 'translate-x-0'
            } flex items-center justify-center`}
          >
            {isDarkMode ? '🌙' : '☀️'}
          </span>
        </button>
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors duration-150"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;