import React, { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  setTheme: (t) => {},
})

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('ahmed-portfolio-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return 'dark' // Dark mode is default as per prompt
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
      root.classList.add('light')
    } else {
      root.classList.remove('light')
      root.classList.add('dark')
    }
    localStorage.setItem('ahmed-portfolio-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  const setTheme = (t) => {
    if (t === 'light' || t === 'dark') {
      setThemeState(t)
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
