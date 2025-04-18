import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "light";
  });

  // 动态设置 CSS 变量
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    // 设置 CSS 变量
    const variables =
      theme === "dark"
        ? {
            "--primary-bg": "#1f1f1f",
            "--secondary-bg": "#001529",
            "--primary-text": "#ffffff",
            "--secondary-text": "#a0a0a0",
            "--border-color": "#434343",
            "--icon-color": "#ffffff",
          }
        : {
            "--primary-bg": "#ffffff",
            "--secondary-bg": "#ffffff",
            "--primary-text": "#1f1f1f",
            "--secondary-text": "#595959",
            "--border-color": "#d9d9d9",
            "--icon-color": "rgba(0,0,0,0.88)",
          };

    Object.entries(variables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      // 保存到 localStorage
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
