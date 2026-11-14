import React from 'react'
import { useThemeContext } from './themeProvider'

const Child = () => {

    const { handleThemeSwitch } = useThemeContext()

    function handleClick() {
        handleThemeSwitch()
    }

    return (
        <>
            <button onClick={handleClick}>
                hello
            </button>
        </>
    )
}

export default Child