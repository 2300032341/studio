"use client"

import { useTheme } from "next-themes"
import React from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // Ensure the toggle is in the correct state on initial load
  // The checkbox is "checked" when the theme is "dark"
  const isChecked = theme === 'dark';

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.checked ? 'dark' : 'light');
  };
  
  return (
    <div className="toggle toggle--text">
      <input 
        type="checkbox" 
        id="theme-toggle" 
        className="toggle--checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <label 
        className="toggle--btn" 
        htmlFor="theme-toggle" 
        data-label-on="Dark"  
        data-label-off="Light">
      </label>
    </div>
  )
}
