"use client";
import React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "./ui/button";

const DarkLightModeButton = () => {
    const { systemTheme, theme, setTheme } = useTheme();
    const currentTheme = theme === "system" ? systemTheme : theme;
    const mounted = useMounted()
    if (!mounted) {
        return null
    }

    return (
        <Button
            onClick={() => (currentTheme === "dark" ? setTheme("light") : setTheme("dark"))}
        >
            {currentTheme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
    );
};

export default DarkLightModeButton;
