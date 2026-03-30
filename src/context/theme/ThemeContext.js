import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

const themes = {
  dark: {
    name: "dark",
    colors: {
      primary: "#e94560",
      secondary: "#ff6b6b",
      background:
        "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
      backgroundSolid: "#1a1a2e",
      text: "#ffffff",
      textSecondary: "rgba(255, 255, 255, 0.7)",
      card: "rgba(255, 255, 255, 0.05)",
      cardBorder: "rgba(255, 255, 255, 0.1)",
      success: "#4ade80",
      warning: "#fbbf24",
      error: "#ef4444",
      table: "#0d4f2b",
      tableBorder: "#1a7a45",
    },
  },
  light: {
    name: "light",
    colors: {
      primary: "#e94560",
      secondary: "#ff6b6b",
      background:
        "linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 50%, #bcccdc 100%)",
      backgroundSolid: "#f0f4f8",
      text: "#1a1a2e",
      textSecondary: "rgba(26, 26, 46, 0.7)",
      card: "rgba(255, 255, 255, 0.9)",
      cardBorder: "rgba(26, 26, 46, 0.1)",
      success: "#22c55e",
      warning: "#f59e0b",
      error: "#dc2626",
      table: "#1a7a45",
      tableBorder: "#0d4f2b",
    },
  },
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("poker-theme");
    return savedTheme || "dark";
  });

  useEffect(() => {
    localStorage.setItem("poker-theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const currentTheme = themes[theme];

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        themeName: theme,
        toggleTheme,
        themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
