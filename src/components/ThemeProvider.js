'use client'

// Theme provider simplified — single warm aesthetic, no dark mode toggle
export function ThemeProvider({ children }) {
  return <>{children}</>
}

export const useTheme = () => ({ theme: 'light', toggle: () => {} })
