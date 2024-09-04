import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-transform duration-300 transform hover:scale-110"
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Sun
          size={24}
          className="text-primary transition-transform duration-300 transform hover:scale-110"
        />
      ) : (
        <Moon
          size={24}
          className="text-primary transition-transform duration-300 transform hover:scale-110"
        />
      )}
    </button>
  );
}
