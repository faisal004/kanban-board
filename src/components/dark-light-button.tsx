"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";

const DarkLightModeButton = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const mounted=useMounted()
    if(!mounted){
        return null
    }

    return (
        <button
            onClick={() => (currentTheme === "dark" ? setTheme("light") : setTheme("dark"))}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-all capitalize "
        >
            {currentTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {currentTheme}
        </button>
    );
};

export default DarkLightModeButton;
