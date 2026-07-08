import React from 'react';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <button 
      onClick={toggleDarkMode}
      data-testid="dark-mode-toggle"
      style={{padding: '15px 30px', fontSize: '18px'}}
    >
      {isDarkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default DarkModeToggle;