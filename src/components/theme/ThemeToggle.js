import React from 'react'
import { useTheme } from '../../context/theme/ThemeContext'
import './ThemeToggle.scss'

const ThemeToggle = () => {
  const { themeName, toggleTheme } = useTheme()

  return (
    <button 
      className={`theme-toggle ${themeName}`} 
      onClick={toggleTheme}
      aria-label={`Switch to ${themeName === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          {themeName === 'dark' ? (
            <svg className="icon moon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            <svg className="icon sun" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
