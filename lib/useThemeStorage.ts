import { useEffect, useState } from "react";

export function useThemeStorage() {

const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") {
        return false;
    }

    return localStorage.getItem("theme") === "dark";
});

    const toggleTheme = () => {

        const newTheme = !isDarkMode;

        setIsDarkMode(newTheme);

        localStorage.setItem(
            "theme",
            newTheme ? "dark" : "light"
        );

    };

    return {
        isDarkMode,
        toggleTheme
    };

}