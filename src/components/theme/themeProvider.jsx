import { createContext, useContext, useState, useEffect } from "react";

// create a context
const ThemeContext = createContext(null)


//create a seprate context provider component
//Simply Create a separate for function for Provider and pass components inside it as children.
// This utilizes the react concept, if prop doesn’t change do not re-render.

export const ThemeContextProvider = ({ children }) => {
    const themeMode = {
        light: "light",
        dark: "dark"
    }
    const [theme, setTheme] = useState(themeMode.light)

    useEffect(() => {
        document.body.classList.remove("light", "dark")
        document.body.classList.add(theme)
    }, [theme])


    function handleThemeSwitch() {
        setTheme((prev) => prev === "light" ? "dark" : "light")
    }
    
    return (
        <ThemeContext.Provider value={{ theme, handleThemeSwitch }}>
            {children}
        </ThemeContext.Provider>
    )
}


//create a custom hook
//create a custom hook which will be responsible for calling useContext.
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("use theme context must be inside theme context provider")
    }

    return context;
}
