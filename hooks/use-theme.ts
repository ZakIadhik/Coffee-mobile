
import { useContext } from "react";
import { ThemeContext } from "./use-theme-context";

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("kasgdjhaasdhkajs");
    }
    return context;
}



