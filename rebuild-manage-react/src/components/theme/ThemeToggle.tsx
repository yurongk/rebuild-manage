import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "./theme-context";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const iconStyle: React.CSSProperties = {
    margin: "0 var(--container-margin)",
    fontSize: "var(--base-font-size)",
    color: "var(--icon-color)",
    cursor: "pointer",
  };

  return (
    <span onClick={toggleTheme}>
      {theme === "dark" ? (
        <SunOutlined style={iconStyle} />
      ) : (
        <MoonOutlined style={iconStyle} />
      )}
    </span>
  );
};

export default ThemeToggle;
